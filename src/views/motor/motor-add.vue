<template>
    <div style="padding-bottom: 10px;">
        <basic-block :title="title" hide-header>
            <div>
                <el-row>
                    <el-form :model="model" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="基本信息" name="base">
                                <el-col :lg="{span: 12}" :md="{span:16}">
                                    <el-form-item label="电机型号" prop="name">
                                        <el-input v-model.trim="model.name" placeholder="请输入"></el-input>
                                    </el-form-item>
                                    <el-form-item label="简介" prop="desc">
                                        <el-input
                                                v-model="model.desc"
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="品牌" prop="motorCategoryId">
                                        <el-select v-model="model.motorCategoryId" clearable filterable placeholder="请选择">
                                            <el-option v-for="(item, index) in motorCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="语言" prop="language">
                                        <el-select v-model="model.language" clearable placeholder="请选择">
                                            <el-option v-for="(value, key, index) in LanguageList" :key="index" :label="value" :value="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="缩略图" prop="img">
                                        <upload v-if="showUpload" ref="upload" v-model="model.img" :limit="1"></upload>
                                    </el-form-item>
                                    <el-form-item label="排序" prop="sort">
                                        <el-input-number v-model.trim="model.sort" placeholder="请输入"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="active">
                                        <el-radio-group v-model="model.active">
                                            <el-radio :label="true">激活</el-radio>
                                            <el-radio :label="false">冻结</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-tab-pane>
                            <el-tab-pane label="电机属性" name="property">
                                <el-col :lg="{span: 12}" :md="{span:16}">
                                    <el-form-item v-for="(item, index) in propertyList" :key="index" :label="item.name">
                                        <el-input v-model.trim="item.value" placeholder="请输入"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-tab-pane>
                            <!--<el-tab-pane label="电机详情" name="content">-->
                                <!--<el-col :lg="{span: 24}" :md="{span:24}">-->
                                    <!--<el-form-item label="电机详情" prop="content" label-width="100px">-->
                                        <!--<vue-ckeditor-->
                                                <!--v-if="refleshEditor"-->
                                                <!--v-model="model.content"-->
                                                <!--:config="config"-->
                                                <!--@blur="onBlur($event)"-->
                                                <!--@focus="onFocus($event)"-->
                                                <!--@contentDom="onContentDom($event)"-->
                                                <!--@dialogDefinition="onDialogDefinition($event)"-->
                                                <!--@fileUploadRequest="onFileUploadRequest($event)"-->
                                                <!--@fileUploadResponse="onFileUploadResponse($event)" ></vue-ckeditor>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                            <!--</el-tab-pane>-->
                        </el-tabs>

                        <el-form-item v-if="type!='info'">
                            <el-button type="primary" :loading="loading" :disabled="loading" @click="submitForm('ruleForm')">{{ type == 'create' ? '立即创建' : '保存'}}</el-button>
                            <el-button v-if="type == 'create'" @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </basic-block>
    </div>
</template>

<script>
    import { getMotorById, addMotor, editMotor } from "@/api/motor";
    import { getPropertyAll } from "@/api/property";
    import { getMotorCategoryAll } from "@/api/motorCategory";
    import { LanguageList, StatusList } from "@/const/constData";
    import watchRoute from "@/mixins/watch-route";
    import editorMixins from "@/mixins/editorMixins";
    import Upload from "@/components/jst-components/upload";
    import VueCkeditor from 'vue-ckeditor2';

    export default {
        name: "motor-add",

        components: {
            Upload,
            VueCkeditor
        },

        mixins: [
            // watchRoute,
            editorMixins
        ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                motorCategoryList: [],
                oMotorCategoryList: [],
                propertyList: [], // 当前属性
                oPropertyList: [], // 原始属性

                title: "添加电机",
                type: "create", // create 创建 edit 编辑 info 查看
                model: {
                    name: '',
                    motorCategoryId: '',
                    img: "",
                    language: '',
                    desc: '',
                    content: "",
                    sort: 999999999,
                    active: true,
                    properties: [],
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    motorCategoryId: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    language: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                },
                loading: false,
                showUpload: true,
                activeName: "base",
                isKeep: false,
            };
        },

        watch: {
            "model.language": function(newVal, oldVal){
                // 考虑有属性维护后多了属性
                this.propertyList = this.oPropertyList.filter((item)=>{
                    return item.language == newVal;
                });

                // 比较属性的值
                this.propertyList.forEach((item)=>{
                    this.model.properties.forEach((cate)=>{
                        if(item.id == cate.id){
                            item.value = cate.value;
                        }
                    })
                });

                // 更新电机品牌
                this.motorCategoryList = this.oMotorCategoryList.filter((item)=>{
                    return item.language == newVal;
                });
                let curCategory = this.motorCategoryList.filter((item)=>{
                    return item.id == this.model.motorCategoryId;
                });
                if(curCategory.length == 0) this.model.motorCategoryId = ""; // 不在当前品牌中 设置为空
            }
        },

        // beforeRouteEnter (to, from, next) {
        //     next(vm => {
        //         !vm.isKeep && vm.init && vm.init();
        //     })
        // },

        created() {
            // 两个组件缓存状态不一致时 重新调用了created方法
            this.$nextTick(()=>{
                this.init();
            })
        },

        methods: {
            async init(){
                console.log(this.$route);

                if(this.$route.params.id){
                    await this.getProperty();
                    await this.getMotorCategory();
                    this.getMotor(this.$route.params.id);
                    if(this.$route.name == "编辑电机"){
                        this.type = "edit";
                        this.title = "编辑电机";
                    }
                    if(this.$route.name == "电机信息"){
                        this.type = "info";
                        this.title = "电机信息";
                    }
                }else {
                    this.type = "create";
                    this.getProperty(); // 创建时取分类，编辑和信息带出
                    this.getMotorCategory();
                }
            },

            getMotor(id){
                this.showUpload = false;
                getMotorById(id).then((res)=>{
                    this.showUpload = true;
                    res = res.data;
                    if(res.code==1){
                        this.model = res.data;
                        // this.$refs.upload && this.$refs.upload.setVal(res.data.img);
                    }
                })
            },

            getMotorCategory(){
                return getMotorCategoryAll({}).then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.motorCategoryList = data.data;
                        this.oMotorCategoryList = _.cloneDeep(data.data);
                    }
                });
            },

            async getProperty(fn){
                return getPropertyAll({
                    type: "motor",
                    active: true,
                    delete: false
                }).then((res)=>{
                    let data = res.data;
                    if(data.code==1){
                        this.propertyList = data.data.map((item)=>{
                            return {
                                ...item,
                                value: ""
                            }
                        });
                        this.oPropertyList = _.cloneDeep(this.propertyList);
                        if(fn) fn();
                    }
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        // 提交相同语言的属性
                        this.model.properties = this.propertyList.filter((item)=>{
                            return item.language == this.model.language;
                        });
                        // this.type == "create" ? this.create() : this.update();
                        this.type == "create" ? this.create() : this.update();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            create(){
                // 创建时调用的方法 提交数据给后台
                this.loading = true;
                addMotor(_.cloneDeep(this.model)).then(res=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.$message({
                            type: 'success',
                            message: '创建成功!'
                        }, 300);

                        // this.model = res.data;
                        this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.$router.push({
                            path:  "/motor/motor-edit/" + data.data.id
                        });

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        // this.$router.push({
                        //     path: "/motor/motor-list",
                        // }, (to, from, next)=>{
                        //     if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                        //         to.meta.isRefresh = true;
                        //     }
                        // });
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },

            update(){
                // 更新时调用的方法 提交数据给后台
                this.loading = true;
                editMotor(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        }, 300);
                        this.model.language = ""; // 触发重新初始化语言
                        this.init();

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        // this.$router.push({
                        //     path: "/motor/motor-list",
                        // }, (to, from, next)=>{
                        //     if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                        //         to.meta.isRefresh = true;
                        //     }
                        // });
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },
        }
    }
</script>

<style scoped>

</style>

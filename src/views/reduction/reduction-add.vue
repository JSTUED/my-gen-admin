<template>
    <div style="padding-bottom: 10px;">
        <basic-block :title="title" hide-header>
            <div>
                <el-row>
                    <el-form :model="model" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="基本信息" name="base">
                                <el-col :lg="{span: 12}" :md="{span:16}">
                                    <el-form-item label="减速机分类" prop="reductionCategoryId">
                                        <el-select v-model="model.reductionCategoryId" clearable filterable placeholder="请选择" style="width: 100%;">
                                            <el-option v-for="(item, index) in reductionCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="规格" prop="specification">
                                        <el-input v-model.trim="model.specification" placeholder="请输入"></el-input>
                                    </el-form-item>
                                    <el-form-item label="简介" prop="desc">
                                        <el-input
                                                v-model="model.desc"
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="语言" prop="language">
                                        <el-select v-model="model.language" clearable placeholder="请选择">
                                            <el-option v-for="(value, key, index) in LanguageList" :key="index" :label="value" :value="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="转动方式" prop="rotation">
                                        <el-select v-model="model.rotation" clearable placeholder="请选择">
                                            <el-option v-for="(value, key, index) in RotationList" :key="index" :label="value" :value="Number(key)"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="显示基础属性" prop="showProperty">
                                        <el-radio-group v-model="model.showProperty">
                                            <el-radio :label="true">是</el-radio>
                                            <el-radio :label="false">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item v-if="model.showProperty" label="含盖板" prop="isCover">
                                        <el-radio-group v-model="model.isCover">
                                            <el-radio :label="true">是</el-radio>
                                            <el-radio :label="false">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item v-if="model.showProperty" label="有转接板" prop="isPinboard">
                                        <!--<el-checkbox v-model="model.isPinboard"></el-checkbox>-->
                                        <el-radio-group v-model="model.isPinboard">
                                            <el-radio :label="true">是</el-radio>
                                            <el-radio :label="false">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item v-if="model.showProperty" label="有接头" prop="isContact">
                                        <!--<el-checkbox v-model="model.isContact"></el-checkbox>-->
                                        <el-radio-group v-model="model.isContact">
                                            <el-radio :label="true">是</el-radio>
                                            <el-radio :label="false">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                    <el-form-item label="缩略图" prop="img">
                                        <upload v-if="showUpload" ref="upload" v-model="model.img" :limit="1"></upload>
                                        <span class="img-tip-msg">图片大小250 * 250px，透明背景，png格式</span>
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
                            <el-tab-pane label="减速机属性" name="property">
                                <el-col :lg="{span: 12}" :md="{span:16}">
                                    <el-form-item v-for="(item, index) in propertyList" :key="index" :label="item.name">
                                        <el-input v-model.trim="item.value" placeholder="请输入"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-tab-pane>
                            <el-tab-pane label="图纸" name="paper">
                                <el-col :lg="{span: 24}" :md="{span:24}">
                                    <el-form-item label="图纸展示图片" prop="bannerList">
                                        <upload v-if="showBannerUpload" ref="banner" multiple v-model="model.bannerList" :limit="20"></upload>
                                    </el-form-item>
                                    <el-form-item label="PDF图纸" prop="pdf">
                                        <upload v-if="showBannerUpload" ref="pdf" v-model="model.pdf" :limit="1" accept=".pdf" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                    <el-form-item label="DWG(2D)图纸" prop="dwg">
                                        <upload v-if="showBannerUpload" ref="dwg" v-model="model.dwg" :limit="1" accept=".dwg" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                    <el-form-item label="STEP(3D)图纸" prop="step">
                                        <upload v-if="showBannerUpload" ref="step" v-model="model.step" :limit="1" accept=".step" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                </el-col>
                            </el-tab-pane>
                            <el-tab-pane label="减速机详情" name="content">
                                <el-col :lg="{span: 24}" :md="{span:24}">
                                    <el-form-item label="减速机详情" prop="content" label-width="100px">
                                        <vue-ckeditor
                                                v-if="refleshEditor"
                                                v-model="model.content"
                                                :config="config"
                                                @blur="onBlur($event)"
                                                @focus="onFocus($event)"
                                                @contentDom="onContentDom($event)"
                                                @dialogDefinition="onDialogDefinition($event)"
                                                @fileUploadRequest="onFileUploadRequest($event)"
                                                @fileUploadResponse="onFileUploadResponse($event)" ></vue-ckeditor>
                                    </el-form-item>
                                </el-col>
                            </el-tab-pane>
                        </el-tabs>

                        <el-form-item v-if="type!='info'">
                            <el-button type="primary" :loading="loading" :disabled="loading" @click="submitForm('ruleForm')">{{type == 'create' ? '立即创建' : '保存'}}</el-button>
                            <el-button v-if="type == 'create'" @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </basic-block>
    </div>
</template>

<script>
    import { getReductionById, addReduction, editReduction } from "@/api/reduction";
    import { getPropertyAll } from "@/api/property";
    import { getReductionCategoryAll } from "@/api/reductionCategory";
    import { LanguageList, StatusList, RotationList } from "@/const/constData";
    // import watchRoute from "@/mixins/watch-route";
    import editorMixins from "@/mixins/editorMixins";
    import Upload from "@/components/jst-components/upload";
    import VueCkeditor from 'vue-ckeditor2';
    import { baseUrl } from '@/config/env';
    import { mapGetters } from "vuex";

    export default {
        name: "reduction-add",

        components: {
            Upload,
            VueCkeditor
        },

        mixins: [
            // watchRoute,
            editorMixins
        ],

        computed: {
            ...mapGetters(["token"])
        },

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                RotationList: RotationList,
                propertyList: [], // 当前属性
                oPropertyList: [], // 原始属性

                reductionCategoryList: [], // 减速机分类
                oReductionCategoryList: [], // 原始减速机分类


                title: "添加减速机",
                type: "create", // create 创建 edit 编辑 info 查看
                model: {
                    reductionCategoryId: '',
                    specification: '',
                    rotation: 10,
                    showProperty: false,
                    isCover: false,
                    isPinboard: false,
                    isContact: false,
                    language: '',
                    desc: '',
                    sort: 999999999,
                    active: true,
                    properties: [],
                    bannerList: [],
                    banner: "",
                    pdf: "",
                    dwg: "",
                    step: ""
                },
                rules: {
                    reductionCategoryId: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    specification: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    rotation: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    language: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                },
                loading: false,
                showUpload: true,
                showBannerUpload: true,
                activeName: "base",
                action: baseUrl + "/admin/file/uploadFileName"
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
                })

                // 更新减速机分类
                this.reductionCategoryList = this.oReductionCategoryList.filter((item)=>{
                    return item.language == newVal;
                });
                let curCategory = this.reductionCategoryList.filter((item)=>{
                    return item.id == this.model.reductionCategoryId;
                });
                if(curCategory.length == 0) this.model.reductionCategoryId = ""; // 不在当前品牌中 设置为空
            }
        },

        // beforeRouteUpdate (to, from, next) {
        //     console.log(to, from, next);
        //     this.init && this.init();
        //     next()
        // },

        created() {
            this.$nextTick(()=>{
                this.init();
            })
        },

        activated(){
            this.$nextTick(()=>{
                //this.init();
            })
        },

        methods: {
            async init(){
                console.log(this.$route);
                if(this.$route.params.id){
                    await this.getProperty();
                    await this.getReductionCategory();

                    this.getReduction(this.$route.params.id);
                    if(this.$route.name == "减速机编辑"){
                        this.type = "edit";
                        this.title = "减速机编辑";
                    }
                    if(this.$route.name == "减速机信息"){
                        this.type = "info";
                        this.title = "减速机信息";
                    }
                }else {
                    this.type = "create";
                    this.getProperty();
                    this.getReductionCategory();
                }
            },

            getReduction(id){
                this.showUpload = false;
                this.showBannerUpload = false;
                getReductionById(id).then((res)=>{
                    this.showUpload = true;
                    this.showBannerUpload = true;
                    res = res.data;
                    if(res.code==1){
                        let bannerList = [];
                        try {
                            bannerList = JSON.parse(res.data.banner);
                        }catch (e) {
                        }
                        res.data.bannerList = bannerList;
                        this.model = res.data;
                        // this.$refs.upload && this.$refs.upload.setVal(res.data.img);

                    }
                })
            },

            async getReductionCategory(){
                return getReductionCategoryAll({}).then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.reductionCategoryList = data.data;
                        this.oReductionCategoryList = _.cloneDeep(data.data);
                    }
                });
            },

            async getProperty(fn){
                return getPropertyAll({
                    type: "reduction",
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
                        this.model.banner = JSON.stringify(this.model.bannerList);
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
                addReduction(_.cloneDeep(this.model)).then(res=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.$message({
                            type: 'success',
                            message: '创建成功!'
                        }, 2000);

                        this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前

                        this.$router.push({
                            path: "/reduction/reduction-edit/" + data.data.id
                        });

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        // this.$router.push({
                        //     path: "/reduction/reduction-list",
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
                editReduction(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        }, 2000);

                        this.model.language = ""; // 触发重新初始化语言
                        this.init();

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        // this.$router.push({
                        //     path: "/reduction/reduction-list",
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

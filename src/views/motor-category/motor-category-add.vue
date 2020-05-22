<template>
    <div>
        <basic-block :title="title">
            <div>
                <el-row>
                    <el-col :lg="{span: 12}" :md="{span:16}">
                        <el-form :model="model" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="名称" prop="name">
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
                            <el-form-item label="语言" prop="language">
                                <el-select v-model="model.language" clearable placeholder="请选择">
                                    <el-option v-for="(value, key, index) in LanguageList" :key="index" :label="value" :value="key"></el-option>
                                </el-select>
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
                            <el-form-item v-if="type!='info'">
                                <el-button type="primary" :loading="loading" :disabled="loading" @click="submitForm('ruleForm')">{{type == 'create' ? '立即创建' : '保存'}}</el-button>
                                <el-button v-if="type == 'create'" @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </basic-block>
    </div>
</template>

<script>
    import { getMotorCategoryById, addMotorCategory, editMotorCategory } from "@/api/motorCategory";
    import { LanguageList, StatusList } from "@/const/constData";
    import watchRoute from "@/mixins/watch-route";
    // import Upload from "@/components/jst-components/upload";

    export default {
        name: "motor-category-add",

        components: {
            // Upload,
        },

        mixins: [ watchRoute ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,

                title: "添加电机品牌",
                type: "create", // create 创建 edit 编辑 info 查看
                model: {
                    name: '',
                    type: '',
                    language: '',
                    desc: '',
                    sort: 999999999,
                    active: true,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    language: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                },
                loading: false,
                showUpload: true,
            };
        },

        beforeRouteUpdate (to, from, next) {
            console.log(to, from, next);
            this.init && this.init();
            next()
        },

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
            init(){
                // console.log(this.$route);
                if(this.$route.params.id){
                    this.getMotorCategory(this.$route.params.id);
                    if(this.$route.name == "编辑电机品牌"){
                        this.type = "edit";
                        this.title = "编辑电机品牌";
                    }
                    if(this.$route.name == "电机品牌信息"){
                        this.type = "info";
                        this.title = "电机品牌信息";
                    }
                }else {
                    this.type = "create";
                }
            },

            getMotorCategory(id){
                this.showUpload = false;
                getMotorCategoryById(id).then((res)=>{
                    this.showUpload = true;
                    res = res.data;
                    if(res.code==1){
                        this.model = res.data;
                    }
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
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
                addMotorCategory(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '创建成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/motor-category/motor-category-list",
                        }, (to, from, next)=>{
                            if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                                to.meta.isRefresh = true;
                            }
                        });
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },

            update(){
                // 更新时调用的方法 提交数据给后台
                this.loading = true;
                editMotorCategory(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/motor-category/motor-category-list",
                        }, (to, from, next)=>{
                            if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                                to.meta.isRefresh = true;
                            }
                        });
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

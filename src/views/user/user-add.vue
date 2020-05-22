<template>
    <div>
        <basic-block :title="title">
            <div>
                <el-row>
                    <el-col :lg="{span: 12}" :md="{span:16}">
                        <el-form :model="model" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model.trim="model.username" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password" v-if="!$route.params.id">
                                <el-input v-model.trim="model.password" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model.trim="model.email" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" prop="nick">
                                <el-input v-model.trim="model.nick" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" prop="phone">
                                <el-input v-model.trim="model.phone"  placeholder="请输入"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="头像" prop="avatar">-->
                                <!--<upload v-if="showUpload" ref="upload" v-model="model.avatar" :limit="1"></upload>-->
                            <!--</el-form-item>-->
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="model.sex">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="2">女</el-radio>
                                </el-radio-group>
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
    import { getUserById, insertUser, updateUser } from "@/api/user";
    import { isEmail } from "@/util/validate"
    import watchRoute from "@/mixins/watch-route";
    import Upload from "@/components/jst-components/upload";

    export default {
        name: "user-add",

        components: {
            Upload,
        },

        mixins: [ watchRoute ],

        data(){
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else {
                    if (!isEmail(value)) {
                        callback(new Error('请输入正确的邮箱格式'));
                    }
                    callback();
                }
            };
            return {
                title: "添加用户",
                type: "create", // create 创建 edit 编辑 info 查看
                model: {
                    username: '',
                    email: '',
                    password: '',
                    nick: '',
                    avatar: '',
                    sex: 1,
                    phone: '',
                    active: true,
                    role: "admin"
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码至少六位', trigger: 'blur' }
                    ]
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
                console.log(this.$route);
                if(this.$route.params.id){
                    this.getUser(this.$route.params.id);
                    if(this.$route.name == "编辑用户"){
                        this.type = "edit";
                        this.title = "编辑用户";
                    }
                    if(this.$route.name == "用户信息"){
                        this.type = "info";
                        this.title = "用户信息";
                    }
                }else {
                    this.type = "create";
                }
            },

            getUser(id){
                this.showUpload = false;
                getUserById(id).then((res)=>{
                    this.showUpload = true;
                    res = res.data;
                    if(res.code==1){
                        this.model = res.data;
                        this.$refs.upload && this.$refs.upload.setVal(res.data.avatar);
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
                insertUser(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '创建成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/user/user-list",
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
                updateUser(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/user/user-list",
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

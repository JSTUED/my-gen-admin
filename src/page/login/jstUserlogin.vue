<template>
    <el-form class="login-form"
             status-icon
             :rules="loginRules"
             ref="loginForm"
             :model="loginForm"
             label-width="0">
        <el-form-item prop="username">
            <el-input size="small"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.username"
                      auto-complete="off"
                      :placeholder="$t('login.username')">
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input size="small"
                      @keyup.enter.native="handleLogin"
                      :type="passwordType"
                      v-model="loginForm.password"
                      auto-complete="off"
                      :placeholder="$t('login.password')">
                <i class="el-icon-view el-input__icon"
                   slot="suffix"
                   @click="showPassword"></i>
            </el-input>
        </el-form-item>
        <!--<div class="login-from-flex">-->
            <!--<el-checkbox v-model="checked">{{$t('login.loginAuto')}}</el-checkbox>-->
        <!--</div>-->
        <el-form-item>
            <el-button type="primary"
                       size="small"
                       @click.native.prevent="handleLogin"
                       class="login-submit">{{$t('login.submit')}}</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import { mapGetters } from "vuex";
    import website from '@/config/website';
    import { mapRoutesSource } from "@/util/util";

    export default {
        name: "jstUserlogin",
        data() {
            return {
                checked: true,
                tenantMode: website.tenantMode,
                loginForm: {
                    username: "admin",
                    password: "",
                    type: "account"
                },
                loginRules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "密码", trigger: "blur" },
                        { min: 1, message: "密码长度最少为6位", trigger: "blur" }
                    ]
                },
                passwordType: "password"
            };
        },
        created() {},
        mounted() {},
        computed: {
            ...mapGetters(["tagWel"])
        },
        props: [],
        methods: {
            showPassword() {
                this.passwordType == ""
                    ? (this.passwordType = "password")
                    : (this.passwordType = "");
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        const loading = this.$loading({
                            lock: true,
                            text: '登录中,请稍后。。。',
                            spinner: "el-icon-loading"
                        });
                        this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {

                            this.$router.push({ path: this.tagWel.value });
                            loading.close();

                            // 添加动态路由、
                            this.$store.dispatch('GetRoutes').then((data)=> {
                                let temp = mapRoutesSource(data); // 处理路由
                                this.$router.$avueRouter.addRoutesDynamic(temp); // 添加动态路由
                            }); // 获得系统的路由

                            this.$store.dispatch('GetPermissions'); // 获得Permissions权限 用于判断按钮的权限 其他按钮

                            this.$store.dispatch("GetTopMenu").then(res => {
                                // 处理菜单数据
                                let menus = mapRoutesSource(res); // 处理菜单
                                this.$store.commit('NAV_MENU_LIST', menus);
                                let parentId = res.length>0 ? res[0].id : 0;
                                if(parentId) this.$store.dispatch("GetMenu", parentId); // 更新左侧菜单
                            });


                        }).catch(() => {
                            loading.close()
                        });
                    }
                });
            },
            goPassword(){
                this.$router.push({ path: "/forgetPassword" })
            }
        }
    }
</script>

<style scoped>

</style>

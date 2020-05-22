<template>
    <div class="login-main" @keyup.enter.native="handleLogin" >
        <top-lang></top-lang>
        <div class="login-main__wrap animated bounceInDown">
            <div class="login-border">
                <div class="login-content">
                    <img src="/img/bg/logo_img_orange.png" alt="杰士德">
                    <h4 class="login-title">
                        {{ $t('login.title') }}{{website.title}}
                    </h4>
                    <el-tabs v-model="activeName" :stretch="stretch" :tab-position="tabPosition" class="login-tabs">
                        <el-tab-pane :label="$t('login.typePhone')" name="tel">
                            <el-form class="login-form"
                                     status-icon
                                     :rules="forgetPasswordRulesToPhone"
                                     ref="forgetPasswordFormToPhone"
                                     :model="forgetPasswordToPhone"
                                     label-width="0">
                                <el-form-item prop="phone">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToPhone.phone"
                                              auto-complete="off"
                                              :placeholder="$t('login.phone')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToPhone.code"
                                              auto-complete="off"
                                              :placeholder="$t('login.code')">
                                        <template slot="append">
                                            <span @click="handleSend"
                                                  class="msg-text"
                                                  :class="[{display:msgKey}]">{{msgText}}</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToPhone.password"
                                              type="password"
                                              auto-complete="off"
                                              :placeholder="$t('login.password')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="passwords">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToPhone.passwords"
                                              type="password"
                                              auto-complete="off"
                                              :placeholder="$t('login.passwords')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button size="small"
                                               type="primary"
                                               @click.native.prevent="resetPassword"
                                               class="login-submit">{{$t('login.resetPassword')}}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('login.typeEmail')" name="email">
                            <el-form class="login-form"
                                     status-icon
                                     :rules="forgetPasswordRulesToEmail"
                                     ref="forgetPasswordRulesToEmail"
                                     :model="forgetPasswordToEmail"
                                     label-width="0">
                                <el-form-item prop="email">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToEmail.email"
                                              auto-complete="off"
                                              :placeholder="$t('login.email')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToEmail.code"
                                              auto-complete="off"
                                              :placeholder="$t('login.code')">
                                        <template slot="append">
                                            <span @click="handleSend"
                                                  class="msg-text"
                                                  :class="[{display:msgKey}]">{{msgText}}</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToEmail.password"
                                              type="password"
                                              auto-complete="off"
                                              :placeholder="$t('login.password')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="passwords">
                                    <el-input size="small"
                                              @keyup.enter.native="resetPassword"
                                              v-model="forgetPasswordToEmail.passwords"
                                              type="password"
                                              auto-complete="off"
                                              :placeholder="$t('login.passwords')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button size="small"
                                               type="primary"
                                               @click.native.prevent="resetPassword"
                                               class="login-submit">{{$t('login.resetPassword')}}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                    <div class="login-back" @click="goBack()">
                        <i class="el-icon-back"></i><span>返回</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { isvalidatemobile } from "@/util/validate";
    import topLang from "@/page/index/top/top-lang";

    export default {
        name: "forgetPassword",
        components:{
            topLang,
        },

        data(){
            const validatePhone = (rule, value, callback) => {
                if (isvalidatemobile(value)[0]) {
                    callback(new Error(isvalidatemobile(value)[1]));
                } else {
                    callback();
                }
            };
            const validateCode = (rule, value, callback) => {
                if (value.length != 4) {
                    callback(new Error("请输入4位数的验证码"));
                } else {
                    callback();
                }
            };
            const validatePassTypePhone = (rule, value, callback) => {
                if( value === ''){
                    callback(new Error('请输入密码'));
                }else{
                    if (this.forgetPasswordToPhone.passwords !== '') {
                        this.$refs.forgetPasswordToPhone.validateField('passwords');
                    }
                    callback();
                }
            };
            const validatePassTypePhone2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.forgetPasswordToPhone.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validatePassTypeEmail = (rule, value, callback) => {
                if( value === ''){
                    callback(new Error('请输入密码'));
                }else{
                    if (this.forgetPasswordToEmail.passwords !== '') {
                        this.$refs.forgetPasswordToEmail.validateField('passwords');
                    }
                    callback();
                }
            };
            const validatePassTypeEmail2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.forgetPasswordToEmail.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return{
                activeName: 'tel',
                stretch: true,
                tabPosition: 'bottom',
                msgText: "",
                msgTime: "",
                msgKey: false,
                forgetPasswordToPhone: {
                    phone: "",
                    code: "",
                    password: "",
                    passwords: ""
                },
                forgetPasswordToEmail: {
                    email: "",
                    code: "",
                    password: "",
                    passwords: ""
                },
                forgetPasswordRulesToPhone: {
                    phone: [{ required: true, trigger: "blur", validator: validatePhone }],
                    code: [{ required: true, trigger: "blur", validator: validateCode }],
                    password: [{ validator: validatePassTypePhone, trigger: 'blur' }],
                    passwords: [{ validator: validatePassTypePhone2, trigger: 'blur' }],
                },
                forgetPasswordRulesToEmail: {
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ],
                    code: [{ required: true, trigger: "blur", validator: validateCode }],
                    password: [{ validator: validatePassTypeEmail, trigger: 'blur' }],
                    passwords: [{ validator: validatePassTypeEmail2, trigger: 'blur' }],
                }
            }
        },
        created() {
            this.msgText = this.config.MSGINIT;
            this.msgTime = this.config.MSGTIME;
        },
        computed: {
            ...mapGetters(["website","tagWel"]),
            config() {
                return {
                    MSGINIT: this.$t("login.msgText"),
                    MSGSCUCCESS: this.$t("login.msgSuccess"),
                    MSGTIME: 60
                };
            }
        },
        methods: {
            goBack(){
                this.$router.push({ path: "/index" })
            },

            handleSend() {
                if (this.msgKey) return;
                this.msgText = this.msgTime + this.config.MSGSCUCCESS;
                this.msgKey = true;
                const time = setInterval(() => {
                    this.msgTime--;
                    this.msgText = this.msgTime + this.config.MSGSCUCCESS;
                    if (this.msgTime == 0) {
                        this.msgTime = this.config.MSGTIME;
                        this.msgText = this.config.MSGINIT;
                        this.msgKey = false;
                        clearInterval(time);
                    }
                }, 1000);
            },

            resetPassword() {
                this.goBack();
            },

        }

    }
</script>

<style lang="scss">
    @import "@/styles/jst-login.scss";
</style>

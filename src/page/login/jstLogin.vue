<template>

    <div class="login-main" @keyup.enter.native="handleLogin" >
        <div class="login-main__wrap animated bounceInDown">
            <div class="login-border">
                <div class="login-content">
                    <img src="img/bg/logo_img_orange.png" alt="杰士德">
                    <h4 class="login-title">
                        {{website.title}}
                    </h4>
                    <jstUserlogin v-if="activeName==='user'"></jstUserlogin>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
import { validatenull } from "@/util/validate";
import jstUserlogin from "./jstUserlogin";

export default {
    name: "jstLogin",
    components: {
        jstUserlogin
    },
    data() {
        return {
            activeName: "user",
        };
    },
    watch: {
        $route() {
            const params = this.$route.query;
            this.socialForm.state = params.state;
            this.socialForm.code = params.code;
            if (!validatenull(this.socialForm.state)) {
                const loading = this.$loading({
                    lock: true,
                    text: `${
                        this.socialForm.state === "WX" ? "微信" : "QQ"
                        }登录中,请稍后。。。`,
                    spinner: "el-icon-loading"
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }
    },
    created() {
        this.getTime();
        setInterval(() => {
            this.getTime();
        }, 1000);
    },
    mounted() {},
    computed: {
        ...mapGetters(["website"])
    },
    props: [],
    methods: {
        getTime() {
            this.time = dateFormat(new Date());
        },
        setActive(){

        }
    }

}
</script>

<style lang="scss">
    @import "@/styles/jst-login.scss";
</style>

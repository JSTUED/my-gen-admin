<template>
    <div class="avue-contail"
         :class="{'avue--collapse':isCollapse}">
        <div class="avue-header">
            <!-- 顶部导航栏 -->
            <top />
            <!-- 顶部标签卡 -->
            <tags />
        </div>

        <div class="avue-layout">
            <div class="avue-left">
                <!-- 左侧导航栏 -->
                <sidebar />
            </div>
            <div class="avue-main">
                <!-- 路由视图 -->
                <router-view class="avue-view" />
            </div>
        </div>
        <div class="avue-shade"
             @click="showCollapse"></div>

        <scroll-top></scroll-top>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import tags from "./tags";
    import top from "./top/";
    import sidebar from "./sidebar/";
    import admin from "@/util/admin";
    import scrollTop from '@/components/jst-components/scroll-top';

    // import { validatenull } from "@/util/validate";
    // import { calcDate } from "@/util/date.js";
    // import { getStore } from "@/util/store.js";
    export default {
        components: {
            top,
            tags,
            sidebar,
            scrollTop
        },
        name: "index",
        data() {
            return {
                //刷新token锁
                refreshLock: false,
                //刷新token的时间
                refreshTime: "",
            };
        },
        created() {
            //实时检测刷新token
            this.refreshToken();
        },
        mounted() {
            this.init();
        },
        computed: mapGetters(["isLock", "isCollapse", "website", "exclude", "include"]),
        props: [],
        methods: {
            showCollapse() {
                this.$store.commit("SET_COLLAPSE");
            },
            // 屏幕检测
            init() {
                this.$store.commit("SET_SCREEN", admin.getScreen());
                window.onresize = () => {
                    setTimeout(() => {
                        this.$store.commit("SET_SCREEN", admin.getScreen());
                    }, 0);
                };
            },
            // 10分钟检测一次token
            refreshToken() {
                /*this.refreshTime = setInterval(() => {
                  const token = getStore({
                    name: "token",
                    debug: true
                  });
                  const date = calcDate(token.datetime, new Date().getTime());
                  if (validatenull(date)) return;
                  if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
                    this.refreshLock = true;
                    this.$store
                      .dispatch("RefeshToken")
                      .then(() => {
                        this.refreshLock = false;
                      })
                      .catch(() => {
                        this.refreshLock = false;
                      });
                  }
                }, 10000);*/
            }
        }
    };
</script>

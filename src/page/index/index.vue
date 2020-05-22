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
                <!-- 主体视图层 不使用el-scrollbar 使用后检测window scroll 事件存在问题 :exclude="exclude" $route.matched.length<=2 考虑到路由组件嵌套 -->
                <div>
                    <keep-alive :exclude="exclude">
                        <router-view class="avue-view" v-if="$route.meta.keepAlive" />
                    </keep-alive>
                    <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
                </div>
                <!--<div>-->
                    <!--<keep-alive :exclude="exclude">-->
                        <!--<router-view class="avue-view" v-if="$route.meta.keepAlive && $route.matched.length<=2" />-->
                    <!--</keep-alive>-->
                    <!--<router-view class="avue-view" v-if="!$route.meta.keepAlive || $route.matched.length>2" />-->
                <!--</div>-->
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
                exclude: [],
                keepAlive: true,
                includes: [],
            };
        },
        created() {
            //实时检测刷新token
            this.refreshToken();
        },
        mounted() {
            this.init();
        },
        computed: mapGetters(["isLock", "isCollapse", "website"]),
        props: [],
        // watch: {
        //   $route: {
        //       handler(val,oldval){
        //           // console.log(val);
        //           // console.log(val.meta.isRefresh);
        //
        //           // 指定刷新且组件初始值是缓存的
        //           if(val.matched.length<=2 && val.meta.isRefresh == true && val.meta.keepAlive==true){
        //               val.meta.keepAlive = false;// 切换到不缓存形式
        //               this.exclude = [val.meta.component];// 动态销毁已缓存的组件
        //               // console.log(this.exclude);
        //               setTimeout(()=>{
        //                   val.meta.keepAlive = true; // 切换到缓存状态
        //                   this.exclude = []; // 将组件加入缓存
        //                   val.meta.isRefresh = false; // 还原刷新状态
        //               }, 0);
        //           }
        //       },
        //       deep: true
        //   }
        // },
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

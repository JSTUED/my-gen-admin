<template>
    <div class="menu-wrapper">
        <template v-for="item in menu">
            <el-menu-item v-if="validatenull(item.children) && vaildRoles(item)"
                          :index="item.path"
                          @click="open(item)"
                          :key="item.label"
                          :class="{'is-active':vaildAvtive(item)}">
                <i :class="item.icon"></i>
                <span slot="title"
                      :alt="item.path">{{generateTitle(item)}}</span>
            </el-menu-item>
            <el-submenu v-else-if="!validatenull(item.children)&&vaildRoles(item)"
                        :index="item.path"
                        :key="item.label">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title"
                          :class="{'el-menu--display':collapse && first}">{{generateTitle(item)}}</span>
                </template>
                <template v-for="(child,cindex) in item.children">
                    <!--:index="child.path,cindex"-->
                    <el-menu-item :index="child.path"
                                  @click="open(child)"
                                  :class="{'is-active':vaildAvtive(child)}"
                                  v-if="validatenull(child.children)"
                                  :key="child.label">
                        <!--<i :class="child.icon"></i>-->
                        <span slot="title" style="margin-left: 10px">{{generateTitle(child)}}</span>
                    </el-menu-item>
                    <sidebar-item v-else
                                  :menu="[child]"
                                  :key="cindex"
                                  :props="props"
                                  :screen="screen"
                                  :collapse="collapse"></sidebar-item>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { validatenull } from "@/util/validate";
    import config from "./config.js";
    export default {
        name: "sidebarItem",
        data() {
            return {
                config: config
            };
        },
        props: {
            menu: {
                type: Array
            },
            screen: {
                type: Number
            },
            first: {
                type: Boolean,
                default: false
            },
            props: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            collapse: {
                type: Boolean
            }
        },
        created() {

        },
        mounted() {},
        computed: {
            ...mapGetters(["roles"]),
            nowTagValue() {
                // console.log(this.$router.$avueRouter.getValue(this.$route));
                return this.$router.$avueRouter.getValue(this.$route);
            }
        },
        methods: {
            generateTitle(item) {
                return this.$router.$avueRouter.generateTitle(
                    item.label,
                    (item.meta || {}).i18n
                );
            },
            vaildAvtive(item) {
                const groupFlag = (item["group"] || []).some(ele =>
                    this.$route.path.includes(ele)
                );
                return this.nowTagValue === item.path || groupFlag;
            },
            vaildRoles(item) {
                item.meta = item.meta || {};
                return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
            },
            validatenull(val) {
                return validatenull(val);
            },
            open(item) {
                if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
                this.$router.$avueRouter.group = item.group;
                this.$router.$avueRouter.meta = item.meta;

                //console.log(item);

                // this.$router.push({
                //     path: this.$router.$avueRouter.getPath({
                //         src: item.path,
                //         name: item.label,
                //         i18n: (item.meta || {}).i18n
                //     }),
                //     query: item.query
                // })
                // console.log(item);

                if(item.meta && item.meta.target){
                    window.open(item.path, item.meta.target);
                    return false;
                }

                this.$router.push({
                    path: this.$router.$avueRouter.getPath({
                        src: item.path,
                        name: item.name,
                        i18n: (item.meta || {}).i18n
                    }),
                    query: item.query
                },(to, from, next)=>{
                    if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                        to.meta.isRefresh = true;
                    }
                })
            }
        }
    };
</script>


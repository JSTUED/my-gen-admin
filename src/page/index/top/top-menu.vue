<template>
    <div class="top-menu">
        <el-menu :default-active="activeIndex"
                 mode="horizontal"
                 text-color="#000"
                 active-text-color="#f08f00">
            <!--v-for="(item,index) in items"-->
            <template v-for="(item,index) in navMenuList">
                <el-menu-item v-if="index<showCount" :index="item.id+''"
                              @click.native="openMenu(item)"
                              :key="index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{generateTitle(item)}}</span>
                    </template>
                </el-menu-item>
            </template>

            <el-submenu class="top-menu-drop-sub"  index="drop" v-if="navMenuList.length > showCount" popper-class="top-more-menu">
                <template slot="title">{{ language == 'zh' ? '更多菜单' : 'More'}}</template>
                <el-menu-item class="top-menu-drop" v-for="(item,index) in navMenuList" v-if="index>=showCount" :index="item.id+''"
                              @click.native="openMenu(item)"
                              :key="index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{generateTitle(item)}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { mapRoutesSource } from "@/util/util";
    import admin from "@/util/admin";

    // console.log(admin.getScreen());
    export default {
        name: "top-menu",
        data() {
            let showCountList = [2, 3, 3, 8]; // 索引index, 0: 超小屏幕 1: 小屏幕 2: 中屏幕 3: 大屏幕
            let showCount = showCountList[admin.getScreen()];
            return {
                activeIndex: "0",
                items: [],
                showCount: showCount
            };
        },
        computed: {
            ...mapGetters(["tagCurrent", "menu", "navMenuList", "language"])
        },
        created() {
            this.$nextTick(()=>{
                //this.items = this.navMenuList;
                this.getCurrentMenu();
            })
        },
        watch: {
            "$route": function (newVal, oldVal) {
                this.getCurrentMenu();
            }
        },

        methods: {
            getCurrentMenu(){
                // console.log(this.$router.$avueRouter.routerList, this.$route.fullPath);
                let pRoute = this.findParentRoute(this.$router.$avueRouter.routerList, this.$route.fullPath);
                if(pRoute){
                    let cItem = this.navMenuList.filter(function (o) {
                        return o.id == pRoute.id;
                    });
                    if(cItem.length>0){
                        this.activeIndex = cItem[0].id + '';
                        this.$store.dispatch("GetMenu", cItem[0].id)
                    }
                }
            },
            findParentRoute(menu, path){
                let itemActive = null;
                let firstItem = null;
                menu.forEach(function (cate, pItem) {
                    // 递归寻找当前页面的一级菜单
                    function findItem(data, path, pItem) {
                        data.forEach(function (item, i) {
                            if(item.children && item.children.length>0){
                                findItem(item.children, path, pItem);
                            }else {
                                // console.log(item, path);
                                if(item.path == path){
                                    itemActive = item;
                                    firstItem = pItem
                                }
                            }
                        });
                    }

                    if(cate.children && cate.children.length>0){
                        findItem(cate.children, path, cate);
                    }else {
                        if(cate.path == path){
                            itemActive = cate;
                            firstItem = cate;
                        }
                    }

                });

                // console.log(firstItem);
                // console.log(itemActive);
                return firstItem;
            },

            generateTitle(item) {
                return this.$router.$avueRouter.generateTitle(
                    item.label,
                    (item.meta || {}).i18n
                );
            },
            openMenu(item) {
                this.$store.dispatch("GetMenu", item.id).then(data => {
                    let itemActive;
                    // 递归寻找要打开的子页面
                    function findItem(data) {
                        if(data && data.length != 0){
                            if(data[0].children && data[0].children.length>0){
                                findItem(data[0].children);
                            }else {
                                if(data[0].path){
                                    itemActive = data[0];
                                }
                            }

                        }
                    }


                    findItem(data);
                    if(!itemActive) return false;

                    this.$router.push({
                        path: this.$router.$avueRouter.getPath({
                            name: itemActive.name,
                            src: itemActive.path,
                            i18n: (itemActive.meta || {}).i18n
                        })
                    });
                });
            }
        }
    };
</script>



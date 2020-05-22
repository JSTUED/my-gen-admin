<template>
    <div class="avue-tags"
         v-if="showTag">
        <!-- tag盒子 -->
        <div v-if="contextmenuFlag"
             class="avue-tags__contentmenu"
             :style="{left:contentmenuX+'px',top:contentmenuY+'px'}">
            <div class="item"
                 @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</div>
            <div class="item"
                 @click="closeAllTags">{{$t('tagsView.closeAll')}}</div>
        </div>
        <div class="avue-tags__box"
             :class="{'avue-tags__box--close':!website.isFirstPage}">
            <el-tabs v-model="active"
                     ref="tagTab"
                     type="card"
                     @contextmenu.native="handleContextmenu"
                     :closable="tagLen!==1"
                     @tab-click="openTag"
                     @edit="menuTag">
                <el-tab-pane :key="item.value"
                             v-for="(item, index) in tagList"
                             :label="generateTitle(item)"
                             :name="item.value">
                    <span v-if="index==0" slot="label"><i class="iconfont icon-home" style="color: #4a5c6a;"></i>&nbsp;{{generateTitle(item)}}</span>
                </el-tab-pane>

            </el-tabs>
            <el-dropdown class="avue-tags__menu">
                <el-button type="text"
                           size="mini">
                    <!--{{$t('tagsView.menu')}}-->
                    <i class="el-icon-arrow-down el-icon--right" style=""></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="padding: 0">
                    <el-dropdown-item @click.native="closeCurrent">{{$t('tagsView.closeCurrent')}}</el-dropdown-item>
                    <el-dropdown-item @click.native="closeOthersTags">{{$t('tagsView.closeOthers')}}</el-dropdown-item>
                    <el-dropdown-item @click.native="closeAllTags">{{$t('tagsView.closeAll')}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>
<script>
    import { mapGetters, mapState } from "vuex";
    export default {
        name: "tags",
        data() {
            return {
                active: "",
                contentmenuX: "",
                contentmenuY: "",
                contextmenuFlag: false
            };
        },

        mounted() {
            this.setActive();
        },
        watch: {
            tag() {
                this.setActive();
            },
            contextmenuFlag() {
                window.addEventListener("mousedown", this.watchContextmenu);
            }
        },
        computed: {
            ...mapGetters(["tagWel", "tagList", "tag", "website", "include"]),
            ...mapState({
                showTag: state => state.common.showTag
            }),
            tagLen() {
                return this.tagList.length || 0;
            }
        },

        created(){
          this.$nextTick(function () {
              // console.log(this.tagList);
              // console.log(this.$route);
          })
        },

        methods: {
            generateTitle(item) {
                return this.$router.$avueRouter.generateTitle(
                    item.label,
                    (item.meta || {}).i18n
                );
            },
            watchContextmenu(event) {
                if (!this.$el.contains(event.target) || event.button !== 0) {
                    this.contextmenuFlag = false;
                }
                window.removeEventListener("mousedown", this.watchContextmenu);
            },
            handleContextmenu(event) {
                let target = event.target;
                // 解决 https://github.com/d2-projects/d2-admin/issues/54
                let flag = false;
                if (target.className.indexOf("el-tabs__item") > -1) flag = true;
                else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
                    target = target.parentNode;
                    flag = true;
                }
                if (flag) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.contentmenuX = event.clientX;
                    this.contentmenuY = event.clientY;
                    this.tagName = target.getAttribute("aria-controls").slice(5);
                    this.contextmenuFlag = true;
                }
            },
            //激活当前选项
            setActive() {
                this.active = this.tag.value;
            },
            menuTag(value, action) {
                console.log(value);
                console.log(action);

                if (action === "remove") {
                    let { tag, key } = this.findTag(value);
                    console.log(tag);
                    this.$store.commit("DEL_TAG", tag);

                    // 关闭时清除缓存组件 (针对 add 创建组件)
                    // if(tag.meta.component.endsWith("-add")){
                    //     this.$store.commit("SET_EXCLUDE", [tag.meta.component]);
                    //     setTimeout(()=>{
                    //         this.$store.commit("SET_EXCLUDE", []);
                    //     }, 100);
                    // }

                    // 关闭时缓存处理
                    if (tag.meta && tag.meta.component){
                        let include = this.include.filter((item)=>{
                            return item != tag.meta.component;
                        });
                        this.$store.commit("SET_INCLUDE", include);
                    }

                    //console.log(this.$root);

                    if (tag.value === this.tag.value) {
                        tag = this.tagList[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
                        this.openTag(tag);
                    }
                }
            },
            openTag(item) {
                let tag;
                if (item.name) {
                    tag = this.findTag(item.name).tag;
                } else {
                    tag = item;
                }
                this.$router.push({
                    path: this.$router.$avueRouter.getPath({
                        name: tag.label,
                        src: tag.value,
                        i18n: tag.meta.i18n
                    }),
                    query: tag.query
                });
            },
            closeOthersTags() {
                this.contextmenuFlag = false;
                this.$store.commit("DEL_TAG_OTHER");

                // 关闭时缓存处理
                let { tag, key } = this.findTag(this.$route.fullPath);
                if (tag.meta && tag.meta.component){
                    this.$store.commit("SET_INCLUDE", ['wel', tag.meta.component]);
                }

            },

            closeCurrent() {
                if(this.$route.fullPath.toLowerCase() == "/wel/index"){
                    console.log("首页不能关闭");
                    return false;
                }
                this.menuTag(this.$route.fullPath, 'remove');

            },

            findTag(value) {
                let tag, key;
                this.tagList.map((item, index) => {
                    if (item.value === value) {
                        tag = item;
                        key = index;
                    }
                });
                return { tag: tag, key: key };
            },
            closeAllTags() {
                this.contextmenuFlag = false;
                this.$store.commit("DEL_ALL_TAG");
                this.$router.push({
                    path: this.$router.$avueRouter.getPath({
                        src: this.tagWel.value
                    }),
                    query: this.tagWel.query
                });

                this.$store.commit("SET_INCLUDE", ['wel']);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .avue-tags{
        .avue-tags__contentmenu{
            display: none;
        }
    }
    .avue-tags__menu{
        height: 40px;
        line-height: 40px;
        top: -1px;
        right: -10px;
        border-left: 1px solid #e9ebea;
        &:hover{
            background-color: #e9ebea;
        }
        .el-button{
            padding: 0 15px 0 0;
            >i{
                color: #000;
                margin: 0;
            }
        }
    }
    .el-dropdown-menu{
        padding: 0;
        .el-dropdown-menu__item:focus,
        .el-dropdown-menu__item:not(.is-disabled):hover {
            color: #000;
            background-color: #e9ebea;
        }
    }
</style>

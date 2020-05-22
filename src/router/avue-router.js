import PageRouter from '@/router/page/';
import ViewsRouter from '@/router/views/';

let RouterPlugin = function () {
    this.$router = null;
    this.$store = null;

};
RouterPlugin.install = function (vue, router, store, i18n) {
    this.$router = router;
    this.$store = store;
    this.$vue = new vue({ i18n });
    function isURL(s) {
        return /^http[s]?:\/\/.*/.test(s)
    }
    function objToform(obj) {
        let result = [];
        Object.keys(obj).forEach(ele => {
            result.push(`${ele}=${obj[ele]}`);
        })
        return result.join('&');
    }
    this.$router.$avueRouter = {
        //全局配置
        $website: this.$store.getters.website,
        routerList: [],
        group: '',
        meta: {},
        safe: this,
        // 设置标题
        setTitle: (title) => {
            const defaultTitle = this.$vue.$t('title');
            title = title ? `${title}-${defaultTitle}` : defaultTitle;
            document.title = title;
        },
        closeTag: (value) => {
            let tag = value || this.$store.getters.tag;
            if (typeof value === 'string') {
                tag = this.$store.getters.tagList.filter(ele => ele.value === value)[0]
            }
            this.$store.commit('DEL_TAG', tag)
        },
        generateTitle: (title, key) => {
            if (!key) return title;
            const hasKey = this.$vue.$te('route.' + key)
            // console.log(hasKey, key);
            if (hasKey) {
                // $t :this method from vue-i18n, inject in @/lang/index.js
                const translatedTitle = this.$vue.$t('route.' + key)

                return translatedTitle
            }
            return title
        },
        //处理路由
        getPath: function (params) {
            let { src } = params;
            let result = src || '/';
            if (src.includes("http") || src.includes("https")) {
                result = `/myiframe/urlPath?${objToform(params)}`;
            }
            return result;
        },
        //正则处理路由
        vaildPath: function (list, path) {
            let result = false;
            list.forEach(ele => {
                if (new RegExp("^" + ele + ".*", "g").test(path)) {
                    result = true
                }

            })
            return result;
        },
        //设置路由值
        getValue: function (route) {
            let value = "";
            if (route.query.src) {
                value = route.query.src;
            } else {
                value = route.path;
            }
            return value;
        },
        //动态路由
        // formatRoutes: function (aMenu = [], first) {
        //     const aRouter = []
        //     const propsConfig = this.$website.menu.props;
        //     const propsDefault = {
        //         label: propsConfig.label || 'name',
        //         path: propsConfig.path || 'path',
        //         icon: propsConfig.icon || 'icon',
        //         children: propsConfig.children || 'children',
        //         meta: propsConfig.meta || 'meta',
        //     }
        //     if (aMenu.length === 0) return;
        //     for (let i = 0; i < aMenu.length; i++) {
        //         const oMenu = aMenu[i];
        //         if (this.routerList.includes(oMenu[propsDefault.path])) return;
        //         const path = (() => {
        //             if (first) {
        //                 return oMenu[propsDefault.path].replace('/index', '')
        //             } else {
        //                 return oMenu[propsDefault.path]
        //             }
        //         })(),
        //             //特殊处理组件
        //             component = 'views' + oMenu.path,
        //             name = oMenu[propsDefault.label],
        //             icon = oMenu[propsDefault.icon],
        //             children = oMenu[propsDefault.children],
        //             meta = oMenu[propsDefault.meta] || {};
        //
        //         const isChild = children.length !== 0;
        //         const oRouter = {
        //             path: path,
        //             component(resolve) {
        //                 // 判断是否为首路由
        //                 if (first) {
        //                     require(['../page/index'], resolve)
        //                     return
        //                     // 判断是否为多层路由
        //                 } else if (isChild && !first) {
        //                     require(['../page/index/layout'], resolve)
        //                     return
        //                     // 判断是否为最终的页面视图
        //                 } else {
        //                     require([`../${component}.vue`], resolve)
        //                 }
        //             },
        //             name: name,
        //             icon: icon,
        //             meta: meta,
        //             redirect: (() => {
        //                 if (!isChild && first && !isURL(path)) return `${path}/index`
        //                 else return '';
        //             })(),
        //             // 处理是否为一级路由
        //             children: !isChild ? (() => {
        //                 if (first) {
        //                     if (!isURL(path)) oMenu[propsDefault.path] = `${path}/index`;
        //                     console.log(component);
        //                     return [{
        //                         component(resolve) { require([`../${component}.vue`], resolve) },
        //                         icon: icon,
        //                         name: name,
        //                         meta: meta,
        //                         path: 'index'
        //                     }]
        //                 }
        //                 return [];
        //             })() : (() => {
        //                 return this.formatRoutes(children, false)
        //             })()
        //         }
        //
        //         aRouter.push(oRouter)
        //     }
        //     if (first) {
        //         if (!this.routerList.includes(aRouter[0][propsDefault.path])) {
        //             this.safe.$router.addRoutes(aRouter)
        //             this.routerList.push(aRouter[0][propsDefault.path])
        //         }
        //     } else {
        //         console.log(aRouter);
        //         return aRouter
        //     }
        //
        // },
        //动态添加路由
        addRoutesDynamic: function (aMenu = [], local){
            if(!aMenu || aMenu.length==0) return [];
            function extendNav(menu, isFirst=true){
                /*
                * vue-router path 注意是绝对路径 要以/开头 否则为相对路径 路由访问路径会自动拼接父级的path 这是一个坑 需要注意
                * */
                // let data = _.cloneDeep(menu);
                let data = menu.map((item, index)=>{
                    if(local){
                        // 处理的是本地缓存的数据 component 没有存储起来 放在orgin_component中
                        item.component = item.orgin_component;
                    }else {
                        // 第一次的时候备份 component
                        item.orgin_component = item.component;
                    }

                    let component = "";
                    if(item.component){
                        component = item.component.endsWith(".vue") ? item.component : (item.component ? item.component + ".vue" : "");
                        component = component.startsWith("/") ? component : "/" + component;
                    }

                    /*
                    * 这里有疑问 对name不进行赋值，渲染后的路由没有name值 很奇怪
                    * 但将label的值赋值给name，渲染后的路由name有值
                    * */
                    item.name = item.label; //路由的name 也是tag导航的标识
                    item.meta = item.meta || {};
                    if(component){
                        // 存储组件名称 销毁keepalive缓存时使用
                        let componentSplit = component.split("/");
                        let componentStr = componentSplit[componentSplit.length-1].split(".")[0];
                        item.meta.component = componentStr;
                    }

                    item.component = function (resolve) {
                        if(isFirst){
                            // 加载layout
                            return  require(['@/page/index/index.vue'], resolve);
                        }

                        // if(item.children) {
                        //     // 存在子路由 使用layout
                        //     // return  require(['@/page/index/index.vue'], resolve);
                        // }

                        if(!item.orgin_component){
                            // 多级空组件 嵌套一层空模板
                            return require(['@/page/index/layout'], resolve)
                        }

                        // 最终路由 最终渲染
                        return require([`@/views${component}`], resolve);
                    };

                    if(item.children){
                        item.children = extendNav(item.children, false);
                    }

                    return item;
                });

                return data;
            }

            let routes = extendNav(aMenu);
            console.log(routes);
            this.safe.$router.addRoutes(routes); // 动态添加路由 与page和view中的一起添加
            this.routerList = [...this.routerList, ...routes];
            return routes;
        }

    }
}
export default RouterPlugin;

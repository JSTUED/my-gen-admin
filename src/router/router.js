/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import VueRouter from 'vue-router';
import PageRouter from './page/'
import ViewsRouter from './views/'
import jstRoutes from './jstRoutes'
import AvueRouter from './avue-router';
import Vue from 'vue';
import i18n from '@/lang' // Internationalization
import Store from '../store/';

// Vue.use(VueRouter);

let Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes: []
});
AvueRouter.install(Vue, Router, Store, i18n);
// console.log(Store.state.user, "xxx");
Router.addRoutes(PageRouter);
Router.$avueRouter.addRoutesDynamic(Store.state.user.routes); // 刷新时添加路由
Router.addRoutes(ViewsRouter)
// Router.addRoutes(jstRoutes) 菜单兼路由 改为动态加载
export default Router;

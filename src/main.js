import Vue from 'vue';
import request from './router/request';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import store from './store';

import * as urls from '@/config/env';
import Element from 'element-ui';

import i18n from './lang' // Internationalization

import '@/util/vxe-table'




import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
    componentPrefix: 'v',
});

import '@/mock/index.js'


import * as filters from './filters' // 全局过滤器
// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});


import installDirective from '@/directive'; // 全局指令
installDirective(Vue); // 注册全局指令


import './styles/common.scss'; // 放到下面 防止干扰

Vue.use(router)
Vue.use(VueAxios, request)
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value),
    size: 'small' // set element-ui default size
})


import basicContainer from './components/basic-container/main'
import basicBlock from './components/basic-block/basic-block'
import searchBox from "./components/template/search-box";
import basicArea from ".//components/basic-block/basic-area";

//注册全局容器
Vue.component('basicContainer', basicContainer);
Vue.component('basic-block', basicBlock);
Vue.component('search-box', searchBox);
Vue.component('basic-area', basicArea);

// 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
});



// 关闭当前路由及tag
Vue.prototype.closeCurrentTag = function(){
    this.$root.$children[0].$children[0].$children[1].menuTag(this.$route.fullPath, 'remove');
};

// 设置全局的一些参数
// 表格的高度
import { getTableHeight } from "@/util/common";
Vue.prototype.tableHeight = getTableHeight();

Vue.config.productionTip = false;
Vue.config.devtools = true;


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

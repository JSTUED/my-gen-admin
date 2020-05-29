/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from '@/router/router'
import {serialize} from '@/util/util'
import {getToken} from '@/util/auth'
import {Message} from 'element-ui'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {Base64} from 'js-base64';

const request = axios.create({});


//配置请求根路径
request.defaults.timeout = 1000 * 60;

//返回其他状态吗
request.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
request.defaults.withCredentials = false;


// NProgress Configuration
NProgress.configure({
    showSpinner: false
});

//HTTPrequest拦截
request.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;

    if (getToken() && !isToken) {
        config.headers['X-Token'] = getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
        config.data = serialize(config.data);
    }

    return config
}, error => {
    return Promise.reject(error)
});



//HTTPresponse拦截
request.interceptors.response.use(res => {
    NProgress.done();
    const status = res.data.code;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg || '未知错误';
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);

    // 如果请求为非200否者默认统一处理
    if (status !== 1) {
        Message({
            message: message,
            type: 'error'
        });
        // 未登录 或登录超时
        if (status === 0) {
            store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));
        }
        return Promise.reject(message)
    }
    return res;
}, error => {
    NProgress.done();
    console.log(error);
    return Promise.reject(error);
});

export default request;

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
import { Message, Notification } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

let request = axios.create({});

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
    const meta = config.meta || {};

    if (getToken()) {
        config.headers['token'] = getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
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
    const message = res.data.message;
    const isError = res.data.isError;
    const validationErrors = res.data.validationErrors;

    if (status != 200){
        Message({
            message: message || '未知错误',
            type: 'error'
        });
        // 10004 用户已禁用, 10005 用户未登录 10001 账号不存在
        if(status == 10005 || status == 10004 || status == 10001){
            store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));
        }
        return Promise.reject(message)
    }

    if (isError && message){
        Message({
            message: message || '未知错误',
            type: 'error'
        });
    }

    if(isError && validationErrors && Array.isArray(validationErrors)){
        let errors = validationErrors.map((item)=>{
            return `${item.field}：${item.message}`
        });
        Notification({
            type: "error",
            title: '提示',
            dangerouslyUseHTMLString: true,
            duration: 4500,
            message: errors.join("<br />")
        });
    }
    console.log(res);
    return res;
}, error => {
    NProgress.done();
    console.log(error);
    return Promise.reject(error);
});

export default request;

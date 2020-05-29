// 配置编译环境和线上环境之间的切换

let baseUrl = '';
const env = process.env
if (env.NODE_ENV == 'development') {
    // baseUrl = `http://172.16.4.68:10010`; // 开发环境地址
    baseUrl = `http://admin.tsuntien.com/tsuntien_api`; // 开发环境地址
} else {
    baseUrl = `${window.location.origin}/tsuntien_api`; //生产环境地址
}

export {
    baseUrl,
    env
}

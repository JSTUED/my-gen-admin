module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        sourceMap: true
    },
    chainWebpack: (config) => {
        //忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
        });
        const entry = config.entry('app')
        entry
            .add('babel-polyfill')
            .end()
        entry
            .add('classlist-polyfill')
            .end()
        // entry
        //     .add('@/mock')
        //     .end()
    },
    devServer: {
        // 端口配置
        port: 10011,
        // 反向代理配置
        proxy: {
            '/api': {
                target: 'http://localhost',
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/element': {
                target: 'https://element.eleme.cn/#/zh-CN',
                ws: true,
                pathRewrite: {
                    '^/element': '/'
                }
            }
        },
    }
}

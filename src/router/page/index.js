import Layout from '@/page/index/'
export default [{
    path: '/login',
    name: '登录页',
    component: () =>
        import( /* webpackChunkName: "page" */ '@/page/login/jstLogin'),
    //import( /* webpackChunkName: "page" */ '@/page/login/index'),
    meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false,
        component: "jstLogin", // 需要写上组件的name属性
    }
},
    {
        path: '/forgetPassword',
        name: '忘记密码',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/page/login/forgetPassword'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "forgetPassword", // 需要写上组件的name属性
        }
    },
    {
        path: '/lock',
        name: '锁屏页',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/page/lock/index'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "lock", // 需要写上组件的name属性
        }
    },
    {
        path: '/404',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
        name: '404',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "error-404", // 需要写上组件的name属性
        }

    },
    {
        path: '/403',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
        name: '403',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "error-403", // 需要写上组件的name属性
        }
    },
    {
        path: '/error-pages',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/error-pages'),
        name: 'error-pages',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "error-pages", // 需要写上组件的name属性
        }
    },
    {
        path: '/500',
        component: () =>
            import( /* webpackChunkName: "page" */ '@/components/error-page/500'),
        name: '500',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            component: "error-500", // 需要写上组件的name属性
        }
    },
    {
        path: '/',
        name: '主页',
        redirect: '/wel',
        // component: () =>
        //     import( /* webpackChunkName: "page" */ '@/views/index/index'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false,
            isWhite: true, // 白名单，不需要登录就可以访问
        }
    },
    {
        path: '/myiframe',
        component: Layout,
        redirect: '/myiframe',
        children: [{
            path: ":routerPath",
            name: 'iframe',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/components/iframe/main'),
            props: true
        }]

    },
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]

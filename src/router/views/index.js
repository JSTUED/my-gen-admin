import Layout from '@/page/index/layout';
import PLayout from '@/page/index/';
// export default [{
//     path: '/wel',
//     component: Layout,
//     redirect: '/wel/index',
//     children: [
//         {
//             path: 'index',
//             name: '首页',
//             meta: {
//                 i18n: 'dashboard',
//                 keepAlive: true,
//                 component: "wel", // 需要写上组件的name属性
//             },
//             component: () =>
//                 import( /* webpackChunkName: "views" */ '@/views/wel')
//         }
//     ]
// }, {
//     path: '/x-info',
//     component: Layout,
//     redirect: '/x-info/index',
//     children: [{
//         path: 'index',
//         name: '个人信息',
//         meta: {
//             i18n: 'info'
//         },
//         component: () =>
//             import( /* webpackChunkName: "views" */ '@/views/user/x-info')
//     }]
// }, {
//     path: '/x-password',
//     component: Layout,
//     redirect: '/x-password/index',
//     children: [{
//         path: 'index',
//         name: '修改密码',
//         meta: {
//             i18n: 'password'
//         },
//         component: () =>
//             import( /* webpackChunkName: "views" */ '@/views/user/x-password')
//     }]
// }]

/**
 * 路由多嵌套一层与动态路由层级相同，方便缓存
 */
export default [
    {
        path: "/",
        component: PLayout,
        children: [{
            path: '/wel',
            component: Layout,
            redirect: '/wel/index',
            children: [
                {
                    path: 'index',
                    name: '首页',
                    meta: {
                        i18n: 'dashboard',
                        keepAlive: true,
                        component: "wel", // 需要写上组件的name属性
                    },
                    component: () =>
                        import( /* webpackChunkName: "views" */ '@/views/wel')
                }
            ]
        }, {
            path: '/x-info',
            component: Layout,
            redirect: '/x-info/index',
            children: [{
                path: 'index',
                name: '个人信息',
                meta: {
                    i18n: 'info'
                },
                component: () =>
                    import( /* webpackChunkName: "views" */ '@/views/user/x-info')
            }]
        }, {
            path: '/x-password',
            component: Layout,
            redirect: '/x-password/index',
            children: [{
                path: 'index',
                name: '修改密码',
                meta: {
                    i18n: 'password'
                },
                component: () =>
                    import( /* webpackChunkName: "views" */ '@/views/user/x-password')
            }]
        }]
    }
]

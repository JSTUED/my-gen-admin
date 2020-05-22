import Mock from 'mockjs'
import {menuBottons, menuSource, navMenuList, systemRoutes} from './routesData.js'

// const top = [
//     {
//     label: "首页",
//     path: "/wel/index",
//     icon: 'el-icon-menu',
//     meta: {
//         i18n: 'dashboard',
//     },
//     parentId: 0
// },
//     {
//         label: "bladex官网",
//         icon: 'el-icon-document',
//         meta: {
//             i18n: 'website',
//         },
//         path: "https://bladex.vip/#/",
//         parentId: 1
//     },
//     {
//         label: "avuex官网",
//         icon: 'el-icon-document',
//         meta: {
//             i18n: 'avuexwebsite',
//         },
//         path: "https://avuex.avue.top",
//         parentId: 2
//     },
//     {
//         label: "测试",
//         icon: 'el-icon-document',
//         path: "/test/index",
//         meta: {
//             i18n: 'test',
//         },
//         parentId: 3
//     }]

export default ({mock}) => {
    if (!mock) return;
    Mock.mock('/user/getTopMenu', 'get', () => {
        console.log("mock /user/getTopMenu");
        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": navMenuList
        }
    });

    Mock.mock('/user/routes', 'get', () => {
        console.log("mock /user/routes");
        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": systemRoutes
        };
    });

    Mock.mock('/user/permissions', 'get', () => {
        console.log("/user/permissions");
        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": [
                "user-list", "user-edit", "user-add"
            ]
        };
    })

}

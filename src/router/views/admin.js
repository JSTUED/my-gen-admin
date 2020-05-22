/**
 * 用户管理 用户模块 菜单路由
 */
const users = {
        id: "user",
        label: "账号管理",
        path: "/user",
        icon: "iconfont icon-renyuanjieshao",
        parentId: "admin",
        component: "",
        level: 1,
        meta: {
            i18n: "user"
        },
        children: [
            {
                id: "user-list",
                label: "管理员列表",
                path: "/user/user-list",
                icon: "iconfont icon-renyuanjieshao",
                parentId: "user",
                component: "/user/user-list",
                level: 2,
                children: null,
                meta: {
                    i18n: "user-list",
                    keepAlive: true
                },
            },
            {
                id: "user-add",
                label: "管理员新增",
                path: "/user/user-add",
                icon: "iconfont icon-rizhi",
                parentId: "user",
                component: "/user/user-add",
                level: 2,
                children: null,
                meta: {
                    i18n: "user-add",
                    keepAlive: true
                },
            },
            {
                id: "x-password",
                label: "修改密码",
                path: "/user/x-password",
                icon: "iconfont icon-lock",
                parentId: "user",
                component: "/user/x-password",
                level: 2,
                children: null,
                meta: {
                    i18n: "password",
                    keepAlive: true
                },
            }
        ],
    };





// 导出路由
export default {
    id: "admin",
    label: "系统管理",
    path: "/admin",
    icon: "iconfont icon-icon_shezhi",
    parentId: "0",
    component: "",
    level: 0,
    meta: {
        i18n: "admin"
    },
    children: [
        users,
    ]
};

/**
 * 用户管理 非菜单路由
 */

const users = {
    id: "user-sys",
    label: "账号管理",
    path: "/user",
    icon: "iconfont icon-renyuanjieshao",
    parentId: "admin-sys",
    component: "",
    level: 1,
    meta: {
        i18n: "user-sys"
    },
    children: [
        {
            id: "user-edit",
            label: "编辑用户",
            path: "/user/user-edit/:id",
            icon: "iconfont icon-rizhi",
            parentId: "user-sys",
            component: "/user/user-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "user-edit",
                keepAlive: true,
            },
        },
        {
            id: "user-info",
            label: "用户信息",
            path: "/user/user-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "user-sys",
            component: "/user/user-info",
            level: 2,
            children: null,
            meta: {
                i18n: "user-info",
                keepAlive: true
            },
        },
    ],
};




export default {
    id: "admin-sys",
    label: "系统管理",
    path: "/admin",
    icon: "iconfont icon-rizhi",
    parentId: "0",
    component: "",
    level: 0,
    meta: {
        i18n: "user-manage"
    },
    children: [
        users,
    ]
};

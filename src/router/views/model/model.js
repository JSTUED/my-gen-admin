/**
 * 减速机路由配置
 * */
const reduction = {
    id: "reduction",
    label: "减速机管理",
    path: "/reduction",
    icon: "iconfont icon-shebeiguanli",
    parentId: "admin",
    component: "",
    level: 1,
    meta: {
        i18n: "reduction"
    },
    children: [
        {
            id: "reduction-list",
            label: "减速机列表",
            path: "/reduction/reduction-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "reduction",
            component: "/reduction/reduction-list",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-list",
                keepAlive: true
            },
        },
        {
            id: "reduction-add",
            label: "减速机新增",
            path: "/reduction/reduction-add",
            icon: "iconfont icon-rizhi",
            parentId: "reduction",
            component: "/reduction/reduction-add",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-add",
                keepAlive: true
            },
        },
        {
            id: "reduction-category-list",
            label: "减速机分类列表",
            path: "/reduction-category/reduction-category-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "reduction",
            component: "/reduction-category/reduction-category-list",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-category-list",
                keepAlive: true
            },
        },
        {
            id: "reduction-category-add",
            label: "减速机分类新增",
            path: "/reduction-category/reduction-category-add",
            icon: "iconfont icon-rizhi",
            parentId: "reduction",
            component: "/reduction-category/reduction-category-add",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-category-add",
                keepAlive: true
            },
        },
    ],
};

// 导出路由
export default {
    id: "model",
    label: "选型模块",
    path: "/model",
    icon: "iconfont icon-shebeiguanli",
    parentId: "0",
    component: "",
    level: 0,
    meta: {
        i18n: "model"
    },
    children: [
        reduction,
    ]
};
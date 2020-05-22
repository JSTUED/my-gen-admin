/**
 * 减速机路由配置
 * */

/**
 * 减速机路由配置 非菜单路由
 * */
const reduction = {
    id: "reduction-sys",
    label: "减速机管理",
    path: "/reduction",
    icon: "iconfont icon-renyuanjieshao",
    parentId: "admin-sys",
    component: "",
    level: 1,
    meta: {
        i18n: "reduction-sys"
    },
    children: [
        {
            id: "reduction-edit",
            label: "减速机编辑",
            path: "/reduction/reduction-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "reduction-sys",
            component: "/reduction/reduction-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-edit",
                keepAlive: true
            },
        },
        {
            id: "reduction-info",
            label: "减速机信息",
            path: "/reduction/reduction-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "reduction-sys",
            component: "/reduction/reduction-info",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-info",
                keepAlive: true
            },
        },
        {
            id: "reduction-category-edit",
            label: "编辑减速机分类",
            path: "/reduction-category/reduction-category-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "reduction-sys",
            component: "/reduction-category/reduction-category-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-category-edit",
                keepAlive: true
            },
        },
        {
            id: "reduction-category-info",
            label: "减速机分类信息",
            path: "/reduction-category/reduction-category-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "reduction-sys",
            component: "/reduction-category/reduction-category-info",
            level: 2,
            children: null,
            meta: {
                i18n: "reduction-category-info",
                keepAlive: true
            },
        },
    ],
};

// 导出路由
export default {
    id: "model-sys",
    label: "选型模块",
    path: "/model",
    icon: "iconfont icon-icon_shezhi",
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
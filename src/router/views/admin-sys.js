/**
 * 用户管理 非菜单路由
 */

const users = {
    id: "user-sys",
    label: "管理员账号管理",
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

/**
 * 属性路由配置 非菜单路由
 * */
const properties = {
    id: "property-sys",
    label: "属性管理",
    path: "/property",
    icon: "iconfont icon-renyuanjieshao",
    parentId: "admin-sys",
    component: "",
    level: 1,
    meta: {
        i18n: "property-sys"
    },
    children: [
        {
            id: "property-edit",
            label: "编辑属性",
            path: "/property/property-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "property-sys",
            component: "/property/property-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "property-edit",
                keepAlive: true
            },
        },
        {
            id: "property-info",
            label: "属性信息",
            path: "/property/property-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "property-sys",
            component: "/property/property-info",
            level: 2,
            children: null,
            meta: {
                i18n: "property-info",
                keepAlive: true
            },
        },
    ],
};


/**
 * 电机路由配置 非菜单路由
 * */
const motors = {
    id: "motor-sys",
    label: "电机管理",
    path: "/motor",
    icon: "iconfont icon-renyuanjieshao",
    parentId: "admin-sys",
    component: "",
    level: 1,
    meta: {
        i18n: "motor-sys"
    },
    children: [
        {
            id: "motor-edit",
            label: "编辑电机",
            path: "/motor/motor-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "motor-sys",
            component: "/motor/motor-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-edit",
                keepAlive: true
            },
        },
        {
            id: "motor-info",
            label: "电机信息",
            path: "/motor/motor-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "motor-sys",
            component: "/motor/motor-info",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-info",
                keepAlive: true
            },
        },
        {
            id: "motor-category-edit",
            label: "编辑电机品牌",
            path: "/motor-category/motor-category-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "motor-sys",
            component: "/motor-category/motor-category-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-category-edit",
                keepAlive: true
            },
        },
        {
            id: "motor-category-info",
            label: "电机品牌信息",
            path: "/motor-category/motor-category-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "motor-sys",
            component: "/motor-category/motor-category-info",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-category-info",
                keepAlive: true
            },
        },
    ],
};


/**
 * 电机分类（品牌）路由配置 非菜单路由
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


/**
 * 减速机匹配路由配置 非菜单路由
 * */
const match = {
    id: "match-sys",
    label: "减速机匹配管理",
    path: "/match",
    icon: "iconfont icon-renyuanjieshao",
    parentId: "admin-sys",
    component: "",
    level: 1,
    meta: {
        i18n: "match-sys"
    },
    children: [
        {
            id: "match-edit",
            label: "编辑减速机匹配",
            path: "/match/match-edit/:id",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "match-sys",
            component: "/match/match-edit",
            level: 2,
            children: null,
            meta: {
                i18n: "match-edit",
                keepAlive: true
            },
        },
        {
            id: "match-info",
            label: "减速机匹配信息",
            path: "/match/match-info/:id",
            icon: "iconfont icon-rizhi",
            parentId: "match-sys",
            component: "/match/match-info",
            level: 2,
            children: null,
            meta: {
                i18n: "match-info",
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
        reduction,
        motors,
        match,
        properties,
        users,
    ]
};

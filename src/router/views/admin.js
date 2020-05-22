import { baseUrl } from '@/config/env';
/**
 * 用户管理 用户模块 菜单路由
 */
const users = {
        id: "user",
        label: "管理员账号管理",
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


/**
 * 属性路由配置
 * */
const properties = {
    id: "property",
    label: "属性管理",
    path: "/property",
    icon: "iconfont icon-sliders",
    parentId: "admin",
    component: "",
    level: 1,
    meta: {
        i18n: "property"
    },
    children: [
        {
            id: "property-list",
            label: "属性列表",
            path: "/property/property-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "property",
            component: "/property/property-list",
            level: 2,
            children: null,
            meta: {
                i18n: "property-list",
                keepAlive: true
            },
        },
        {
            id: "property-add",
            label: "属性新增",
            path: "/property/property-add",
            icon: "iconfont icon-rizhi",
            parentId: "property",
            component: "/property/property-add",
            level: 2,
            children: null,
            meta: {
                i18n: "property-add",
                keepAlive: true
            },
        },
    ],
};


/**
 * 电机路由配置
 * */
const motors = {
    id: "motor",
    label: "电机管理",
    path: "/motor",
    icon: "iconfont icon-jizhanguanli",
    parentId: "admin",
    component: "",
    level: 1,
    meta: {
        i18n: "motor"
    },
    children: [
        {
            id: "motor-list",
            label: "电机列表",
            path: "/motor/motor-list",
            icon: "iconfont icon-huixingzhen",
            parentId: "motor",
            component: "/motor/motor-list",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-list",
                keepAlive: true
            },
        },
        {
            id: "motor-add",
            label: "电机新增",
            path: "/motor/motor-add",
            icon: "iconfont icon-rizhi",
            parentId: "motor",
            component: "/motor/motor-add",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-add",
                keepAlive: true
            },
        },
        {
            id: "motor-category-list",
            label: "电机品牌列表",
            path: "/motor-category/motor-category-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "motor",
            component: "/motor-category/motor-category-list",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-category-list",
                keepAlive: true
            },
        },
        {
            id: "motor-category-add",
            label: "电机品牌新增",
            path: "/motor-category/motor-category-add",
            icon: "iconfont icon-rizhi",
            parentId: "motor",
            component: "/motor-category/motor-category-add",
            level: 2,
            children: null,
            meta: {
                i18n: "motor-category-add",
                keepAlive: true
            },
        },
    ],
};




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
            id: "motor-list",
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


/**
 * 减速机匹配路由配置
 * */
const match = {
    id: "match",
    label: "减速机匹配管理",
    path: "/match",
    icon: "iconfont icon--lumingpai",
    parentId: "admin",
    component: "",
    level: 1,
    meta: {
        i18n: "match"
    },
    children: [
        {
            id: "match-list",
            label: "减速机匹配列表",
            path: "/match/match-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "match",
            component: "/match/match-list",
            level: 2,
            children: null,
            meta: {
                i18n: "match-list",
                keepAlive: true
            },
        },
        {
            id: "match-add",
            label: "减速机匹配绑定",
            path: "/match/match-add",
            icon: "iconfont icon-rizhi",
            parentId: "match",
            component: "/match/match-add",
            level: 2,
            children: null,
            meta: {
                i18n: "match-add",
                keepAlive: true
            },
        },
    ],
};

const message = {
    id: "message",
    label: "用户咨询模块",
    path: "/message",
    icon: "iconfont icon-message",
    parentId: "admin",
    component: "",
    level: 1,
    meta: {
        i18n: "message"
    },
    children: [
        {
            id: "message-list",
            label: "用户咨询列表",
            path: "/message/message-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "message",
            component: "/message/message-list",
            level: 2,
            children: null,
            meta: {
                i18n: "message-list",
                keepAlive: true
            },
        },
        {
            id: "customer-list",
            label: "客户列表",
            path: "/customer/customer-list",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "message",
            component: "/customer/customer-list",
            level: 2,
            children: null,
            meta: {
                i18n: "customer-list",
                keepAlive: true
            },
        },
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
        reduction,
        motors,
        match,
        properties,
        message,
        users,
    ]
};

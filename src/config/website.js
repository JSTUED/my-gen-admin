/**
 * 全局配置文件  indexTitle 语言包中也要设置
 */
export default {
    title: "杰士德UI框架",
    // indexTitle: 'Jst-Admin',
    indexTitle: '智能服务平台',
    clientId: 'saber', // 客户端id
    clientSecret: 'saber_secret', // 客户端密钥
    tenantMode: true, // 是否开启租户模式
    logo: "S",
    key: 'saber',//配置主键,目前用于存储
    lockPage: '/lock',
    tokenTime: 6000,
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [],
    //配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        label: "首页",
        value: "/wel/index",
        params: {},
        query: {},
        meta: {
            i18n: 'dashboard'
        },
        group: [],
        close: false
    },
    //配置菜单的属性
    menu: {
        iconDefault: 'el-icon-menu',
        props: {
            id: "id", // 自身id
            parentId: "parentId", // 父级id
            label: 'label',
            name: 'label', // 路由名称
            path: 'path', // 路由路径 要绝对路径
            icon: 'icon', // 菜单图标
            children: 'children', // 子路由/子菜单
            component: "component", // 组件地址
            redirect: "redirect", // 重定向
        }
    }
}

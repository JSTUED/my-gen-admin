
const isp = {
    id: "isp-view",
    label: "ISP视图",
    path: "/isp-view",
    icon: "iconfont icon-shebeiguanli",
    parentId: "isp",
    component: "",
    level: 1,
    meta: {
        i18n: "isp-view"
    },
    children: [
        {
            id: "add-home",
            label: "创建工单",
            path: "/requst-apply-hdr/add-home",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "isp-view",
            component: "/isp/requst-apply-hdr/add-home",
            level: 2,
            children: null,
            meta: {
                i18n: "add-home",
                keepAlive: true
            },
        },
        {
            id: "add-form",
            label: "创建工单-服务",
            path: "/requst-apply-hdr/add-form",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "isp-view",
            component: "/isp/requst-apply-hdr/add-form",
            level: 2,
            children: null,
            meta: {
                i18n: "add-form",
                keepAlive: true
            },
        },
        {
            id: "i-deal-with",
            label: "我处理的",
            path: "/requst-apply-hdr/i-deal-with",
            icon: "iconfont icon-renyuanjieshao",
            parentId: "isp-view",
            component: "/isp/requst-apply-hdr/i-deal-with",
            level: 2,
            children: null,
            meta: {
                i18n: "i-deal-with",
                keepAlive: true
            },
        }
    ],
};

// 导出路由
export default {
    id: "isp",
    label: "ISP",
    path: "/isp",
    icon: "iconfont icon-shebeiguanli",
    parentId: "0",
    component: "",
    level: 0,
    meta: {
        i18n: "model"
    },
    children: [
        isp,
    ]
};
/**
 * 语言类型 语言 zh-cn: 简体中文 zh-tw：繁体 en: 英语
 */
export const LanguageList = {
    "zh-cn": "简体中文",
    "zh-tw": "繁体",
    "en": "英语"
};

/**
 * 状态列表
 */
export const StatusList = [
    { "label": "激活", "value": true },
    { "label": "冻结", "value": false }
];


/**
 * 属性类型 归属电机或减速机； motor：电机， reduction：减速机
 */
export const PropertyTypeList = {
    motor: "电机",
    reduction: "减速机"
};


/**
 * 转动方式 10 轴转动 20 壳转动
 */
export const RotationList = {
    10: "轴转动",
    20: "壳转动"
};

/**
 * isp 处理状态
 * @type {{}}
 */
export const DealWithStatus = {
    1: "新创建",
    2: "待受理",
    3: "处理中",
    4: "已完成",
    5: "确认关闭",
    6: "自动关闭",
    7: "已取消"
}




















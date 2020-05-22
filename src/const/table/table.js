export const TYPE_LIST = {
    10 : "类型一",
    20 : "类型二"
};

export const STATUS_LIST = {
    10 : "已生成",
    20 : "已接受",
    30 : "处理中",
    40 : "已完成",
    50 : "已取消",
    60 : "已拒绝"
};

export const STATUS_TAG_LIST = (val)=>{
    if(val==10){
        return <el-tag effect="dark" type="primary">{STATUS_LIST[val]}</el-tag>
    }
    if(val==20){
        return <el-tag effect="dark" type="warning">{STATUS_LIST[val]}</el-tag>
    }
    if(val==30){
        return <el-tag effect="dark" type="success">{STATUS_LIST[val]}</el-tag>
    }
    if(val==40){
        return <el-tag effect="dark" type="success">{STATUS_LIST[val]}</el-tag>
    }
    if(val==50){
        return <el-tag effect="dark" type="danger">{STATUS_LIST[val]}</el-tag>
    }
    if(val==60){
        return <el-tag effect="dark" type="danger">{STATUS_LIST[val]}</el-tag>
    }
    return STATUS_LIST[val]
}


export const USER_LIST = {
    1 : "正常",
    2 : "禁用",
}

export const USER_TYPE_LIST = (val) => {
    if(val == 1 ){
        return <el-tag effect="dark" type="info">{USER_LIST[val]}</el-tag>
    }
    if(val == 2 ){
        return <el-tag effect="dark" type="danger">{USER_LIST[val]}</el-tag>
    }
    return USER_LIST[val]
}


export const SEX_LIST = {
    1: '男',
    2: '女',
}


export const RES_LIST = {
    1 : "启用",
    2 : "禁用",
}

export const RES_TYPE_LIST = (val) => {
    if(val == 1 ){
        return <el-tag effect="dark" type="info">{RES_LIST[val]}</el-tag>
    }
    if(val == 2 ){
        return <el-tag effect="dark" type="danger">{RES_LIST[val]}</el-tag>
    }
    return RES_LIST[val]
}

export const MESTYPE_LIST = {
    1: '消息类型一',
    2: '消息类型二',
}

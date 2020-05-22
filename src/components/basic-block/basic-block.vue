<template>
    <div class="basic-block">
        <el-card>
            <div v-if="!hideHeader" slot="header" class="title">
                <slot name="title">
                    <span>{{title}}</span>
                </slot>
                <a :href="url" target="_blank" v-if="url">
                    <el-button style="float: right; padding: 3px 0" type="text">{{text}}</el-button>
                </a>
            </div>
            <div>
                <slot></slot>
            </div>
        </el-card>
    </div>
</template>

<script>
    /**
     * 插槽
     * default 展示内容
     * title 自定义标题
     *
     * 属性
     * title 标题内容
     * url 右侧文档链接地址
     * text 文字链接内容
     * hideHeader 控制 title 部分隐藏/显示 默认false--不隐藏
     * */
    export default {
        name: "basic-block",
        props:{
            title: {
                type: String,
                default: '标题',
            },
            url: {
                type: String,
                default: '',
            },
            text: {
                type: String,
                default: '文档链接'
            },
            hideHeader: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>

</style>
<style lang="scss">
    .basic-block{
        margin-top: 0;
        padding: 0px 10px;
        box-sizing: border-box;
        .el-card {
            width: 100%;
            overflow: visible;
        }
        &:first-child {
            padding-top: 0;
            margin-top: 10px;
        }
        .el-card__header{
            padding: 0;
        }
        .title{
            font-size: 14px;
            padding: 10px 15px;
            color: #000;
            font-weight: bold;
        }
    }
    .basic-block+.basic-block{
        margin-top: 10px;
    }

</style>

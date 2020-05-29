<template>
    <div class="isp-line">
        <span class="isp-line-title">
            <slot>{{title}}</slot>
        </span>
        <div class="isp-line-div"></div>
    </div>
</template>

<script>
    export default {
        name: "isp-line",
        props: {
            title: {
                type: String,
                default: ""
            }
        },
        data(){
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .isp-line{
        position: relative;
        .isp-line-div{
            height: 1px;
            border-bottom: 1px solid #e7e7e7;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            transform: translateY(-50%);
        }
        .isp-line-title{
            display: inline-block;
            padding-right: 8px;
            background: #fff;
            z-index: 1;
            position: relative;
            color: #333;
            font-size: 14px;
        }
    }
</style>
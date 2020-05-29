<template>
    <div class="gen-split-panel">
        <el-row type="flex">
            <el-col class="left" :style="{width: toogleLeft ? leftWidth: '0px'}" v-if="!hideLeft">
                <slot v-if="toogleLeft" name="left"></slot>
                <div class="toggle-left" @click="toogleLeft=!toogleLeft">
                    <span v-if="toogleLeft" class="iconfont icon-zuo-"></span>
                    <span v-else class="iconfont icon-you"></span>
                </div>
            </el-col>
            <el-col class="middle">
                <slot name="middle"></slot>
            </el-col>
            <el-col class="right form-design-attr" :style="{width: toogleRight ? rightWidth: '0px'}" v-if="!hideRight">
                <div class="toggle-right" @click="toogleRight=!toogleRight">
                    <span v-if="toogleRight" class="iconfont icon-you"></span>
                    <span v-else class="iconfont icon-zuo-"></span>
                </div>
                <slot v-if="toogleRight" name="right"></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "split-panel",

        props: {
            // 左侧栏宽度
            leftWidth: {
                type: String,
                default: "210px"
            },
            // 右侧栏宽度
            rightWidth: {
                type: String,
                default: "320px"
            },
            // 隐藏左侧
            hideLeft: {
                type: Boolean,
                default: false
            },
            // 隐藏右侧
            hideRight: {
                type: Boolean,
                default: false
            }
        },

        data(){
            return {
                toogleLeft: true,
                toogleRight: true,
            }
        },

    }
</script>

<style lang="scss">
    .gen-split-panel{
        >.el-row>.el-col{
            margin-bottom: 0px;
        }
        .left{
            width: 210px;
            align-items: stretch;
            border-right: 1px solid #E7E7E7;
            position: relative;
        }
        .middle{
            flex: 1;
            padding: 0px 15px;
            .el-col{
                margin-bottom: 0px;
            }
        }
        .right{
            width: 320px;
            align-items: stretch;
            border-left: 1px solid #e7e7e7;
            position: relative;
        }

        .toggle-left, .toggle-right{
            position: absolute;
            background: #c2c2c2;
            color: #fff;
            padding: 10px 0px 10px 0px;
            right: -12px;
            top: 50%;
            font-size: 10px;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .toggle-right{
            left: -12px;
            right: auto;
        }
    }
</style>
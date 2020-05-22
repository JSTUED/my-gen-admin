<template>
    <div>
        <div class="jst-icons-wrap">
            <el-input
                    v-model="currentValue"
                    @on-change="handleChange"
                    :placeholder="placeholder"
                    :size="size"
                    :disabled="disabled"
                    :readonly="readonly"
                    :maxlength="maxlength"
                    :icon="currentValue"
            >
            <el-button
                    slot="append"
                    @click="iconModalVisible=true"
                    :size="size"
                    :disabled="disabled"
                    :icon="icon"
                    style="background-color: #3aa1ff;color: #fff;border-top-left-radius: 0;border-bottom-left-radius: 0;">选择图标</el-button>
            </el-input>
        </div>

        <el-dialog
            title="选择图标"
            :visible.sync="iconModalVisible"
            width="45%"
        >
            <div class="search-input">
                <!--<input-->
                        <!--type="text"-->
                        <!--v-model="key"-->
                        <!--:placeholder="tip"-->
                        <!--@input="handleInput"-->
                        <!--@focus="handleFocus"-->
                        <!--@blur="handleBlur"-->
                <!--&gt;-->
                <el-form>
                    <el-form-item>
                        <el-input
                                v-model="key"
                                :placeholder="tip"
                                @input="handleInput"
                                @focus="handleFocus"
                                @blur="handleBlur"
                        >
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="icon-bar">
                <div class="icon-wrap" v-for="(item, i) in iconData" :key="i" @click="handleChoose(item)">
                    <div class="icons-item">
                        <span :class="item" style="font-size: 32px !important;"></span>
                        <p>{{item}}</p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    import { icons } from "./icons.js";

    export default {
        name: "icon-choose",

        props: {
            value: {
                type: String,
                default: ""
            },
            size: String,
            placeholder: {
                type: String,
                default: "输入图标名或选择图标"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            maxlength: Number,
            icon: {
                type: String,
                default: "iconfont icon-asmkticon0214"
            }
        },
        data() {
            return {
                iconModalVisible: false,
                currentValue: this.value,
                iconData: [],
                key: "",
                tip: "输入英文关键词搜索，比如 success"
            };
        },
        methods: {
            init() {
                let re = [];
                icons.forEach( e => {
                   re.push(e.replace('iconfont',''))
                })
                this.iconData = re;

            },
            handleInput() {
                if (this.key) {
                    // 搜索
                    let re = [];
                    icons.forEach( e => {
                        if( e.indexOf(this.key) >= 0 ){
                            re.push(e)
                        }
                    })
                    this.iconData = re;
                } else {
                    this.init();
                }
            },
            handleFocus() {
                if (!this.key) {
                    this.tip = "";
                }
            },
            handleBlur() {
                if (!this.key) {
                    this.tip = "输入英文关键词搜索，比如 success";
                }
            },
            handleChange(v) {
                this.$emit("input", this.currentValue);
                this.$emit("on-change", this.currentValue);
            },
            setCurrentValue(value) {
                if (value === this.currentValue) {
                    return;
                }
                this.currentValue = value;
            },
            handleChoose(v) {
                this.currentValue = v;
                this.$emit("input", this.currentValue);
                this.$emit("on-change", this.currentValue);
                this.iconModalVisible = false;
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="scss">
.jst-icons-wrap{
    display: flex;
    .jst-icon-name{
        input{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0;
        }

    }
    .jst-icon-btn{
        background-color: #3aa1ff;
        color: #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
        height: 32px;
    }
}

.icon-bar {
    display: flex;
    flex-wrap: wrap;
    max-height: 500px;
    overflow: auto;
    overflow-x: hidden;
}
.icon-bar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.icon-bar::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #c3c3c3;
}

.icon-bar::-webkit-scrollbar-track {
    background: #fff;
}
.icon-wrap {
    :hover {
        color: #1890ff;
        transition: color 0.3s;
    }
}
.icons-item {
    margin: 6px 6px 6px 0;
    width: 145px;
    text-align: center;
    list-style: none;
    cursor: pointer;
    height: 100px;
    color: #5c6b77;
    transition: all 0.2s ease;
    position: relative;
    padding-top: 10px;
    p {
        padding-top: 15px;
        margin: 5px;
        font-size: 12px;
    }
}
</style>

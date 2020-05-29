<template>
    <el-select :value="value" :placeholder="placeholder" clearable filterable :multiple="multiple" :remote="remote" style="width: 100%;"
               :collapse-tags="collapseTags" class="gen-search-w" :remoteMethod="_remoteMethod" @change="onchange">
        <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item[map && map['label'] ? map['label'] : 'label']"
                :value="item[map && map['value'] ? map['value'] : 'value']">
        </el-option>
    </el-select>
</template>

<script>
    import {param} from "../../util/tool";

    export default {
        name: "select-remote",
        props: {
            value: {
                type: null,
                default(){
                    return ""
                }
            },

            map: {
                type: Object,
                default() {
                    return {
                        label: "label",
                        value: "value"
                    };
                }
            },

            multiple: {
                type: Boolean,
                default: false
            },
            collapseTags: {
                type: Boolean,
                default: true
            },
            remoteMethod: {
                type: Function,
                default(){
                    return (data)=>{
                        return new Promise();
                    }
                }
            },
            params: {
                type: Object,
                default(){
                    return {}
                }
            },
            remote: {
                type: Boolean,
                default: false
            },
            //自动请求数据 默认自动请求数据
            auto: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: "请选择"
            }
        },

        data(){
            return {
                loading: false,
                options: [],
                model: ""
            }
        },

        created(){
            this.$nextTick(()=>{
                if(this.auto){
                    this._remoteMethod();
                }
            })
        },

        methods: {
            _remoteMethod(query) {
                this._getData(query);
            },

            onchange(val){
                this.$emit("input", val);
                this.$emit("change", val);
            },

            _getData(query){
                this.loading = true;
                this.remoteMethod({
                    searchTerm: query,
                    ...this.params
                }).then((res)=>{
                    this.options = res;
                    this.loading = false;
                }).catch((err)=>{
                    this.options = [];
                    this.loading = false;
                });
            },

            /**
             * 手动刷新
             */
            reflesh(){
                this._getData();
            }
        }
    }
</script>

<style scoped>

</style>
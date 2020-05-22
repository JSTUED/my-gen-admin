<template>
    <div class="upload">
        <el-upload
                :list-type="listType"
                :auto-upload="true"
                :file-list="dataFileList"
                :action="action"
                :headers="{ 'X-Token': token }"
                :accept="accept"
                :multiple="multiple"
                :on-success="handleSuccess"
                :before-upload="_beforeUpload"
                :on-remove="onRemove"
                :on-change="onChange"
        >
            <i v-if="listType=='picture-card'" class="el-icon-plus"></i>
            <div v-else>
                <el-button size="mini" plain type="primary">
                    点击上传<i class="el-icon-upload el-icon--right"></i>
                </el-button>
            </div>
        </el-upload>
    </div>
</template>

<script>
    // el-upload 二次封装
    import { baseUrl } from '@/config/env';
    import { mapGetters } from "vuex";
    export default {
        name: "upload",

        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            limit: Number,
            data: {
                type: Object,
                default(){
                    return { }
                }
            },
            beforeUpload: {
                type: Function,
                default: function() { }
            },
            value: {
                type: [Array, String],
                default(){
                    return []
                }
            },
            accept: {
                type: String,
                default: ".png, .jpg, .jpeg"
            },
            listType: {
                type: String,
                default: "picture-card"
            },
            action: {
                type: String,
                default: baseUrl + '/admin/file/upload'
            }
        },

        computed: {
            ...mapGetters(["token"])
        },

        data() {
            let dataFileList = [];
            if(this.value && typeof this.value == "string"){
                dataFileList = [{
                    name: this.value,
                    url: this.value
                }];
            }

            if(this.value && this.value instanceof Array == true){
                dataFileList = this.value.map(item=>{
                    return {
                        name: item,
                        url: item
                    }
                })
            }

            return {
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,

                baseUrl: baseUrl,
                imgUrl: "", // 返回的图片地址

                dataFileList: dataFileList

            };
        },

        watch: {
            // "value": { // 监测属性 fileList 变化
            //     handler(val){
            //         let dataFileList = [];
            //         if(this.value && typeof this.value == "string"){
            //             dataFileList = [{
            //                 name: this.value,
            //                 url: this.value
            //             }];
            //         }
            //
            //         if(this.value && this.value instanceof Array == true){
            //             dataFileList = this.value.map(item=>{
            //                 return {
            //                     name: item,
            //                     url: item
            //                 }
            //             })
            //         }
            //
            //         this.dataFileList = dataFileList;
            //     },
            //     deep: true
            // }
        },

        methods: {
            handleSuccess(res, file, fileList) {
                // console.log(res);
                if(res.code==1){
                    this.$message.success('上传成功！');
                    if(this.limit && this.limit==1){
                        fileList =[ fileList[fileList.length-1] ];
                    }
                    this.broadcast(fileList)
                }else {
                    this.$message.error('上传失败！');
                }
            },
            _beforeUpload(file) {
                if(this.limit && this.limit != 1 && this.limit == this.dataFileList.length ){
                    this.$message.error('上传文件已经超过最大数量了！');
                    return false;
                }

                if(this.beforeUpload){
                    return this.beforeUpload()
                }
                return true;
            },

            onRemove(file, fileList){
                this.broadcast(fileList)
            },

            onChange(file, fileList){

            },

            broadcast(fileList){
                this.dataFileList = fileList;
                console.log(fileList);
                let urlList = fileList.map(item=>{
                    return item.response && item.response.data ? item.response.data : item.url;
                });

                if(this.limit==1){
                    urlList.length > 0 ? this.$emit("input", urlList[0]) : this.$emit("input", "")
                }else {
                    this.$emit("input", urlList)
                }
            },

            /**
             * 设置值
             * @param value
             */
            setVal(value){
                let dataFileList = [];
                if(value && typeof value == "string"){
                    dataFileList = [{
                        name: value,
                        url: value
                    }];
                }

                if(value && value instanceof Array == true){
                    dataFileList = value.map(item=>{
                        return {
                            name: item,
                            url: item
                        }
                    })
                }
                this.dataFileList = dataFileList;
            },

            /**
             * 获得值 limit 为 1 时 为字符串
             * @returns {*}
             */
            getVal(){
                let fileList = this.dataFileList;

                let urlList = fileList.map(item=>{
                    return item.response && item.response.data ? item.response.data : item.url;
                });

                if(this.limit==1){
                    return urlList.length > 0 ? urlList[0] : "";
                }else {
                    return urlList;
                }
            }

        }
    }
</script>

<style lang="scss">
    .upload{
        line-height: 0px;
        .el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card{
            width: 100px;
            height: 100px;
            margin-bottom: 0px;
        }
        .el-upload--picture-card{
            line-height: 110px;
        }

    }

</style>

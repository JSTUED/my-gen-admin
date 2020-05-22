<template>
    <span>
        <el-popover
                placement="bottom"
                width="150"
                trigger="hover">
            <div class="content-list">
                <el-scrollbar wrap-style="height: 200px;">
                    <div class="list-tip" v-for="(item,index) in msgList" :key="index">
                        <div>{{ item.title }}</div>
                        <div>{{ item.content }}</div>
                    </div>
                </el-scrollbar>
            </div>
            <el-badge :value="3" class="item" slot="reference">
                <i class="el-icon-bell" style="font-size: 20px;"></i>
            </el-badge>
        </el-popover>
    </span>
</template>

<script>
    export default {
        name: "top-tip",
        data(){
            return{
                msgList:[
                    {title:'公告标题',content:'公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                    {title:'公告标题',content:'公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                    {title:'公告标题',content:'公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                    {title:'公告标题',content:'公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                    {title:'公告标题',content:'公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容'},
                ],
            }
        }
    }
</script>

<style scoped>
    .list-tip {
        border-bottom: 1px solid #E7E7E7;
        padding: 10px 0;
    }
    .list-tip div:nth-child(2){
        font-size: 12px;
        color: #666;
    }
    .content-list .list-tip:last-child {
        border-bottom: none;
    }
</style>

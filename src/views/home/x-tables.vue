<template>
    <div class="home-tables">
        <vxe-table
                size="mini"
                border
                stripe
                resizable
                show-overflow
                :loading="loading"
                :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
                :data.sync="tableData"
        >
            <vxe-table-column field="numOrder" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="theme" title="任务名称"></vxe-table-column>
            <vxe-table-column field="department" title="指派部门"></vxe-table-column>
            <vxe-table-column field="designated" title="指派人"></vxe-table-column>
            <vxe-table-column field="status" title="状态">
                <template v-slot="{ row }">
                    <el-tag v-if="row.status === '新创建'" v-html="row.status"></el-tag>
                    <el-tag v-if="row.status === '已受理'" v-html="row.status" type="success"></el-tag>
                    <el-tag v-if="row.status === '已取消'" v-html="row.status" type="warning"></el-tag>
                    <el-tag v-if="row.status === '已拒绝'" v-html="row.status" type="danger"></el-tag>
                    <el-tag v-if="row.status === '已完成'" v-html="row.status"></el-tag>
                    <el-tag v-if="row.status === '已关闭'" v-html="row.status" type="info"></el-tag>
                </template>
            </vxe-table-column>
        </vxe-table>

        <vxe-pager
                :background="tablePage.background"
                :loading="loading"
                :current-page="tablePage.currentPage"
                :page-size="tablePage.pageSize"
                :total="tablePage.totalResult"
                :layouts="['PrevPage', 'JumpNumber', 'NextPage']"
                @page-change="handlePageChange">
        </vxe-pager>
    </div>
</template>

<script>
    export default {
        name: "home-tables",
        data(){
          return{
              loading: false,
              tableData: [],
              tablePage: {
                  size:'mini',
                  currentPage: 1,
                  pageSize: 10,
                  totalResult: 0,
                  background:true
              },

              metaData:[
                  { numOrder: 1, theme: "设计主题", department: "用户体验课", designated: "李芳", status: "新创建",},
                  { numOrder: 2, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已受理",},
                  { numOrder: 3, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 4, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已拒绝",},
                  { numOrder: 5, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 6, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 7, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 8, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 9, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 10, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 11, theme: "设计主题", department: "用户体验课", designated: "李芳", status: "新创建",},
                  { numOrder: 12, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已受理",},
                  { numOrder: 13, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 14, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已拒绝",},
                  { numOrder: 15, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 16, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 17, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 18, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 19, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 20, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 21, theme: "设计主题", department: "用户体验课", designated: "李芳", status: "新创建",},
                  { numOrder: 22, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已受理",},
                  { numOrder: 23, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 24, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已拒绝",},
                  { numOrder: 25, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 26, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 27, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 28, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 29, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 30, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 31, theme: "设计主题", department: "用户体验课", designated: "李芳", status: "新创建",},
                  { numOrder: 32, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已受理",},
                  { numOrder: 33, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已取消",},
                  { numOrder: 34, theme: "设计网站", department: "用户体验课", designated: "李芳", status: "已拒绝",},
                  { numOrder: 35, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 36, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 37, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 38, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已完成",},
                  { numOrder: 39, theme: "设计后台管理系统", department: "用户体验课", designated: "李芳", status: "已关闭",},
                  { numOrder: 40, theme: "设计新主题", department: "用户体验课", designated: "李芳", status: "已取消",},

              ]
          }
        },
        created(){
            this.tableData = this.metaData.slice(0,10);
            this.tablePage.totalResult = this.metaData.length;
        },
        methods:{
            handlePageChange ({ currentPage, pageSize }) {
                this.tablePage.currentPage = currentPage;
                this.tablePage.pageSize = pageSize;
                console.log(currentPage)
                console.log(pageSize)
                this.tableData = this.metaData.slice((currentPage-1)*pageSize,currentPage*pageSize)
            }
        },
    }
</script>

<style lang="scss">
    .home-tables{
        .vxe-cell{
            color: #000;
        }
    }
</style>



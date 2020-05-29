<template>
    <div class="isp-home">
        <basic-block title="我的一览表">
            <el-row>
                <el-col :span="6">
                    <div class="isp-home-icon-wrap">
                        <div class="isp-home-icon-1">
                            <span class="iconfont icon-error"></span>
                        </div>
                        <div class="isp-home-icon-2">
                            <span class="num">0</span>
                            <span class="desc">
                                <router-link to="/user/user-list">逾期工单</router-link>
                            </span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="isp-home-icon-wrap">
                        <div class="isp-home-icon-1 icon-bg-2">
                            <span class="iconfont icon-reloadtime"></span>
                        </div>
                        <div class="isp-home-icon-2">
                            <span class="num">0</span>
                            <span class="desc">
                                <router-link to="/user/user-list">今日到期工单</router-link>
                            </span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="isp-home-icon-wrap">
                        <div class="isp-home-icon-1 icon-bg-3">
                            <span class="iconfont icon-shiyongwendang"></span>
                        </div>
                        <div class="isp-home-icon-2">
                            <span class="num">0</span>
                            <span class="desc">
                                <router-link to="/user/user-list">待我处理的</router-link>
                            </span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="isp-home-icon-wrap">
                        <div class="isp-home-icon-1 icon-bg-4">
                            <span class="iconfont icon-edit"></span>
                        </div>
                        <div class="isp-home-icon-2">
                            <span class="num">0</span>
                            <span class="desc">
                                <router-link to="/user/user-list">今日新增工单</router-link>
                            </span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </basic-block>

        <basic-block>
            <div slot="title">
                <span>我的处理</span>
                <div class="ips-home-more">
                    <router-link to="/user/user-list">更多>></router-link>
                </div>
            </div>

            <!--表格部分-->
            <div>
                <vxe-table
                        :show-overflow="false"
                        auto-resize
                        highlight-hover-row
                        :height="tableHeight - 50"
                        ref="table"
                        row-id="id"
                        :loading="loading"
                        :start-index="(pagination.currentPage - 1) * pagination.pageSize"
                        :data.sync="tableData"
                >
                    <vxe-table-column field="id" title="工单号" width="150"></vxe-table-column>
                    <vxe-table-column field="name" title="工单分类" min-width="100"></vxe-table-column>
                    <vxe-table-column field="img" title="主题" min-width="150">
<!--                        <template v-slot:default="{ row }">-->
<!--                            <div style="line-height: 0px;">-->
<!--                                <img v-if="row.img" :src="row.img" style="height: 50px;" alt="减速机缩略图">-->
<!--                            </div>-->
<!--                        </template>-->
                    </vxe-table-column>
                    <vxe-table-column field="language" title="状态" min-width="80"></vxe-table-column>
                    <vxe-table-column field="desc" title="发起部门" min-width="200"></vxe-table-column>
                    <vxe-table-column field="active" title="发起人" min-width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="创建日期" min-width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="期望解决日期" min-width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="计划解决日期" min-width="100"></vxe-table-column>
                </vxe-table>
                <vxe-pager
                        :loading="loading"
                        :current-page="pagination.currentPage"
                        :page-size="pagination.pageSize"
                        :total="pagination.totalItemsCount"
                        background
                        @page-change="handlePageChange"
                >
                </vxe-pager>
            </div>
        </basic-block>
    </div>
</template>

<script>
    import tableMixins from "@/mixins/tableMixins";
    import { LanguageList, StatusList } from "@/const/constData";
    import { getMultiConditionalQuery } from "@/api/isp";

    export default {
        name: "isp-home",
        mixins: [ tableMixins ],
        data(){
            return {
                getList: getMultiConditionalQuery,
                LanguageList: LanguageList,
                StatusList: StatusList,
            }
        },
        created(){
            this.$nextTick(()=>{
                // this.findList();
            })
        },
        // 组件激活时调用
        activated(){
            this.findList();
        },
    }
</script>

<style lang="scss" scoped>
    .isp-home-icon-wrap{
        display: flex;
        .isp-home-icon-1{
            background-color: #ed5565;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            text-align: center;
            margin-right: 25px;
            margin-left: 10px;

            span{
                font-size: 26px;
                color: #fff;
                line-height: 50px;
            }
        }

        .isp-home-icon-2{
            span{
                display: block;
                color: #666;
                line-height: 1;
            }
            .num{
                font-size: 28px;
                padding-left: 8px;
            }
            .desc{
                margin-top: 10px;
                font-size: 14px;
            }
        }

        .icon-bg-2{
            background-color: #e78c05;
        }
        .icon-bg-3{
            background-color: #53a568;
        }
        .icon-bg-4{
            background-color: #1372c9;
        }
    }

    .ips-home-more{
        float: right;
        a{
            color: #3AA1FF;
        }
    }
</style>
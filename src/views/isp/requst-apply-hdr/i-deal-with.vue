<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="100px">
                <el-form-item label="工单号/主题">
                    <el-input v-model.trim="searchForm.FRequestId" clearable placeholder="请输入工单号/主题" class="st-input-w"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.FStatus" multiple collapse-tags clearable placeholder="请选择" class="st-input-w">
                        <el-option v-for="(value, key, index) in DealWithStatus" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务组">
                    <select-remote v-model="searchForm.FServiceTeam" :remoteMethod="getSelect2List" class="st-input-w"
                                   :params="{ pageSize: 1000, pageNum: 1, id: 7 }"
                                   :map="{ label: 'text',value: 'id' }"
                    ></select-remote>
                </el-form-item>
                <el-form-item label="计划解决日期">
                    <el-date-picker
                            class="st-input-w"
                            v-model="searchForm.FPlanFinishTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchCustom()">搜 索</el-button>
                    <el-button type="default" @click="resetSearch">重 置</el-button>
                </el-form-item>
            </el-form>

            <!--表格部分-->
            <!--:edit-config="{trigger: 'click', mode: 'row', showIcon: false, showStatus: true, autoClear: false}"-->
            <!--:checkbox-config="{reserve: true}"-->
            <div>
                <vxe-toolbar>
                    <template v-slot:buttons>
                        <el-button type="primary" icon="iconfont icon-switchuser" @click="transform" >转派</el-button>
                        <el-button type="primary" icon="iconfont icon-bianji" @click="edit">批量编辑</el-button>
                    </template>
                </vxe-toolbar>
                <vxe-table
                        :show-overflow="false"
                        auto-resize
                        highlight-hover-row
                        :height="tableHeight + 60"
                        ref="table"
                        row-id="id"
                        :loading="loading"
                        :start-index="(pagination.currentPage - 1) * pagination.pageSize"
                        :data.sync="tableData"
                >
                    <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
                    <vxe-table-column field="name" title="工单号" min-width="100"></vxe-table-column>
                    <vxe-table-column field="img" title="主题" width="150">
                        <template v-slot:default="{ row }">
                            <div style="line-height: 0px;">
                                <img v-if="row.img" :src="row.img" style="height: 50px;" alt="减速机缩略图">
                            </div>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="language" title="状态" width="80">
                        <template v-slot:default="{ row }">
                            <span>{{ LanguageList[row.language] }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="desc" title="工单类别" min-width="200"></vxe-table-column>
                    <vxe-table-column field="active" title="状态" width="100">
                        <template v-slot:default="{ row }">
                            <span>{{ row.active | fStatus }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="sort" title="发起部门" width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="发起人" width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="服务组" width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="创建日期" width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="期望解决日期" width="100"></vxe-table-column>
                    <vxe-table-column field="sort" title="计划解决日期" width="100"></vxe-table-column>
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
        </basic-area>
    </div>
</template>

<script>
    /**
     * 我处理的列表
     */
    import tableMixins from "@/mixins/tableMixins";
    import { LanguageList, StatusList, DealWithStatus } from "@/const/constData";
    import { getSelect2List, getCascaderJson } from "@/api/isp";
    import { getMultiConditionalQuery } from "@/api/isp";

    import selectRemote from "@/components/jst-components/select-remote"

    export default {
        name: "i-deal-with",

        components: {
            selectRemote,
        },

        mixins: [ tableMixins ],

        data(){
            return {
                getSelect2List: getSelect2List,
                LanguageList: LanguageList,
                StatusList: StatusList,
                DealWithStatus: DealWithStatus,
                searchForm: {
                    FRequestId: "",
                    FStatus: [],
                    FServiceTeam: "",
                    FPlanFinishTime: [],
                },
                getList: getMultiConditionalQuery,
                FServiceTeamList: [],

                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, start]);
                        }
                    },{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
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

        methods: {
            searchCustom(){
                this.search(()=>{
                    // 对传递的参数进行自定义处理
                    // this.tableForm = {
                    //     ...this.tableForm,
                    //     hi: "hello word"
                    // }
                })
            },
            transform(){
                // 选中的行
                let rows = this.$refs.table.getCheckboxRecords();
                console.log(rows);
            },
            edit(){
                // 选中的行
                let rows = this.$refs.table.getCheckboxRecords();
                console.log(rows);
            },
            findDealWith(){
                this.findList(()=>{

                })
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="80px">
                <search-box>
                    <el-form-item label="品牌名称">
                        <el-input v-model.trim="searchForm.name" clearable placeholder="请输入" class="st-input-w"></el-input>
                    </el-form-item>
                    <el-form-item label="语言">
                        <el-select v-model="searchForm.language" clearable placeholder="请选择" class="st-input-w">
                            <el-option v-for="(value, key, index) in LanguageList" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-slot:drop>
                        <el-form-item label="状态">
                            <el-select v-model="searchForm.active" clearable placeholder="请选择" class="st-input-w">
                                <el-option v-for="(item, index) in StatusList" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="排序字段">
                            <el-select v-model="searchForm.sortName" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="Sort排序" value="sort"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <template v-slot:btn>
                        <el-form-item>
                            <el-button type="primary" @click="search()">搜 索</el-button>
                            <el-button type="default" @click="resetSearch">重 置</el-button>
                        </el-form-item>
                    </template>
                </search-box>
            </el-form>

            <!--表格部分-->
            <!--:edit-config="{trigger: 'click', mode: 'row', showIcon: false, showStatus: true, autoClear: false}"-->
            <!--:checkbox-config="{reserve: true}"-->
            <div>
                <vxe-table
                        show-overflow
                        auto-resize
                        highlight-hover-row
                        :height="tableHeight + 120"
                        ref="table"
                        row-id="id"
                        :loading="loading"
                        :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
                        :data.sync="tableData"
                >
                    <!--<vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>-->
                    <vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>
                    <!--<vxe-table-column field="id" title="ID" width="60" ></vxe-table-column>-->
                    <vxe-table-column field="name" title="品牌名称" min-width="100"></vxe-table-column>
                    <vxe-table-column field="language" title="语言" width="80">
                        <template v-slot:default="{ row }">
                            <span>{{ LanguageList[row.language] }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="desc" title="简介" min-width="200"></vxe-table-column>
                    <vxe-table-column field="active" title="状态" width="100">
                        <template v-slot:default="{ row }">
                            <span>{{ row.active | fStatus }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="sort" title="排序" width="100"></vxe-table-column>
                    <vxe-table-column field="id" title="操作" width="150" fixed="right">
                        <template v-slot:default="{ row }">
                            <el-button type="primary" @click="edit(row)" size="mini">编辑</el-button>
                            <el-button @click="showInfo(row)" size="mini">查看</el-button>
                        </template>
                    </vxe-table-column>
                </vxe-table>
                <vxe-pager
                        :loading="loading"
                        :current-page="tablePage.currentPage"
                        :page-size="tablePage.pageSize"
                        :total="tablePage.totalResult"
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
     * 品牌列表
     */
    import tableMixins from "@/mixins/tableMixins";
    import { LanguageList, StatusList } from "@/const/constData";
    import { getMotorCategoryList } from "@/api/motorCategory";

    export default {
        name: "motor-category-list",

        mixins: [ tableMixins ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                searchForm: {
                    name: "",
                    active: "",
                    type: "",
                    language: "",
                    sortName: ""
                },
                getList: getMotorCategoryList,
            }
        },

        created(){
          this.$nextTick(()=>{
              this.findList();
          })
        },

        // 组件激活时调用
        activated(){
            this.findList();
        },

        methods: {
            // 展示
            showInfo(row){
                this.$router.push({
                    path: "/motor-category/motor-category-info/" + row.id
                });
            },

            // 编辑
            edit(row){
                this.$router.push({
                    path: "/motor-category/motor-category-edit/" + row.id
                });
            },
        }
    }
</script>

<style scoped>

</style>

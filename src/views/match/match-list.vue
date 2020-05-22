<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="110px">
                <search-box>
                    <el-form-item label="减速机分类">
                        <el-select v-model.trim="searchForm.categoryName" clearable placeholder="请选择" class="st-input-w">
                            <el-option v-for="(item, index) in reductionCategoryNameList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="减速机规格">
                        <el-select v-model="searchForm.specification" clearable placeholder="请选择" class="st-input-w">
                            <el-option v-for="(item, index) in specList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-slot:drop>
                        <el-form-item label="转动方式" prop="rotation">
                            <el-select v-model="searchForm.rotation" clearable placeholder="请选择" class="st-input-w">
                                <el-option v-for="(value, key, index) in RotationList" :key="index" :label="value" :value="Number(key)"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否匹配基本属性" prop="showProperty">
                            <el-select v-model="searchForm.showProperty" clearable placeholder="请选择" @change="resetProperty" class="st-input-w">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="searchForm.showProperty" label="是否含盖板" prop="isCover">
                            <el-select v-model="searchForm.isCover" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="searchForm.showProperty" label="是否含转接板" prop="isPinboard">
                            <el-select v-model="searchForm.isPinboard" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="searchForm.showProperty" label="是否含接头" prop="isContact">
                            <el-select v-model="searchForm.isContact" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
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
                        :show-overflow="false"
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
                    <vxe-table-column field="categoryName" title="减速机分类" min-width="100"></vxe-table-column>
                    <vxe-table-column field="specification" title="规格" min-width="100"></vxe-table-column>
                    <vxe-table-column field="rotation" title="转动方式" width="80">
                        <template v-slot:default="{ row }">
                            <span>{{ RotationList[row.rotation] }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="showProperty" title="匹配基础属性" min-width="100">
                        <template v-slot:default="{ row }">
                            <span>{{ row.showProperty | toBool }}</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="isCover" title="是否含盖板" width="100">
                        <template v-slot:default="{ row }">
                            <span v-if="row.showProperty">{{ row.isCover | toBool }}</span>
                            <span v-else>-</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="isPinboard" title="是否有转接板" width="100">
                        <template v-slot:default="{ row }">
                            <span v-if="row.showProperty">{{ row.isPinboard | toBool }}</span>
                            <span v-else>-</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="isContact" title="是否有接头" width="100">
                        <template v-slot:default="{ row }">
                            <span v-if="row.showProperty">{{ row.isContact | toBool }}</span>
                            <span v-else>-</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="id" title="匹配电机" min-width="250">
                        <template v-slot:default="{ row }">
                            <div v-for="(item, index) in row.motors" :key="index">
                                品牌：{{item.motorCategoryName}} |  名称：{{item.name}}
                            </div>
                        </template>
                    </vxe-table-column>
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
     * 减速机匹配列表
     */
    import tableMixins from "@/mixins/tableMixins";
    import { LanguageList, StatusList, RotationList } from "@/const/constData";
    import { getMatchList } from "@/api/match";
    import { getAllSpecName } from "@/api/reduction";
    import { getAllReductionCategoryName } from "@/api/reductionCategory";

    export default {
        name: "match-list",

        mixins: [ tableMixins ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                RotationList: RotationList,

                specList: [],
                reductionCategoryNameList: [],

                searchForm: {
                    categoryName: "",
                    specification: "",
                    rotation: "",
                    showProperty: "",
                    isCover: "",
                    isPinboard: "",
                    isContact: "",
                    active: "",
                    type: "",
                    language: "",
                    sortName: ""
                },
                getList: getMatchList,
            }
        },

        created(){
          this.$nextTick(()=>{
              this.getAllSpecName(); // 获取所有规格
              this.getAllReductionCategoryName(); // 获取减速机分类名称
              this.findList();
          })
        },

        // 组件激活时调用
        activated(){
            this.findList();
        },

        methods: {
            // 获取所有规格名称
            getAllSpecName(){
                getAllSpecName().then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.specList = data.data;
                    }
                })
            },

            // 获取减速机分类名称
            getAllReductionCategoryName(){
                getAllReductionCategoryName().then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.reductionCategoryNameList = data.data;
                    }
                })
            },

            resetProperty(){
              this.searchForm.isCover = "";
              this.searchForm.isPinboard = "";
              this.searchForm.isContact = "";
            },

            // 展示
            showInfo(row){
                this.$router.push({
                    path: "/match/match-info/" + row.id
                });
            },

            // 编辑
            edit(row){
                this.$router.push({
                    path: "/match/match-edit/" + row.id
                });
            },
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model.trim="searchForm.name" clearable placeholder="请输入" class="st-input-w"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model.trim="searchForm.contact" clearable placeholder="请输入" class="st-input-w"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search()">搜 索</el-button>
                    <el-button type="default" @click="resetSearch">重 置</el-button>
                </el-form-item>
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
                    <vxe-table-column type="seq" title="序号" width="50" fixed="left"></vxe-table-column>
                    <vxe-table-column field="name" title="姓名" min-width="100"></vxe-table-column>
                    <vxe-table-column field="contact" title="联系方式" min-width="120"></vxe-table-column>
                    <vxe-table-column field="email" title="邮箱" min-width="150"></vxe-table-column>
                    <vxe-table-column field="wechat" title="微信" min-width="100"></vxe-table-column>
                    <vxe-table-column field="qq" title="QQ" min-width="80"></vxe-table-column>
                    <vxe-table-column field="sex" title="性别" width="50"></vxe-table-column>
                    <vxe-table-column field="remark" title="备注" min-width="200"></vxe-table-column>
                    <vxe-table-column field="id" title="操作" width="80" fixed="right" align="center">
                        <template v-slot:default="{ row }">
                            <el-button type="primary" @click="edit(row)" size="mini">备注</el-button>
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

        <el-dialog title="添加备注" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
                <el-form-item label="信息备注" prop="remark">
                    <el-input v-model.trim="form.remark"
                              type="textarea"
                              :autosize="{ minRows: 4, maxRows: 8}" >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRemark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /**
     * 客户列表
     */
    import tableMixins from "@/mixins/tableMixins";
    import { getCustomerList, editCustomer } from "@/api/customer";

    export default {
        name: "customer-list",

        mixins: [ tableMixins ],

        data(){
            return {
                searchForm: {
                    name: "",
                    contact: "",
                },
                form: {
                    remark: "",
                },
                getList: getCustomerList,
                dialogFormVisible: false,
                rules: {
                    remark: [
                        { required: true, customer: '请输入备注信息', trigger: 'blur' },
                    ],
                }
            }
        },

        created(){
          this.$nextTick(()=>{
             this.findList();
          })
        },

        activated(){
            this.$nextTick(()=>{
                this.findList();
            })
        },

        methods: {
            // 编辑
            edit(row){
                this.dialogFormVisible = true;
                this.form = _.cloneDeep(row);
            },

            addRemark(){
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        editCustomer(this.form).then((res)=>{
                            let data = res.data;
                            if(data.code == 1){
                                this.findList();
                                this.$customer.success("填写备注成功");
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>

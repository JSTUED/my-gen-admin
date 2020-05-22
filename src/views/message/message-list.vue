<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="80px">
                <search-box>
                    <el-form-item label="姓名">
                        <el-input v-model.trim="searchForm.name" clearable placeholder="请输入" class="st-input-w"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model.trim="searchForm.contact" clearable placeholder="请输入" class="st-input-w"></el-input>
                    </el-form-item>

                    <template v-slot:drop>
                        <el-form-item label="状态">
                            <el-select v-model="searchForm.status" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="未处理" :value="0"></el-option>
                                <el-option label="已处理" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="searchForm.type" clearable placeholder="请选择" class="st-input-w">
                                <el-option label="图纸匹配" value="paper"></el-option>
                                <el-option label="选型帮助" value="help"></el-option>
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
                    <vxe-table-column type="seq" title="序号" width="50" fixed="left"></vxe-table-column>
                    <!--<vxe-table-column field="id" title="ID" width="60" ></vxe-table-column>-->
                    <vxe-table-column field="name" title="姓名" width="100"></vxe-table-column>
                    <vxe-table-column field="contact" title="联系方式" width="120"></vxe-table-column>
                    <vxe-table-column field="email" title="邮箱" width="150"></vxe-table-column>
                    <vxe-table-column field="wechat" title="微信" width="100"></vxe-table-column>
                    <vxe-table-column field="qq" title="QQ" width="80"></vxe-table-column>
                    <vxe-table-column field="sex" title="性别" width="50"></vxe-table-column>
                    <vxe-table-column field="imgBanList" title="图纸" width="150">
                        <template v-slot:default="{ row }">
                            <!--<a v-for="(item, index) in row.imgBanList" :href="item" target="_blank">-->
                                <!--图纸{{index + 1}}-->
                            <!--</a>-->
                            <el-link v-for="(item, index) in row.imgBanList" :href="item" target="_blank" type="primary" style="font-size: 12px;margin-right: 8px;" :key="index">图纸{{index + 1}}</el-link>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="status" title="状态" width="60">
                        <template v-slot:default="{ row }">
                            {{ row.status == 1 ? "已处理" : "未处理" }}
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="type" title="类型" width="70">
                        <template v-slot:default="{ row }">
                            <span v-if="row.type == 'help'">选型帮助</span>
                            <span v-if="row.type == 'paper'">图纸匹配</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="msg" title="咨询内容" min-width="200"></vxe-table-column>
                    <vxe-table-column field="remark" title="备注" min-width="180"></vxe-table-column>
                    <vxe-table-column field="createTime" title="创建时间" width="140"></vxe-table-column>
                    <vxe-table-column field="id" title="操作" width="180" fixed="right" align="center">
                        <template v-slot:default="{ row }">
                            <el-button type="primary" @click="edit(row)" size="mini">备注</el-button>
                            <el-button v-if="row.status==0" @click="changeStatus(row)" size="mini">更改状态</el-button>
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
     * 咨询列表
     */
    import tableMixins from "@/mixins/tableMixins";
    import { LanguageList, StatusList } from "@/const/constData";
    import { getMessageList, editMessage } from "@/api/message";

    export default {
        name: "message-list",

        mixins: [ tableMixins ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                searchForm: {
                    name: "",
                    contact: "",
                    status: "",
                    type: "",
                    language: "",
                    sortName: ""
                },
                form: {
                    remark: "",
                },
                getList: getMessageList,
                dialogFormVisible: false,
                rules: {
                    remark: [
                        { required: true, message: '请输入备注信息', trigger: 'blur' },
                    ],
                }
            }
        },

        created(){
          this.$nextTick(()=>{
             this.findListMsg();
          })
        },

        activated(){
            this.$nextTick(()=>{
                this.findListMsg();
            })
        },

        methods: {
            findListMsg(){
                this.findList((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        let { tablePage, list } = data.data;
                        list.forEach((item)=>{
                            let imgList = [];
                            try {
                                imgList = JSON.parse(item.imgList)
                            }catch (e) {

                            }
                            item.imgBanList = imgList;
                        });
                        this.tableData = list;
                        this.tablePage.totalResult = tablePage.total;
                        // console.log(list);
                    }
                })
            },
            // 展示
            // showInfo(row){
            //     this.$router.push({
            //         path: "/message/message-info/" + row.id
            //     });
            // },

            // 编辑
            edit(row){
                this.dialogFormVisible = true;
                this.form = _.cloneDeep(row);
            },

            changeStatus(row){
                this.$confirm('您确定要将此条信息标记为已处理, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                    center: 'true',
                }).then(() => {
                    let model = _.cloneDeep(row);
                    model.status = 1; // 1 表示已处理 0 表示未处理
                    editMessage(model).then((res)=>{
                        let data = res.data;
                        if(data.code == 1){
                            this.findListMsg();
                            this.$message.success("更改状态成功");
                        }
                    });

                }).catch(() => {

                });

            },

            addRemark(){
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        editMessage(this.form).then((res)=>{
                            let data = res.data;
                            if(data.code == 1){
                                this.findListMsg();
                                this.$message.success("填写备注成功");
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

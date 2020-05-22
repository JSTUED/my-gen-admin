<template>
    <div>
        <basic-area>
            <!--搜索部分-->
            <el-form :inline="true" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model.trim="searchForm.username" clearable placeholder="请输入" class="st-input-w"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.active" clearable placeholder="请选择" class="st-input-w">
                        <el-option label="激活" :value="true"></el-option>
                        <el-option label="冻结" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTableEvent">搜 索</el-button>
                    <el-button type="default" @click="resetSearch">重 置</el-button>
                </el-form-item>
            </el-form>

            <!--表格部分 :toolbar="toolbar" -->
            <div>
                <vxe-grid
                        ref="table"
                        border
                        resizable
                        auto-resize
                        stripe
                        highlight-hover-row
                        row-id="id"
                        size="mini"
                        :height="tableHeight + 165"
                        :pager-config="tablePage"
                        :proxy-config="tableProxy"
                        :checkbox-config="{reserve: true}"
                        :columns="tableColumn"
                >
                    <template v-slot:buttons>
                        <el-button @click="createItem" icon="iconfont icon-Group-" type="primary">添加</el-button>
                        <el-button @click="$refs.table.commitProxy('reload')" icon="iconfont icon-shuaxin">刷新</el-button>
                    </template>
                </vxe-grid>
            </div>
        </basic-area>

        <el-dialog title="重置密码" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="新密码" label-width="80px">
                    <el-input v-model.trim="password" autocomplete="off" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPass">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getUserPage, resetPassword, deleteUser } from "@/api/user";
    import { dateFormat } from "@/util/date";
    export default {
        name: "user-list",

        data(){
            return {
                searchForm: {
                    username: "",
                    active: ""
                },
                orginSearchForm: {},
                dialogFormVisible: false,
                password: "",
                editForm: {},

                tablePage: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 30,
                    background: true
                },
                toolbar: {
                    id: 'toolbar_01',
                    refresh: true,
                    custom: {
                        storage: true
                    }
                },
                tableForm: {},
                tableColumn: [
                    { type: 'seq', title: '序号', width: 60 },
                    // { field: 'id', title: 'ID', width: 50 },
                    { field: 'username', title: '用户名', minWidth: 200 },
                    { field: 'email', title: '邮箱', minWidth: 200 },
                    { field: 'nick', title: '昵称', width: 200 },
                    {
                        field: 'sex',
                        title: '性别',
                        width: 50,
                        slots: {
                            default: ({ row, column }) =>{
                                return row.sex ==1 ? "男": "女";
                            }
                        }
                    },
                    { field: 'role', title: '角色', width: 80 },
                    { field: 'phone', title: '手机', width: 100 },
                    // {
                    //     field: 'avatar',
                    //     title: '头像',
                    //     minWidth: 200,
                    //     slots: {
                    //         default: ({ row, column }) =>{
                    //             return [<img src={row.avatar} style="height: 50px;max-width:100%;" alt="头像" />]
                    //         }
                    //     }
                    // },
                    {
                        field: 'active',
                        title: '状态',
                        width: 70,
                        slots: {
                            default: ({ row, column }) =>{
                                return row.active ? "激活" : "冻结";
                            }
                        }
                    },

                    {
                        field: 'createTime',
                        title: '创建时间',
                        width: 150,
                        // slots: {
                        //     default: ({ row, column }) =>{
                        //         return dateFormat(new Date(row.createTime));
                        //     }
                        // }
                    },

                    {
                        field: '',
                        title: '操作',
                        width: 240,
                        fixed: "right",
                        align: "center",
                        slots: {
                            default: ({row, column}) => {
                                // 若语法红色 可以设置中 preferences -> Languages & Frameworks -> JavaScript 中 Javascript version为 ReactJSX （如果没有，就JSX Harmony）
                                return [
                                    <el-button type="primary" onClick={ ()=> this.edit(row, column)} size="mini">编辑</el-button>,
                                    <el-button onClick={ ()=> this.showInfo(row, column)} size="mini">查看</el-button>,
                                    <el-button onClick={ ()=> this.showPassword(row, column)} size="mini">重置密码</el-button>,
                                    // <el-button type="danger" onClick={ ()=>this.delete(row, column) } size="mini">删除</el-button>,
                                ]
                            }
                        }
                    },
                ],
                tableProxy: {
                    seq: true, // 启用动态序号代理
                    props: {
                        result: 'result',
                        total: 'page.total'
                    },
                    ajax: {
                        // 查询
                        query: ({ page }) => {
                            // console.log(page);
                            return getUserPage({
                                currentPage: page.currentPage,
                                pageSize: page.pageSize,
                                ...this.tableForm
                            }).then((res)=>{
                                let data = res.data;
                                if(data.code==1){
                                    let { tablePage, list } = data.data;
                                    return {
                                        page: tablePage,
                                        result: list
                                    }
                                }
                            })
                        },
                    }
                },
            }
        },

        created() {
            this.$nextTick(()=>{
                this.tableForm = _.cloneDeep(this.searchForm);
                this.orginSearchForm = _.cloneDeep(this.searchForm);
            })
        },

        activated(){
            this.$refs.table.commitProxy("reload"); // 重新加载表格
        },

        methods: {
            // 初始化searchForm
            resetSearch(){
                this.searchForm = _.cloneDeep(this.orginSearchForm);
            },

            searchTableEvent () {
                this.tableForm = _.cloneDeep(this.searchForm);
                this.$refs.table.commitProxy("reload"); // 重新加载表格
            },

            // 新增
            createItem(){
                // 跳转创建页面
                this.$router.push({
                    path: "/user/user-add"
                });
            },

            // 展示
            showInfo(row){
                this.$router.push({
                    path: "/user/user-info/" + row.id
                });
            },

            // 编辑
            edit(row){
                this.$router.push({
                    path: "/user/user-edit/" + row.id
                });
            },

            // 删除单个
            delete(row){
                // console.log(row)
                this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                    center: 'true',
                }).then(() => {
                    // console.log(row.id);
                    deleteUser(row.id).then(res=>{
                        res = res.data;
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            }, 300);
                            this.$refs.table.commitProxy("reload"); // 重新加载表格
                        }
                    })

                }).catch(() => {

                });
            },

            // 显示重置密码弹框
            showPassword(row){
                this.editForm = _.cloneDeep(row);
                this.password = "";
                this.dialogFormVisible = true;
            },

            // 提交重置密码
            resetPass(){
                if(!this.password || this.password.length<6){
                    this.$message.warning("密码最少6位");
                    return false;
                }
                this.dialogFormVisible = false;
                resetPassword({
                    id: this.editForm.id,
                    password: this.password
                }).then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.$message({
                            type: 'success',
                            message: '重置成功!'
                        }, 300);
                        this.$refs.table.commitProxy("reload"); // 重新加载表格
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>

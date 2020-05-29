<template>
    <div>
        <basic-block hide-header>
            <el-row>
                <el-col :span="20">
                    <el-form :model="model" :rules="rules" ref="ruleForm" label-width="120px" >
                        <isp-line title="工单信息"></isp-line>
                        <basic-area>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="发起人" prop="FApplicant">
                                        <select-remote v-model="model.FApplicant" remote :remoteMethod="getSelect2List"
                                                       :params="{ pageSize: 10, pageNum: 1, id: 6 }"
                                                       :map="{ label: 'text',value: 'id' }"
                                        ></select-remote>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="期望解决日期" prop="FHopeFinishTime">
                                        <el-date-picker v-model="model.FHopeFinishTime" value-format="yyyy/MM/dd" type="date" placeholder="请选择" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="主题" prop="FSubject">
                                        <el-input v-model.trim="model.FSubject" placeholder="请输入"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <el-form-item label="描述" prop="FContent">
                                        <vue-ckeditor
                                                v-if="refleshEditor"
                                                v-model="model.FContent"
                                                :config="config"
                                                @blur="onBlur($event)"
                                                @focus="onFocus($event)"
                                                @contentDom="onContentDom($event)"
                                                @dialogDefinition="onDialogDefinition($event)"
                                                @fileUploadRequest="onFileUploadRequest($event)"
                                                @fileUploadResponse="onFileUploadResponse($event)" ></vue-ckeditor>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <el-form-item label="附件">
                                        <upload ref="step" v-model="model.file" :limit="1" accept="*" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </basic-area>

                        <isp-line title="服务信息"></isp-line>
                        <basic-area>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="服务组别" prop="FServiceTeam">
                                        <select-remote v-model="model.FServiceTeam" :remoteMethod="getSelect2List"
                                                       :params="{ pageSize: 10, pageNum: 1, id: 18, searchTerm: 2 }"
                                                       :map="{ label: 'text',value: 'id' }"
                                                       @change="changeService"
                                        ></select-remote>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="服务人员" prop="FAssignee">
                                        <select-remote ref="FAssignee" v-model="model.FAssignee" :remoteMethod="getSelect2List" :auto="false"
                                                       :params="{ pageSize: 10, pageNum: 1, id: 10, searchTerm: model.FServiceTeam }"
                                                       placeholder="请先选择服务类别"
                                                       :map="{ label: 'text',value: 'id' }"
                                        ></select-remote>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="工单分类" prop="FServiceType">
                                        <el-cascader
                                                style="width: 100%;"
                                                clearable
                                                v-model="model.FServiceType"
                                                :props="{ label: 'n', value: 'c', children: 'd' }"
                                                :options="workCategoryList"></el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="计划解决日期" prop="FPlanFinishTime">
                                        <el-date-picker v-model="model.FPlanFinishTime" value-format="yyyy/MM/dd" type="date" placeholder="请选择" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <el-form-item label="" style="margin-bottom: 0px;">
                                        <el-button type="primary" icon="el-icon-plus" @click="submitForm('ruleForm')">创建工单</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </basic-area>
                    </el-form>
                </el-col>
            </el-row>
        </basic-block>
    </div>
</template>

<script>
    import ispLine from "@/views/isp/components/isp-line";
    import selectRemote from "@/components/jst-components/select-remote"
    import { getSelect2List, getCascaderJson } from "@/api/isp";
    import editorMixins from "@/mixins/editorMixins";
    import VueCkeditor from 'vue-ckeditor2';
    import Upload from "@/components/jst-components/upload";

    export default {
        name: "add-form",
        components: {
            ispLine,
            selectRemote,
            VueCkeditor,
            Upload
        },
        mixins: [
            editorMixins
        ],
        data(){
            return {
                getSelect2List: getSelect2List,
                model: {
                    FApplicant: "",
                    FHopeFinishTime: "",
                    FSubject: "",
                    FContent: "",
                    file: "",
                    FServiceTeam: "",
                    FAssignee: "",
                    FServiceType: "",
                    FPlanFinishTime: "",
                },
                action: "https://jst-isp.justech.com:5004/api/Upload/UploadFile",
                workCategoryList: [],
                rules: {
                    FApplicant: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    FHopeFinishTime: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    FSubject: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { max: 200, message: '主题最大200字符', trigger: 'change' },
                    ],
                    FContent: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { max: 2000, message: '描述最大2000字符', trigger: 'change' },
                    ],
                    FServiceTeam: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    FAssignee: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    FServiceType: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    FPlanFinishTime: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                }
            }
        },
        created(){
            this.$nextTick(()=>{
                this.init();
            })
        },
        methods: {
            async init(){
                console.log(this.$route);
                this.getWorkCategory();
                this.config.height = 170;
            },

            changeService(val){
                setTimeout(()=>{
                    this.$refs.FAssignee.reflesh();
                }, 0)
            },
            getWorkCategory(){
                getCascaderJson({
                    type: "c,n,d",
                    id: 19,
                    p: 2
                }).then((res)=>{
                    this.workCategoryList = res || [];
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.type == "create" ? this.create() : this.update();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            create(){
                // 创建时调用的方法 提交数据给后台
                this.loading = true;
                setTimeout(()=>{
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    }, 2000);

                    // this.closeCurrentTag();
                    // this.$router.push({
                    //     path: "/xxx"
                    // });
                    this.loading = false;
                }, 2000)
            },

            update(){
                // 更新时调用的方法 提交数据给后台
                this.loading = true;
                setTimeout(()=>{
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    }, 2000);

                    // this.closeCurrentTag();
                    // this.$router.push({
                    //     path: "/xxx"
                    // });
                    this.loading = false;
                }, 2000)
            },
        }
    }
</script>

<style scoped>

</style>
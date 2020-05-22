<template>
    <div class="match-add">
        <basic-block :title="title">
            <div>
                <el-row>
                    <el-col :lg="{span: 24}" :md="{span:24}">
                        <el-form :model="model" :rules="rules" ref="ruleForm" label-width="150px">
                            <!--<el-form-item label="选择要绑定的减速机：">-->
                                <!--<el-select v-model.trim="model.categoryName" clearable placeholder="选择减速机分类" class="st-input-w match-input">-->
                                    <!--<el-option v-for="(item, index) in reductionCategoryNameList" :key="index" :label="item" :value="item"></el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->

                            <el-form-item label="选择减速机参数：">
                                <el-form label-width="90px" :inline="true">
                                    <!--label="减速机分类"-->
                                    <el-form-item label="减速机分类">
                                        <el-select v-model.trim="model.categoryName" clearable filterable placeholder="选择减速机分类" class="st-input-w match-input">
                                            <el-option v-for="(item, index) in reductionCategoryNameList" :key="index" :label="item" :value="item"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="减速机规格">
                                        <el-select v-model="model.specification" clearable filterable placeholder="选择减速机规格" class="st-input-w match-input">
                                            <el-option v-for="(item, index) in specList" :key="index" :label="item" :value="item"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="转动方式">
                                        <el-select v-model="model.rotation" clearable placeholder="选择转动方式" class="st-input-w match-input">
                                            <el-option v-for="(value, key, index) in RotationList" :key="index" :label="value" :value="Number(key)"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <!--<br>-->

                                    <el-form-item label="匹配基本属性" prop="showProperty">
                                        <el-select v-model="model.showProperty" placeholder="请选择" @change="resetProperty" class="st-input-w">
                                            <el-option label="是" :value="true"></el-option>
                                            <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="含盖板" v-if="model.showProperty">
                                        <el-select v-model="model.isCover" clearable placeholder="选择是否含盖板" class="st-input-w match-input">
                                            <el-option label="是" :value="true"></el-option>
                                            <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="含转接板" v-if="model.showProperty">
                                        <el-select v-model="model.isPinboard" clearable placeholder="选择是否含转接板" class="st-input-w match-input">
                                            <el-option label="是" :value="true"></el-option>
                                            <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="含接头" v-if="model.showProperty">
                                        <el-select v-model="model.isContact" clearable placeholder="选择是否含接头" class="st-input-w match-input">
                                            <el-option label="是" :value="true"></el-option>
                                            <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>


                            <el-form-item label="选择要绑定的电机：">
                                <el-transfer
                                        style="text-align: left; display: inline-block"
                                        v-model="motors"
                                        filterable
                                        :titles="['源列表', '目标列表']"
                                        :props="{
                                          key: 'id',
                                          label: 'name'
                                        }"
                                        :format="{
                                            noChecked: '${total}',
                                            hasChecked: '${checked}/${total}'
                                          }"
                                        @change="handleChange"
                                        :filter-method="filterMethod"
                                        :data="motorsList">
                                    <span slot-scope="{ option }">【{{ option.motorCategoryName }}】{{ option.name }}</span>
                                </el-transfer>
                            </el-form-item>

                            <el-row>
                                <el-col :span="18">
                                    <el-form-item label="图纸展示图片" prop="bannerList">
                                        <upload v-if="showBannerUpload" ref="banner" multiple v-model="model.bannerList" :limit="20"></upload>
                                    </el-form-item>
                                    <el-form-item label="PDF图纸" prop="pdf">
                                        <upload v-if="showBannerUpload" ref="pdf" v-model="model.pdf" :limit="1" accept=".pdf" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                    <el-form-item label="DWG(2D)图纸" prop="dwg">
                                        <upload v-if="showBannerUpload" ref="dwg" v-model="model.dwg" :limit="1" accept=".dwg" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                    <el-form-item label="STEP(3D)图纸" prop="step">
                                        <upload v-if="showBannerUpload" ref="step" v-model="model.step" :limit="1" accept=".step" :action="action" list-type="text"></upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item v-if="type!='info'">
                                <el-button type="primary" :loading="loading" :disabled="loading" @click="submitForm('ruleForm')">{{type == 'create' ? '立即创建' : '保存'}}</el-button>
                                <el-button v-if="type == 'create'" @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </basic-block>
    </div>
</template>

<script>
    import { getMatchById, addMatch, editMatch } from "@/api/match";
    import { getAllSpecName } from "@/api/reduction";
    import { getAllReductionCategoryName } from "@/api/reductionCategory";
    import { getMotorAll } from "@/api/motor";
    import { LanguageList, StatusList, RotationList } from "@/const/constData";
    import watchRoute from "@/mixins/watch-route";
    import { baseUrl } from '@/config/env';
    import Upload from "@/components/jst-components/upload";

    export default {
        name: "match-add",

        components: {
            Upload,
        },

        mixins: [ watchRoute ],

        data(){
            return {
                LanguageList: LanguageList,
                StatusList: StatusList,
                RotationList: RotationList,

                motorsList: [],
                specList: [],
                reductionCategoryNameList: [],

                title: "减速机匹配绑定",
                type: "create", // create 创建 edit 编辑 info 查看
                model: {
                    categoryName: "",
                    specification: "",
                    rotation: "",
                    showProperty: false,
                    isCover: "",
                    isPinboard: "",
                    isContact: "",
                    language: '',
                    motors: [],
                    bannerList: [],
                    banner: "",
                    pdf: "",
                    dwg: "",
                    step: ""
                },
                motors: [], // 存储选中的电机
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    language: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                },
                loading: false,
                showUpload: true,
                showBannerUpload: true,
                action: baseUrl + "/admin/file/uploadFileName",
                filterMethod(query, item) {
                    return item.name.indexOf(query) > -1 || item.motorCategoryName.indexOf(query) > -1;
                }
            };
        },

        beforeRouteUpdate (to, from, next) {
            console.log(to, from, next);
            this.init && this.init();
            next()
        },

        created() {
            this.$nextTick(()=>{
                this.init();
            })
        },

        activated(){
            this.$nextTick(()=>{
                //this.init();
            })
        },

        methods: {
            init(){
                // console.log(this.$route);
                this.getAllSpecName(); // 获取所有规格
                this.getAllReductionCategoryName(); // 获取减速机分类名称
                this.getMotorAll();
                if(this.$route.params.id){
                    this.getMatch(this.$route.params.id);
                    if(this.$route.name == "编辑减速机匹配"){
                        this.type = "edit";
                        this.title = "编辑减速机匹配";
                    }
                    if(this.$route.name == "减速机匹配信息"){
                        this.type = "info";
                        this.title = "减速机匹配信息";
                    }
                }else {
                    this.type = "create";
                }
            },

            getMatch(id){
                this.showUpload = false;
                this.showBannerUpload = false;
                getMatchById(id).then((res)=>{
                    this.showUpload = true;
                    this.showBannerUpload = true;
                    res = res.data;
                    if(res.code==1){
                        let bannerList = [];
                        try {
                            bannerList = JSON.parse(res.data.banner);
                        }catch (e) {
                        }
                        res.data.bannerList = bannerList;
                        this.model = res.data;
                        this.motors = this.model.motors.map((item)=>{
                            return item.id;
                        })
                    }
                })
            },

            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            },

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

            // 获取所有电机
            getMotorAll(){
                getMotorAll({
                    sortName: "sort"
                }).then((res)=>{
                    let data = res.data;
                    if(data.code == 1){
                        this.motorsList = data.data;
                    }
                })
            },

            resetProperty(){
                this.model.isCover = "";
                this.model.isPinboard = "";
                this.model.isContact = "";
            },

            submitForm(formName) {

                if(this.model.categoryName == ''){
                    this.$message.warning("请选择减速机分类");
                    return false;
                }
                if(this.model.specification == ''){
                    this.$message.warning("请选择减速机规格");
                    return false;
                }
                if(this.model.rotation == ''){
                    this.$message.warning("请选择转动方式");
                    return false;
                }


                if(this.model.showProperty){
                    if(this.model.isCover + '' == ''){
                        this.$message.warning("请选择是否含盖板");
                        return false;
                    }

                    if(this.model.isPinboard + '' == ''){
                        this.$message.warning("请选择是否含转接板");
                        return false;
                    }
                    if(this.model.isContact + '' == ''){
                        this.$message.warning("请选择是否含接头");
                        return false;
                    }
                }

                if (this.motors.length == 0){
                    this.$message.warning("请选择匹配电机");
                    return false;
                }


                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        // 构建已选择的电机
                        this.model.motors = this.motorsList.filter((item)=>{
                           return this.motors.indexOf(item.id) != -1;
                        });
                        this.model.banner = JSON.stringify(this.model.bannerList);
                        this.type == "create" ? this.create() : this.update();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            create(){
                // 创建时调用的方法 提交数据给后台
                this.loading = true;
                addMatch(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '创建成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/match/match-list",
                        }, (to, from, next)=>{
                            if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                                to.meta.isRefresh = true;
                            }
                        });
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },

            update(){
                // 更新时调用的方法 提交数据给后台
                this.loading = true;
                editMatch(_.cloneDeep(this.model)).then(res=>{
                    res = res.data;
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        }, 300);

                        // this.$router.$avueRouter.closeTag();// 关闭tag要在路由跳转之前
                        this.closeCurrentTag();
                        this.$router.push({
                            path: "/match/match-list",
                        }, (to, from, next)=>{
                            if(to.meta.keepAlive==true){ // 定义为缓存组件才能手动清除缓存
                                to.meta.isRefresh = true;
                            }
                        });
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },
        }
    }
</script>

<style lang="scss">
    .match-add{
        .match-w{
            width: 150px;
        }
        .match-input{
            margin-bottom: 15px;
            margin-right: 5px;
        }
        /*.match-input + .match-input{*/
            /*margin-left: 5px;*/
        /*}*/
        .el-transfer-panel{
            width: 300px;
        }
        .el-transfer-panel__body{
            height: 300px;
        }
        .el-transfer-panel__list.is-filterable{
            height: 248px;
        }
    }
</style>

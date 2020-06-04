<template>
    <div class="detail-info">
        <basic-area>
            <split-panel hide-left>
                <!--左侧-->
                <div slot="middle">
                    <div class="detail-info-title">
                        <div class="reason col-md-12">
                            <div class="reason-msg">
                                <div class="reason-msg-title" title="电脑无法启动电脑无法启动电脑无法启动电脑无法启动电脑无法启动">
                                    电脑无法启动电脑无法启动电脑无法启动电脑无法启动电脑无法启动
                                </div>
                                <div class="reason-msg-time reason-msg-time1">
                                    <i class="iconfont icon-fuzeren"></i>
                                    <span @click="userShow()">严蓓蓓</span> | 创建日期：19-09-03 | 计划解决日期：19-09-09
                                </div>
                            </div>
                            <div class="reason-btn">
                                <!--服务人按钮start-->
                                <el-button type="success"><i class="iconfont icon-switchuser"></i>转派工单</el-button>
                                <el-button type="primary" @click="acceptanceShow()"><i class="iconfont icon-gongdanqueren"></i>确认受理</el-button>
                                <el-button type="primary" @click="completeShow()"><i class="iconfont icon-kongxinduigou1"></i>完成工单</el-button>
                            </div>
                        </div>
                    </div>
                    <!--工单描述start-->
                    <div class="log-list1">
                        <div class="log-title1 hidden-btn" @click="toggleShow(1)">
                            <div class="log-title1-text">
                                <span v-if="isDescribe" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                工单描述
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="describe" v-show="isDescribe">
                            <div>{{describeDetail.describeText}}</div>
                            <div class="describe-file" v-if="describeDetail.fileName">
                                <span class="iconfont icon-shiyongwendang"></span>
                                {{describeDetail.fileName}}
                                <span class="file-size">{{describeDetail.fileSize}}</span>
                            </div>
                        </div>
                    </div>
                    <!--工单描述end-->
                    <!--工单活动start-->
                    <div class="log-list1">
                        <div class="log-title1 hidden-btn" @click="toggleShow(2)">
                            <div class="log-title1-text">
                                <span v-if="isActivity" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                工单活动
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="describe" v-show="isActivity">
                            <div id="vertical-timeline">
                                <div class="vertical-timeline-block" v-for="(item,index) in activityList" :key="index">
                                    <div class="order-activity-time">
                                        <div>
                                            <div>{{ dayList[index] }}</div>
                                            <div>{{ timeList[index] }}</div>
                                        </div>
                                        <div class="vertical-timeline-icon blue-bg">
                                            <img :src="item.img" alt="">
                                        </div>
                                    </div>
                                    <div class="vertical-timeline-content">
                                        <div class="order-name">
                                            <i class="iconfont icon-fuzeren"></i>
                                            <span class="order-user" @click="userShow()">{{item.name}}</span>回复了工单 #{{item.orderNum}}
                                            <span class="order-activity-reply">
                                            <i class="iconfont icon-xiaoxi2"></i>回复
                                        </span>
                                        </div>
                                        <div class="order-activity-content">{{ item.content }}</div>
                                        <div class="order-activity-file" v-if="item.fileName">
                                            <span class="iconfont icon-shiyongwendang"></span>
                                            {{ item.fileName }}
                                            <span class="file-size">{{ item.fileSize }}</span>
                                            <span class="order-activity-reply"><i
                                                    class="iconfont icon-download"></i>下载</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--工单活动end-->
                    <!--用户信息弹窗start-->
                    <el-dialog :title="userInfo.department" :visible.sync="userInfoVisible">
                        <el-table :data="userInfo.userList">
                            <el-table-column label="头像">
                                <template scope="scope">
                                    <img :src="scope.row.img" width="32" height="32" class="head_pic"/>
                                </template>
                            </el-table-column>
                            <el-table-column property="jobNum" label="工号"></el-table-column>
                            <el-table-column property="name" label="姓名"></el-table-column>
                            <el-table-column property="email" label="邮件" width="180"></el-table-column>
                            <el-table-column property="minNum" label="短号"></el-table-column>
                            <el-table-column property="job" label="职位"></el-table-column>
                            <el-table-column property="state" label="状态">
                                <template scope="scope">
                                    <el-tag v-if="scope.row.state === 0">正常</el-tag>
                                    <el-tag v-else type="danger">异常</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                    <!--用户信息弹窗end-->
                    <!--确认受理弹窗start-->
                    <el-dialog title="确认受理" :visible.sync="acceptanceVisible">
                        <el-form :model="form" :rules="rules" ref="form">
                            <el-form-item label="服务分类" prop="type" :label-width="formLabelWidth">
                                <el-select v-model="form.type" placeholder="请选择服务分类" style="width: 90%">
                                    <el-option label="分类一" value="分类一"></el-option>
                                    <el-option label="分类二" value="分类二"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="承诺解决日期" :label-width="formLabelWidth">
                                <el-date-picker
                                        v-model="form.date"
                                        type="date"
                                        style="width: 90%"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注信息" :label-width="formLabelWidth">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        maxlength="200"
                                        show-word-limit
                                        style="width: 90%"
                                        placeholder="请输入备注信息"
                                        v-model="form.textarea">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="acceptanceVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!--确认受理弹窗end-->
                    <!--完成工单弹窗start-->
                    <el-dialog title="完成工单" :visible.sync="completeVisible">
                        <el-form>
                            <el-form-item label="完成类型" :label-width="formLabelWidth">
                                <span>成功完成</span>
                            </el-form-item>
                            <el-form-item label="完成注释" :label-width="formLabelWidth">
                                <span>已经成功</span>
                            </el-form-item>
                            <el-form-item label="服务评价" prop="star" :label-width="formLabelWidth">
                                <el-rate
                                        v-model="completeForm.star"
                                        :texts="texts"
                                        show-text>
                                </el-rate>
                            </el-form-item>
                            <el-form-item label="备注信息" :label-width="formLabelWidth">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        style="width: 90%"
                                        placeholder="请输入备注信息"
                                        v-model="completeForm.textarea">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="completeVisible = false">取 消</el-button>
                            <el-button type="primary" @click="completeSubmit('completeForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!--完成工单弹窗end-->
                </div>
                <!--右侧-->
                <div slot="right" class="right-content">
                    <!--工单属性start-->
                    <div class="log-list1">
                        <div class="log-title1 hidden-btn" @click="toggleShow(3)">
                            <div class="log-title1-text">
                                <span v-if="isAttribute" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                工单属性
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="order-right-content" v-show="isAttribute">
                            <div class="describe-list">
                                <span class="right-label">工单状态</span>
                                <el-tag type="success">处理中</el-tag>
                                <!--<el-tag type="warning">待受理</el-tag>-->
                                <!--<el-tag type="success">已完成</el-tag>-->
                                <!--<el-tag type="info">确认关闭</el-tag>-->
                                <!--<el-tag type="info">自动关闭</el-tag>-->
                                <!--<el-tag type="danger">已取消</el-tag>-->
                            </div>
                            <div class="describe-list">
                                <span class="right-label">工单分类</span>
                                <div class="describe-edit" v-if="isOrderType">
                                    <span v-for="item in orderTypeText" :key="item">
                                        {{ item }}
                                    </span>
                                    <i @click="toggleSel(1)" class="iconfont icon-edit order-msg-edit describe-icon"></i>
                                </div>
                                <div v-else class="order-right-select">
                                    <el-cascader
                                            v-model="orderTypeVal"
                                            :options="orderTypeList"
                                            style="width: 165px"
                                            :props="{ expandTrigger: 'hover' }">
                                    </el-cascader>
                                    <div class="edit-btn">
                                        <i @click="orderTypeOk()" class="iconfont icon-check describe-check"></i>
                                        <i @click="isOrderType = true" class="iconfont icon-close describe-close"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">服务目录</span>
                                <span>ITC服务</span>
                            </div>
                        </div>
                    </div>
                    <!--工单属性end-->
                    <!--相关人员start-->
                    <div class="log-list1">
                        <div class="log-title1 hidden-btn" @click="toggleShow(4)">
                            <div class="log-title1-text">
                                <span v-if="isPersonnel" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                相关人员
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="order-right-content" v-show="isPersonnel">
                            <div class="describe-list">
                                <span class="right-label">服务人</span>
                                <span class="right-user">
                                                <i class="iconfont icon-fuzeren"></i>
                                                <span @click="userShow()">ITC服务组-严蓓蓓</span>
                                            </span>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">发起人</span>
                                <span class="right-user">
                                                <i class="iconfont icon-fuzeren"></i>
                                                <span @click="userShow()">李生</span>
                                            </span>
                            </div>
                            <div class="describe-list user-list">
                                <span class="right-label">抄送人</span>
                                <div class="describe-edit" v-if="isCopyUser">
                                    <div class="copy-user-list">
                                        <el-tag type="info" v-for="item in copyUserText" :key="item">{{item}}</el-tag>
                                    </div>
                                    <i @click="toggleSel(2)" class="iconfont icon-edit order-msg-edit describe-icon"></i>
                                </div>
                                <div v-else class="order-right-select">
                                    <el-select v-model="copyUserVal" style="width: 165px" multiple filterable placeholder="请选择抄送人">
                                        <el-option
                                                v-for="item in copyUserList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <div>
                                        <div class="edit-btn">
                                            <i @click="CopyUserOk()" class="iconfont icon-check describe-check"></i>
                                            <i @click="isCopyUser = true" class="iconfont icon-close describe-close"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--相关人员end-->
                    <!--相关信息start-->
                    <div class="log-list1">
                        <div class="log-title1 hidden-btn" @click="toggleShow(5)">
                            <div class="log-title1-text">
                                <span v-if="isMessage" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                相关信息
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="order-right-content" v-show="isMessage">
                            <div class="describe-list">
                                <span class="right-label">期望解决日期</span>
                                <span>{{ timeDetail.expectTime }}</span>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">计划解决日期</span>
                                <div class="describe-edit" v-if="isSolveDate">
                                    <span>{{ timeDetail.planTime }}</span>
                                    <i @click="toggleSel(3)" class="iconfont icon-edit order-msg-edit describe-icon"></i>
                                </div>
                                <div v-else class="order-right-select">
                                    <el-date-picker
                                            v-model="solveDateVal"
                                            type="date"
                                            style="width: 165px"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                    <div class="edit-btn">
                                        <i @click="solveDateOk()" class="iconfont icon-check describe-check"></i>
                                        <i @click="isSolveDate = true" class="iconfont icon-close describe-close"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">创建日期</span>
                                <span>{{ timeDetail.foundTime }}</span>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">响应日期</span>
                                <span>{{ timeDetail.responseTime }}</span>
                            </div>
                            <div class="describe-list">
                                <span class="right-label">受理日期</span>
                                <span>{{ timeDetail.acceptTime }}</span>
                            </div>
                        </div>
                    </div>
                    <!--相关信息end-->
                </div>
            </split-panel>
        </basic-area>
    </div>
</template>

<script>
    import splitPanel from "@/components/jst-components/split-panel"
    import moment from 'moment'
    export default {
        name: "detail-info",
        components: {
            splitPanel
        },
        data(){
            return{
                isDescribe: true, // 工单描述
                isActivity: true, // 工单活动
                isAttribute: true, // 相关属性
                isPersonnel: true, // 相关人员
                isMessage: true, // 相关信息
                isOrderType: true, // 右侧工单分类选择
                isCopyUser: true, // 右侧抄送人选择
                isSolveDate: true, // 右侧计划解决日期
                userInfoVisible: false, // 用户信息
                acceptanceVisible: false, // 确认受理
                completeVisible: false, // 完成工单
                dayList: [], // 年月日
                timeList: [], // 时分秒
                describeDetail:{
                    describeText: '电脑开机后会自动闪退',fileName: '附件文档名.txt',fileSize: '125kb',
                },
                activityList:[
                    {
                        img: require('../../../assets/photos_nan.png'), time: '2019-09-05 11:56',
                        name: '魏苏云（JST4786）',orderNum: '19026454',fileName: '附件文档名.txt',fileSize: '125kb',
                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                    },
                    {
                        img: require('../../../assets/photos_nv.png'), time: '2020-03-05 15:56',
                        name: '魏苏云（JST4786）',orderNum: '19026454',
                        content: '内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                    },
                ],
                userInfo:{
                    department: '用户体验课',
                    userList: [
                        {
                            img: require('../../../assets/photos_nv.png'),
                            jobNum: 'JST4579',
                            name: '唐薇',
                            email: 'amy.li@justech.com',
                            minNum: '67212',
                            job: '员工',
                            state: 0, // 0正常
                        }
                    ],
                },
                form: {
                    type: '',
                    date: '',
                    textarea: '',
                },
                formLabelWidth: '120px',
                rules: {
                    type: [
                        { required: true, message: '请选择服务分类', trigger: 'change' }
                    ],
                },
                completeForm:{
                    type: '',
                    star: 0,
                    textarea: '',
                },
                completeRules: {
                    type: [
                        { required: true, message: '请选择完成类型', trigger: 'change' }
                    ],
                },
                texts: ['非常差', '差', '一般', '满意', '非常满意'],
                orderTypeText: ['系统缺陷'],
                orderTypeVal: [],
                orderTypeList: [
                    {
                        value: '产品开发二部',
                        label: '产品开发二部',
                        children: [
                            {
                                value: '集团官网',
                                label: '集团官网',
                            }
                        ]
                    },
                    {
                        value: '部门2',
                        label: '部门2',
                    },
                    {
                        value: '部门3',
                        label: '部门3',
                    }
                ],
                copyUserText: ['王颖','李慧云'],
                copyUserList: [
                    {value: '王颖', label: '王颖'},
                    {value: '李慧云', label: '李慧云'},
                    {value: '李慧云1', label: '李慧云1'},
                    {value: '李慧云2', label: '李慧云2'},
                    {value: '李慧云3', label: '李慧云3'},
                    {value: '王颖2', label: '王颖2'}
                ],
                copyUserVal: [],
                timeDetail:{
                    expectTime: '2019-08-31',
                    planTime: '2019-08-31',
                    foundTime: '2019-08-31 10:56:20',
                    responseTime: '2019-08-31 10:56:20',
                    acceptTime: '2019-08-31 10:56:20'
                },
                solveDateVal: '',
            }
        },
        created(){
            for(let i=0; i<this.activityList.length; i++){
                this.activityList[i].time = moment(this.activityList[i].time).format('YYYY-MM-DD日 HH:mm:ss');
                this.dayList.push(this.activityList[i].time.match(/(\S*)日/)[1]);
                this.timeList.push(this.activityList[i].time.split("日")[1]);
            }
        },
        methods:{
            // 内容展示和收起
            toggleShow(num){
                if(num === 1){
                    this.isDescribe = !this.isDescribe;
                }else if(num === 2){
                    this.isActivity = !this.isActivity;
                }else if(num === 3){
                    this.isAttribute = !this.isAttribute;
                }else if(num === 4){
                    this.isPersonnel = !this.isPersonnel;
                }else if(num === 5){
                    this.isMessage = !this.isMessage;
                }

            },
            // 展示用户信息
            userShow(){
                this.userInfoVisible = true
            },
            // 确认受理
            acceptanceShow(){
                this.acceptanceVisible = true
            },

            // 确认受理表单提交
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 完成工单
            completeShow(){
                this.completeVisible = true
            },
            // 完成工单提交
            completeSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 工单属性->工单分类值
            toggleSel(num){
                if(num === 1){
                    this.isOrderType = false;
                }else if(num === 2){
                    this.isCopyUser = false;
                }else if(num === 3){
                    this.isSolveDate = false;
                }
            },
            // 工单分类选择
            orderTypeOk(){
                if(this.orderTypeVal.length === 0){
                    this.$message({
                        message: '请选择对应的工单分类！',
                        type: 'warning'
                    });
                }else {
                    this.orderTypeText = this.orderTypeVal;
                    for (let i=0; i<this.orderTypeText.length; i++){
                        if(i != this.orderTypeText.length-1){
                            this.orderTypeText[i] = this.orderTypeText[i] + ' - '
                        }
                    }
                    this.isOrderType = true
                }
            },
            // 添加抄送人
            CopyUserOk(){
                if(this.copyUserVal.length === 0){
                    this.$message({
                        message: '请选择需要添加的抄送人！',
                        type: 'warning'
                    });
                }else {
                    this.copyUserText = this.copyUserVal;
                    this.isCopyUser = true
                }
            },
            // 计划解决日期
            solveDateOk(){
                if(this.solveDateVal === ''){
                    this.$message({
                        message: '请选择计划解决日期！',
                        type: 'warning'
                    });
                }else {
                    this.timeDetail.planTime = moment(this.solveDateVal).format('YYYY-MM-DD');
                    this.isSolveDate = true
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .reason-btn{
        margin: 20px 0 35px 0;
        button{
            i{
                margin: 0 5px;
            }
        }
    }
    .reason-msg-time{
        margin-bottom: 10px;
        font-size: 14px;
        margin-top: 10px;
        span{
            text-decoration: underline;
            cursor: pointer;
            margin-left: 5px;
        }
    }
    .log-title1{
        font-size: 14px;
        cursor: pointer;
        width: 100%;
        height: 25px;
        line-height: 25px;
        position: relative;
        color: #333;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
            color: #adadad;
            font-size: 12px;
            margin-right: 5px;
        }
        .log-title1-text{
            width: 100px;
        }
        .dividing-line{
            width: 85%;
            height: 1px;
            background-color: #e7e7e7;
        }
    }
    .describe{
        padding: 0 30px;
        margin: 25px 0 35px 0;
        line-height: 20px;
        color: #666;
        .describe-file{
            margin-top: 5px;
            color: #999;
        }
        .file-size{
            margin-left: 15px;
        }
    }
    /*活动描述*/
    #vertical-timeline{
        position: relative;
        .vertical-timeline-block{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            position: relative;
            .order-activity-time{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 120px;
            }
            .vertical-timeline-icon{
                width: 32px;
                height: 32px;
                background-color: #fff;
                img{
                    width: 32px;
                    height: 32px;
                }
            }
            .vertical-timeline-content{
                width: 82%;
                min-width: 580px;
                .order-name{
                    color: #666;
                    .order-user{
                        text-decoration: underline;
                        cursor: pointer;
                        margin-left: 5px;
                    }
                }
                .order-activity-content{
                    color: #666;
                    margin-top: 10px;
                }
                .order-activity-file{
                    margin-top: 10px;
                    .file-size{
                        margin-left: 0;
                    }
                }
            }
            .order-activity-reply{
                margin-left: 15px;
                color: #3AA1FF;
                cursor: pointer;
                text-decoration: none;
                i{
                    margin-right: 5px;
                }
            }
        }
    }
    #vertical-timeline:before {
        width: 1px;
        background: #e7e7e7;
        content: '';
        position: absolute;
        top: 0;
        left: 103px;
        height: 100%;
    }
    .el-rate{
        height: 32px;
        line-height: 2.5;
    }
    /*右侧样式*/
    .right-content {
        padding: 0 15px;
        .order-right-content {
            color: #666;
            font-size: 12px;
            padding: 0 0 0 30px;
            margin-top: 10px;
            .describe-list {
                min-height: 30px;
                margin: 10px 0;
                line-height: 30px;
                position: relative;
                .describe-edit{
                    display: inline-block;
                    .copy-user-list{
                        width: 145px;
                    }
                    i{
                        font-size: 16px;
                        position: absolute;
                        right: 0;
                        top: 8px;
                        cursor: pointer;
                    }
                    .el-tag{
                        margin-right: 10px;
                    }
                }
                .order-right-select{
                    position: absolute;
                    top: 0;
                    right: 0;
                    .edit-btn{
                        z-index: 10;
                        position: absolute;
                        right: 0;
                        i{
                            margin-left: 5px;
                            font-size: 12px;
                            cursor: pointer;
                            border: 1px solid #c3c3c3;
                        }
                    }
                }
                .right-user{
                    span{
                        text-decoration: underline;
                        cursor: pointer;
                        margin-left: 5px;
                    }
                }
            }
            .user-list{
                display: flex;
                flex-direction: row;
            }
            .right-label {
                display: inline-block;
                width: 75px;
                margin-right: 20px;
                text-align: left;
            }
        }
    }
</style>
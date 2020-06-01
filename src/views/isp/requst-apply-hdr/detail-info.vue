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
                    <div class="log-list1 log-active">
                        <div class="log-title1 hidden-btn" @click="describeShow()">
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
                    <div class="log-list1 log-active">
                        <div class="log-title1 hidden-btn" @click="activityShow()">
                            <div class="log-title1-text">
                                <span v-if="isActivity" class="iconfont icon-down"></span>
                                <span v-else class="iconfont icon-right"></span>
                                工单活动
                            </div>
                            <div class="dividing-line"></div>
                        </div>
                        <div class="describe" v-show="isActivity">
                            <div class="vertical-timeline-block" v-for="(item,index) in activityList" :key="index">
                                <div class="order-activity-time">
                                    <div>{{ dayList[index] }}</div>
                                    <div>{{ timeList[index] }}</div>
                                </div>
                                <div class="vertical-timeline-icon blue-bg">
                                    <img :src="item.img" alt="">
                                    <div class="order-line"></div>
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
                            <el-table-column property="englishName" label="英文名"></el-table-column>
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
                        <el-form :model="completeForm" :rules="completeRules" ref="completeForm">
                            <el-form-item label="完成类型" prop="type" :label-width="formLabelWidth">
                                <el-select v-model="completeForm.type" placeholder="请选择完成类型" style="width: 90%">
                                    <el-option label="分类一" value="分类一"></el-option>
                                    <el-option label="分类二" value="分类二"></el-option>
                                </el-select>
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
                <div slot="right">
                    <!--工单描述start-->
                    <div class="log-list1 log-active">
                        <div class="log-title1 hidden-btn" @click="describeShow()">
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
                isDescribe: true,
                isActivity: true,
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
                            englishName: 'Wei.tang',
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
            describeShow(){
                this.isDescribe = !this.isDescribe;
            },
            activityShow(){
                this.isActivity = !this.isActivity;
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
            // 确认受理表单提交
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
    .vertical-timeline-block{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        position: relative;
        .order-activity-time{
            width: 80px;
        }
        .vertical-timeline-icon{
            img{
                width: 32px;
                height: 32px;
            }
            .order-line{
                width: 1px;
                height: 92%;
                background-color: #e7e7e7;
                position: absolute;
                left: 120px;
                bottom: -20px;
            }
        }
        .vertical-timeline-content{
            width: 80%;
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
    .el-rate{
        height: 32px;
        line-height: 2.5;
    }
</style>
<template>
  <div>
    <basic-container>
      <!--个人信息页面-->
      <div class="info-body">
        <!--左侧导航-->
        <div class="left-nav">
          <el-col>
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @select="selectIndex">
              <el-menu-item index="1">
                <span class="spot"></span>
                <span slot="title">基本信息</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span class="spot"></span>
                <span slot="title">安全设置</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span class="spot"></span>
                <span slot="title">第三方账号绑定</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span class="spot"></span>
                <span slot="title">消息通知</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </div>
        <!--右侧内容-->
        <div class="right-content">
          <!--基本信息start-->
          <div class="basic-msg" v-if="basicShow==1">
            <div class="right-content-title">基本信息</div>
            <div class="right-content-list">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户头像:">
                  <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="昵称:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-radio v-model="form.sex" label="1">男</el-radio>
                  <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="个人简介:">
                  <el-input type="textarea" rows="5" v-model="form.personal"></el-input>
                </el-form-item>
                <el-form-item label="国家/地区">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="中国" value="China"></el-option>
                    <el-option label="德国" value="Germany"></el-option>
                    <el-option label="美国" value="USA"></el-option>
                    <el-option label="印度" value="India"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所在省市">
                  <div class="block">
                    <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="form.selectedOptions2"
                            @change="handleChange">
                    </el-cascader>
                  </div>
                </el-form-item>
                <el-form-item label="街道地址:">
                  <el-input v-model="form.dizhi"></el-input>
                </el-form-item>
                <el-form-item label="所属部门:">
                  <div>{{ form.bumen }}</div>
                </el-form-item>
                <el-form-item label="用户类型:">
                  <div>{{ form.userType }}</div>
                </el-form-item>
                <el-form-item label="注册时间:">
                  <div>{{ form.date }}</div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!--基本信息end-->
          <!--安全设置start-->
          <div class="security-setting" v-if="basicShow==2">
            <div class="right-content-title">安全设置</div>
            <div class="right-setting-list">
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7"><div class="grid-content bg-purple">账号密码</div></el-col>
                <el-col :span="7">
                  <div class="grid-content bg-purple list-text-right" @click="goPassword()">修改</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <div>绑定手机</div>
                    <div>已绑定手机：13913571566</div>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right" @click="goPhone()">修改</div></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <div>绑定邮箱</div>
                    <div>已绑定邮箱：192975519@qq.com</div>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right" @click="goEmail()">修改</div></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <div>密保问题</div>
                    <div>未设置密保问题，密保问题可有效保护账号安全</div>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right">暂不支持设置</div></el-col>
              </el-row>
            </div>
          </div>
          <!--安全设置end-->
          <!--第三方账号绑定start-->
          <div class="third-party" v-if="basicShow==3">
            <div class="right-content-title">第三方账号绑定</div>
            <div class="right-setting-list">
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg" align="middle">
                      <i class="el-icon-success"></i>
                      <div>
                        <div>Github</div>
                        <div>已绑定Github账号：7899078HHY</div>
                      </div>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right" @click="relieveBtn(0)">解除绑定</div></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg" align="middle">
                      <i class="el-icon-success"></i>
                      <div>
                        <div>QQ</div>
                        <div>已绑定QQ账号：13913571566</div>
                      </div>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right" @click="relieveBtn(1)">解除绑定</div></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg" align="middle">
                      <i class="el-icon-success"></i>
                      <div>
                        <div>微博</div>
                        <div>已绑定微博账号：徐小胖</div>
                      </div>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right" @click="relieveBtn(2)">解除绑定</div></el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg" align="middle">
                      <i class="el-icon-success"></i>
                      <div>
                        <div>微信</div>
                        <div>当前未绑定微信账号</div>
                      </div>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="7"><div class="grid-content bg-purple list-text-right">暂不支持</div></el-col>
              </el-row>
            </div>
          </div>
          <!--第三方账号绑定end-->
          <!--消息通知start-->
          <div class="message" v-if="basicShow==4">
            <div class="right-content-title">消息通知</div>
            <div class="right-setting-list">
              <el-row type="flex" class="row-bg" justify="space-between" align="middle">
                <el-col :span="7">
                  <div class="grid-content bg-purple">
                    <div>系统消息</div>
                    <div>系统消息将以站内信的形式通知</div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content bg-purple list-text-right">
                    <el-switch
                            v-model="value2"
                            active-color="#3AA1FF"
                            inactive-color="#e7e7e7">
                    </el-switch>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--消息通知end-->
        </div>
        <!--修改认证-->
        <span>
          <el-dialog title="身份验证"
               fullscreen
               :visible.sync="testBox"
               width="100%"
               append-to-body>
            <div class="testing-content">
              <i class="icon-suoping"></i>
              <div class="test-title">密码认证</div>
              <div class="test-tip">请输入您的密码</div>
              <el-input v-model="passwordVal" type="password" placeholder="请输入您的密码"></el-input>
              <div class="test-btn">
                <el-button size="mini" @click="handleOpen()">取消</el-button>
                <el-button v-if="passwordVal == ''" type="primary" size="mini" disabled>提交</el-button>
                <el-button v-else size="mini" type="primary" @click="submitBtn(testType)">提交</el-button>
              </div>
            </div>
          </el-dialog>
        </span>

        <div class="new-password">
          <el-dialog title="修改手机号" width="35%" :visible.sync="dialogFormVisible" v-if="testType == 1">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model.number="ruleForm.phone" @input="inputPhone" placeholder="请输入新手机号"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input class="new-code" v-model.number="ruleForm.code" placeholder="请输入您收到的短信验证码"></el-input>
                <el-button v-if="codeShow==false" disabled>{{ testForm.codeText }}</el-button>
                <el-button v-else @click="getCode()">获取验证码</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改邮箱" width="35%" :visible.sync="dialogFormVisible" v-if="testType == 2">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="新邮箱地址" prop="email">
                <el-input v-model="ruleForm.email" @input="inputEmail" placeholder="请输入新邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input class="new-code" v-model.number="ruleForm.code" placeholder="请输入您收到的短信验证码"></el-input>
                <el-button v-if="codeShow==false" disabled>{{ testForm.codeText }}</el-button>
                <el-button v-else @click="getCode()">获取验证码</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import option from "@/const/user/info";
  import { isMobile, isEmail } from '@/util/validate'

  export default {
    data() {
      var valPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新手机号'));
        } else if (isMobile(value) === false) {
          callback(new Error('手机号码格式不正确'));
        }else {
          callback();
        }
      };
      return {
        // type: "info",
        testBox: false,
        passwordVal: '',
        testType:0,
        codeShow: false,
        dialogFormVisible: false,
        timer: null,
        ruleForm: {
          phone: '',
          email: '',
          code: '',
        },
        rules: {
          phone: [
            { validator: valPhone, required: true, trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请填写正确的邮箱格式', trigger: 'blur,change' }
          ],
          code: [
            {required: true, message: '请输入您收到的短信验证码', trigger: 'blur'},
            { type: 'number', message: '请填写正确的短信验证码', trigger: 'blur'},
          ],
        },
        testForm: {
          codeText: '获取验证码',
          codeTime: 60,
        },
        formLabelWidth: '120px',
        tipTitle: '确认解绑Github账号',
        tipUser: '您确认要解除绑定 7899078HHY？',
        option: option,
        imageUrl: '',
        form: {
          name: '',
          sex: '1',
          personal: '',
          selectedOptions2: [],
          dizhi: '',
          bumen: '游客',
          userType: '普通用户',
          date: '2018-5-18 12:09:45',
        },
        basicShow:1,
        options: [
          {
            value: 'shanghai',
            label: '上海市',
            children: [
              {
                value: 'hunagpu',
                label: '黄浦区',
              }, {
                value: 'xuhui',
                label: '徐汇区',
              }
            ]
          },
          {
            value: 'jiangsu',
            label: '江苏省',
            children: [
              {
                value: 'nanjing',
                label: '南京市',
              }, {
                value: 'wuxi',
                label: '无锡市',
              }, {
                value: 'suzhou',
                label: '苏州市',
              }, {
                value: 'xuzhou',
                label: '徐州市',
              }, {
                value: 'changzhou',
                label: '常州市',
              }, {
                value: 'yancheng',
                label: '盐城市',
              }
            ]
          },
          {
            value: 'anhui',
            label: '安徽省',
            children: [
              {
                value: 'hefei',
                label: '合肥市'
              }, {
                value: 'wuhu',
                label: '芜湖市'
              }, {
                value: 'bengbu',
                label: '蚌埠市'
              }
            ]
          }
        ],
        value2: true
      };
    },
    created() {
      this.handleWitch();
    },
    methods: {
      handleSubmit() {
        this.$message({
          message: this.form,
          type: "success"
        });
      },
      handleWitch() {
        if (this.type === "info") {
          this.form = {
            username: "smallwei",
            name: "smallwei",
            phone: "1888888888888",
            detail: "这是一个个性签名"
          };
        } else if (this.type === "password") {
          this.form = {
            oldpassword: 11111111,
            newpassword: 22222222,
            newpasswords: 22222222
          };
        }
      },
      handleChange(item) {
        this.type = item.prop;
        this.handleWitch();
      },
      selectIndex(index) {
        if(index == 1){
          this.basicShow = 1
        }else if(index == 2){
          this.basicShow = 2
        }else if(index == 3){
          this.basicShow = 3
        }else if(index == 4){
          this.basicShow = 4
        }
      },
      // 弹窗提示
      relieveBtn(index){
        if(index == 0){
          this.tipTitle = '确认解绑Github账号';
          this.tipUser = '您确认要解除绑定 7899078HHY？'
        }else if(index == 1){
          this.tipTitle = '确认解绑QQ账号';
          this.tipUser = '您确认要解除绑定 13913571566？'
        }else if(index == 2){
          this.tipTitle = '确认解绑微博账号';
          this.tipUser = '您确认要解除绑定 徐小胖？'
        }
        this.$confirm(this.tipUser, this.tipTitle, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
        }).then(() => {
          this.$message({
            type: 'error',
            message: '抱歉，您没有访问权限'
          });
        }).catch(() => {

        });
      },
      // 图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit(){
        console.log('保存')
      },
      goPassword(){
        this.$router.push({ path: "/x-password" });
      },
      goPhone(){
        this.testBox = true;
        this.testType = 1;
      },
      goEmail(){
        this.testBox = true;
        this.testType = 2;
      },
      submitBtn(){
        this.dialogFormVisible = true;
        this.testBox = false;
      },
      // 修改密码身份验证
      handleOpen() {
        this.testBox = false;
        this.passwordVal = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      // 手机号码验证
      inputPhone(){
        if(isMobile(this.ruleForm.phone) == true){
          this.codeShow = true;
        }else {
          this.codeShow = false;
        }
      },
      inputEmail(){
        if(isEmail(this.ruleForm.email) == true){
          this.codeShow = true;
        }else {
          this.codeShow = false;
        }
      },
      getCode(){
        let _this = this;
        if (!_this.timer) {
          _this.codeShow = false;
          _this.timer = setInterval(() => {
            if (_this.testForm.codeTime != 0) {
              let time = _this.testForm.codeTime --;
              _this.testForm.codeText = time + '秒之后重试';
            } else {
              _this.codeShow = true;
              clearInterval(_this.timer);
              _this.timer = null;
              _this.testForm.codeTime = 60;
            }
          }, 1000)
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../../styles/jst-info";
</style>

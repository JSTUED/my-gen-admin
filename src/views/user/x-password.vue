<template>
    <div>
        <basic-block title="修改密码">
            <div class="change-password">
                <div class="change-password-input">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="checkPassok">
                            <el-input type="password" v-model="ruleForm2.checkPassok" auto-complete="off" placeholder="请输入现在使用的密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入新密码，长度为6-20个字符"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
                            <el-button @click="resetForm('ruleForm2')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </basic-block>
    </div>
</template>

<script>
    export default {
        name: "password",
        data() {
            var validatePass1 = (rule, value, callback) => {
                setTimeout(() => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        if (this.ruleForm2.checkPassok !== '') {
                            this.$refs.ruleForm2.validateField('checkPassok');
                        }
                        callback();
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    checkPassok: ''
                },
                rules2: {
                    checkPassok: [
                        {required: true, validator: validatePass1, trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss">
    .change-password{
        background-color: #fff;
        font-size: 14px;
        .change-password-title{
            padding-bottom: 20px;
            border-bottom: 1px solid #E7E7E7;
            color: #000;
            font-weight: 600;
        }
    }
    .change-password-input{
        width: 40%;
        padding: 16px 0;
        .el-form-item__label{
            font-size: 12px;
        }
        input::-webkit-input-placeholder{
            color: #666;
            font-size: 12px;
        }
    }
</style>

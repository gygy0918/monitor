<template>
    <div class="login-wrap">
        <div class="ms-title">照明监控管理系统</div>
        <div class="ms-login" v-if="forget">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" >
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-bottom: 10px"> 登录</el-button>
                    <a @click="forgetPass" > 忘记密码</a>
                </div>
                <!--<el-button @click="forgetPass()" size="mini" >忘记密码？</el-button>-->
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
            <div class="fs-login" v-else>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" >
                <el-form-item prop="username">
                    <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入用户名" v-model="ruleForm2.repassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-bottom: 10px"> 获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入验证码" v-model="ruleForm2.checkpassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-bottom: 10px"> 提交</el-button>
                    <!--<a @click="back" > 返回</a>-->
                </div>
                <!--<el-button @click="forgetPass()" size="mini" >忘记密码？</el-button>-->
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form v->
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                forget:true,
                ruleForm: {
                    username: 'root',
                    password: '123456'
                },
                ruleForm2: {
                    email: '',
                    checkpassword: '',
                    password:'',
                    repassword:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            forgetPass(){
                // this.$router.push('/forgetPass')
                console.log('000000000000',this.forget)
                this.forget=false;
            },
            back(){
                this.forget=true;
            },
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('formName',this.ruleForm)
                        const {username,password}=this.ruleForm;
                        let data={username,password};
                        this.$ajax({
                            method:'post',
                            url:'http://10.103.249.191:8080/login',
                            data:data
                        }).then((res)=>{
                            console.log('test',res)
                            if(res.data.msg==='登录成功'){
                                localStorage.setItem('ms_username',self.ruleForm.username);
                                localStorage.setItem('token',res.data.token);
                                localStorage.setItem('yhId',res.data.yhId);
                                localStorage.setItem('msg',res.data.msg);
                                self.$router.push('/readme');
                            }else {
                                this.$message('请检查用户名或密码是否正确');
//                                alert('请检查用户名或密码是否正确')
                            }

                        })
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
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background:#324;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .fs-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:280px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>

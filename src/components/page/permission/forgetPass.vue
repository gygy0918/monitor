<template>
    <div class="login-wrap">
        <div class="ms-title">校园路灯监控后台管理系统</div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {

            }
        },
        methods: {
            forgetPass(){
                this.$router.push('/forgetPass')
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
                            localStorage.setItem('ms_username',self.ruleForm.username);
                            localStorage.setItem('token',res.data.token);
                            localStorage.setItem('msg',res.data.msg);
                            self.$router.push('/readme');
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
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>

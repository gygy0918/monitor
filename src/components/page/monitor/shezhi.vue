<template>

    <div id="control" style="width: 300px">
       物品名称： <el-input
            placeholder="请输入内容"
            v-model="form.lightName "
            :disabled="true">
        </el-input>
        物品位置： <el-input
        placeholder="请输入内容"
        v-model="form.location"
        :disabled="true">
        </el-input>
            电压： <el-input
            placeholder="请输入内容"
            v-model="form.power"
            :disabled="true">
        </el-input>
            功率： <el-input
            placeholder="请输入内容"
            v-model="form.electricity"
            :disabled="true">
        </el-input>
        <p style="margin-top: 20px;"  >开关</p>
       <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
    style="margin-top: 20px"
        :disabled="this.disable">
    </el-switch>
        <p style="margin-top: 20px;">亮度控制</p>
        <el-slider
            v-model="value8"
            :step="0.1"
            :max="1"
            :disabled="this.disable"
            show-input>
        </el-slider>
            <el-button type="primary" @click="onSubmit" style="margin-top: 20px;">确定并返回</el-button>
            <el-button>取消</el-button>
        <el-button type="primary" @click="checkWarehouse" style="margin-top: 20px;">查看理我最近的仓库</el-button>
        <div style="width: 750px;margin: 20px;float: left">
        <el-table :data="repairInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="20"></el-table-column>-->
            <el-table-column prop="rName" label="维修人员" width="150">
            </el-table-column>
            <el-table-column prop="rCompony" label="所在公司地址" width="150">
            </el-table-column>
            <el-table-column prop="rCall" label="电话" width="150">
            </el-table-column>
            <el-table-column prop="reason" label="维修原因" width="150">
            </el-table-column>
            <el-table-column prop="createTime" label="维修时间" width="150">
            </el-table-column>
            <!--<el-table-column prop="job" label="职位电话" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="state" label="状态" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" width="180">-->
            <!--<template scope="scope">-->
            <!--&lt;!&ndash;<el-button size="small"&ndash;&gt;-->
            <!--&lt;!&ndash;@click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>&ndash;&gt;-->
            <!--<el-button size="small" type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
        </div>

    </div>

</template>

<script>
    export default {
        data: function(){
            return {
              value1: true,
              value2: true,
              type:'',
              disable:true,
              repairInfo:[],
              value8: 0,
                form: {
                    lightId:'',
                    lightName:'',
                    power:'',
                    electricity:'',
                    state:'',
                    location
                },
                ruleForm: {
                    username: 'root',
                    password: '123456'
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
        created(){
            this.form.lightId= window.localStorage.getItem('lightId')
            this.form.lightName= window.localStorage.getItem('lightName')
            this.form.power= window.localStorage.getItem('power')
            this.form.electricity= window.localStorage.getItem('electricity')
            this.form.location= window.localStorage.getItem('location')
            this.form.state=parseInt(window.localStorage.getItem('state'))
            if(this.form.state===2){
                this.value2=false;
                this.disable=false;
            }
            if(this.form.state===0){
                this.disable=true;

            }
            if(this.form.state===1){
                this.disable=false;
                this.value2=true;

            }
            this.$ajax({
                method:'get',
                url:'http://10.103.242.93:8080/repair/find',
                params:{
                    lightId: this.form.lightId,
                },
            }).then((res)=>{
                console.log('test',res.data.data)
                this.repairInfo=res.data.data
//                    localStorage.setItem('ms_username',self.ruleForm.username);
//                    localStorage.setItem('token',res.data.token);
//                    localStorage.setItem('msg',res.data.msg);
//                this.$router.push('/lamp')
            })
//            console.log('state',this.form.state)
//            console.log('value2',this.type)
        },
        methods: {
            checkWarehouse(){
                console.log('jjjjj')
                this.$router.push('/nearbyWarehouse')
            },
            onSubmit() {
                if(this.value2){
                    this.type=1;
                }else {
                    this.type=2;
                }
                let data={type:this.type,lightId:this.form.lightId}
                this.$ajax({
                    method:'post',
                    url:'http://10.103.242.93:8080/commandLog/command',
                    data:data
                }).then((res)=>{
                    console.log('test',res)
//                    localStorage.setItem('ms_username',self.ruleForm.username);
//                    localStorage.setItem('token',res.data.token);
//                    localStorage.setItem('msg',res.data.msg);
                    this.$router.push('/lamp')
                })
//                console.log('submit!',);

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
                            url:'http://10.103.240.238:8080/login',
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

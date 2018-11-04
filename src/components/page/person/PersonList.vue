<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>用户列表管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="form.name" placeholder="姓名" class="handle-input" style="width: 80px;height: 5px;"></el-input>
            <el-input v-model="form.username" placeholder="用户名" class="handle-input" style="width: 80px"></el-input>
            <el-select v-model="form.gender" placeholder="性别" class="handle-select mr10" style="width: 80px;height: 5px;">
                <el-option key="1" label="男" value="1"></el-option>
                <el-option key="2" label="女" value="0"></el-option>
            </el-select>
            <el-select v-model="form.job" placeholder="职位" class="handle-select mr10" style="width: 80px;height: 5px;">
                <el-option key="1" label="管理员" value="管理员"></el-option>
                <el-option key="2" label="采购员" value="采购"></el-option>
            </el-select>
            <el-select v-model="form.state" placeholder="状态" class="handle-select mr10"  style="width: 80px;height: 5px;">
                <el-option key="1" label="在线" value="1"></el-option>
                <el-option key="2" label="不在线" value="0"></el-option>
            </el-select>
            <el-input v-model="form.email" placeholder="邮箱" class="handle-input" style="width: 120px"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="primary"  @click="dialogFormVisible = true">新增人员</el-button>
        </div>
        <el-table :data="usersInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="date" label="日期" sortable width="150">-->
            <!--</el-table-column>-->
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="120">
            </el-table-column>
            <el-table-column prop="job" label="职位" width="120">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="120">
            </el-table-column>
            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="380">
                <template scope="scope">
                    <!--<el-button size="small"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>-->
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" type="danger"
                               @click="checkRole(scope.$index, scope.row)">查看角色</el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
        <el-dialog title="角色信息" :visible.sync="dialogTableVisible" style="width: 50%;margin: auto" >
            <el-table
                :data="role"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="roleName"
                    label="该用户角色信息如下"
                    width="280">
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="新增人员" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules2"  >
                <el-form-item label="*用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" auto-complete="off" placeholder="必填用户名" ></el-input>
                </el-form-item>
                <el-form-item label="*名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="名称（支持中、英下划线，不能纯数字）" ></el-input>
                </el-form-item>
                <el-form-item label="*密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off" placeholder="密码长度6-12位"></el-input>
                </el-form-item>
                <el-form-item label="*用户职位" :label-width="formLabelWidth">
                    <el-select v-model="value2" placeholder="职位"  style="width: 120px">
                        <el-option
                            v-for="item in jobOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*性别" :label-width="formLabelWidth">
                    <!--<el-input v-model="form.gender" auto-complete="off"></el-input>-->
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" auto-complete="off" placeholder="必填手机号"></el-input>
                </el-form-item>
                <el-form-item label="*邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" auto-complete="off" placeholder="必填邮箱"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible2">
            <el-form :model="editForm">
                <el-form-item label="角色编号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.uid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="editForm.job" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="权限" :label-width="formLabelWidth">-->
                <!--<el-input v-model="form.ckHgCount" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="属性" :label-width="formLabelWidth">-->
                <!--<el-input v-model="form.ckAttribute" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="状态" :label-width="formLabelWidth">-->
                <!--<el-input v-model="form.ckStatus" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <!--<el-select v-model="form.region" placeholder="请选择操作权限">-->
                    <!--<el-option label="区域一" value="shanghai"></el-option>-->
                    <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                    <el-checkbox-group v-model="addpermission" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="permission in allpermissions" :label="permission.id" :key="permission.id">{{permission.description}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitUpdatarole('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                usersInfo: [],
                role:[],
                rules2:{},
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogTableVisible:false,
                value:'',
                value2:'',
                jobOptions:[],
                allpermissions:[],
                allpermission:[],
                editForm:{},
                options: [{
                    value: '0',
                    label: '女'
                }, {
                    value: '1',
                    label: '男'
                }],
                dialogFormVisible: false,
                dialogFormVisible2:false,
                form: {
                    username: '',
                    name:'',
                    password: '',
                    job: '',
                    gender: '',
                    phone: '',
                    email: '',
                    state:''
                },
                formLabelWidth: '120px',
                addpermission:[]
            }
        },
        created(){
//            this.getData();
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/userInfo/page',
                    params:{
                        page:1,
                        size:50
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                // this.usersInfo=[],
                    res.data.data.results.map((item)=>{
                        console.log('0000',item.gender)
                      item.gender=item.gender?'男':'女'
                       item.state=item.state?'在线':'不在线'
                    })
                this.usersInfo=res.data.data.results;
                console.log('结果',res.data.data)

            })
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/role/page',
                    params:{
                        page:1,
                        size:50
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
            this.allpermissions=res.data.data.results;
            console.log('角色结果',res.data.data.results)

        })
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/list/job',
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                // this.usersInfo=[],
        //         res.data.data.results.map((item)=>{
        //         console.log('0000',item.gender)
        //     item.gender=item.gender?'男':'女'
        //     item.state=item.state?'在线':'不在线'
        // })
        //     this.usersInfo=res.data.data.results;
                this.jobOptions=res.data;
            console.log('job结果',res.data)

        })
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            submitUpdatarole(form){
                let subForm={uid:this.editForm.uid}
                let data=Object.assign({},subForm);
                let roleList=[]
                this.addpermission.map((item)=>{
                    item={id:item}
                    roleList.push(item)
            })
                data.roleList=roleList
                // delete data.permissions
                console.log('编辑提交信息',data)
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    console.log('编辑结果',res)
            });
                this.dialogFormVisible2 = false;
            },
            checkRole(index, row){
                // let uid = row.uid
                this.dialogTableVisible = true;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo/userRoles',
                        params:{
                              uid: row.uid
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                        this.role=[];
                        this.role=res.data;
                console.log('chakanjuese结果',res.data)

            })
            },
            handleCheckedCitiesChange(value) {
                console.log('fuxuan',value)
//                let obj={}
//                obj.id=value
//                console.log('22',obj)
                let checkedCount = value.length;
                this.addpermission=[];
                this.addpermission=value;
            },
            addUser(formName){
                let data=Object.assign({},this.form,{gender:this.value},{job:this.value2});
                console.log('ttt',data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    // this.usersInfo=[],
                    //     this.usersInfo=res.data.data.results;
                    // console.log('结果',this.usersInfo)
                    this.getData();
                });
                this.dialogFormVisible = false;
            },
            handleCurrentChange(val){
                console.log('fenye',val)
                this.cur_page = val;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo/page',
                        params:{
                            page:this.cur_page,
                            size:5,
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.usersInfo=[],
                        res.data.data.results.map((item)=>{
                            console.log('0000',item.gender)
                            item.gender=item.gender?'男':'女'
                            item.state=item.state?'在线':'不在线'
                        })
                    this.usersInfo=res.data.data.results;
                    console.log('fenye结果',this.usersInfo)
                });
            },
            getData(){
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo/page',
                        params:{
                            page:1,
                            size:50
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    // this.usersInfo=[],
                    res.data.data.results.map((item)=>{
                    console.log('0000',item.gender)
                item.gender=item.gender?'男':'女'
                item.state=item.state?'在线':'不在线'
            })
                this.usersInfo=res.data.data.results;
                console.log('结果',res.data.data)

            })
            },
            search(){
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo/page',
                        params:{
                            page:1,
                            size:5,
                            gender:this.form.gender,
                            job:this.form.job,
                            username:this.form.username,
                            name:this.form.name,
                            phone: this.form.phone,
                            email: this.form.email,
                            state:this.form.state
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.usersInfo=[],
                        res.data.data.results.map((item)=>{
                            console.log('0000',item.gender)
                            item.gender=item.gender?'男':'女'
                            item.state=item.state?'在线':'不在线'
                        })
                        this.usersInfo=res.data.data.results;
                    console.log('结果',this.usersInfo)
                });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                this.dialogFormVisible2 = true;
//                this.$message('编辑第'+(index+1)+'行');
                this.editForm=row;
                console.log('bianji',this.editForm)
            },
//            handleDelete(index, row) {
//                this.$message.error('删除第'+(index+1)+'行');
//                this.$ajax(
//                    {
//                        method: 'post', //请求方式
//                        url: 'http://10.103.240.238:8080/userInfo/{uid}',
//                        data:data
//                        headers:{"Authorization":localStorage.getItem('token')},
//                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
//                    console.log('结果',this.usersInfo)
//                });
//
//            },
            handleDelete (index, row) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        console.log('8888')
                this.usersInfo.splice(index, 1);
                console.log('ddddd',row.uid)
                let uid=row.uid;
                this.$ajax({
                    method: 'DELETE', //请求方式
                    url: 'http://10.103.240.238:8080/userInfo',
                    params:{
                        uid
                    },
                    headers:{"Authorization":localStorage.getItem('token')}
                }).then(
                    (res) => {
                        console.log(res);
                    });
                this.$message({
                    message: "操作成功！",
                    type: 'success'
                });
                    })
                    .catch(_ => {});

            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>

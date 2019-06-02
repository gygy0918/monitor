<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>维修信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>维修人员列表信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="form.name" placeholder="姓名" class="handle-input" style="width: 80px;height: 5px;"></el-input>
            <el-input v-model="form.username" placeholder="用户名" class="handle-input" style="width: 80px"></el-input>
            <el-input v-model="form.department" placeholder="部门" class="handle-input" style="width: 80px"></el-input>
            <el-input v-model="form.position" placeholder="职位" class="handle-input" style="width: 60px"></el-input>
            <!--<el-select v-model="select_cate" placeholder="性别" class="handle-select mr10" style="width: 80px;height: 5px;">-->
                <!--<el-option key="1" label="男" value="张三"></el-option>-->
                <!--<el-option key="2" label="女" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="select_cate" placeholder="职位" class="handle-select mr10" style="width: 80px;height: 5px;">-->
                <!--<el-option key="1" label="管理员" value="张三"></el-option>-->
                <!--<el-option key="2" label="采购员" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="select_cate" placeholder="状态" class="handle-select mr10"  style="width: 80px;height: 5px;">-->
                <!--<el-option key="1" label="张三" value="张三"></el-option>-->
                <!--<el-option key="2" label="李四" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <!--<el-input v-model="select_word" placeholder="邮箱" class="handle-input" style="width: 120px"></el-input>-->
            <el-button type="primary" icon="search" @click="onSubmit">搜索</el-button>
            <el-button type="primary"  class="el-icon-plus" @click="onAdd">增加维修人员</el-button>
        </div>
        <el-table :data="usersInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="date" label="日期" sortable width="150">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="username" label="用户名" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="name" label="姓名" width="100">
            </el-table-column>

            <!--<el-table-column prop="gender" label="性别" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="tel" label="电话" width="120">
            </el-table-column>
            <el-table-column prop="credit" label="信用" width="120">
            </el-table-column>
            <el-table-column prop="position" label="职位" width="120">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="120">
            </el-table-column>
            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="460">
                <template scope="scope">
                    <el-button size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" type="danger" style="margin: 5px"
                               @click="repairing(scope.$index, scope.row)">维修中物品</el-button>
                    <el-button size="small" type="danger" style="margin: 5px"
                               @click="repaired(scope.$index, scope.row)">已修物品</el-button>
                    <el-button size="small" type="danger" style="margin: 5px"
                               @click="resetPass(scope.$index, scope.row)">重置密码</el-button>
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

        <el-dialog title="正在维修物品的信息" :visible.sync="dialogTableVisible" style="width: 80%;margin: auto" >
            <el-table
                :data="goodrepairing"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="ID"
                    label="编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="latitude"
                    label="位置"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="acceptTime"
                    label="接单时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="种类"
                    width="120">
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="已经维修物品的信息" :visible.sync="dialogTableVisible2" style="width: 80%;margin: auto" >
            <el-table
                :data="goodrepaired"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="ID"
                    label="编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="latitude"
                    label="位置"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="finishTime"
                    label="完成时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="种类"
                    width="120">
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="增加人员" :visible.sync="dialogFormVisible">
            <el-form :model="formPerson">
                <!--<el-form-item label="编号" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.username" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="人员名称" :label-width="formLabelWidth">
                    <el-input v-model="formPerson.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="formPerson.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在部门" :label-width="formLabelWidth">
                    <el-input v-model="formPerson.department" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="formPerson.position" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker
                        type="date"
                        value-format="yyyy/MM/dd"
                        v-model="formPerson.birthday" placeholder="出生日期" class="handle-input" style="width: 150px"></el-date-picker
                    >
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改人员信息" :visible.sync="dialogFormVisible2">
            <el-form :model="form" ref="form">
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="form.position" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-input v-model="form.department" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-input v-model="form.email" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                goodrepaired:[],
                goodrepairing:[],
                usersInfo: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible: false,
                dialogFormVisible2: false,
                dialogTableVisible:false,
                dialogTableVisible2:false,
                formPerson:{},
                form: {
                    username: '',
                    name:'',
                    position: '',
                    department:''
                },
                formLabelWidth: '100px'
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.242.96:8080/login/search',
                    params:{
                        page:1,
                        size:10
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.usersInfo=[],
                this.usersInfo=res.data.data.results;
                console.log('结果',res.data.data.results)

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
            handleDelete(index, row){
                console.log('handleDelete',row)
                this.usersInfo.splice(index, 1);
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/login/user',
                        params:{
                            username:row.username
                        },
                    }).then((res)=>{
                    // this.usersInfo=[],
                    // this.usersInfo=res.data.data.results;
                console.log('结果',res.data.data.results)

            })
            },

            submit(){
                let birthdayMonth = this.formPerson.birthday?Number(this.formPerson.birthday.getMonth())+1:'';
                let data = {
                    birthday:this.formPerson.birthday?this.formPerson.birthday.getFullYear()+'-'+birthdayMonth+'-'+this.formPerson.birthday.getDate():null,
                }
                console.log('999999999',Object.assign(this.formPerson,data))
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.242.96:8080/login/user',
                        data:Object.assign(this.formPerson,data)
                    }).then((res)=>{
                    // this.usersInfo=[],
                    // this.usersInfo=res.data.data.results;
                    console.log('增加人员',res)
                this.dialogFormVisible = false;
            })

            },
            onAdd(){
                this.dialogFormVisible=true;
            },
            repairing(index,row){
                this.dialogTableVisible=true;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/task/doing',
                        params:{
                            id:row.username
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.goodrepairing=[],
//                    res.data.data.results.map((item)=>{
//                        console.log('0000',item.gender)
//                        item.gender=item.gender?'男':'女'
//                        item.state=item.state?'在线':'不在线'
//                    })

                    res.data.data.map((item)=>{
//                        console.log('0000',item.gender)
                        item.type=item.type==8 ?'其他':'线路维修'
                        item.latitude=item.latitude?'教三附近':'不在线'
                    })
                    this.goodrepairing=res.data.data;
                    console.log('维修中',res.data.data)

                })


            },
            repaired(index,row){
                this.dialogTableVisible2=true;
                console.log('id',row.username)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/task/record',
                        params:{
                            id:row.username,
                            page:1
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.goodrepaired=[],
//                    res.data.data.results.map((item)=>{
//                        console.log('0000',item.gender)
//                        item.gender=item.gender?'男':'女'
//                        item.state=item.state?'在线':'不在线'
//                    })

                        res.data.data.map((item)=>{
//                        console.log('0000',item.gender)
                            item.type=item.type==8 ?'其他':'线路维修'
                            item.latitude=item.latitude?'教三附近':'不在线'
                        })
                        this.goodrepaired=res.data.data;
                    console.log('已维修',res)

                })

            },
            resetPass(index,row){
//                console.log('重置人员的id',index)
                this.$confirm('确认重置密码？')
                    .then(_ => {
                        this.$ajax(
                            {
                                method: 'get', //请求方式
                                url: 'http://10.103.242.96:8080/login/reset',
                                params:{
                                    id:row.username
                                },
                                headers:{"Authorization":localStorage.getItem('token')},
                            }).then((res)=>{
//                    res.data.data.results.map((item)=>{
//                        console.log('0000',item.gender)
//                        item.gender=item.gender?'男':'女'
//                        item.state=item.state?'在线':'不在线'
//                    })
                            this.$message({
                                message: "重置密码操作成功！",
                                type: 'success'
                            });

                        })
                    })
                    .catch(_ => {});


            },
//            addUser(formName){
//                let data=Object.assign({},this.form);
//                console.log('ttt',data)
//                this.$ajax(
//                    {
//                        method: 'post', //请求方式
//                        url: 'http://10.103.249.191:8080/userInfo',
//                        data:data,
//                        headers:{"Authorization":localStorage.getItem('token')},
//                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
//                    console.log('结果',this.usersInfo)
//                });
//                this.dialogFormVisible = false;
//            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
//            search(){
//                this.is_search = true;
//            },
            onSubmit () {
                // this.$message('模拟数据，这个方法并不管用哦~');
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.242.96:8080/login/search',
                    params:{
                        size:5,
                        page:1,
                        name:this.form.name,
                        username:this.form.username,
                        position:this.form.position,
                        department:this.form.department
                    }
                }).then(
                    (res) => {
                        this.usersInfo=[];
                        this.usersInfo =res.data.data.results;
//                        console.log(res.data.data);
                    });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                // this.$message('编辑第'+(index+1)+'行');
                this.dialogFormVisible2=true;

//                row.delete(createTime);
//                row.delete(lastUpdate);
                this.form=row;
                this.form.createTime='';
                this.form.lastUpdate='';
                console.log('test66',this.form)
            },
            submitEdit(){
                // let data=Object.assign({},this.form);
                // console.log('id',data);
                let data={username:this.form.username,department:this.form.department,position:this.form.position,tel:this.form.tel}
                console.log('id',data);
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.242.96:8080/login/user',
                        data:data,
                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
                    console.log('结果',this.usersInfo)
                this.dialogFormVisible2 = false;
            });

            },
//            handleDelete(index, row) {
//                this.$message.error('删除第'+(index+1)+'行');
//                this.$ajax(
//                    {
//                        method: 'post', //请求方式
//                        url: 'http://10.103.249.191:8080/userInfo/{uid}',
//                        data:data
//                        headers:{"Authorization":localStorage.getItem('token')},
//                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
//                    console.log('结果',this.usersInfo)
//                });
//
//            },
//             handleDelete (index, row) {
//                 this.$confirm('确认删除？')
//                     .then( => {
//                         console.log('handleDelete',row)
//                         this.usersInfo.splice(index, 1);
//                         console.log('ddddd',row.uid)
//                         let uid=row.uid;
//                         this.$ajax({
//                             method: 'get', //请求方式
//                             url: 'http://10.103.242.96:8080/login/user',
//                             params:{
//                                 uid
//                             },
//                             headers:{"Authorization":localStorage.getItem('token')}
//                         }).then(
//                             (res) => {
//                                 console.log(res);
//                             });
//                         this.$message({
//                             message: "操作成功！",
//                             type: 'success'
//                         });
//                     })
//                     .catch(_ => {});
//
//             },
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

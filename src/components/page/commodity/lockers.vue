<template>
    <div class="table">
        <el-row>
            <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ?0 : 0" style="margin:10px">
                <el-card :body-style="{ padding: '0px' }" shadow="always">
                    <img src="../../../assets/0.jpg" class="image">
                    <div style="padding: 10px;">
                                <div class="bottom clearfix">
                                    <time class="time">数量{{ currentDate }}</time>
                                    <span style="display:none">11</span>
                                    <el-button type="text" class="button" @click="lookDetails()">查看详情</el-button>
                                </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ?0 : 0" style="margin:10px">
                <el-card :body-style="{ padding: '0px' }"  shadow="always">
                    <img src="../../../assets/0.jpg" class="image">
                    <div style="padding: 10px;">
                        <!--<span>货柜{{size}}</span>-->
                        <div class="bottom clearfix">
                            <time class="time">数量{{ currentDate }}</time>
                            <el-button type="text" class="button" @click="lookDetails()">查看详情</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ?0 : 0" style="margin:10px">
                <el-card :body-style="{ padding: '0px' }"  shadow="always">
                    <img src="../../../assets/0.jpg" class="image">
                    <!--<i class="el-icon-edit"></i>-->
                    <div style="padding: 10px;">
                        <span>货柜{{size}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button" @click="lookDetails(size)">查看详情</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
            title="货柜详情"
            :visible.sync="centerDialogVisible"
            width="30%"
            style="width:50%;margin:0 auto;top:20%"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                centerDialogVisible:false,
                size:'1',
                testArray:[1,2,3,4,5,6,7],
                currentDate: new Date().getFullYear(),
                loginLogsInfo: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible: false,
                form: {
                    username: '',
                    name:'',
                    password: '',
                    job: '',
                    gender: '',
                    phone: '',
                    email: ''
                },
                formLabelWidth: '120px'
            }
        },
        created(){
//            this.getData();
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/loginLog/page',
                    params:{
                        page:1,
                        size:5
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.loginLogsInfo=[],
                this.loginLogsInfo=res.data.data.results;
            console.log('结果22',res.data.data.results)
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
            lookDetails(row){
                console.log('8888',row)
                this.centerDialogVisible = true;
                // this.$router.push('/lockerDetails')

            },

            addUser(formName){
                let data=Object.assign({},this.form);
                console.log('ttt',data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.249.191:8080/userInfo',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.usersInfo=[],
                    this.usersInfo=res.data.data.results;
                console.log('结果',this.usersInfo)
            });
                this.dialogFormVisible = false;
            },
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
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
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
            handleDelete (index, row) {
                this.usersInfo.splice(index, 1);
                console.log('ddddd',row.uid)
                let uid=row.uid;
                this.$ajax({
                    method: 'delete', //请求方式
                    url: 'http://10.103.249.191:8080/userInfo',
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
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>

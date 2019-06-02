<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>维修任务管理</el-breadcrumb-item>
                <el-breadcrumb-item>维修任务信息列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-input v-model="form.ID" placeholder="编号" class="handle-input" style="width: 100px;height: 5px;"></el-input>-->
            <!--<el-input v-model="form.type" placeholder="类型" class="handle-input" style="width: 100px"></el-input>-->
            <el-select v-model="form.type" placeholder="对象类型"  style="width: 120px">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                type="date"
                value-format="yyyy/MM/dd"
                      v-model="form.createTime" placeholder="创建时间" class="handle-input" style="width: 120px"></el-date-picker
            >
            <el-date-picker
                type="date"
                value-format="yyyy/MM/dd"
                v-model="form.finishTime" placeholder="完成时间" class="handle-input" style="width: 120px"></el-date-picker
            >
            <el-input v-model="form.isCancel" placeholder="是否取消" class="handle-input" style="width: 100px"></el-input>
            <!--<el-input v-model="form.isFinish" placeholder="状态" class="handle-input" style="width: 100px"></el-input>-->
            <el-select v-model="form.isFinish" placeholder="状态"  style="width: 120px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="form.acceptWorker" placeholder="接单人员" class="handle-input" style="width: 100px"></el-input>
            <el-input v-model="form.dispatcher" placeholder="派单人员" class="handle-input" style="width: 100px"></el-input>
            <el-date-picker
                type="date"
                value-format="yyyy/MM/dd"
                v-model="form.acceptTime" placeholder="接单时间" class="handle-input" style="width: 120px"></el-date-picker
            >
            <!--<el-input v-model="select_word" placeholder="地点" class="handle-input" style="width: 80px"></el-input>-->
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
        </div>
        <el-table :data="tasksInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="ID" label="编号" sortable width="150">-->
            <!--</el-table-column>-->
            <el-table-column prop="type" label="类型" width="150">
                <template scope="scope">
                    <!--<el-tag type="info" v-if="scope.row.state===0">未完成</el-tag>-->
                    <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                    <template v-if="scope.row.type=='1'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯自然老化
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='2'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯间歇性熄灭
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='3'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            熔断器故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='4'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            镇流器故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='5'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            传感装置故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='6'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            电子触发故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='7'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯线路维修
                        </el-tag>
                    </template>
                    <template v-if="scope.row.type=='8'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            其他
                        </el-tag>
                    </template>
                </template>
            </el-table-column>

            <!--<el-table-column prop="type" label="类型" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="createTime" label="创建时间" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="address" label="地点" width="170">
        </el-table-column>
            <el-table-column prop="acceptWorker" label="接单人编号" width="120">
            </el-table-column>
            <el-table-column prop="dispatcher" label="派遣人编号" width="120">
            </el-table-column>
            <el-table-column prop="isFinish" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="isCancel" label="是否取消" width="90">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120">
            </el-table-column>
            <el-table-column prop="acceptTime" label="接单时间" width="120">
            </el-table-column>
            <el-table-column prop="finishTime" label="完成时间" width="120">
        </el-table-column>
            <!--<el-table-column prop="job" label="职位" width="120">-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="120">
                <!--v-if="scope.row.isFinish==0"-->
                <template scope="scope" >
                    <el-button size="small"
                    @click="dispatcher(scope.$index, scope.row)">派遣工单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="派遣工单" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="GDform" ref="GDform">
                <el-form-item  label="所在部门" :label-width="formLabelWidth">
                    <el-select v-model="value"  placeholder="请选择部门" @change="choseDep()"  >
                        <el-option
                            v-for="item in GDform.depOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接单人员" :label-width="formLabelWidth">
                    <el-select v-model="value2"  placeholder="请选择接单人员" @change="choseAccept()">
                        <el-option
                            v-for="item in GDform.acceptOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!--<el-form :model="form" ref="form">-->
                <!--<el-form-item label="接单人员" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('form')">确 定</el-button>
            </div>
        </el-dialog>

        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tasksInfo: [],
                GDform:{
                    depOptions:[],
                    acceptOptions:[]
                },
                value: '',
                value2:'',
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible: false,
                options2: [{
                    value: '1',
                    label: '路灯自然老化'
                }, {
                    value: '2',
                    label: '路灯间歇性熄灭'
                }, {
                    value: '3',
                    label: '熔断器故障'
                }, {
                    value: '4',
                    label: '镇流器故障'
                }, {
                    value: '5',
                    label: '传感装置故障'
                }, {
                    value: '6',
                    label: '电子触发故障路灯线路维修'
                }, {
                    value: '7',
                    label: '路灯线路维修'
                }, {
                    value: '8',
                    label: '其他'
                }],
                options: [{
                    value: '0',
                    label: '等待维修'
                }, {
                    value: '2',
                    label: '完成维修'
                }, {
                    value: '1',
                    label: '正在维修'
                }],
                form: {
                    // ID: '',
                    type:'',
                    createTime: ''
                },
                formLabelWidth: '120px'
            }
        },
        created(){
//            this.getData();
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.242.96:8080/task/search',
                    params:{
                        page:1,
                        size:20,
                        distance:-1
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.tasksInfo=[],
                    res.data.data.results.map((item)=>{
                        // item.type=item.type==8?'其他':'线路维修'
                        item.isFinish=item.isFinish==0?'等待维修':item.isFinish==2?'完成维修':'正在维修'
                        item.isCancel =item.isCancel ==0?'否':'是'
                        // item.latitude=item.latitude?'教三附近':'不在线'
                    })
                this.tasksInfo=res.data.data.results;
                console.log('结果',res.data.data)

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
            choseDep(){
                console.log('选中的部门val',this.value)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/login/department',
                        params:{
                            department:this.value
                        }
                    }).then((res)=>{
                    this.GDform.acceptOptions=[],
                    this.GDform.acceptOptions=res.data.data;
                console.log('接单人员',res.data.data)

            })
            },
            choseAccept(){
                console.log('选中的人员val',this.value2)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/support/department',
                    }).then((res)=>{
                    this.GDform.acceptOptions=[],
                    this.GDform.acceptOptions=res.data.data;
                console.log('接单人员',res.data.data)

            })
            },
            dispatcher(index, row) {
               console.log(row);
                this.dialogFormVisible=true;
                // this.form=row;
                this.form.ID=row.ID;
                console.log('test66',this.form)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.242.96:8080/support/department',
                    }).then((res)=>{
                    this.GDform.depOptions=[],
                this.GDform.depOptions=res.data.data;
                console.log('所有部门',res.data.data)


            })

            },
            submitEdit(){
                // let dispatcher = 'root'
                let data = {
                    dispatcher:'root',
                    ID:this.form.ID,
                    acceptWorker:this.value2
                }
                //acceptWorker
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.242.96:8080/task/dispatch',
                            params:data,
                        }).then((res)=>{
                        console.log('派遣结果',res)
                this.dialogFormVisible=false;
                    });
            },
            onSubmit () {
                // this.$message('模拟数据，这个方法并不管用哦~');
                // console.log('data',this.form.createTime.getDate());
                // console.log('data',this.form.createTime.getMonth());
                // console.log('data',this.form.createTime.getFullYear());
                let createMonth = this.form.createTime?Number(this.form.createTime.getMonth())+1:'';
                let finishMonth = this.form.finishTime?Number(this.form.finishTime.getMonth())+1:'';
                let acceptMonth = this.form.acceptTime?Number(this.form.acceptTime.getMonth())+1:'';
                let data = {
                    createTime:this.form.createTime?this.form.createTime.getFullYear()+'/'+createMonth+'/'+this.form.createTime.getDate():null,
                    finishTime:this.form.finishTime?this.form.finishTime.getFullYear()+'/'+finishMonth+'/'+this.form.finishTime.getDate():null,
                    acceptTime:this.form.acceptTime?this.form.acceptTime.getFullYear()+'/'+acceptMonth+'/'+this.form.acceptTime.getDate():null,
                }
                console.log('data',data.createTime);
                // let data= this.form.createTime
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.242.96:8080/task/search',
                    params:{
                        size:5,
                        page:1,
                        // distance:-1,
                        // ID: this.form.ID,
                        type:this.form.type?this.form.type:null,
                        createTime: data.createTime,
                        acceptWorker:this.form.acceptWorker?this.form.acceptWorker:null,
                        isCancel:this.form.isCancel?this.form.isCancel:null,
                        finishTime:data.finishTime,
                        acceptTime:data.acceptTime,
                        isFinish:this.form.isFinish?this.form.isFinish:null,
                        dispatcher:this.form.dispatcher?this.form.dispatcher:null,
                    }
                }).then(
                    (res) => {
                        this.tasksInfo=[];
                res.data.data.results.map((item)=>{
                    // item.type=item.type==8?'其他':'线路维修'
                    item.isFinish=item.isFinish==0?'等待维修':item.isFinish==2?'完成维修':'正在维修'
                item.isCancel =item.isCancel ==0?'否':'是'
                // item.latitude=item.latitude?'教三附近':'不在线'
            })
                        this.tasksInfo =res.data.data.results;
                        console.log(res.data.data);
                    });
            },
            // addUser(formName){
            //     let data=Object.assign({},this.form);
            //     console.log('ttt',data)
            //     this.$ajax(
            //         {
            //             method: 'post', //请求方式
            //             url: 'http://10.103.249.191:8080/userInfo',
            //             data:data,
            //             headers:{"Authorization":localStorage.getItem('token')},
            //         }).then((res)=>{
            //         this.usersInfo=[],
            //             this.usersInfo=res.data.data.results;
            //         console.log('结果',this.usersInfo)
            //     });
            //     this.dialogFormVisible = false;
            // },
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
                this.$confirm('确认删除？')
                    .then(_ => {
                        console.log('8888')
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

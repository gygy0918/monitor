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
            <el-input v-model="form.actionAdd" placeholder="操作人位置" class="handle-input" style="width: 100px"></el-input>
            <el-input v-model="form.itemAdd" placeholder="对象位置" class="handle-input" style="width: 130px"></el-input>
            <el-date-picker
                type="date"
                value-format="yyyy/MM/dd"
                v-model="form.actionTime" placeholder="动作时间" class="handle-input" style="width: 120px"></el-date-picker
            >
            <!--<el-input v-model="form.action" placeholder="动作类型" class="handle-input" style="width: 100px"></el-input>-->
            <el-select v-model="form.action" placeholder="动作类型"  style="width: 120px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="form.itemType" placeholder="对象类型"  style="width: 150px">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <!--<el-input v-model="form.itemType" placeholder="对象类型" class="handle-input" style="width: 100px"></el-input>-->
            <el-input v-model="form.itemTime" placeholder="对象发生时间（0-23）" class="handle-input" style="width: 150px"></el-input>
            <el-button type="primary" icon="search" @click="onSubmit">搜索</el-button>
        </div>
        <el-table :data="repaireLogs" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="ID" label="编号" sortable width="150">-->
            <!--</el-table-column>-->
            <el-table-column prop="action" label="动作类型" width="100">
                <template scope="scope">
                    <!--<el-tag type="info" v-if="scope.row.state===0">未完成</el-tag>-->
                    <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                    <template v-if="scope.row.action=='1'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            快速浏览
                        </el-tag>
                    </template>
                    <template v-if="scope.row.action=='2'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            查阅
                        </el-tag>
                    </template>
                    <template v-if="scope.row.action=='3'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            搜索
                        </el-tag>
                    </template>
                    <template v-if="scope.row.action=='4'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            接收工单
                        </el-tag>
                    </template>
                    <template v-if="scope.row.action=='5'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            取消工单
                        </el-tag>
                    </template>
                    <template v-if="scope.row.action=='6'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            完成工单
                        </el-tag>
                    </template>
                </template>
            </el-table-column>

            <!--<el-table-column prop="type" label="类型" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="createTime" label="创建时间" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="actionTime" label="动作时间" width="120">
            </el-table-column>
            <el-table-column prop="distance" label="距离(M)" width="100">
            </el-table-column>
            <!--<el-table-column prop="id" label="派遣人编号" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="itemAdd" label="动作对象地点" width="120">
            </el-table-column>
            <el-table-column prop="actionAdd" label="操作人位置" width="100">
            </el-table-column>
            <el-table-column prop="itemId" label="动作对象编号" width="90">
            </el-table-column>
            <el-table-column prop="itemTime" label="对象发生小时数" width="100">
            </el-table-column>
            <el-table-column prop="itemType" label="动作对象类型" width="140">
                <template scope="scope">
                    <!--<el-tag type="info" v-if="scope.row.state===0">未完成</el-tag>-->
                    <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                    <template v-if="scope.row.itemType=='1'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯自然老化
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='2'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯间歇性熄灭
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='3'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            熔断器故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='4'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            镇流器故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='5'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            传感装置故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='6'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            电子触发故障
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='7'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            路灯线路维修
                        </el-tag>
                    </template>
                    <template v-if="scope.row.itemType=='8'">
                        <el-tag type="success" icon="el-icon-delete" circle>
                            其他
                        </el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="操作人编号" width="120">
            </el-table-column>
            <!--<el-table-column prop="job" label="职位" width="120">-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" width="120">-->
                <!--&lt;!&ndash;v-if="scope.row.isFinish==0"&ndash;&gt;-->
                <!--<template scope="scope"  >-->
                    <!--<el-button size="small"-->
                               <!--@click="dispatcher(scope.$index, scope.row)">派遣工单</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>

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
                repaireLogs: [],
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
                    value: '1',
                    label: '快速浏览'
                }, {
                    value: '2',
                    label: '查阅'
                }, {
                    value: '3',
                    label: '搜索'
                }, {
                    value: '4',
                    label: '接收工单'
                }, {
                    value: '5',
                    label: '取消工单'
                }, {
                    value: '6',
                    label: '完成工单'
                }],
                is_search: false,
                dialogFormVisible: false,
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
                    url: 'http://10.103.242.96:8080/log/look',
                    params:{
                        page:1,
                        size:20,
                    },
                }).then((res)=>{
                this.repaireLogs=[],
            this.repaireLogs=res.data.data.results;
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
                let actionMonth = this.form.actionTime?Number(this.form.actionTime.getMonth())+1:'';
                let data = {
                    actionTime:this.form.actionTime?this.form.actionTime.getFullYear()+'/'+actionMonth+'/'+this.form.actionTime.getDate():null,
                }
                console.log('data',data.createTime);
                // let data= this.form.createTime
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.242.96:8080/log/look',
                    params:{
                        size:5,
                        page:1,
                        // distance:-1,
                        // ID: this.form.ID,
                        action:this.form.action?this.form.action:null,
                        actionTime: data.actionTime,
                        itemType:this.form.itemType?this.form.itemType:null,
                        itemTime:this.form.itemTime?this.form.itemTime:null,
                        itemAdd:this.form.itemAdd?this.form.itemAdd:null,
                        actionAdd:this.form.actionAdd?this.form.actionAdd:null,
                    }
                }).then(
                    (res) => {
                    this.repaireLogs=[];
                this.repaireLogs =res.data.data.results;
                console.log(res.data.data.results);
            });
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

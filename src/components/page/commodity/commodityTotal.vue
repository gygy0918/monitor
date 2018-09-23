<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>维修任务管理</el-breadcrumb-item>
                <el-breadcrumb-item>维修任务信息列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="form.spId" placeholder="编号" class="handle-input" style="width: 100px;height: 5px;"></el-input>
            <el-input v-model="form.type" placeholder="类型" class="handle-input" style="width: 100px"></el-input>
            <el-date-picker
                type="date"
                v-model="form.createTime" placeholder="创建时间" class="handle-input" style="width: 150px"></el-date-picker
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
        <el-table :data="commodityInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="spId" label="编号" sortable width="150">
            </el-table-column>
            <el-table-column prop="spType" label="商品类型" width="120">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
            </el-table-column>
            <el-table-column prop="spBrand" label="品牌" width="120">
            </el-table-column>
            <el-table-column prop="spAttribute" label="商品属性" width="120">
            </el-table-column>
            <el-table-column prop="spSize" label="尺寸" width="120">
            </el-table-column>
            <!--<el-table-column prop="state" label="状态" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="180">
            <template scope="scope">
            <el-button size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>
            <el-button size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog title="更新仓库信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="form.spId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" :label-width="formLabelWidth">
                    <el-input v-model="form.spType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-input v-model="form.createTime" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌" :label-width="formLabelWidth">
                    <el-input v-model="form.spBrand" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品属性" :label-width="formLabelWidth">
                    <el-input v-model="form.spAttribute" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="尺寸" :label-width="formLabelWidth">
                    <el-input v-model="form.spSize" auto-complete="off"></el-input>
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
                <el-button type="primary" @click="submitUpdataWarehouse('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                commodityInfo: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible: false,
                form: {
                    spId: '',
                    spName:'',
                    spSize:'',
                    spType:'',
                    spAttribute:'',
                    spBrand:'',
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
                    url: 'http://10.103.240.238:8080/commodity/page',
                    params:{
                        page:1,
                        size:5
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.commodityInfo=[],
                this.commodityInfo=res.data.data.results;
            console.log('结果商品',res.data.data.results)
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
            onSubmit () {
                // this.$message('模拟数据，这个方法并不管用哦~');
                console.log('data',this.form.createTime);
                let data= this.form.createTime
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.241.110:8080/task/look',
                    params:{
                        size:5,
                        page:1,
                        ID: this.form.ID,
                        type:this.form.type,
                        createTime: this.form.createTime?this.form.createTime:null,
                        distance:-1
                    }
                }).then(
                    (res) => {
                    this.tasksInfo=[];
                this.tasksInfo =res.data.data.results;
                console.log(res.data.data);
            });
            },
            addUser(formName){
                let data=Object.assign({},this.form);
                console.log('ttt',data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.238:8080/userInfo',
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
                this.dialogFormVisible = true;
//                this.$message('编辑第'+(index+1)+'行');
                this.form=row;
            },
            submitUpdataWarehouse(form){
                let data=Object.assign({},this.form);
                delete data.createTime;
                delete data.lastUpdate;
                console.log('编辑提交信息',data)
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.240.238:8080/commodity',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    // this.warehouseInfo=[],
                    // this.warehouseInfo=res.data.data.results;
                console.log('结果',res)
            });
                this.dialogFormVisible = false;
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
                    method: 'delete', //请求方式
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

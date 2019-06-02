
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>申请入库信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>申请入库信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<div class="handle-box">-->
        <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">-->
        <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
        <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
        <!--</el-select>-->
        <!--<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
        <!--<el-button type="primary" icon="search" @click="search">搜索</el-button>-->
        <!--</div>-->
        <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部入库申请单" name="first">
                <span slot="label"><i class="el-icon-date"></i>全部入库申请单</span>
                <el-table :data="warehouseOut" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <!--<el-table-column prop="date" label="日期" sortable width="150">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="yhId" label="申请入库人编号" width="100">
                    </el-table-column>
                    <el-table-column prop="ckId" label="仓库编号" width="100">
                    </el-table-column>
                    <el-table-column prop="hgId" label="货柜编号" width="100">
                    </el-table-column>
                    <el-table-column prop="hgName" label="货柜名称" width="100">
                    </el-table-column>
                    <el-table-column prop="spId" label="商品编号" width="100">
                    </el-table-column>
                    <el-table-column prop="applyCount" label="申请数量" width="100">
                    </el-table-column>
                    <el-table-column prop="ckManager" label="仓库管理员" width="80">
                    </el-table-column>
                    <!--<el-table-column prop="remark" label="是否出库" width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="remark" label="申请状态" width="100">
                        <template scope="scope">
                            <!--<el-tag type="info" v-if="scope.row.outStatus==0">未完成</el-tag>-->
                            <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                            <el-button size="small" v-if="scope.row.applyStatus==0"
                                       @click="handleEdit(scope.$index, scope.row)">未同意</el-button>

                            <el-button size="small" type="text" disabled v-else
                                       @click="handleDelete(scope.$index,scope.row)">已同意</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <el-button size="small"
                                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger"
                                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-date"></i> 审核通过 等待确认</span>
                <!--已完成的出库申请单-->
                <el-table :data="warehouseOut" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <!--<el-table-column prop="date" label="日期" sortable width="150">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="yhId" label="申请入库人编号" width="100">
                    </el-table-column>
                    <el-table-column prop="ckId" label="仓库编号" width="100">
                    </el-table-column>
                    <el-table-column prop="hgId" label="货柜编号" width="100">
                    </el-table-column>
                    <el-table-column prop="hgName" label="货柜名称" width="100">
                    </el-table-column>
                    <el-table-column prop="spId" label="商品编号" width="100">
                    </el-table-column>
                    <el-table-column prop="applyCount" label="申请数量" width="100">
                    </el-table-column>
                    <el-table-column prop="ckManager" label="仓库管理员" width="80">
                    </el-table-column>
                    <!--<el-table-column prop="remark" label="是否出库" width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="remark" label="申请状态" width="120">
                        <template scope="scope">
                            <el-tag type="info" v-if="scope.row.inStatus==0">未完成确认</el-tag>
                            <el-tag type="danger" v-else>已确认完成</el-tag>
                            <!--<el-tag type="info" v-if="scope.row.outStatus==0">未完成</el-tag>-->
                            <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                            <!--<el-button size="small" v-if="scope.row.outStatus==0"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">未完成</el-button>-->

                            <!--<el-button size="small" type="text" disabled v-else-->
                            <!--@click="handleDelete(scope.$index,scope.row)">已完成</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <!--<el-button size="small" v-if="scope.row.outStatus==0"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">未完成</el-button>-->

                            <!--<el-button size="small" type="text" disabled v-else-->
                            <!--@click="handleDelete(scope.$index,scope.row)">已完成</el-button>-->
                            <el-button size="small"  v-if="scope.row.inStatus==0"
                                       @click="handleSure(scope.$index, scope.row)">确认入库</el-button>
                            <el-button size="small" type="text" disabled v-else
                                       @click="handleDelete(scope.$index,scope.row)">已确认</el-button>
                            <el-button size="small"
                                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger"
                                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 已确认的库申请单</span>
                <el-table :data="warehouseOut" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <!--<el-table-column prop="date" label="日期" sortable width="150">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="yhId" label="申请入库人编号" width="80">
                    </el-table-column>
                    <el-table-column prop="ckId" label="仓库编号" width="100">
                    </el-table-column>
                    <el-table-column prop="hgId" label="货柜编号" width="100">
                    </el-table-column>
                    <!--<el-table-column prop="spId" label="商品编号" width="100">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="hgName" label="货柜名称" width="100">
                    </el-table-column>
                    <el-table-column prop="applyCount" label="申请数量" width="60">
                    </el-table-column>
                    <el-table-column prop="ckManager" label="仓库管理员" width="80">
                    </el-table-column>
                    <!--<el-table-column prop="remark" label="是否出库" width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="remark" label="申请状态" width="100">
                        <template scope="scope">
                            <el-tag type="info" v-if="scope.row.inStatus==0">未完成</el-tag>
                            <el-tag type="danger" v-else>已确认完成</el-tag>
                            <!--<el-button size="small" v-if="scope.row.outStatus==0"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">未完成</el-button>-->

                            <!--<el-button size="small" type="text" disabled v-else-->
                            <!--@click="handleDelete(scope.$index,scope.row)">已完成</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="500">
                        <template scope="scope">
                            <!--<el-button size="small" v-if="scope.row.outStatus==0"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">未完成</el-button>-->

                            <!--<el-button size="small" type="text" disabled v-else-->
                            <!--@click="handleDelete(scope.$index,scope.row)">已完成</el-button>-->
                            <el-button size="small"  v-if="scope.row.inStatus==0"
                                       @click="handleSure(scope.$index, scope.row)">确认入库</el-button>
                            <el-button size="small" type="text" disabled v-else
                                       @click="handleDelete(scope.$index,scope.row)">已确认</el-button>
                            <el-button size="small"
                                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger"
                                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                            <!--<el-button size="small" type="danger"-->
                                       <!--@click="findhuogui(scope.$index,scope.row)">查看货柜</el-button>-->
                            <el-button size="small" type="danger"
                                       @click="findInMAP(scope.$index,scope.row)">到这去</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!--<el-tab-pane label="已确认">已确认</el-tab-pane>-->
            <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
        </el-tabs>

        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
        <el-dialog title="修改入库申请" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="申请入库人编号" :label-width="formLabelWidth">
                    <el-input v-model="form.yhId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库编号" :label-width="formLabelWidth">
                    <el-input v-model="form.ckId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="货柜编号	" :label-width="formLabelWidth">
                    <el-input v-model="form.hgId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品编号" :label-width="formLabelWidth">
                    <el-input v-model="form.spId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="申请数量" :label-width="formLabelWidth">
                    <el-input v-model="form.applyCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="邮箱" :label-width="formLabelWidth">-->
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
                activeName: 'first',
                warehouseOut:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible:false,
                form:{},
                formLabelWidth: '120px'
            }
        },
        created(){
//            this.getData();
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/warehouseApply/page',
                    params:{
                        page:1,
                        size:20,
                        yhId:localStorage.getItem('yhId')
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.warehouseOut=[],
                this.warehouseOut=res.data.data.results;
            console.log('我的申请入库',this.warehouseOut)
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
            findhuogui(){
                this.$router.push('/commodity');

            },
            findInMAP(index,row){
                console.log('0000000000000',row.ckId)
                this.$router.push('/maprouter');

            },
            handleSure(index, row){
                // let data={outStatus:1,id:row.id},
                let data={}
                data .inStatus=1
                data.id=row.id
                console.log('确认',data)
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.249.191:8080/warehouseApply',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    // this.warehouseOut=res.data.data;
                    this.$message({
                    message: "操作成功！",
                    type: 'success'
                });
                console.log('确认申请入库',res)
            })
            },
            handleClick(tab, event) {
                console.log(tab.index);
                if(tab.index==0){
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.249.191:8080/warehouseApply/page',
                            params:{
                                page:1,
                                size:20,
                                yhId:localStorage.getItem('yhId')
                            },
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                        this.warehouseOut=[],
                        this.warehouseOut=res.data.data.results;
                    console.log('我的申请入库',this.warehouseOut)
                })
                }
                else if(tab.index==2){
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.249.191:8080/warehouseApply/page',
                            params:{
                                page:1,
                                size:20,
                                inStatus:1,
                                yhId:localStorage.getItem('yhId')
                            },
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                        this.warehouseOut=[],
                        this.warehouseOut=res.data.data.results;
                    console.log('我的申请入库',this.warehouseOut)
                })
                }else if(tab.index==1){
                    console.log('未被确认')
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.249.191:8080/warehouseApply/page',
                            params:{
                                page:1,
                                size:20,
                                inStatus:0,
                                yhId:localStorage.getItem('yhId')
                            },
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                        this.warehouseOut=[],
                        this.warehouseOut=res.data.data.results;
                    console.log('我的申请入库',this.warehouseOut)
                })
                }
            },
            // handleCurrentChange(val){
            //     this.cur_page = val;
            //     this.getData();
            // },
            // handleCurrentChange(val){
            //     console.log('fenye',val)
            //     this.cur_page = val;
            //     this.$ajax(
            //         {
            //             method: 'get', //请求方式
            //             url: 'http://10.103.249.191:8080/warehouseApply/page',
            //             params:{
            //                 page:this.cur_page,
            //                 size:5,
            //             },
            //             headers:{"Authorization":localStorage.getItem('token')},
            //         }).then((res)=>{
            //         this.warehouseOut=[],
            //         this.warehouseOut=res.data.data.results;
            //     console.log('结果',this.warehouseOut)
            // });
            // },
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
//                this.$message('编辑第'+(index+1)+'行');
                this.dialogFormVisible=true;

//                row.delete(createTime);
//                row.delete(lastUpdate);
                this.form=row;
                this.form.createTime='';
                this.form.lastUpdate='';
                console.log('test66',this.form)
            },
            submitEdit(){
                let data=Object.assign({},this.form);
                console.log('id',data);
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.249.191:8080/warehouseApply',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
                    console.log('结果',this.warehouseOut)
            });
                this.dialogFormVisible = false;
            },
            handleDelete(index, row) {
                this.warehouseOut.splice(index, 1);
                console.log('ddddd',row.uid)
                let id=row.id;
                this.$ajax({
                    method: 'DELETE', //请求方式
                    url: 'http://10.103.249.191:8080/warehouseApply',
                    params:{
                        id
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
//                this.$message.error('删除第'+(index+1)+'行');
//                this.$ajax(
//                    {
//                        method: 'put', //请求方式
//                        url: 'http://10.103.249.191:8080/warehouseIn',
//                        data:data,
//                        headers:{"Authorization":localStorage.getItem('token')},
//                    }).then((res)=>{
////                    this.usersInfo=[],
////                        this.usersInfo=res.data.data.results;
//                    console.log('结果',this.usersInfo)
//                });
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

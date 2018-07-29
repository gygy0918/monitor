<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>货柜信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>室内货柜信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="warehouseIn" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="date" label="日期" sortable width="150">-->
            <!--</el-table-column>-->
            <el-table-column prop="hgId" label="货柜编号" width="180">
            </el-table-column>
            <el-table-column prop="hgSizeName" label="货柜大小" width="300">
            </el-table-column>
            <!--<el-table-column prop="hgStatus" label="货柜状态" width="80">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="hgStatus" label="存货状态" width="80">-->
            <!--</el-table-column>-->
            <el-table-column prop="remark" label="货柜状态" width="150">
                <template scope="scope">
                    <el-tag type="success" v-if="scope.row.hgStatus==1">有货物</el-tag>
                    <el-tag type="danger" v-else>空货柜</el-tag>
                    <!--<el-button size="small" v-if="scope.row.outStatus==0"-->
                    <!--@click="handleEdit(scope.$index, scope.row)">未完成</el-button>-->

                    <!--<el-button size="small" type="text" disabled v-else-->
                    <!--@click="handleDelete(scope.$index,scope.row)">已完成</el-button>-->
                </template>
            </el-table-column>
            <!--<el-table-column prop="spId" label="商品编号" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="rkCount" label="入库商品数量" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="remark" label="是否出库" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="remark" label="备注" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="400">
                <template scope="scope">
                    <el-button size="small"
                               @click="handlecheck(scope.$index, scope.row)">查看储物信息</el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                    <!--<el-button size="small" type="danger"-->
                               <!--@click="applyOutWarehouse(scope.$index,scope.row)">申请出库</el-button>-->
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
        <el-dialog title="物品信息" :visible.sync="dialogTableVisible">
            <el-table :data="commodity">
                <el-table-column property="spBrand" label="品牌" width="150"></el-table-column>
                <el-table-column property="spName" label="商品名称" width="200"></el-table-column>
                <el-table-column property="rkCount" label="数量"></el-table-column>
                <el-table-column property="spAttribute" label="规格"></el-table-column>
                <el-table-column label="操作" width="400">
                    <template scope="scope">
                        <el-button size="small" type="danger"
                                   @click="applyOutWarehouse(scope.$index,scope.row)">申请出库</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="货柜中的商品" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form">
                <!--<el-form-item label="货柜编号" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.id" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="仓库编号" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.ckId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="货柜大小" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.hgSizeId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <div style="margin-left:55px;margin-bottom:20px">
                <span style="margin:0">
                货柜大小
                </span>
                    <el-select v-model="form.hgSizeName" placeholder="请选择" >
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-form-item label="货柜名称" :label-width="formLabelWidth">
                    <el-input v-model="form.hgName" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="入库商品数量" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.rkCount" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="备注" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.remark" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
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
        <el-dialog title="出库信息" :visible.sync="dialogFormVisible2 ">
            <el-form :model="form2" ref="form2">
                <el-form-item label="申请人编号" :label-width="formLabelWidth">
                <el-input v-model="form2.yhId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库编号" :label-width="formLabelWidth">
                <el-input v-model="form2.ckId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="货柜编号" :label-width="formLabelWidth">
                <el-input v-model="form2.hgId" auto-complete="off"></el-input>
                </el-form-item>
                <!--<div style="margin-left:55px;margin-bottom:20px">-->
                <!--<span style="margin:0">-->
                <!--申请人id-->
                <!--</span>-->
                    <!--<el-select v-model="form.hgSizeName" placeholder="请选择" >-->
                        <!--<el-option-->
                            <!--v-for="item in options2"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</div>-->
                <!--<el-form-item label="商品" :label-width="formLabelWidth" style="display: none">-->
                    <!--<el-input v-model="form2.spId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <div style="margin-left: 50px;margin-bottom: 10px">
                商品名称  <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <!--<el-form-item label="商品名称" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form2.spName" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="申请出库数量" :label-width="formLabelWidth">
                <el-input v-model="form2.applyCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form2.remark" auto-complete="off"></el-input>
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
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitout('form2')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                warehouseIn:[],
                value2:'',
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                commodity:[],
                options2:[],
                is_search: false,
                dialogTableVisible :false,
                dialogFormVisible:false,
                dialogFormVisible2:false,
                form:{
                    yhId:'',
                    ckId:'',
                    hgId:'',
                    spId:'',
                    rkCount:'',
                    remark:''
                },
                form2:{
                    ckId:'',
                    yhId:'',
                    hgId:'',
                    spId:'',
                    applyCount:'',
                    remark:''
                },
                formLabelWidth: '120px',
                options: [],
                value: ''
            }
        },
        created(){
//            this.getData();
            this.form.ckId= localStorage.getItem('ckId')
            console.log('this.form.ckId',this.form.ckId)
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/box/page',
                    params:{
                        page:1,
                        size:10,
                        ckId: this.form.ckId,
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.warehouseIn=[],
                this.warehouseIn=res.data.data.results;
            console.log('结果9999',res.data.data.results)
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
            applyOutWarehouse(index, row){
                let newObj={ value:row.spId,
                    label:row.spName}
                console.log('申请出库',row)
                console.log('出库',newObj)
                this.options.push(newObj)
                let ckObj={}
                ckObj.ckId=localStorage.getItem('ckId')
                ckObj.yhId=localStorage.getItem('yhId')
                ckObj.hgId=localStorage.getItem('hgId')
                // ckObj.hgId=152289887438404
                // ckObj.hgId=row.hgId
                // ckObj.hgId==localStorage.getItem('hgId')
                this.form2=Object.assign({},row,ckObj) ;
                this.dialogFormVisible2=true;
                //     this.form=row;
                //     this.$ajax(
                //         {
                //             method: 'post', //请求方式
                //             url: 'http://10.103.243.94:8080/warehouseOutApply',
                //             data:row,
                //             headers:{"Authorization":localStorage.getItem('token')},
                //         }).then((res)=>{
                //         this.options2=res.data
                //     console.log('*****',res)
                // })
            },
            submitout(form2){
                console.log('出库提交',this.form2)
                let data=this.form2
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.243.94:8080/warehouseOutApply',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.dialogFormVisible2=false;
                this.$router.push('/personnalOutApply');
                console.log('*****',res)
            })
            },
            handlecheck(index, row){
//                this.$message('编辑第'+(index+1)+'行');
                console.log('hg',row.hgId)
                localStorage.hgId=row.hgId
                this.dialogTableVisible=true;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.243.94:8080/warehouseIn',
                        params:{
                            hgId: row.hgId,
                            // hgId:152289887438404
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.commodity=[],
                console.log('*****',res.data.data.rkCount)
                let info=res.data.data.commodity;
                info.rkCount=res.data.data.rkCount
                window.info=info
                this.commodity.push(info)
                console.log('000',this.commodity)
            })

            },
            handleEdit(index, row) {
                // delete this.form.hgStatus
//                this.$message('编辑第'+(index+1)+'行');
                console.log('hg',row)
                let data=row
                this.dialogFormVisible2 =true;
                this.form=row;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.243.94:8080/list/hgSize',
                        params:{
                            page:1,
                            size:9
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.options2=res.data
                    console.log('*****',res)
            })

//                row.delete(createTime);
//                row.delete(lastUpdate);
//                 this.form=row;
//                 this.form.createTime='';
//                 this.form.lastUpdate='';
//                 console.log('test66',this.form)
            },
            submitEdit(){

                let data=Object.assign({},this.form);
                console.log('id',data);
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.243.94:8080/box',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
                    console.log('结果',res)
            });
                this.dialogFormVisible = false;
            },
            handleDelete(index, row) {
                this.warehouseIn.splice(index, 1);
                console.log('ddddd',row)
                let id=row.id;
                this.$ajax({
                    method: 'delete', //请求方式
                    url: 'http://10.103.243.94:8080/box',
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
//                        url: 'http://10.103.243.94:8080/warehouseIn',
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

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>盘点信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>盘点信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px" >
            <el-form ref="Searchform2" :model="Searchform2"  style="display: inline-block;">
                <el-form-item style="display: inline-block; margin-left: 10px;" >
                    <el-select v-model="Searchform2.name" placeholder="服务类型"  style="display: inline-block;width: 100px" >
                        <el-option key="1" label="广东省" value="广东省"></el-option>
                        <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="display: inline-block;width: 200px">
                    <el-input v-model="Searchform2.name" placeholder="服务名称"   ></el-input>
                </el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </el-form>
            <el-button type="primary" icon="el-icon-search"   @click="toKuCun">总库存信息</el-button>
            <el-button type="primary"  class="el-icon-plus" @click="addService">增加盘点单</el-button>
        </div>

<el-table
            :data="tableData3"
            style="width: 100%">
            <el-table-column
                label="盘点日期"
                width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="spName"
                label="品名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="spType"
                label="类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="ckName"
                label="位置"
                width="120">
            </el-table-column>
            <el-table-column
                prop="unit"
                label="计量单位（个）"
                width="100">
            </el-table-column>
            <!--<el-table-column label="配送信息">-->
            <el-table-column
                prop="name"
                label="账面"
                width="100">
                <el-table-column
                    prop="outCount"
                    label="出库"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="rkCount"
                    label="入库"
                    width="100">
                </el-table-column>
            </el-table-column>
            <!--<el-table-column label="实际盘点">-->
                <!--<el-table-column-->
                    <!--prop="province"-->
                    <!--label="出库"-->
                    <!--width="100">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="city"-->
                    <!--label="入库"-->
                    <!--width="100">-->
                <!--</el-table-column>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="dValue"
                label="差量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="totalCount"
                label="账面库存量"
                width="100">
            </el-table-column>
    <el-table-column
        prop="checkCount"
        label="实际库存量"
        width="100">
    </el-table-column>
            <el-table-column
                prop="yhId"
                label="操作人员"
                width="100">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!--</el-table-column>-->
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
        <!-- Form -->
        <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

        <el-dialog title="修改盘点信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label=" 操作人员" :label-width="formLabelWidth">
                    <el-input v-model="form.yhId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库" :label-width="formLabelWidth">
                    <el-input v-model="form.ckId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品" :label-width="formLabelWidth">
                    <el-input v-model="form.spId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="品名" :label-width="formLabelWidth">
                    <el-input v-model="form.spName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="form.spType" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="计量单位（个）" :label-width="formLabelWidth">
                    <el-input v-model="form.unit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面出库" :label-width="formLabelWidth">
                    <el-input v-model="form.outCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面入库" :label-width="formLabelWidth">
                    <el-input v-model="form.rkCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面库存数量" :label-width="formLabelWidth">
                    <el-input v-model="form.totalCount" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="盘点入库" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="差量" :label-width="formLabelWidth">
                    <el-input v-model="form.dValue" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="实际库存数量" :label-width="formLabelWidth">
                    <el-input v-model="form.checkCount" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加盘点单" :visible.sync="dialogFormVisible1">
            <el-form :model="addform">
                <el-form-item label="操作人员" :label-width="formLabelWidth">
                    <el-input v-model="addform.yhId" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="仓库id" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="addform.ckId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商品id" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="addform.spId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->

                <el-form-item label="选择日期" style="display: inline-block;width: 500px;margin-left: 50px">
                    <el-date-picker
                        v-model="value7"
                        type="date"
                        placeholder="开始日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!--<el-col class="line" :span="2">-</el-col>-->
                    <el-date-picker
                        v-model="value6"
                        type="date"
                        placeholder="选结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="选择仓库和商品" :label-width="formLabelWidth">
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    placeholder="选择仓库和商品"
                    @change="handleChange"
                 >
                </el-cascader>
                </el-form-item>
                <el-form-item label="商品类型" :label-width="formLabelWidth">
                    <!--<el-input v-model="addform.spType" auto-complete="off"></el-input>-->
                    <el-select v-model="value3" placeholder="商品类型"  style="width: 150px">
                    <el-option
                    v-for="item in typeInfos"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计量单位（个）" :label-width="formLabelWidth">
                    <el-input v-model="addform.unit" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="服务区域" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="账面入库" :label-width="formLabelWidth">
                    <el-input v-model="addform.rkCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面出库" :label-width="formLabelWidth">
                    <el-input v-model="addform.outCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面库存数量" :label-width="formLabelWidth">
                    <el-input v-model="addform.totalCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="实际库存数量" :label-width="formLabelWidth">
                    <el-input v-model="addform.checkCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="差量" :label-width="formLabelWidth">
                    <el-input v-model="addform.dValue" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd('addform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addform:{},
                value7:'',
                value6:'',
                value3:'',
                dialogFormVisible1:false,
                form:{},
                options: [],
                selectedOptions: [],
                typeInfos:[],
                dialogFormVisible:false,
                Searchform2:{},
                formLabelWidth: '120px',
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市',
                    zip: 200333
                }]
            }
        },
        created(){
            this.addform.yhId=localStorage.getItem('yhId')
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/inventory/page',
                    params:{
                        page:1,
                        size:10,
                        yhId:localStorage.getItem('yhId')
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.tableData3=[],
                this.tableData3=res.data.data.results;
            console.log('PANDIAN',this.tableData3)
        })
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/list/ckAndSp',
                    params:{
                        page:1,
                        size:5,
                        yhId:localStorage.getItem('yhId')
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.options=[],
                this.options=res.data;
            console.log('级联',res.data)
        })
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/list/spType',
                    // params:{
                    //     page:1,
                    //     size:10,
                    //     yhId:localStorage.getItem('yhId')
                    // },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.typeInfos=[],
                this.typeInfos=res.data;
            console.log('商品类型',res.data)
        })
        },
        methods: {
            handleCurrentChange(val){
                // console.log('fenye',val)
                this.cur_page = val;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.249.191:8080/inventory/page',
                        params:{
                            page:this.cur_page,
                            size:5,
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.tableData3=[]
                    this.tableData3=[]=res.data.data.results;
                console.log('结果', this.tableData3)
            });
            },
            toKuCun(){
                // /kucun
                this.$router.push('/kucun');
            },
            handleChange(value) {
                this.obj={};
                this.obj.ckId=value[0];
                this.obj.spId=value[1];
                // this.obj.startTime=this.value7.toLocaleDateString()
                // this.obj.endTime=this.value6.toLocaleDateString()
                console.log(this.obj);
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.249.191:8080/check/getCkSp',
                        params:{
                            page:1,
                            size:5,
                            ckId:this.obj.ckId,
                            spId:this.obj.spId,
                            start:this.value7.toLocaleDateString(),
                            end:this.value6.toLocaleDateString(),
                            yhId:localStorage.getItem('yhId')
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.tableData=[],
                    this.tableData.push(res.data)
                this.addform.spType=this.tableData[0].spType
                this.addform.rkCount=this.tableData[0].rkCount
                this.addform.outCount=this.tableData[0].outCount
                this.addform.totalCount=this.tableData[0].totalCount
                this.addform.unit=this.tableData[0].unit
                console.log('查询盘点',this.tableData,this.addform.spType)
            })
            },
            submitAdd(){
                let data=this.addform;
                data=Object.assign({},this.addform,this.obj,{spType:this.value3})
                console.log("--------",data,this.selectedOptions)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.249.191:8080/inventory',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    // this.tableData3=[],
                    // data.createTime=this.addform.createTime
                    // data.spName=this.addform.spName
                    this.tableData3.push(data)
                    console.log('添加盘点单结果',res)
                this.dialogFormVisible1 = false
                // this.$router.push('/check');


            })
            },
            addService(){
                this.dialogFormVisible1 = true
            },
            search(){},
            handleEdit(index, row) {
                this.dialogFormVisible=true;
                this.form=row;
                this.form.createTime='';
                this.form.lastUpdate='';
                console.log('test66',this.form)
            },
            submitEdit(){
                // const {serviceId,name,category,description,url,cost}=this.editform
                let data= this.form
                console.log('id',this.form);
                delete this.form.lastUpdate
                delete this.form.createTime
                this.$ajax(
                    {
                        method: 'PUT', //请求方式
                        url: 'http://10.103.249.191:8080/inventory',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
                    console.log('编辑结果',res)
                this.dialogFormVisible = false;
            });

            },
            handleDelete(index, row) {
                console.log('ddddd',row)
                this.tableData3.splice(index, 1);
                let id=row.id;
                this.$ajax({
                    method: 'delete', //请求方式
                    url: 'http://10.103.249.191:8080/inventory',
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
            },
        }
    }
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

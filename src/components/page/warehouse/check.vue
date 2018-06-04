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
                <el-button>取消</el-button>
            </el-form>
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
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="品名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="date"
                label="类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="date"
                label="计量单位（个）"
                width="100">
            </el-table-column>
            <!--<el-table-column label="配送信息">-->
            <el-table-column
                prop="name"
                label="账面"
                width="100">
                <el-table-column
                    prop="province"
                    label="出库"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="入库"
                    width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="实际盘点">
                <el-table-column
                    prop="province"
                    label="出库"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="入库"
                    width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column
                prop="date"
                label="差量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="库存量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="zip"
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
        <!-- Form -->
        <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="盘点日期" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="品名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计量单位（个）" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面出库" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面入库" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="盘点出库" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="盘点入库" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="差量" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存量" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="操作人员" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加盘点单" :visible.sync="dialogFormVisible1">
            <el-form :model="addform">
                <el-form-item label="盘点日期" :label-width="formLabelWidth">
                    <el-input v-model="addform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="品名" :label-width="formLabelWidth">
                    <el-input v-model="addform.cost" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="addform.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计量单位（个）" :label-width="formLabelWidth">
                    <el-input v-model="addform.category" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="服务区域" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="账面出库" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账面入库" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="盘点出库" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="盘点入库" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="差量" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存量" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="操作人员" :label-width="formLabelWidth">
                    <el-input v-model="addform.description" auto-complete="off"></el-input>
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
                dialogFormVisible1:false,
                form:{},
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
//             this.$ajax(
//                 {
//                     method: 'get', //请求方式
//                     url: 'http://10.103.243.94:8080/warehouseApply/page',
//                     params:{
//                         page:1,
//                         size:5,
//                         yhId:localStorage.getItem('yhId')
//                     },
//                     headers:{"Authorization":localStorage.getItem('token')},
//                 }).then((res)=>{
//                 this.tableData3=[],
//                 this.tableData3=res.data.data.results;
//             console.log('我的申请入库',this.tableData3)
//         })
        },
        methods: {
            submitAdd(){
                let data=this.addform;
                console.log("--------",data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.241.154:8080/ws/save',
                        data:data
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    console.log('添加服务结果',res)
                this.dialogFormVisible1 = false
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
//                 const {serviceId,name,category,description,url,cost}=this.editform
//                 let data= {serviceId,name,category,description,url,cost}
//                 console.log('id',data);
//                 this.$ajax(
//                     {
//                         method: 'post', //请求方式
//                         url: 'http://10.103.241.154:8080/ws/update',
//                         data:data
//                     }).then((res)=>{
// //                    this.usersInfo=[],
// //                        this.usersInfo=res.data.data.results;
//                     console.log('编辑结果',res)
//                 this.dialogFormVisible = false;
//             });

            },
            handleDelete(index, row) {
                this.warehouseOut.splice(index, 1);
                console.log('ddddd',row.uid)
                let id=row.id;
                this.$ajax({
                    method: 'delete', //请求方式
                    url: 'http://10.103.243.94:8080/warehouseApply',
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

<template>
    <div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i>服务信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>服务信息</el-breadcrumb-item>
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
        <el-button type="primary"  class="el-icon-plus" @click="addService">增加服务</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
        <!--<el-table-column-->
            <!--prop="serviceId"-->
            <!--label="服务编号"-->
            <!--sortable-->
            <!--width="100">-->
            <!--<template slot-scope="scope">-->
                <!--<i class="el-icon-time"></i>-->
                <!--<span style="margin-left: 10px">{{ scope.row.serviceId }}</span>-->
            <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
            prop="name"
            label="服务名称"
            sortable
            width="120">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>名称: {{ scope.row.name }}</p>
                    <p>编号: {{ scope.row.serviceId }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
            prop="category"
            label="服务类型"
            width="100">
        </el-table-column>
        <el-table-column
            prop="description"
            label="服务描述"
            width="120">
        </el-table-column>
        <el-table-column
            prop="url"
            label="URL"
            width="160">
        </el-table-column>
        <el-table-column
            prop="cost"
            label="费用"
            width="150">
        </el-table-column>
        <el-table-column label="操作" >
            <template scope="scope">
                <el-button size="small"
                           @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                <el-button size="small"
                           @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>
                <el-button size="small" type="danger"
                           @click="handleDelete(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-dialog title="添加服务" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务费用" :label-width="formLabelWidth">
                    <el-input v-model="form.cost" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务地址" :label-width="formLabelWidth">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <el-input v-model="form.category" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="服务区域" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="服务描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑服务信息" :visible.sync="dialogFormVisible1">
            <el-form  :model="editform" ref="editform">
                <el-form-item label="服务编号" :label-width="formLabelWidth">
                    <el-input v-model="editform.serviceId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                    <el-input v-model="editform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <el-input v-model="editform.category" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="URL" :label-width="formLabelWidth">
                    <el-input v-model="editform.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="费用" :label-width="formLabelWidth">
                    <el-input v-model="editform.cost" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="服务类型" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="editform.category" placeholder="请选择活动区域">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="服务描述" :label-width="formLabelWidth">
                    <el-input v-model="editform.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('editform')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="服务详细信息" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="description" label="服务" width="150"></el-table-column>
                <el-table-column property="reliability" label="可靠性" width="200"></el-table-column>
                <el-table-column property="responseTime" label="响应时间"></el-table-column>
                <el-table-column property="delay" label="延迟"></el-table-column>
                <el-table-column property="usability" label="可用性"></el-table-column>
            </el-table>
        </el-dialog>
        <div class="block" style="margin-top: 50px;margin-left: 300px">
            <!--<span class="demonstration">页数较少时的效果</span>-->
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                gridData:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1:false,
                form: {},
                editform:{},
                Searchform2:{},
                formLabelWidth: '120px'
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.241.154:8080/ws/page',
                    params:{
                        page:1,
                        size:10
                    }
                }).then((res)=>{
                // this.warehouseOut=[],
                this.tableData=res.data.data.results;
            console.log('服务结果',this.tableData)
        })
        },
        methods: {
            search(){
                let data=this.Searchform2
            },
            // openAdd(){
            //
            // },
            addService(){
                this.dialogFormVisible = true
            },
            submitAdd(){
                let data=this.form;
                console.log("--------",data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.241.154:8080/ws/save',
                        data:data
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    console.log('添加服务结果',res)
                this.dialogFormVisible = false
            })
            },
            formatter(row, column) {
                return row.address;
            },
            handleDetail(index,row){
                this.dialogTableVisible=true;
                console.log('row',row)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.241.154:8080/ws/find',
                        params:{
                            page:1,
                            size:10,
                            id:row.serviceId
                        }
                    }).then((res)=>{
                    this.gridData=[],
                    this.gridData.push(res.data.data)
                console.log('详情结果',this.gridData)
            })

             },
            handleEdit(index,row){
                this. dialogFormVisible1=true;
                this.editform=row;
                // this.form.createTime='';
                // this.form.lastUpdate='';
                // console.log('test66',this.form)
            },
            submitEdit(){
                const {serviceId,name,category,description,url,cost}=this.editform
                let data= {serviceId,name,category,description,url,cost}
                console.log('id',data);
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.241.154:8080/ws/update',
                        data:data
                    }).then((res)=>{
//                    this.usersInfo=[],
//                        this.usersInfo=res.data.data.results;
                    console.log('编辑结果',res)
                this.dialogFormVisible1 = false;
            });

            },
            handleDelete(index,row){
                this.tableData.splice(index, 1);
                console.log('id',row)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.241.154:8080/ws/delete',
                        params:{
                            page:1,
                            size:10,
                            id:row.serviceId
                        }
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    // this.tableData=res.data.data.results;
                console.log('删除',res)

            })
            }
        }
    }
</script>

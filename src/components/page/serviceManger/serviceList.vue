<template>
    <div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i>服务信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>服务信息</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
        <div style="width: 550px;display: inline-block">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'条件' + index"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'">
                    <el-select v-model="domain.key" placeholder="请选择" style="width: 150px">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="domain.operation" placeholder="请选择条件" style="width: 120px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <el-input v-model="domain.value" style="width: 80px"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">查询</el-button>
                    <el-button @click="addDomain">新增查询项</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div style="width: 300px;display: inline-block;margin-left:160px" >
            <el-button type="primary"  class="el-icon-plus" @click="addService">增加服务</el-button>
            <el-button type="primary"  class="el-icon-plus" @click="matching">自动匹配</el-button>
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
        <el-dialog title="添加服务" :visible.sync="dialogFormVisible6">
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
        <el-dialog title="输入匹配值" :visible.sync="dialogFormVisible6">
            <el-form :model="form">
                <el-form-item label="延时" :label-width="formLabelWidth">
                    <el-input v-model="form.delay" auto-complete="off"  placeholder="0-1"></el-input>
                </el-form-item>
                <el-form-item label="响应时间" :label-width="formLabelWidth">
                    <el-input v-model="form.responseTime" auto-complete="off"  placeholder="0-1"></el-input>
                </el-form-item>
                <el-form-item label="可靠性" :label-width="formLabelWidth">
                    <el-input v-model="form.reliability" auto-complete="off" placeholder="0.5-1"></el-input>
                </el-form-item>
                <!--<el-form-item label="服务区域" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="可用性" :label-width="formLabelWidth">
                    <el-input v-model="form.usability" auto-complete="off" placeholder="可用性（0、1）"></el-input>
                </el-form-item>
                <el-form-item label="费用" :label-width="formLabelWidth">
                    <el-input v-model="form.cost" auto-complete="off" placeholder="费用（0~10）" ></el-input>
                </el-form-item>
                <el-form-item label="重要性" :label-width="formLabelWidth">
                    <el-input v-model="form.m" auto-complete="off" placeholder="重要属性（2、3）"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMatch('form')">确 定</el-button>
            </div>
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
                options: [{
                    value: 'gt',
                    label: '大于'
                }, {
                    value: 'lt',
                    label: '小于'
                }],
                options2: [{
                    value: 'serviceId',
                    label: '服务编号'
                }, {
                    value: 'delay',
                    label: '延时'
                },{
                    value: 'responseTime',
                    label: '响应时间'
                },
                    {
                        value:'reliability',
                        label: '可靠性'
                    },
                    {
                        value:'m',
                        label: '重要值'
                    },
                    {
                        value:'cost',
                        label: '费用'
                    },
                    {
                        value:'usability',
                        label: '可用性'
                    }],
                operation: '',
                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        key:""
                    }],
                    // email: '',
                    // operation:'',
                    // key:''
                },
                tableData: [],
                gridData:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1:false,
                dialogFormVisible6:false,
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
            submitForm(formName) {
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.241.154:8080/ws/result',
                        data:this.dynamicValidateForm.domains
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    this.tableData=res.data.data;
                console.log('zuhe服务结果',res.data.data)
            })
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('dynamicValidateForm',this.dynamicValidateForm.domains)


                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            search(){
                let data=this.Searchform2
            },
            // openAdd(){
            //
            // },
            matching(){
                this.dialogFormVisible6=true;

            },
            submitMatch(){
                console.log('00000',this.form)
                let data=this.form
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.241.154:8080/ws/matching',
                        data:data
                    }).then((res)=>{
                    this.tableData=[],
                    this.tableData.push(res.data.data);
                console.log('自动匹配结果',this.tableData)
                this.dialogFormVisible6=false
            })
            },
            addService(){
                this.dialogFormVisible6 = true
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
                this.dialogFormVisible6 = false
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

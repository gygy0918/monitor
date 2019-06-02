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
        <el-table-column
            prop="name"
            label="服务名称"
            sortable
            width="100">
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
            width="100">
        </el-table-column>
        <el-table-column
            prop="url"
            label="URL"
            width="160">
        </el-table-column>
        <el-table-column
            prop="cost"
            label="费用"
            width="100">
        </el-table-column>
        <el-table-column label="操作" >
            <template scope="scope">
                <el-button size="small"
                           @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                <el-button size="small"
                           @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>
                <el-button size="small" type="danger"
                           @click="handleDelete(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>
                <el-button size="small"
                           @click="addMessage(scope.$index, scope.row)">增加消息</el-button>
                <el-button size="small"
                           @click="checkMessage(scope.$index, scope.row)">查看消息</el-button>
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
                <el-table-column property="description" label="服务" width="100"></el-table-column>
                <el-table-column property="reliability" label="可靠性" width="100"></el-table-column>
                <el-table-column property="responseTime" label="响应时间" width="100"></el-table-column>
                <el-table-column property="delay" label="延迟" width="100"></el-table-column>
                <el-table-column property="usability" label="可用性" width="100"></el-table-column>
                <el-table-column label="操作" >
                    <template scope="scope">
                        <el-button size="small"
                                   @click="serviceMethod(scope.$index, scope.row)">服务的方法</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="服务方法" :visible.sync="dialogTableVisible8">
            <el-table :data="serviceMethodData">
                <el-table-column property="opId" label="编号" width="80"></el-table-column>
                <el-table-column property="name" label="服务方法名" width="150"></el-table-column>
                <el-table-column property="input" label="输入" width="150"></el-table-column>
                <el-table-column property="output" label="输出"  width="100"></el-table-column>
                <el-table-column property="description" label="方法描述"  width="150"></el-table-column>
                <!--<el-table-column property="usability" label="可用性"></el-table-column>-->
                <!--<el-button type="primary" @click="submitEdit('editform')">确 定</el-button>-->
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
        <el-dialog title="添加消息" :visible.sync="dialogFormVisible2">
            <el-form :model="dynamicValidateForm2" ref="dynamicValidateForm2" label-width="100px" class="demo-dynamic" >
                <el-form-item label="消息名称" :label-width="formLabelWidth">
                <el-input v-model="form.messageName" auto-complete="off"  placeholder="0-1"></el-input>
                </el-form-item>
                <el-form-item label="服务id" :label-width="formLabelWidth">
                <el-input v-model="form.serviceId" auto-complete="off"  placeholder="0-1"></el-input>
                </el-form-item>
            <!--    <el-form-item label="消息属性" :label-width="formLabelWidth">
                    <el-input v-model="form.responseTime" auto-complete="off"  placeholder="0-1"></el-input>
                </el-form-item>-->
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm2.domains"
                    :label="'消息属性' + index"
                    :key="domain.key"
                    :prop="'domains' + index + 'value'">
                    <el-input v-model="domain.name" style="width: 80px" label="属性名称" placeholder="属性名称" ></el-input>
                    <el-input v-model="domain.type" style="width: 80px" label="属性类型" placeholder="属性类型" ></el-input>
                    <el-input v-model="domain.mean" style="width: 80px" label="属性含义" placeholder="属性含义" ></el-input>
                    <el-select v-model="domain.empty" placeholder="是否为空" style="width: 80px">
                        <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="domain.integral" placeholder="是否必须在消息中" style="width: 80px">
                        <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button @click.prevent="removeattribute(domain)">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addattribute">新增属性</el-button>
                    <el-button @click="resetForm('dynamicValidateForm2')">重置</el-button>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm2')">查询</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMatch('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="消息列表" :visible.sync="dialogTableVisible2">
            <el-table :data="messageData">
                <el-table-column property="messageId" label="消息ID" width="100"></el-table-column>
                <el-table-column property="name" label="消息名称" width="120"></el-table-column>
                <el-table-column property="serviceId" label="服务ID" width="100"></el-table-column>
                <el-table-column property="address" label="操作">
                    <template scope="scope">
                        <el-button size="small"
                                   @click="addAttr(scope.$index, scope.row)">增加属性</el-button>
                        <el-button size="small"
                                   @click="CheckAttr(scope.$index, scope.row)">查看属性</el-button>
                        <el-button size="small"
                                   @click="EditMessage(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>
                        <el-button size="small" type="danger"
                                   @click="deleteMessage(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="属性信息" :visible.sync="dialogTableVisible3">
            <el-table :data="attrData">
                <el-table-column property="id" label="id" width="100"></el-table-column>
                <el-table-column property="messageId" label="消息Id" width="100"></el-table-column>
                <el-table-column property="name" label="名称"></el-table-column>
                <el-table-column property="type" label="类型" width="100"></el-table-column>
                <el-table-column property="mean" label="含义" width="100"></el-table-column>
                <el-table-column property="integral" label="integral"></el-table-column>
                <el-table-column property="empty" label="是否空" width="80"></el-table-column>
                <el-table-column property="address" label="操作" width="300">
                    <template scope="scope">
                        <el-button size="small"
                                   @click="EditAttr(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>
                        <el-button size="small" type="danger"
                                   @click="DeleteAttr(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="修改消息" :visible.sync="dialogFormVisible4">
            <el-form :model="messageform">
                <el-form-item label="消息id" :label-width="formLabelWidth">
                    <el-input v-model="messageform.messageId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="消息名称" :label-width="formLabelWidth">
                    <el-input v-model="messageform.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="submitMessage">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加属性" :visible.sync="dialogFormVisible7">
            <el-form :model="attrAddform">
                <el-form-item label="消息id" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.messageId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性名称" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性含义" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.mean" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性是否必须包含在消息中" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.integral" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性是否能够为空" :label-width="formLabelWidth">
                    <el-input v-model="attrAddform.empty" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="submitattrInM">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改属性" :visible.sync="dialogFormVisible3">
            <el-form :model="attrform">
                <el-form-item label="属性id" :label-width="formLabelWidth">
                    <el-input v-model="attrform.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性名称" :label-width="formLabelWidth">
                    <el-input v-model="attrform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" :label-width="formLabelWidth">
                    <el-input v-model="attrform.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性含义" :label-width="formLabelWidth">
                    <el-input v-model="attrform.mean" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="包含在消息中" :label-width="formLabelWidth">
                    <el-input v-model="attrform.integral" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="能否空" :label-width="formLabelWidth">
                    <el-input v-model="attrform.empty" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="attrform.id" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="submitAttr">确 定</el-button>
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
                options3: [{
                    value: 'ture',
                    label: 'ture'
                }, {
                    value: 'false',
                    label: 'false'
                }],
                options4: [{
                    value: 'ture',
                    label: 'ture'
                }, {
                    value: 'false',
                    label: 'false'
                }],
                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        key:""
                    }],
                },
                dynamicValidateForm2: {
                    domains: [{
                        name: '',
                        type:'',
                        mean:'',
                        empty: '',
                        integral:''
                    }],
                },
                tableData: [],
                serviceMethodData:[],
                gridData:[],
                attrData:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                messageData:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                attrAddform:{},
                dialogTableVisible: false,
                dialogTableVisible2: false,
                dialogTableVisible3: false,
                dialogFormVisible: false,
                dialogFormVisible1:false,
                dialogFormVisible2:false,
                dialogFormVisible3:false,
                dialogFormVisible4:false,
                dialogFormVisible6:false,
                dialogFormVisible7:false,
                dialogTableVisible8:false,
                form: {},
                editform:{},
                attrform:{},
                Searchform2:{},
                messageform:{},
                formLabelWidth: '120px'
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.64:8080/ws/page',
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
            addAttr(index,data){
                this.dialogFormVisible7=true;
                this.attrAddform.messageId=data.messageId
            },
            submitattrInM(){
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.64:8080/messages/saveAttributes',
                        data:this.attrAddform
                    }).then((res)=>{
                    console.log('增加属性',res)
                this.dialogFormVisible7=false;
            })
            },
            serviceMethod(index,data){
                this.dialogTableVisible8=true,
                    // serviceMethodData
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.240.64:8080/operations/find',
                            params:{
                                // page:1,
                                // size:10,
                                id:data.serviceId
                            }
                        }).then((res)=>{
                        // this.warehouseOut=[],
                        this.serviceMethodData=res.data.data;
                console.log('服务结果',this.serviceMethodData)
            })
            },
            CheckAttr(index,data){
                console.log('CheckAttr',data.messageId)
                this.dialogTableVisible3=true;
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.64:8080/messages/findAttributes',
                        params:{
                            page:1,
                            size:50,
                            id:data.messageId
                        }
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    this.attrData=res.data.data;
                console.log('查看某个属性结果',res.data)
            })
            },
            EditMessage(index,data){
                console.log('EditMessage',data)
                this.dialogFormVisible4=true;
                this.messageform=data;
            },
            submitMessage(){
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.64:8080/messages/updateMessages',
                        data:this.messageform
                    }).then((res)=>{
                    console.log('修改消息结果',res)
                this.dialogFormVisible4=false;
            })
            },
           deleteMessage(index,data){
                console.log('deleteMessage',data)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.64:8080/messages/deleteAll',
                        params:{id:data.messageId}
                    }).then((res)=>{
                    console.log('删除消息结果',res)
               this.messageData.splice(index, 1);
            })
            },
            EditAttr(index,data){
                console.log('EditAttr',data)
                this.dialogFormVisible3=true;
                this.attrform=data;
            },
            submitAttr(){
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.64:8080/messages/updateAttributes',
                        data:this.attrform
                    }).then((res)=>{
                    console.log('修改属性结果',res)
                this.dialogFormVisible3=false;
            })
            },
            DeleteAttr(index,data){
                console.log('DeleteAttr',data)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.64:8080/messages/deleteAttributes',
                        params:{id:data.id}
                    }).then((res)=>{
                    console.log('修改属性结果',res)
                this.attrData.splice(index,1)
            })
            },
            submitForm(formName) {
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.64:8080/ws/result',
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
            addMessage(index,data){
                console.log('addMessage',data)
                this.form.serviceId=data.serviceId
                this.dialogFormVisible2=true;
            },
            checkMessage(index,data){
                console.log('checkMessage',data)
                this.dialogTableVisible2=true;
                this.$ajax(
                    {
                        method: 'GET', //请求方式
                        url: 'http://10.103.240.64:8080/messages/findByServiceId',
                        params:{id:data.serviceId}
                    }).then((res)=>{
                    // this.warehouseOut=[],
                    this.messageData=res.data.data;
                console.log('查看对应消息结果',res.data.data)
            })
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
            addattribute() {
                this.dynamicValidateForm2.domains.push({
                    name: '',
                    type:'',
                    mean:'',
                    empty: '',
                    integral:''
                });
            },
            removeattribute(item) {
                var index = this.dynamicValidateForm2.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm2.domains.splice(index, 1)
                }
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
                console.log('00000',this.dynamicValidateForm2.domains)
                let data=Object.assign(this.form,{attributes:this.dynamicValidateForm2.domains})
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.64:8080/messages/saveMessages',
                        data:data
                    }).then((res)=>{
                    this.tableData=[],
                    this.tableData.push(res.data.data);
                console.log('自动匹配结果',this.tableData)
                this.dialogFormVisible2=false
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
                        url: 'http://10.103.240.64:8080/ws/save',
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
                        url: 'http://10.103.240.64:8080/ws/find',
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
                        url: 'http://10.103.240.64:8080/ws/update',
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
                        url: 'http://10.103.240.64:8080/ws/delete',
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

<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>QOS信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>QOS信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px" >
                <!--<el-form ref="Searchform2" :model="Searchform2" style="display: inline-block;">-->

                        <!--<el-form-item style="display: inline-block;width: 100px">-->
                            <!--<el-input v-model="Searchform2.key" placeholder="查询项" ></el-input>-->
                        <!--</el-form-item>-->
                    <!--<el-form-item style="display: inline-block;width: 100px">-->
                        <!--<el-input v-model="Searchform2.delay" placeholder="延时"  ></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item style="display: inline-block;width: 100px">-->
                        <!--<el-select v-model="select_cate" placeholder="查询条件" >-->
                            <!--<el-option key="1" label="大于" value="gt"></el-option>-->
                            <!--<el-option key="2" label="小于" value="lt"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item style="display: inline-block;width: 100px">-->
                        <!--<el-input v-model="Searchform2.time" placeholder="值"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item style="display: inline-block;width: 100px">-->
                        <!--<el-input v-model="Searchform2.time" placeholder="费用" ></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-button type="primary" icon="search" @click="search">搜索</el-button>-->
                    <!--<el-button>取消</el-button>-->
                <!--</el-form>-->
                <el-button type="primary"  class="el-icon-plus" @click="matching">自动匹配</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="服务编号"-->
                <!--sortable-->
                <!--width="150">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-time"></i>-->
                    <!--<span style="margin-left: 10px">{{ scope.row.date }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="name"
                label="服务名称"
                sortable
                width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>编号: {{ scope.row.serviceId }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="delay"
                label="延迟"
                width="150">
            </el-table-column>
            <el-table-column
                prop="responseTime"
                label="响应时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="reliability"
                label="可靠性"
                width="150">
            </el-table-column>
            <el-table-column
                prop="usability"
                label="可用性"
                width="150">
            </el-table-column>
            <el-table-column
                prop="cost"
                label="费用"
                width="150">
            </el-table-column>
            <!--<el-table-column label="操作" >-->
                <!--<template scope="scope">-->
                    <!--<el-button size="small"-->
                               <!--@click="handleDetail(scope.$index, scope.row)">查看详情</el-button>-->
                    <!--<el-button size="small"-->
                               <!--@click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>-->
                    <!--<el-button size="small" type="danger"-->
                               <!--@click="handleDelete(scope.$index,scope.row)">删除</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
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
                    value: 'gt',
                    label: '小于'
                }],
                dialogFormVisible6:false,
                operation: '',
                tableData: [],
                Searchform2:{},
                dialogFormVisible:false,
                formLabelWidth: '120px',
                form:{},
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                }
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.162:8080/ws/page',
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
            matching(){
                this.dialogFormVisible6=true;

            },
            submitMatch(){
                console.log('00000',this.form)
                let data=this.form
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.243.162:8080/ws/matching',
                        data:data
                    }).then((res)=>{
                    this.tableData=[],
                    this.tableData.push(res.data.data);
                console.log('自动匹配结果',this.tableData)
                this.dialogFormVisible6=false
            })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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
            formatter(row, column) {
                return row.address;
            },

            search(){
                let data=this.Searchform2;
                console.log('000',data)
            //     this.$ajax(
            //         {
            //             method: 'post', //请求方式
            //             url: 'http://10.103.243.162:8080/ws/result',
            //             data:data
            //         }).then((res)=>{
            //         // this.warehouseOut=[],
            //         this.tableData=res.data.data.results;
            //     console.log('组合查询结果',this.tableData)
            // })
            }
        }
    }
</script>

<template>
    <div>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <!--<el-form-item-->
            <!--prop="email"-->
            <!--label="邮箱"-->
            <!--:rules="[-->
      <!--{ required: true, message: '请输入邮箱地址', trigger: 'blur' },-->
      <!--{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }-->
    <!--]"-->
        <!--&gt;-->
            <!--<el-input v-model="dynamicValidateForm.email"></el-input>-->
        <!--</el-form-item>-->
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
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}">
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
    </div>
</template>

<script>
    export default {
        name: "test",
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

            }
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
                console.log('服务结果',res.data.data)
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
            }
        }
    }
</script>

<style scoped>

</style>

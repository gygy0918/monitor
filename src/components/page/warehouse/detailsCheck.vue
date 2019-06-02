<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>分类盘点信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类查询信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-form ref="form2" :model="form2" label-width="80px" style="display: inline-block;">
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    placeholder="选择仓库和商品"
                    @change="handleChange">
                </el-cascader>
                <el-form-item label="选择日期" style="display: inline-block;width: 500px">
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
                <el-button type="primary" icon="search" @click="search">查询</el-button>
                <el-button>取消</el-button>
            </el-form>
            <!--<el-input v-model="select_word" placeholder="筛选关键词" style="width:150px"></el-input>-->
            <div style="display: inline-block;">
            </div>
            <!--<el-button type="primary"  @click="search">新增人员</el-button>-->
        </div>
        <el-table
            :data="tableData"
            style="width: 75%"
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
                prop="ckName"
                label="仓库名称"
                sortable
                width="150">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.ckName }}</p>
                        <p>编号: {{ scope.row.serviceId }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.ckName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="spName"
                label="商品名称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="spType"
                label="商品类型"
                width="160">
            </el-table-column>
            <el-table-column
                prop="rkCount"
                label="入库数量"
                width="150">
            </el-table-column>
            <el-table-column
                prop="outCount"
                label="出库数量"
                width="150">
            </el-table-column>
            <!--<el-table-column label="操作" >-->
                <!--<template scope="scope">-->
                    <!--<el-button size="small"-->
                               <!--@click="handleDetail(scope.$index, scope.row)">查看详情</el-button>-->
                    <!--<el-button size="small"-->
                               <!--@click="handleEdit(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>-->
                    <!--<el-button size="small" type="danger"-->
                               <!--@click="handleDelete(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                obj:{},
                tableData:[],
                value6:'',
                value7:'',
                form2:{},
                options: [],
                selectedOptions: [],
                selectedOptions2: []
            };
        },
        created(){
            //查询下拉菜单
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
                console.log(res.data)
        })
        },

        methods: {
            handleChange(value) {
                this.obj={};
                this.obj.ckId=value[0];
                this.obj.spId=value[1];
                // console.log(this.obj);
            },
            search(){
                // this.spObj.spId=this.value;
                this.obj.startTime=this.value7.toLocaleDateString()
                this.obj.endTime=this.value6.toLocaleDateString()
                // let data=Object.assign({},this.value6,this.value7,this.obj);
                // console.log('data',data)
                // let data=this.form2;
                console.log(this.value7.toLocaleDateString());
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
                    console.log('查询盘点',this.tableData)
                })
            }
        }
    };
</script>

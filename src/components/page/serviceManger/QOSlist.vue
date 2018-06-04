<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>QOS信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>QOS信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 10px" >
                <el-form ref="Searchform2" :model="Searchform2" style="display: inline-block;">
                        <el-form-item style="display: inline-block;width: 100px">
                            <el-select v-model="select_cate" placeholder="延迟" >
                                <el-option key="1" label="广东省" value="广东省"></el-option>
                                <el-option key="2" label="湖南省" value="湖南省"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="display: inline-block;width: 100px">
                            <el-input v-model="Searchform2.time" placeholder="响应时间" ></el-input>
                        </el-form-item>
                    <el-form-item style="display: inline-block;width: 100px">
                        <el-input v-model="Searchform2.time" placeholder="可靠性"  ></el-input>
                    </el-form-item>
                    <el-form-item style="display: inline-block;width: 100px">
                        <el-input v-model="Searchform2.time" placeholder="可用性"></el-input>
                    </el-form-item>
                    <el-form-item style="display: inline-block;width: 100px">
                        <el-input v-model="Searchform2.time" placeholder="费用" ></el-input>
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
            <el-table-column
                prop="date"
                label="服务编号"
                sortable
                width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="服务名称"
                sortable
                width="120">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="延迟"
                :formatter="formatter"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="响应时间"
                :formatter="formatter"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="可靠性"
                :formatter="formatter"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="可用性"
                :formatter="formatter"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="费用"
                :formatter="formatter"
                width="100">
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                Searchform2:{}
            }
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            search(){
                let data=this.Searchform2;
            }
        }
    }
</script>

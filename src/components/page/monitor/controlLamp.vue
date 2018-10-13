<template>
    <div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="电压"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="电流"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="灯的状态">
            <template scope="scope">
                <!--<el-tag type="info" v-if="scope.row.outStatus==0">未完成</el-tag>-->
                <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                <template  v-if="scope.row.address==0">
                    <el-button type="warning" icon="el-icon-delete" circle>损坏</el-button>
                </template>
                <template  v-else-if="scope.row.address==2">
                    <el-button type="danger" icon="el-icon-delete" circle>关闭</el-button>
                </template>
                <template v-else>
                    <el-button type="success" icon="el-icon-check" circle>正常</el-button>
                </template>
                <!--<el-button icon="el-icon-search" circle></el-button>-->
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作"
            width="180">
            <template scope="scope">
                <el-switch
                    v-model="value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
                <!--<el-button size="small" type="danger"-->
                <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                value1: true,
                value2: true,
//每个教室灯的信息
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '1'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '2'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '0'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]

            }
        },
        created(){
//            this.getData();
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/userInfo',
                    params:{
                        username:localStorage.getItem('ms_username')
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                res.data.gender=res.data.gender?'男':'女'
            res.data.state=res.data.state?'在线':'不在线'
            this.singleInfo=[],
                this.singleInfo.unshift(res.data);

            console.log('结果',res.data)
            localStorage.setItem('uid',res.data.uid)
        })
        },
    }
</script>

<style scoped>

</style>

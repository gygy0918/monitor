<template>
    <div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
        </el-menu>
    <el-table
        :data="tableData"
        style="width: 80%">
        <el-table-column
            prop="lightNumber"
            label="编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="voltage"
            label="电压"
            width="100">
        </el-table-column>
        <el-table-column
            prop="power"
            label="功率"
            width="120">
        </el-table-column>
        <el-table-column
            prop="electricity"
            label="电流"
            width="120">
        </el-table-column>
        <el-table-column
            prop="state"
            label="灯的状态">
            <template scope="scope">
                <!--<el-tag type="info" v-if="scope.row.outStatus==0">未完成</el-tag>-->
                <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                <template  v-if="scope.row.state==0">
                    <el-button type="warning" icon="el-icon-delete" circle>损坏</el-button>
                </template>
                <template  v-else-if="scope.row.state==2">
                    <el-button type="danger" icon="el-icon-delete" circle>关闭</el-button>
                </template>
                <template v-else>
                    <el-button type="success" icon="el-icon-check" circle>正常</el-button>
                </template>
                <!--<el-button icon="el-icon-search" circle></el-button>-->
            </template>
        </el-table-column>
        <el-table-column
            prop="state"
            label="操作"
            width="180">
            <template scope="scope">
                <template  v-if="scope.row.state!=0">
                    <el-switch
                        v-model="scope.row.state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
                <template  v-else="scope.row.state==0">
                    <el-switch
                        disabled
                        v-model="scope.row.state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
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
                tableData:
                    [{"lightId":"real1","lightNumber":"real1","lightName":"真灯1","location":"教三626","state":"2","voltage":1.97,"electricity":3.03,"power":5.969099999999999,"createTime":"Oct 13, 2018 9:15:23 PM","lastUpdate":"Oct 13, 2018 10:01:36 PM"},
                    {"lightId":"real2","lightNumber":"real2","lightName":"真灯2","location":"教三626","state":"2","voltage":2.03,"electricity":2.97,"power":6.0291,"createTime":"Oct 13, 2018 9:16:16 PM","lastUpdate":"Oct 13, 2018 10:01:36 PM"},
                    {"lightId":"real3","lightNumber":"real3","lightName":"真灯3","location":"教三626","state":"2","voltage":1.96,"electricity":3.04,"power":5.9584,"createTime":"Oct 13, 2018 9:50:36 PM","lastUpdate":"Oct 13, 2018 10:01:36 PM"}
                    ],
                activeIndex: '1',
                activeIndex2: '1'
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
            //连接实时数据
            var goEasy = new GoEasy({
                appkey: "BS-6d10683de85143f488ca00f6ea1c04b7",
               // onConnected: function () {
               //     alert("成功连接GoEasy。");
               // },
            });
            goEasy.subscribe({
                channel: "light_info",
                onMessage: function (message) {
                    //每次拿到数据重新填给tableData
                    tableData=message.content;
                }
            });
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>

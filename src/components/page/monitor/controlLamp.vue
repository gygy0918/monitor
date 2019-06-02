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
            prop="lastUpdate"
            label="时间"
            width="120">
        </el-table-column>
        <el-table-column
            prop="state"
            label="灯的状态"
            width="120">
            <template scope="scope">
                <!--<el-tag type="info" v-if="scope.row.state===0">未完成</el-tag>-->
                <!--<el-tag type="danger" v-else>已完成</el-tag>-->
                <template v-if="scope.row.state==='1'">
                <el-button type="success" icon="el-icon-delete" circle>
                    开
                </el-button>
            </template>
                <template v-else-if="scope.row.state==='2'">
                    <el-button type="danger" icon="el-icon-delete" circle>
                        关
                    </el-button>
                </template>

                <template v-else>
                    <el-button type="warning" icon="el-icon-delete" circle>
                        坏
                    </el-button>
                </template>
                    <!--<el-button type="info" icon="el-icon-delete" circle>{{scope.row.state==='2'?'关':scope.row.state==='1'?'开':'坏'}}</el-button>-->
                <!--<el-button icon="el-icon-search" circle></el-button>-->
            </template>
        </el-table-column>
        <el-table-column
            prop="state"
            label="操作"
            width="180">
            <template scope="scope">

                    <el-button type="info" icon="el-icon-delete" circle @click="isOpen(scope.row)">{{scope.row.state==='2'?'打开':scope.row.state==='1'?'关闭':'损坏'}}</el-button>

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
                // tableData:[],
                tableData: [],
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.64:8080/lightInfo/realLight',
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                //初始化，把结果给tableData
                this.tableData=[];
            this.tableData=res.data.data;
            console.log('修改之后this.tableData',this.tableData)
        })
        },
        mounted: function () {
            this.getData();
            console.log('mounted--window.kz',window.kz)
            this.tableData=window.kz?window.kz:this.tableData;
            console.log('mounted--tableData',this.tableData)
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            fuzhi(){
                console.log(' this.fuzhi', this.tableData)
                this.tableData=window.kz;
            },
            isOpen (val) {
                console.log('isOPEn',val.state)
                let data={type:val.state==='2'?1:2,lightId:val.lightNumber}
                if(val.state==='2'){
                    val.state='1'
                }else{
                    val.state='2'
                }
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.64:8080/commandLog/control',
                        params:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    //初始化，把结果给tableData
                    this.tableData=[];
                this.tableData=res.data.data;
                console.log('修改之后this.tableData',this.tableData)
            })

            },
            // request(data){
            //     // debugger
            //
            // },
            getData(){
                var goEasy = new GoEasy({
                    appkey: "BS-6d10683de85143f488ca00f6ea1c04b7",
                    // onConnected: function () {
                    //     alert("成功连接GoEasy。");
                    // },
                });
                // 实时刷新，打开定时器
                setInterval(this.fuzhi,5000);
                goEasy.subscribe({
                    channel: "realLight_info",
                    onMessage: function (message) {
                        console.log('message',message.content)
                        var data = message.content;
                        //每次拿到数据重新填给tableData
                        window.kz = JSON.parse(data);
                        console.log('全局', window.kz);
                        // console.log('tesssssssssssss', test,this.tableData);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>

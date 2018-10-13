<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 楼层详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<el-carousel :interval="4000" type="card" height="200px">-->
        <!--<el-carousel-item v-for="item in 6" :key="item">-->
        <!--<h3>{{ item }}</h3>-->
        <!--</el-carousel-item>-->
        <!--</el-carousel>-->
        <el-tabs :tab-position="tabPosition" style="height: 200px;"  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一楼" name="first" >
                <div class="back1">
                    <el-button type="primary" round class="ott" size="mini" @click="findHuoGui">112
                    </el-button>
                    <el-button type="primary" round class="oof" size="mini" @click="findHuoGui">115</el-button>
                    <el-button type="primary" round class="oot" size="mini" @click="findHuoGui">112</el-button>

                </div>
            </el-tab-pane>
            <el-tab-pane label="二楼" name="second">
            </el-tab-pane>
            <el-tab-pane label="三楼" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="四楼">定时任务补偿</el-tab-pane>
            <el-tab-pane label="六楼" name="6" >
                <div class="back" >
                    <el-button type="primary" v-for="item in warehouseInfo" round class="sts" size="mini"  v-if="item.room=='626'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>
                    <el-button type="primary" round class="sof" size="mini"  v-else-if="item.room=='614'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>
                    <el-button type="primary" round class="stf2" size="mini"  v-else-if="item.room=='635'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>
                    <el-button type="primary" round class="stf" size="mini"  v-else-if="item.room=='634'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>
                    <el-button type="primary" round class="sto" size="mini"  v-else-if="item.room=='631'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>
                    <el-button type="primary" round class="stsr" size="mini"  v-else-if="item.room=='636'" @click="findHuoGui(item.ckId)">{{ item.room }}</el-button>

                    <!--<el-button type="primary" round class="stsr" size="mini" @click="findHuoGui">627</el-button>-->

                    <!--<el-button type="primary" round class="stf" size="mini" @click="findHuoGui">625</el-button>-->
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>


</template>

<script>
    export default {
        data: function(){
            return {
//每个教室灯的信息
                activeName:'6'

            }
        },
        created(){
//通过点击楼层数返回相应的楼层教室•	http://10.103.240.238:8080/commodity/page?page=1&size=
            let parentName = localStorage.getItem('parentName')
            this.warehouseInfo=[],
                this.warehouseInfo.push({room:626})
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/warehouse/page',
                    params:{
                        page:1,
                        size:30,
                        floor:6,
                        // ckAddress:'111',
                        parentName:parentName
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                // this.warehouseInfo=[],
                this.warehouseInfo=res.data.data.results;
            // this.warehouseInfo.push({room:631})
            // this.warehouseInfo.push({room:626})
            console.log('仓库列表',this.warehouseInfo)
        })
        },
        methods: {
            handleClick(tab, event) {
                console.log(this.activeName, event);
            },
            findHuoGui(val){
                console.log('仓库编号', val);
                localStorage.setItem('ckId',val)
                this.$router.push('/controlLamp');

            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 900px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .el-carousel__item  {
        color: black;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0 auto;
        width: 500px
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-carousel{
        width: 500px;
        margin: 0 auto;
    }
    /*table{*/
    /*margin:0 auto;*/
    /*width: 400px;*/
    /*}*/
    el-table{
        width: 200px;
        height: 200px;
    }
    .goodcicle{
        width: 48px;
        height: 48px;
        background: yellow;
        border-radius: 24px;
        margin: 5px;
    }
    .badcicle{
        width: 48px;
        height: 48px;
        background: grey;
        border-radius: 24px;
        margin: 5px;
    }
    .back{
        /*width: 200px;*/
        position: relative;
        height: 600px;
        background:  url(../../../assets/1.png) no-repeat;
        background-size:100% 100%;
    }
    .back1{
        /*width: 200px;*/
        position: relative;
        height: 600px;
        background:  url(../../../assets/教1.png) no-repeat;
        background-size:100% 100%;
    }
    .stf{
        position: absolute;
        bottom:185px;
        left:360px;
    }
    .stf2{
        position: absolute;
        bottom:185px;
        left:410px;
    }
    .sto{
        position: absolute;
        bottom:185px;
        left:360px;
    }
    .sts{
        position: absolute;
        bottom:170px;
        left:60px;
    }
    .sof{
        position: absolute;
        top:210px;
        left:310px;
    }
    .stsr{
        position: absolute;
        bottom:270px;
        left:580px;
    }

    .ott{
        position: absolute;
        top:230px;
        left:100px;
    }
    .oof{
        position: absolute;
        top:210px;
        left:380px;
    }
    .oot{
        position: absolute;
        top:170px;
        left:520px;
    }
</style>
<!--<template>-->
<!--<div class="dashboard-container" style="background:black">-->
<!--<h3 　style="text-align:center;color:white">欢迎进入校园路灯监控后台管理系统</h3>-->
<!--&lt;!&ndash;<div style="text-align:center">&ndash;&gt;-->
<!--&lt;!&ndash;<img  src="../../assets/1.gif" >&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--</div>-->
<!--</template>-->

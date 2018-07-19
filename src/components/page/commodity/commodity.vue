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
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="一楼">
            <div class="back">
                <el-button type="primary" round class="sts" size="mini" @click="findHuoGui">626</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="二楼">配置管理</el-tab-pane>
        <el-tab-pane label="三楼">角色管理</el-tab-pane>
        <el-tab-pane label="四楼">定时任务补偿</el-tab-pane>
    </el-tabs>

</div>


</template>

<script>
export default {
data: function(){
return {
//每个教室灯的信息

}
},
created(){
//通过点击楼层数返回相应的楼层教室•	http://10.103.243.94:8080/commodity/page?page=1&size=
},
methods: {
        handleClick(tab, event) {
        console.log(tab, event);
        },
    findHuoGui(){
        this.$router.push('/findHuogui');

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
    .sts{
        position: absolute;
        bottom:170px;
        left:80px;
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

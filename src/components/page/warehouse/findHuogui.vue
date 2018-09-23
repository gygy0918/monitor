<template>
    <div class="bacwall">

        <el-row >
        <el-col :span="6" v-for="(o, index) in data.slice(0,4)" :key="index" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '0px'}" class="csrd">
        <img src="../../../assets/0.jpg" class="image" >
        <div style="padding: 14px;">
        <span style="font-size: small">{{o.hgId}}号</span>
        <!--<el-tag size="mini">{{o.hgStatus?'有货物':'空柜'}}</el-tag>-->
        <!--<span style="font-size: small">规格：{{ rules }}</span>-->
            <el-popover
                placement="right"
                width="400"
                trigger="click">
                <el-table :data="commodity">
                    <el-table-column width="100" property="spName" label="物品名称"></el-table-column>
                    <el-table-column width="100" property="spType" label="类型"></el-table-column>
                    <el-table-column width="100" property="rkCount" label="数量"></el-table-column>
                    <el-table-column width="120" property="lastUpdate" label="操作日期"></el-table-column>
                </el-table>
                <el-button  slot="reference" size="small" type="text" @click="goodsDetail(o.hgId)">{{o.hgStatus?'查看货柜内物品':'空柜'}}</el-button>
            </el-popover>
        <div >
        <time class="time">{{ currentDate }}</time>
        <!--<el-button type="text" class="button">货柜</el-button>-->

        </div>
        </div>
        </el-card>
        </el-col>
        </el-row>
        <div class="line"></div>
        <el-row >
            <el-col :span="6" v-for="(o, index) in data.slice(4,8)" :key="index" :offset="index > 0 ? 0 : 0">
                <el-card :body-style="{ padding: '0px'}" class="csrd">
                    <img src="../../../assets/0.jpg" class="image" >
                    <div style="padding: 14px;">
                        <span style="font-size: small">{{o.hgId}}号</span>
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <el-table :data="commodity">
                                <el-table-column width="100" property="spName" label="物品名称"></el-table-column>
                                <el-table-column width="100" property="spType" label="类型"></el-table-column>
                                <el-table-column width="100" property="rkCount" label="数量"></el-table-column>
                                <el-table-column width="120" property="lastUpdate" label="操作日期"></el-table-column>
                            </el-table>
                            <el-button  slot="reference" size="small" type="text" @click="goodsDetail(o.hgId)">{{o.hgStatus?'查看货柜内物品':'空柜'}}</el-button>
                        </el-popover>
                        <div >
                            <time class="time">{{ currentDate }}</time>
                            <!--<el-button type="text" class="button">货柜</el-button>-->

                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="line"></div>
        <el-row >
            <el-col :span="6" v-for="(o, index) in data.slice(8,12)" :key="index" :offset="index > 0 ? 0 : 0">
                <el-card :body-style="{ padding: '0px'}" class="csrd">
                    <img src="../../../assets/0.jpg" class="image" >
                    <div style="padding: 14px;">
                        <span style="font-size: small">{{o.hgId}}号</span>
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <el-table :data="commodity">
                                <el-table-column width="100" property="spName" label="物品名称"></el-table-column>
                                <el-table-column width="100" property="spType" label="类型"></el-table-column>
                                <el-table-column width="100" property="rkCount" label="数量"></el-table-column>
                                <el-table-column width="120" property="lastUpdate" label="操作日期"></el-table-column>
                            </el-table>
                            <el-button   v-if="o.hgId==1" slot="reference" size="small" type="text" @click="goodsDetail(o.hgId)">查看货柜内物品'</el-button>
                            <el-button   v-else disabled slot="reference" size="small" type="text" @click="goodsDetail(o.hgId)">空柜</el-button>
                        </el-popover>
                        <div >
                            <time class="time">{{ currentDate }}</time>
                            <!--<el-button type="text" class="button">货柜</el-button>-->

                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="line"></div>
                </div>
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    export default {
        data() {
            return {
                rules:'small',
                currentDate: new Date().getFullYear(),
                data:[1,2,3,4],
                commodity:[],
                gridData: [{
                    date: '2016-05-02',
                    name: '飞利浦节能灯',
                    address: '电灯',
                    number: '2'
                }, {
                    date: '2016-05-04',
                    name: '公牛插座',
                    address: '开关',
                    number: '4'
                }, {
                    date: '2016-05-01',
                    name: 'PANDA/熊猫电线',
                    address: '电线',
                    number: '6'
                }],
                form:{
                    yhId:'',
                    ckId:'',
                    hgId:'',
                    spId:'',
                    rkCount:'',
                    remark:''
                },
            };
        },
        created(){
//            this.getData();
            this.form.ckId= window.localStorage.getItem('ckId')
            console.log('this.form.ckId',this.form.ckId)
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/box/page',
                    params:{
                        page:1,
                        size:10,
                        ckId: this.form.ckId,
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.warehouseIn=[],
                this.data=res.data.data.results;
            console.log('结果9999',res.data.data.results)
        })
        },
        methods:{
            goodsDetail(val){
                console.log('goodsDetail',val)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/warehouseIn',
                        params:{
                            hgId: val,
                            page:1,
                            size:11,
                            // hgId:152289887438404
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.commodity=[],
                    console.log('*****',res)
                let info=res.data.data.commodity;
                info.rkCount=res.data.data.rkCount
                window.info=info
                this.commodity.push(info)
                console.log('000',this.commodity)
            })
            }
        },
        name: "find-huogui"
    }
</script>

<style scoped>
    .line{
        border-bottom:15px solid #ccc;
        box-shadow: 4px 6px 8px #ccc;
        margin-bottom: 30px;
        width: 96%;
    }
    /* 3D scene */
    .scene {
        overflow: hidden;
        margin:0 auto;
        width:100%;
        height:100%;
        perspective: 1000px;
        perspective-origin: 50% 25%;
        backface-visibility:  hidden;
        transform-style:  preserve-3d;
    }

    @-webkit-keyframes zoom-roll-top {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }
    @-webkit-keyframes zoom-roll-middle {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }
    @-webkit-keyframes zoom-roll-bottom {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }
    @-moz-keyframes zoom-roll-top {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }
    @-moz-keyframes zoom-roll-middle {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }
    @-moz-keyframes zoom-roll-bottom {
        50% {
            transform: rotateX(-10deg) translateZ(-200px);
        }
        100% {
            transform: rotateX(0) translateZ(0);
        }
    }

    .roll-camera {
        transform-style: preserve-3d;
    }
    .roll-camera .move-camera {
        transform-style: preserve-3d;
        transform: translateY(0px);
        transition: all 3s ease-in-out;
    }

    body.view-top-shelf .roll-camera {
        animation: zoom-roll-top 3s ease-in-out;
    }
    body.view-top-shelf .roll-camera .move-camera {
        transform: translateY(0px);
    }

    body.view-middle-shelf .roll-camera {
        animation: zoom-roll-middle 3s ease-in-out;
    }
    body.view-middle-shelf .roll-camera .move-camera {
        transform: translateY(-200px);
    }

    body.view-bottom-shelf .roll-camera {
        animation: zoom-roll-bottom 3s ease-in-out;
    }
    body.view-bottom-shelf .roll-camera .move-camera {
        transform: translateY(-400px);
    }

    .wallpaper {
        position: absolute;
        width: 200%;
        height: 2000px;
        margin-left:-50%;
        background-image: linear-gradient(-40deg, #769a31 10%, #526b22 25%);
    }
    .wallpaper:before {
        content:"";
        display:block;
        width:100%;
        height:100%;
        background: url('../../../assets/wall.jpg');
    }
    .time {
        font-size: 13px;
        color: #999;
    }
 .bacwall{
     /*background: url("../../../assets/wall.jpg") no-repeat;*/
     /*background-size: 800px 800px;*/
     /*width: 1000px;*/
     /*height: 1000px;*/

 }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        height: 100px;
        display: block;
        /*box-shadow:3px 3px 8px #f00*/
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .csrd{
        width: 150px;
        height: 160px;
        box-shadow:2px 2px 7px #242f42;
        margin-bottom: 3px;
    }
    /*.liti{*/
        /*box-shadow:-2px 0px 8px #f00,0px -2px 8px #000,0px 2px 8px #9e038a,2px 0px 8px #0f0;*/
    /*}*/
    .shelf {
        position: absolute;
        left:50%;
        margin-left:-325px;
        transform-style:  preserve-3d;
        backface-visibility:  hidden;
        transform: rotateY(90deg) rotateX(90deg) translateX(199px);
    }
    .shelf.top {
        top: 150px;
    }
    .shelf.middle {
        top: 350px;
    }
    .shelf.bottom {
        top: 550px;
    }
    .shelf .face {
        position: absolute;
        top:0;
        left:0;
        background-color: #fff7eb;
        box-shadow: inset 0 0 75px 1.5px rgba(0, 0, 0, .1);
    }
    .shelf .front {
        width: 100px;
        height: 700px;
        transform-style: preserve-3d;
        transform: translateX(35px) translateY(-350px) translateZ(10px);
    }
    .shelf .back {
        width: 100px;
        height: 700px;
        transform: translateX(35px) translateY(-350px) translateZ(-10px);
    }
    .shelf .left {
        width: 20px;
        height: 700px;
        background: linear-gradient(0deg, #eae3d8 0%, #fff7eb 100%);
        transform: translateX(25px) translateY(-350px) rotateY(-90deg) translateZ(0);
    }
    .shelf .top {
        width: 20px;
        height: 100px;
        transform: translateX(75px) translateY(300px) rotateX(90deg) rotateZ(90deg);
    }
    .shelf .bottom {
        width: 20px;
        height: 100px;
        transform: translateX(75px) translateY(-400px) rotateX(90deg) rotateZ(90deg);
    }

    /* lighting */
    .shelf:before {
        content:"";
        display:block;
        width: 670px;
        height:20px;
        box-shadow: 0 -30px 30px 20px rgba(0, 0, 0, 0.5);
        transform:  rotateX(90deg)
        rotateY(90deg)
        translateX(-20px)
        translateZ(-200px)
        skew(-45deg);
    }
    .shelf .back:before {
        content:"";
        position: absolute;
        display:block;
        width: 100%;
        height:100%;
        background: rgba(0, 0, 0, 0.65);
    }
    .shelf .top:before,
    .shelf .bottom:before,
    .shelf .left:before,
    .shelf .right:before {
        content:"";
        position: absolute;
        display:block;
        width: 100%;
        height:100%;
        background: rgba(0, 0, 0, 0.25);
    }


    /* photo cards */
    .shelf .photocard {
        position: relative;
        display:block;
        width: 150px;
        height:100px;
        transform-style:  preserve-3d;
        transform:        rotateX(-90deg)
        rotateY(270deg)
        translateY(-50px)
        translateZ(25px);
    }
    .shelf .photocard:after {
        content:"";
        position: absolute;
        bottom:0px;
        right:0;
        display:block;
        width: 100px;
        height:1px;
        box-shadow: 0 30px 30px 20px rgba(0, 0, 0, 0.5);
        transform:  rotateX(90deg)
        rotateZ(180deg)
        translateX(25px)
        translateY(-15px)
        skew(-45deg);

        /* don't apply box-shadow to FF (render bug) */
        -moz-transform: scale(0);
    }
    .shelf .photocard:nth-child(1n) {
        top:75px;
    }
    .shelf .photocard:nth-child(2n){
        top:200px;
    }
    .shelf .photocard:nth-child(3n){
        top: 325px;
    }
    .shelf .photocard img {
        display:block;
        width:150px;
        height: 100px;
        outline: 1px solid transparent; /* triggers anti-anliasing in FF */
    }
</style>

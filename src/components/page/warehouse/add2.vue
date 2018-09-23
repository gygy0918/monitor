<template>
    <div >
        <div>
        <el-button type="success" round  @click="onSesrch">通过地点搜索选址</el-button>
        </div>
        <div id="container" style="float: left;width:600px; height:600px;margin:10px"></div>
        <div id='right'>
            <div>
                <div class='title'>选择模式</div>
                <input type='radio' name='mode' value='dragMap' checked>拖拽地图模式</input>
                </br>
                <input type='radio' name='mode' value='dragMarker'>拖拽Marker模式</input>
            </div>
            <div>
                <button id='start'>开始选点</button>
                <button id='stop'>关闭选点</button>
            </div>
            <div>
                <div class='title'>选址结果</div>
                <div class='c'>经纬度:</div>
                <div id='lnglat'></div>
                <div class='c'>地址:</div>
                <div id='address'></div>
                <div class='c'>最近的路口:</div>
                <div id='nearestJunction'></div>
                <div class='c'>最近的路:</div>
                <div id='nearestRoad'></div>
                <div class='c'>最近的POI:</div>
                <div id='nearestPOI'></div>
            </div>
            <div style="margin-top: 50px;">
                <!--<button>确认信息</button>-->
                <el-button type="success" round style="margin:10px" @click="add">确认信息</el-button>
            </div>
        </div>
        <!--<div id="outer-box" style="margin-left: 620px;">-->
        <!--&lt;!&ndash;<div id="eventInfo">事件信息</div>&ndash;&gt;-->
        <!--</div>-->

        <!--<div id="pickerBox">-->
            <!--<input id="pickerInput" placeholder="输入关键字选取地点" />-->
            <!--<div id="poiInfo"></div>-->
        <!--</div>-->
        <!--<div style="float: right;width:300px; height:100px;margin-top: 80px;">-->
            <!--<el-form ref=" LocationItem" :model=" LocationItem" label-width="80px">-->
                <!--<el-form-item label="物品名称">-->
                    <!--<el-input v-model=" LocationItem.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="物品型号">-->
                    <!--<el-input v-model=" LocationItem.address"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="物品信息">-->
                    <!--<el-input v-model=" LocationItem.location"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--&lt;!&ndash;<el-button type="primary" @click="onSubmit">确认添加</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button>取消</el-button>&ndash;&gt;-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->

    </div>
</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{
                LocationItem:''
            }

        },
        created(){
            // console.log('3333',this.LocationItem)
        },
        mounted: function () {
            this.$options.methods.inital.bind(this)();
        },

        methods: {
            // http://10.103.240.238:8080/warehouse
            add(){
                // console.log('999',window.LocationItem)
                let data=window.LocationItem
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.238:8080/warehouse',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                //     this.warehouseIn=res.data.data.results;
                    this.$router.push('/filterMap')
                console.log('结果',res)
            })
            },
            onSesrch:function () {
               this.$router.push('/addWarehouse2')

            },
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                // var clickListener,map = new AMap.Map("container", {
                //     resizeEnable: true,
                //     zoom: 16,
                //     scrollWheel: false
                // });
                AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
                    var map = new AMap.Map('container', {
                        zoom: 16,
                        scrollWheel: false
                    })
                var positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: map
                });
                positionPicker.on('success', function(positionResult) {
                    // console.log('0000',String(positionResult.position))
                    document.getElementById('lnglat').innerHTML = positionResult.position;
                    document.getElementById('address').innerHTML = positionResult.address;
                    document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
                    document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
                    document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
                    // console.log('00',positionResult.position.lat,positionResult.position.lng)
                    window.LocationItem={
                        ckName:'',
                        ckLocation:String(positionResult.position),
                        ckAddress:positionResult.address,
                        ckNearestRoad: positionResult.nearestRoad,
                        ckPointInfo: positionResult.nearestPOI,
                        lat:positionResult.position.lat,
                        lng:positionResult.position.lng,
                        ckHgCount:12,
                        ckAttribute:'normal'
                    }
                });
                positionPicker.on('fail', function(positionResult) {
                    document.getElementById('lnglat').innerHTML = ' ';
                    document.getElementById('address').innerHTML = ' ';
                    document.getElementById('nearestJunction').innerHTML = ' ';
                    document.getElementById('nearestRoad').innerHTML = ' ';
                    document.getElementById('nearestPOI').innerHTML = ' ';
                });
                var onModeChange = function(e) {
                    positionPicker.setMode(e.target.value)
                }
                var startButton = document.getElementById('start');
                var stopButton = document.getElementById('stop');
                var dragMapMode = document.getElementsByName('mode')[0];
                var dragMarkerMode = document.getElementsByName('mode')[1];
                AMap.event.addDomListener(startButton, 'click', function() {
                    positionPicker.start(map.getBounds().getSouthWest())
                })
                AMap.event.addDomListener(stopButton, 'click', function() {
                    positionPicker.stop();
                })
                AMap.event.addDomListener(dragMapMode, 'change', onModeChange)
                AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);
                positionPicker.start();
                map.panBy(0, 1);
                map.addControl(new AMap.ToolBar({
                    liteStyle: true
                }))


                });
            },//初始化完毕


            // getData:function () {
            //     console.log()
            //     console.log()
            //
            // },

        }


    }
</script>
<style>
    html,
    body {
        height: 100%;
        margin: 0;
        width: 100%;
        padding: 0;
        overflow: hidden;
        font-size: 13px;
    }

    .map {
        height: 100%;
        width: 60%;
        float: left;
    }

    #right {
        color: #444;
        background-color: #f8f8f8;
        width: 35%;
        float: right;
        height: 100%;
    }

    #start,
    #stop,
    #right input {
        margin: 4px;
        margin-left: 15px;
    }

    .title {
        width: 100%;
        background-color: #dadada
    }

    button {
        border: solid 1px;
        margin-left: 15px;
        background-color: #dadafa;
    }

    .c {
        font-weight: 600;
        padding-left: 15px;
        padding-top: 4px;
    }

    #lnglat,
    #address,
    #nearestJunction,
    #nearestRoad,
    #nearestPOI,
    .title {
        padding-left: 15px;
    }
</style>

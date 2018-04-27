<template>
    <div >
        <div id="container" style="float: left;width:600px; height:600px;margin:10px"></div>
        <!--<div id="outer-box" style="margin-left: 620px;">-->
            <!--&lt;!&ndash;<div id="eventInfo">事件信息</div>&ndash;&gt;-->
        <!--</div>-->
        <div id="pickerBox">
            <input id="pickerInput" placeholder="输入关键字选取地点" />
            <div id="poiInfo"></div>
        </div>
        <div style="float: right;width:300px; height:100px;margin-top: 80px;">
            <el-form ref=" LocationItem" :model=" LocationItem" label-width="80px">
                <el-form-item label="物品名称">
                    <el-input v-model=" LocationItem.name"></el-input>
                </el-form-item>
                <el-form-item label="物品型号">
                    <el-input v-model=" LocationItem.address"></el-input>
                </el-form-item>
                <el-form-item label="物品信息">
                    <el-input v-model=" LocationItem.location"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

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
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                var clickListener,map = new AMap.Map("container", {
                    resizeEnable: true,
                    zoom: 16,
                });

                AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {

                    var poiPicker = new PoiPicker({
                        city:'北京',
                        input: 'pickerInput'
                    });

                    //初始化poiPicker
                    poiPickerReady(poiPicker);
                });

                function poiPickerReady(poiPicker) {

                    window.poiPicker = poiPicker;

                    var marker = new AMap.Marker();

                    var infoWindow = new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -30)
                    });

                    //选取了某个POI
                    poiPicker.on('poiPicked', function(poiResult) {

                        var source = poiResult.source,
                            poi = poiResult.item,
                            info = {
                                source: source,
                                id: poi.id,
                                name: poi.name,
                                location: poi.location.toString(),
                                address: poi.address
                            };
                        window.LocationItem={
                            ckName:poi.name,
                            ckLocation:String(poi.location),
                            ckAddress:poi.address,
                            ckNearestRoad: '',
                            lat:poi.location.lat,
                            lng:poi.location.lng,
                            ckPointInfo: '',
                            ckHgCount:12,
                            ckAttribute:'normal'
                        }
                        // window.LocationItem=info;
                        console.log('lll', window.LocationItem)

                        marker.setMap(map);
                        infoWindow.setMap(map);

                        marker.setPosition(poi.location);
                        infoWindow.setPosition(poi.location);

                        infoWindow.setContent('新增地理信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
                        infoWindow.open(map, marker.getPosition());

                        //map.setCenter(marker.getPosition());
                    });

                    poiPicker.onCityReady(function() {
                        poiPicker.suggest('美食');
                    });
                }


            },//初始化完毕

            // getData:function () {
            //     console.log()
            //     console.log()
            //
            // },
            onSubmit() {

                console.log('submit!',window.LocationItem);
                let data=window.LocationItem
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.243.94:8080/warehouse',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    //     this.warehouseIn=res.data.data.results;
                    this.$router.push('/filterMap')
                    console.log('结果',res)
            })
            }

        }


    }
</script>
<style>
    html,
    body,
    #container {
        width: 100%;
        height: 100%;
        margin: 0px;
        font-size: 13px;
    }

    #pickerBox {
        position: absolute;
        z-index: 9999;
        top: 50px;
        right: 30px;
        width: 300px;
    }

    #pickerInput {
        width: 200px;
        padding: 5px 5px;
    }

    #poiInfo {
        background: #fff;
    }

    .amap_lib_placeSearch .poibox.highlight {
        background-color: #CAE1FF;
    }

    .amap_lib_placeSearch .poi-more {
        display: none!important;
    }
</style>

<template>
    <div >
        <div id="container" style="float: left;width:700px; height:700px;margin:10px">室外 </div>
        <div id="outer-box" style="margin-left: 620px;">
            <!--<div id="eventInfo">添加监控物品</div>-->
        </div>
        <el-button type="success" round style="margin:10px" @click="add">新增监控物品</el-button>
        <div id="panel">
            <div id="intro">
                <h5>详细信息</h5>
            </div>
            <ul id="my-list" style="max-height: 600px"></ul>
        </div>
    </div>
</template>

<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script type="text/javascript" src='https://a.amap.com/jsapi_demos/static/resource/capitals.js'></script>
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{
                options:''

            }

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
                    center: [ 116.356351,39.960395],
                    zoom: 18,
                });

                var markers = [{
                    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
                    position: [116.356351,39.960395]
                }, {
                    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
                    position: [116.368904, 39.913423]
                }, {
                    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
                    position: [116.305467, 39.807761]
                }];
                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                markers.forEach(function(marker) {
                    var testMarker=new AMap.Marker({
                        map: map,
                        icon: marker.icon,
                        position: [marker.position[0], marker.position[1]],
                        offset: new AMap.Pixel(-13, -30)
                    });
                    testMarker.content = '教三';
                    testMarker.on('click', markerClick);
                });

                function markerClick(e) {
                    debugger
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                    window.location.href='/#innerMap'
                }



            },//初始化完毕
        }


    }
</script>
<style>
    html, body, #map {
        width: 100%;
        height: 100%;
        margin:0;
    }
</style>

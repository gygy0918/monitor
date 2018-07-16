<template>
    <div >
        <div id="container" style="float: left;width:700px; height:700px;margin:10px">室外 </div>
        <div id="outer-box" style="margin-left: 620px;">
            <!--<div id="eventInfo">添加监控物品</div>-->
        </div>
        <div id="panel"></div>
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
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom:15,
                    center: [116.35796,39.961744]
                });
                //构造路线导航类
                var driving = new AMap.Driving({
                    map: map,
                    panel: "panel"
                });
                // 根据起终点经纬度规划驾车导航路线
                //构造路线导航类
                var driving = new AMap.Driving({
                    map: map,
                    panel: "panel"
                });
                // 根据起终点名称规划驾车导航路线
                // driving.search([
                //     {keyword: '北京市地震局(公交站)',city:'北京'},
                //     {keyword: '亦庄文化园(地铁站)',city:'北京'}
                // ]);
                driving.search(new AMap.LngLat(116.35796,39.961744), new AMap.LngLat(116.427281, 39.903719));

// 将创建的点标记添加到已有的地图实例：
                map.add(marker);

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
    #panel {
        position: fixed;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 10px;
        right: 10px;
        width: 280px;
    }
</style>

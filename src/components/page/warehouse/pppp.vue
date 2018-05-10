<template>
    <div>
    <div id="container"></div>
    <div class="button-group">
        <input type="button" class="button" value="默认样式" id="add0" onclick = 'addCluster(0)'/>
        <input type="button" class="button" value="自定义图标" id="add1" onclick = 'addCluster(1)'/>
        <input type="button" class="button" value="完全自定义" id="add2" onclick = 'addCluster(2)'/>
    </div>
    </div>
</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script src="http://a.amap.com/jsapi_demos/static/china.js"></script>
<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{

            }

        },
        created(){


        },

        mounted: function () {
            this.$options.methods.inital.bind(this)();

        },

        methods: {
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                var cluster, markers = [];
                var clickListener,map = new AMap.Map("container", {
                    resizeEnable: true,
                    zoom: 16,
                });
                for(var i=0;i<points.length;i+=1){
                    markers.push(new AMap.Marker({
                        position:points[i]['lnglat'],
                        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                        offset: new AMap.Pixel(-15,-15)
                    }))
                };
                var count  = markers.length;
                var _renderCluserMarker = function (context) {
                    var factor = Math.pow(context.count/count,1/18)
                    var div = document.createElement('div');
                    var Hue = 180 - factor* 180;
                    var bgColor = 'hsla('+Hue+',100%,50%,0.7)';
                    var fontColor = 'hsla('+Hue+',100%,20%,1)';
                    var borderColor = 'hsla('+Hue+',100%,40%,1)';
                    var shadowColor = 'hsla('+Hue+',100%,50%,1)';
                    div.style.backgroundColor = bgColor
                    var size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
                    div.style.width = div.style.height = size+'px';
                    div.style.border = 'solid 1px '+ borderColor;
                    div.style.borderRadius = size/2 + 'px';
                    div.style.boxShadow = '0 0 1px '+ shadowColor;
                    div.innerHTML = context.count;
                    div.style.lineHeight = size+'px';
                    div.style.color = fontColor;
                    div.style.fontSize = '14px';
                    div.style.textAlign = 'center';
                    context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
                    context.marker.setContent(div)
                }
                addCluster(2);

                function addCluster(tag) {
                    if (cluster) {
                        cluster.setMap(null);
                    }
                    if (tag == 2) {//完全自定义
                        cluster = new AMap.MarkerClusterer(map,markers,{
                            gridSize:80,
                            renderCluserMarker:_renderCluserMarker
                        });
                    } else if (tag == 1) {//自定义图标
                        var sts = [{
                            url: "http://a.amap.com/jsapi_demos/static/images/blue.png",
                            size: new AMap.Size(32, 32),
                            offset: new AMap.Pixel(-16, -16)
                        }, {
                            url: "http://a.amap.com/jsapi_demos/static/images/green.png",
                            size: new AMap.Size(32, 32),
                            offset: new AMap.Pixel(-16, -16)
                        }, {
                            url: "http://a.amap.com/jsapi_demos/static/images/orange.png",
                            size: new AMap.Size(36, 36),
                            offset: new AMap.Pixel(-18, -18)
                        },{
                            url: "http://a.amap.com/jsapi_demos/static/images/red.png",
                            size: new AMap.Size(48, 48),
                            offset: new AMap.Pixel(-24, -24)
                        },{
                            url: "http://a.amap.com/jsapi_demos/static/images/darkRed.png",
                            size: new AMap.Size(48, 48),
                            offset: new AMap.Pixel(-24, -24)
                        }];
                        cluster = new AMap.MarkerClusterer(map, markers, {
                            styles: sts,
                            gridSize:80
                        });
                    } else {//默认样式
                        cluster = new AMap.MarkerClusterer(map, markers,{gridSize:80});
                    }
                }


            },//初始化完毕
            add() {
                this.$router.push('../addWarehouse')
            }

        }


    }
</script>
<style>
    #panel{
        margin: 0 auto;
        overflow-y: scroll;
    }
    #eventInfo {
        position: absolute;
        z-index: 9999;
        right: 570px;
        top: 20px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 7px;
        min-width: 100px;
        line-height: 170%;
    }
    /*.select{*/
    /*background: rebeccapurple;*/
    /*}*/
    .select {
        /*width: 90px;*/
        /*height: 60px;*/
        -webkit-animation-name: skyset;
        -webkit-animation-duration: 2000ms;
        /*-webkit-animation-iteration-count: infinite; !*无限循环*!*/
        -webkit-animation-timing-function: linear;
    }
    @-webkit-keyframes skyset {
        0% { background: #ffffff;}
        50%{ background:yellow}
        100% {background:#ffffff;}
    }
    .eventType {
        font-size: 120%;
        letter-spacing: 1px;
        color: red;
    }
    .active{background:yellow;}
    .my-svg-marker .amap-simple-marker-label {
        color: #fff;
        top: 10px;
        font-size: 20px;
    }
</style>

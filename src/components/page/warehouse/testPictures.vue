<template>
    <div id="container"></div>

</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{

            }
        },
        created(){

        },
        mounted:function () {
            this.$options.methods.inital.bind(this)();
        },

        methods: {
            inital: function () {
                var clickListener, map = new AMap.Map("container", {
                    resizeEnable: true,
                    zoom: 4
                });
                function initPage(PointSimplifier, $) {

                    var pointSimplifierIns, groupStyleMap;

                    pointSimplifierIns = new PointSimplifier({
                        zIndex: 115,
                        //autoSetFitView: false,
                        map: map, //所属的地图实例

                        getPosition: function(item) {

                            var lngLatLine = item.lngLatLine;

                            if (!lngLatLine) {
                                return null;
                            }

                            var parts = lngLatLine.split(',');

                            return [parseFloat(parts[0]), parseFloat(parts[1])];
                        },
                        getHoverTitle: function(dataItem, idx) {
                            return '序号: ' + idx;
                        },
                        //使用GroupStyleRender
                        renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
                        renderOptions: {
                            //点的样式
                            pointStyle: {
                                width: 5,
                                height: 5,
                                fillStyle:'#A2D0FA'
                            },
                            getGroupId: function(item, idx) {

                                return item.groupId;
                            },
                            groupStyleOptions: function(gid) {

                                return groupStyleMap[gid];
                            }

                        }
                    });

                    function onIconLoad() {
                        pointSimplifierIns.renderLater();
                    }

                    function onIconError(e) {
                        alert('图片加载失败！');
                    }

                    groupStyleMap = {
                        '0': {
                            pointStyle: {
                                //绘制点占据的矩形区域
                                content: PointSimplifier.Render.Canvas.getImageContent(
                                    '../../../assets/logo.png', onIconLoad, onIconError),
                                //宽度
                                width: 16,
                                //高度
                                height: 16,
                                //定位点为中心
                                offset: ['-50%', '-50%'],
                                fillStyle: null,
                                //strokeStyle: null
                            }
                        },
                        '1': {
                            pointStyle: {
                                //绘制点占据的矩形区域
                                content: PointSimplifier.Render.Canvas.getImageContent(
                                    '../../../assets/logo.png', onIconLoad, onIconError),
                                //宽度
                                width: 16,
                                //高度
                                height: 16,
                                //定位点为中心
                                offset: ['-50%', '-50%'],
                                fillStyle: null,
                                // strokeStyle: null
                            }
                        },
                        '2': {
                            pointStyle: {
                                //绘制点占据的矩形区域
                                content: PointSimplifier.Render.Canvas.getImageContent(
                                    '../../../assets/logo.png', onIconLoad, onIconError),
                                //宽度
                                width: 16,
                                //高度
                                height: 16,
                                //定位点为中心
                                offset: ['-50%', '-50%'],
                                fillStyle: null,
                                //strokeStyle: null
                            }
                        },
                        '3': {
                            pointStyle: {
                                //绘制点占据的矩形区域
                                content: PointSimplifier.Render.Canvas.getImageContent(
                                    '../../../assets/logo.png', onIconLoad, onIconError),
                                //宽度
                                width: 16,
                                //高度
                                height: 16,
                                //定位点为中心
                                offset: ['-50%', '-50%'],
                                fillStyle: null,
                                //strokeStyle: null
                            }
                        }
                    };

                    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
                    $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {

                        $('#loadingTip').remove();

                        var lines = csv.split('\n'),
                            data = [];

                        for (var i = 0, len = lines.length; i < len; i++) {

                            data.push({
                                lngLatLine: lines[i],
                                groupId: i % 5
                            });
                        }

                        pointSimplifierIns.setData(data);
                    });
                }

                AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) {

                    if (!PointSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！');
                        return;
                    }

                    initPage(PointSimplifier, $);
                });
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
    }

    #loadingTip {
        position: absolute;
        z-index: 9999;
        top: 0;
        right: 0;
        padding: 3px 10px;
        background: red;
        color: #fff;
        font-size: 13px;
    }
</style>

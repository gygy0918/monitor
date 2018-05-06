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
                AMapUI.load(['ui/misc/PointSimplifier', 'lib/utils', 'lib/$'], function(PointSimplifier, utils, $) {

                    if (!PointSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！');
                        return;
                    }

                    /**
                     * 自定义的分组绘制引擎，仅作示例,功能类似于 PointSimplifier.Render.Canvas.GroupStyleRender
                     * @param {PointSimplifier} pointSimplifierIns 关联的PointSimplifier实例
                     * @param {Object} opts   配置
                     */
                    function MyCanvasRender(pointSimplifierIns, opts) {
                        //直接调用父类的构造函数
                        MyCanvasRender.__super__.constructor.apply(this, arguments);
                    }

                    //继承自默认的Canvas引擎（http://webapi.amap.com/ui/1.0/ui/misc/PointSimplifier/render/canvas.js）
                    utils.inherit(MyCanvasRender, PointSimplifier.Render.Canvas);

                    utils.extend(MyCanvasRender.prototype, {
                        /**
                         * 重新实现点的绘制方法
                         * @param  {number} zoom       当前的地图级别
                         * @param  {Array} activePoints 可以正常绘制的点
                         * @param  {Array} shadowPoints 空间被占用的点
                         */
                        renderNormalPoints: function(zoom, activePoints, shadowPoints) {
                            //先按默认逻辑处理shadowPoints
                            MyCanvasRender.__super__.renderNormalPoints.call(this, zoom, null, shadowPoints);

                            var pointStyle = this.getOption('pointStyle'),
                                getPointsGroupKey = this.getOption('getPointsGroupKey'),
                                pointStyleGroup = this.getOption('pointStyleGroup'),
                                pointSimplifierIns = this.getPointSimplifierInstance(),
                                groups = {};

                            //按key分组
                            for (var i = 0, len = activePoints.length; i < len; i++) {

                                var point = activePoints[i],
                                    dataIndex = point.idx,
                                    dataItem = pointSimplifierIns.getDataItemByIndex(dataIndex);

                                var key = getPointsGroupKey.call(this, dataItem, dataIndex);

                                if (!groups[key]) {
                                    groups[key] = [];
                                }

                                groups[key].push(activePoints[i]);
                            }

                            //分组绘制
                            for (var k in groups) {

                                //继承pointStyle中的默认属性
                                var styleOptions = utils.extend({}, pointStyle, pointStyleGroup[k]);

                                //调用父类的绘制函数
                                this.drawPointsWithStyleOptions(groups[k], styleOptions);
                            }
                        }
                    });


                    var pointSimplifierIns = new PointSimplifier({

                        zIndex: 300,
                        map: map,
                        getPosition: function(item) {

                            if (!item) {
                                return null;
                            }

                            var parts = item.split(',');

                            return [parseFloat(parts[0]), parseFloat(parts[1])];
                        },
                        getHoverTitle: function(dataItem, idx) {
                            return '序号: ' + idx;
                        },
                        //赋值为 MyCanvasRender
                        renderConstructor: MyCanvasRender,
                        renderOptions: {
                            getPointsGroupKey: function(dataItem, dataIndex) {
                                //这里直接按索引取余，仅作示意
                                return 'g' + dataIndex % 5;
                            },
                            //分组配置
                            pointStyleGroup: {
                                'g0': {
                                    fillStyle: '#3366cc'//蓝色
                                },
                                'g1': {
                                    fillStyle: '#dc3912'//红色
                                },
                                // 'g2': {
                                //     fillStyle: '#ff9900'//橙色
                                // },
                                // 'g3': {
                                //     fillStyle: '#109618'//绿色
                                // },
                                'g4': {
                                    fillStyle: '#990099'//紫
                                }
                            }
                        }
                    });

                    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
                    $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {

                        var data = csv.split('\n');

                        pointSimplifierIns.setData(data);

                        $('#loadingTip').remove();
                    });
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

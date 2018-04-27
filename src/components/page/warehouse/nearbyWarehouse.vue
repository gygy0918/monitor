<template>
    <div >
        <div id="container" style="float: left;width:600px; height:600px;margin:10px"></div>
        <div class="button-group">
            <input id="load-btn" type="button" class="button" value="加载Loca图层"/>
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
            onSesrch:function () {
                this.$router.push('/addWarehouse2')

            },
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                var clickListener,map = new AMap.Map("container", {
                    resizeEnable: true,
                    zoom: 16,
                    scrollWheel: false
                });
                var loaded = false;

                function createVisualMap() {

                    if (loaded) return;
                    loaded = true;

                    var map = Loca.create(amap);
                    var layer = Loca.visualLayer({
                        container: map,
                        type: 'point',
                        shape: 'circle'
                    });

                    layer.setData(districts, {
                        lnglat: 'center'
                    });
                    layer.setOptions({
                        style: {
                            radius: 10,
                            fill: 'rgba(100, 100, 233, 0.6)',
                            lineWidth: 1,
                            stroke: '#eee'
                        }
                    });

                    layer.render();

                }
                document.getElementById('load-btn').onclick = createVisualMap;

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

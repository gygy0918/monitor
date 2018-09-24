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
            <el-form ref=" LocationDetails" :model=" LocationDetails" label-width="80px">
                <el-form-item label="***仓库名称">
                    <el-input v-model=" LocationDetails.name"  placeholder="必须输入仓库名称且唯一"></el-input>
                </el-form-item>
                <el-form-item label="***仓库具体位置">
                    <el-input v-model=" LocationDetails.ckAddress" placeholder="必须仓库具体位置且唯一"></el-input>
                </el-form-item>
                <el-form-item label="选择位置">
                    <!--<el-input v-model=" LocationDetails.ckManage"></el-input>-->
                    <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                仓库管理员:
                <el-select v-model="value" placeholder="请选择" >
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!--<el-form-item label="仓库创建者">-->
                    <!--<el-input v-model="  LocationDetails.ckBuilder"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="仓库属性（常规）">
                    <el-input v-model="  LocationDetails.ckAttribute"></el-input>
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
        data: function(){
            return {
                url:'10.103.240.238:8080',
                     LocationItem:'',
                    subDistricts:[],
                options2:[],
                options: [{
                    value: '6',
                    label: '6',
                    children: [{
                        value: '614',
                        label: '614',

                    }, {
                        value: '635',
                        label: '635',
                    }, {
                            value: '612',
                            label: '612',
                        }, {
                            value: '634',
                            label: '634',
                        },
                        {
                            value: '631',
                            label: '631',
                        },
                        {
                            value: '636',
                            label: '636',
                        }]
                }],
                selectedOptions: [],
                value: '',
                    city:'',
                    district:'',
                    LocationDetails:{
                        name:'',
                        ckAddress:'',
                        ckManager:'',
                        ckBuilder:'',
                        ckAttribute:''},
                form: {
                    yhId: localStorage.getItem('yhId'),
                    ckId: '',
                    hgId: '',
                    spId: '',
//                    delivery: true,
//                    type: ['步步高'],
                    rkCount: '',
                    remark: ''
                }
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/list/ckManager',
                    params:{
                        page:1,
                        size:9
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.options2=res.data
            console.log('结果+++++',res.data)
//                 datainfo=res.data.data.results;
//
        });
        },
        mounted: function () {
            this.$options.methods.inital.bind(this)();
        },

        methods: {
            handleChange(value) {
                console.log('val',value)
                this.obj={};
                this.obj.floor=value[0];
                this.obj.room=value[1];
                console.log('选择的楼层',this.obj);
            },
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                var clickListener,map = new AMap.Map("container", {
                    resizeEnable: true,
                    zoom: 16,
                });
               var lnglatXY = [116.289603,39.998364];
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
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
                        console.log('0000',poiResult.item)
                        var source = poiResult.source,
                            poi = poiResult.item,
                            info = {
                                source: source,
                                id: poi.id,
                                name: poi.name,
                                location: poi.location.toString(),
                                address: poi.address
                            };
                        console.log('1111',info.location)
                        geocoder.getAddress(info.location, function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                geocoder_CallBack(result);
                            }
                        });
                        function geocoder_CallBack(data) {
                            console.log('//返回地址描述',data.regeocode.formattedAddress)
                            var str=data.regeocode.formattedAddress
                            var index=str.indexOf('市')
                            window.city=str.substring(0,index+1)//city "北京市"
                            var index2=str.indexOf('区')
                            window.district=str.slice(index+1,index2+1)
                            console.log('//返回地址描述',data.regeocode.formattedAddress,city,district)
                            // var address = data.regeocode.formattedAddress; //返回地址描述
                            // document.getElementById("result").innerHTML = address;
                        }
                        window.LocationItem={
                            name:poi.name,
                            // city:this.city,
                            // district:this.district,
                            // ckLocation:String(poi.location),
                            // ckAddress:poi.address,
                            // ckNearestRoad: '',
                            lat:poi.location.lat,
                            lng:poi.location.lng,
                            // ckPointInfo: '',
                            // ckHgCount:12,
                            // ckAttribute:'normal',
                        }

                        // window.LocationItem=info;
                        // console.log('lll', window.LocationItem)

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
console.log('0000000000000',this.value)
                window.LocationItem.city=window.city
                this.LocationDetails.ckManager=this.value;
                window.LocationItem.district=window.district
                this.LocationDetails.lat=window.LocationItem.lat
                this.LocationDetails.lng=window.LocationItem.lng
                // this.subDistricts.push(
                //     {SubCkLocationthis:window.LocationItem.ckLocation}
                // )
                // console.log('1111111111111111111111',this.LocationDetails.ckManage)
                // console.log('submit!',window.district,this.LocationDetails);
                // let data=Object.assign({},this.LocationDetails,window.LocationItem);
                this.LocationDetails=Object.assign({},this.LocationDetails,this.obj)
                console.log('00000',this.LocationDetails)
                let data=window.LocationItem
                this.subDistricts.push(
                    this.LocationDetails
                )
                data.subDistricts=this.subDistricts
               // data=Object.assign({},data,this.obj);
                console.log('llllllll',data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.240.238:8080/warehouseParent',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    //     this.warehouseIn=res.data.data.results;
                    this.$message({
                    message: "操作成功！",
                    type: 'success'
                });
                    console.log('结果',res)
                this.$router.push('/testpictures')
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

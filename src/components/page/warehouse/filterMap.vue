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

            }

        },
        created(){
//             var datainfo=[];
//             this.$ajax(
//                 {
//                     method: 'get', //请求方式
//                     url: 'http://10.103.241.154:8080/lightInfo/page',
//                     params:{
//                         page:1,
//                         size:9
//                     },
//                 }).then((res)=>{
// //                console.log('结果',res.data.data.results)
//                 datainfo=res.data.data.results;
//             datainfo.map((item)=>{
//                 let positions=[]
//                 if(item.longitude&&item.latitude){
//                 positions.push(item.longitude);
//                 positions.push(item.latitude);
//                 item.positions=positions;
//             }
// //                this.datainfo=datainfo;
//             console.log('page',datainfo)
//             window.test=datainfo;
//         })
//
//         });
        },
        mounted: function () {
            this.$options.methods.inital.bind(this)();
//            var goEasy = new GoEasy({
//                appkey: "BS-6d10683de85143f488ca00f6ea1c04b7",
////                onConnected: function () {
////                    alert("成功连接GoEasy。");
////                },
//            });
//            window.ss=goEasy;
//            var datainfo = new Array(10);
//            var obj={};
//           ss.subscribe({
//                channel: "light_info",
//                onMessage: function (message) {
//                    obj=message.content;
//                   let id=JSON.parse(obj).lightId;
////                    console.log('message',message.content.lightId
//                    datainfo[id]=JSON.parse(obj);
//                    console.log('实时数组拼接',datainfo);
//                    window.test=datainfo;
//                }
//            });
        },

        methods: {
            inital: function () {
//                console.log('参数',data);
                //初始化地图对象，加载地图
                var clickListener,map = new AMap.Map("container", {
                    resizeEnable: true,
                    center: [ 108, 34],
                    zoom: 18,
                });

                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.243.94:8080/warehouse/page',
                        params:{
                            page:1,
                            size:1000
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                //     this.warehouseInfo=[],
                //     this.warehouseInfo=res.data.data.results;
                    console.log(res.data.data.results)
                let data=res.data.data.results
                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                for (var i = 0, marker; i < data.length; i++) {
                    var marker = new AMap.Marker({
                        position: data[i].location,
                        map: map
                    });
                    // marker.content = '我是第' + (i + 1) + '个Marker';
                    console.log('999',data[i])
                    marker.content='地名：' + data[i].ckAddress+'<p   onclick="test()">查看详情</p>'
                   let p= document.getElementsByTagName('p')
                    // p.addEventListener('click',function () {
                    //     alter('iiii')
                    // },false)
                    // p.on('click', test);
                    marker.on('click', markerClick);
                    marker.emit('click', {target: marker});
                }
                function markerClick(e) {
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                    // setTimeout(function(){ alert('Hello'); },2000)
                }
                function test() {
                    alert('Hello');
                }
                map.setFitView();



            })





            },//初始化完毕
            add() {
                this.$router.push('../addWarehouse')
            }

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

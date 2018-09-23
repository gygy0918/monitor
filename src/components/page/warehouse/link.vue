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
        beforeCreate(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.240.238:8080/warehouse/page',
                    params:{
                        page:1,
                        size:1000
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                // console.log('999',res.data.data.results)
            window.data=res.data.data.results
            // console.log('1111', window.data)
        })
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
                //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
                var map = new AMap.Map("container", {
                    resizeEnable: true,
                    // center: [116.411674, 39.915057],
                    zoom: 16
                });
                addMarker();
                //添加marker标记
                data=window.data
                function addMarker() {

                    // map.clearMap();
                    console.log('7777',data)
                    for (var i = 0, marker; i < data.length; i++) {
                        // console.log('8888',data[i])
                        var marker = new AMap.Marker({
                            position: data[i].location,
                            map: map
                        });
                    }
                    // var marker = new AMap.Marker({
                    //     map: map,
                    //     position: [116.481181, 39.989792]
                    // });
                    //鼠标点击marker弹出自定义的信息窗体
                    AMap.event.addListener(marker, 'click', function() {
                        console.log('test')
                        infoWindow.open(map, marker.getPosition());
                    });
                }

                //实例化信息窗体
                var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
                    content = [];
                content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
                content.push("电话：010-64733333");
                content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
                var infoWindow = new AMap.InfoWindow({
                    isCustom: true,  //使用自定义窗体
                    content: createInfoWindow(title, content.join("<br/>")),
                    offset: new AMap.Pixel(16, -45)
                });

                //构建自定义信息窗体
                function createInfoWindow(title, content) {
                    var info = document.createElement("div");
                    info.className = "info";

                    //可以通过下面的方式修改自定义窗体的宽高
                    //info.style.width = "400px";
                    // 定义顶部标题
                    var top = document.createElement("div");
                    var titleD = document.createElement("div");
                    var closeX = document.createElement("img");
                    top.className = "info-top";
                    titleD.innerHTML = title;
                    closeX.src = "http://webapi.amap.com/images/close2.gif";
                    closeX.onclick = closeInfoWindow;

                    top.appendChild(titleD);
                    top.appendChild(closeX);
                    info.appendChild(top);

                    // 定义中部内容
                    var middle = document.createElement("div");
                    middle.className = "info-middle";
                    middle.style.backgroundColor = 'white';
                    middle.innerHTML = content;
                    info.appendChild(middle);

                    // 定义底部内容
                    var bottom = document.createElement("div");
                    bottom.className = "info-bottom";
                    bottom.style.position = 'relative';
                    bottom.style.top = '0px';
                    bottom.style.margin = '0 auto';
                    var sharp = document.createElement("img");
                    sharp.src = "http://webapi.amap.com/images/sharp.png";
                    bottom.appendChild(sharp);
                    info.appendChild(bottom);
                    return info;
                }

                //关闭信息窗体
                function closeInfoWindow() {
                    map.clearInfoWindow();
                }




            },//初始化完毕
            add() {
                this.$router.push('../addWarehouse')
            }

        }


    }
</script>
<style>
    .info {
        border: solid 1px silver;
    }
    div.info-top {
        position: relative;
        background: none repeat scroll 0 0 #F9F9F9;
        border-bottom: 1px solid #CCC;
        border-radius: 5px 5px 0 0;
    }
    div.info-top div {
        display: inline-block;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        line-height: 31px;
        padding: 0 10px;
    }
    div.info-top img {
        position: absolute;
        top: 10px;
        right: 10px;
        transition-duration: 0.25s;
    }
    div.info-top img:hover {
        box-shadow: 0px 0px 5px #000;
    }
    div.info-middle {
        font-size: 12px;
        padding: 6px;
        line-height: 20px;
    }
    div.info-bottom {
        height: 0px;
        width: 100%;
        clear: both;
        text-align: center;
    }
    div.info-bottom img {
        position: relative;
        z-index: 104;
    }
    span {
        margin-left: 5px;
        font-size: 11px;
    }
    .info-middle img {
        float: left;
        margin-right: 6px;
    }
</style>

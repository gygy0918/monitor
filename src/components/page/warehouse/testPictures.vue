<template>
    <body>
    <div id="tip" style="display: inline-block;margin-right: 100px">可以缩放地图，得到缩放级别哦！<br><span id="info"></span>
    </div>
   <el-button type="primary" icon="el-icon-edit" style="margin-bottom: 10px" @click="addWarehouse"> 选址建库</el-button>

    <ul style="float:right;display: none;" class="side">
        室内仓库列表
    </ul>
        <div  id="container" style="width: 70%;"></div>



  </body>
        <!--<div id="tip">可以缩放地图，得到缩放级别哦！<br><span id="info"></span></div>-->

        <!--<ul><li>2</li>-->
            <!--<li>2</li>-->
            <!--<li>2</li>-->
            <!--<li>2</li>-->
            <!--<li>2</li>-->
            <!--<li>2</li>-->
        <!--</ul>-->


    <!--<div class="button-group">-->
        <!--<input type="button" class="button" value="默认样式" id="add0" onclick = 'addCluster(0)'/>-->
        <!--<input type="button" class="button" value="自定义图标" id="add1" onclick = 'addCluster(1)'/>-->
        <!--<input type="button" class="butmarkerston" value="完全自定义" id="add2" onclick = 'addCluster(2)'/>-->
    <!--</div>-->

</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8&plugin=AMap.MarkerClusterer"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script src="http://a.amap.com/jsapi_demos/static/china.js"></script>
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{
                provinces:[]

            }
        },
        created(){
            // var clickListener, map = new AMap.Map("container", {
            //     resizeEnable: true,
            //     zoom: 4,
            //     zooms:[4,18],
            //     center: [106.49, 34.60]
            //     // center: [106.49, 34.60]
            // });
        },
        mounted:function () {
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/locationParent',
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                console.log('结果',res)
            this.provinces=res.data;
            window.provinces=res.data;
            console.log('结果1',this.provinces)
            this.inital()
        })
            // this.$options.methods.inital.bind(this)();
        },

        methods: {
            addWarehouse(){
            //    addWarehouse
                this.$router.push('/addWarehouse');
            },

            inital: function () {
                var provinces=[]
                // var clickListener, map = new AMap.Map("container", {
                //     resizeEnable: true,
                //     zoom: 11,
                //     zooms:[4,18],
                //     center: [106.49, 34.60]
                //     // center: [106.49, 34.60]
                // });
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    // zoom:4,
                    zooms:[4,18],
                    center: [116.397428, 39.90923]
                });
                map.setZoom(4)
                var cluster, markers = [];

                // 设置地图比例尺
                AMap.plugin(['AMap.Scale'],
                    function(){
                        map.addControl(new AMap.Scale());
                    });
                AMap.event.addListener(map,'zoomend',function(){
                    document.getElementById('info').innerHTML = '当前缩放级别：' + map.getZoom();
                    let v=map.getZoom();
                    console.log('getCenter( )',map.getCenter( ))
                    // if(v>17){
                    //
                    // }
                });

                var markersTwo;
                var markersThree;
                var createMarker = function(data,hide) {
                    if(typeof data.center!='string'){
                        return;
                    }else{
                    // debugger;
                    let position=typeof data.center
                    var div = document.createElement('div');
                    div.className = 'circle';
                    var r = Math.floor(data.count / 1024);
                    div.style.backgroundColor = hide ?'#393':'#09f';
                    var htmlData='<div>'+data.name+'</div><div>'+data.count+'</div>';
                    div.innerHTML = htmlData;
                    console.log('data',data)
                        var marker = new AMap.Marker({
                            content: div,
                            title:data.name,
                            position: data.center.split(','),
                            offset: new AMap.Pixel(-24, 5),
                            zIndex: data.count,
                            ckManger: data.ckManager||'',
                            ckStatusName: data.ckStatusName||'',
                            ckId:data.ckId||'',
                            ckAddress:data.ckAddress||''
                        });


                    marker.subMarkers = [];
                    if(data.name==='山东省'||data.name==='河南省'||data.name==='北京市'||data.name==='济南市'||data.name==='天桥区'){
                        marker.setLabel({content:'&larr;请点击',offset:new AMap.Pixel(45,0)})
                        // map.setCenter(marker.getPosition());
                        map.setCenter(marker.getPosition());
                        // console.log('++++',marker.getPosition())
                    }
                    if(!hide){
                        marker.setMap(map)
                    }
                    if(data.subDistricts&&data.subDistricts.length){
                        for(var i = 0 ; i<data.subDistricts.length;i+=1){
                            marker.subMarkers.push(createMarker(data.subDistricts[i],true));
                        }
                    }
                    return marker;
                }
                }
                var _onZoomEnd = function(e) {
                    // debugger
                    if (map.getZoom() < 7) {//全国下的省份
                        for (var i = 0; i < markers.length; i += 1) {
                            map.remove(markers[i].subMarkers);
                        }
                        map.add(markers);
                    }else if((map.getZoom() < 9) && (map.getZoom() > 7)){//省份下的市
                        for (var i = 0; i < markersTwo.length; i += 1) {
                            map.remove(markersTwo[i].subMarkers);
                            map.remove(markers[i].subMarkers);
                        }
                        map.add(markersTwo);
                    }else if(map.getZoom() < 14 && map.getZoom() > 11){//市下面的区或县
                        for (var i = 0; i < markersThree.length; i += 1) {
                            map.remove(markersThree[i].subMarkers);
                        }
                        map.add(markersThree);
                        map.remove(markers[i].subMarkers);
                    }
                }
                var _onClick = function(e) {
                    if(e.target.subMarkers.length){
                        // alert('_onClick')
                        map.add(e.target.subMarkers);
                        map.setFitView(e.target.subMarkers);
                        markersTwo=e.target.subMarkers;

                        var subMarkersTwo=e.target.subMarkers;
                        for (var j = 0; j < subMarkersTwo.length; j += 1) {
                            AMap.event.addListener(subMarkersTwo[j], 'click', _onClickTwo);
                            AMap.event.addListener(subMarkersTwo[j], 'mouseover', _onMouseoverTwo);
                            AMap.event.addListener(subMarkersTwo[j], 'mouseout', _onMouseoutTwo);
                        }
                        map.remove(markers)
                    }
                }


                var _onMouseover = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#393';
                    e.target.setContent(div);
                }
                var _onMouseout = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#09f';
                    e.target.setContent(div);
                }


                var _onClickTwo = function(e) {
                    // alert(' _onClickTwo')
                    if(e.target.subMarkers.length){
                        console.log(' _onClickTwo',e.target.subMarkers)
                        map.add(e.target.subMarkers);
                        map.setFitView(e.target.subMarkers);
                        map.setZoom(11);
                        markersThree=e.target.subMarkers;
                        var subMarkersThree=e.target.subMarkers;
                        for (var j = 0; j < subMarkersThree.length; j += 1) {
                            AMap.event.addListener(subMarkersThree[j], 'click', _onClickThree);
                            AMap.event.addListener(subMarkersThree[j], 'mouseover', _onMouseoverThree);
                            AMap.event.addListener(subMarkersThree[j], 'mouseout', _onMouseoutThree);
                        }
                        map.remove(markersTwo)

                    }

                }


                var _onMouseoverTwo = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#09f';
                    e.target.setContent(div);
                }


                var _onMouseoutTwo = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#393';
                    e.target.setContent(div);
                }




                var _onClickThree = function(e) {
                    // if(e.target.subMarkers.length){
                    //     // alert('33')
                    //     // console.log('3333',e.target.subMarkers)
                    //     // document.querySelector(".side").style.display= "block";
                    //     // map.add(e.target.subMarkers);
                    //     // map.setFitView(e.target.subMarkers);
                    //     // var subMarkersFour=e.target.subMarkers;
                    //     // // var html=subMarkersFour.map((item)=>{
                    //     // //     var title=item.getTitle();
                    //     // // })
                    //     // var htmls=[];
                    //     // var checkDetails=function  (e) {
                    //     //     console.log('999',e)
                    //     // }
                    //     // for (var j = 0; j < subMarkersFour.length; j += 1) {
                    //     //     console.log("000",subMarkersFour[j])
                    //     //
                    //     //     var title = e.target.subMarkers[j].getTitle();
                    //     //     var ckManger=e.target.subMarkers[j].G.ckManger
                    //     //     var ckStatusName=e.target.subMarkers[j].G.ckStatusName
                    //     //     var ckAddress=e.target.subMarkers[j].G.ckAddress
                    //     //     // localStorage.setItem("ckId",e.target.subMarkers[j].G.ckId)
                    //     //     localStorage.setItem("ckId",152222760072925)
                    //     //     // console.log("ckManger",ckId)
                    //     //     // var html='<li class="showcontent"><p class="p">公司名称：'+title+'</p><p class="p">联系方式：'+title+'</p><i class="fa triangle_i">&#xf0d7</i><i class="fa close_i">&#xf057</i></li><p class="showtitle"><i  class="fa">&#xf1ba</i>&nbsp;&nbsp;'+title+'</p>';
                    //     //     var html='<li class="detail-list"><div class="img"></div><p class="p">仓库名称：'+title+'</p>' +
                    //     //         '<p class="p">仓库管理员编号：'+ckManger+'</p>' +
                    //     //         '<p class="p">仓库状态：'+ckStatusName+'</p>' +
                    //     //         '<p class="p">仓库具体位置：'+ckAddress+'</p>' +
                    //     //         '<button class="detail" >查看室内详情</button></li>';
                    //     //     htmls.push(html)
                    //     //     // e.target.subMarkers[j].setContent(html);
                    //     //     AMap.event.addListener(subMarkersFour[j], 'click', _onClickFour);
                    //     //
                    //     // }
                    //
                    //     // htmls
                    //     // document.querySelector('.side').innerHTML=htmls.join(" ")
                    //     // // map.remove(markersThree)
                    //     // console.log("++++++++++++" ,document.getElementsByClassName('detail')[0])
                    //     // document.querySelector()
                    //     // let list=document.getElementsByClassName('detail')
                    //     // for(let i=0;i<list.length;i++){
                    //     //     list[i].addEventListener('click',function (e) {
                    //     //         // alert('99999999999',e)
                    //     //         //     console.log('e',e.target)
                    //     //             window.location.href = "/#/singleHK"
                    //     //         // this.$router.push('/filterMap')
                    //     //         // })
                    //     //
                    //     //     })
                    //     //
                    //     // }
                    //     // document.getElementsByClassName('detail')[0].addEventListener('click',function (e) {
                    //     //     // alert('99999999999',e)
                    //     //     console.log('e',e.target)
                    //     //     window.location.href = "/#/singleHK"
                    //     //     // this.$router.push('/filterMap')
                    //     // })
                    //
                    // }
                    // this.$router.push('/commodity');
                    localStorage.setItem("ckId",152222760072925)
                    window.location.href = "/#/commodity"

                }

                var _onClickFour=function () {
                    alert('444')

                    // document.querySelector(".showcontent").style.display= "block";
                    // document.querySelector(".close_i").style.display= "none";

                    // document.getElementsByClassName("side").style.color= "red";
                }


                var _onMouseoverThree = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#09f';
                    e.target.setContent(div);
                }
                var _onMouseoutThree = function(e) {
                    var div = e.target.getContent();
                    div.style.backgroundColor = '#393';
                    e.target.setContent(div);
                }
                var markers = []; //province见Demo引用的JS文件
                for (var i = 0; i < this.provinces.length; i += 1) {
                    var marker = createMarker(this.provinces[i]);
                    markers.push(marker);
                    AMap.event.addListener(marker, 'click', _onClick);
                    AMap.event.addListener(marker, 'mouseover', _onMouseover);
                    AMap.event.addListener(marker, 'mouseout', _onMouseout);
                }
                map.setFitView();
                AMap.event.addListener(map, 'zoomend', _onZoomEnd);

                // for(var i=0;i<points.length;i+=1){
                //     console.log("000",points[i]['center'])
                //     markers.push(new AMap.Marker({
                //         position:points[i]['center'],
                //         content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                //         offset: new AMap.Pixel(-15,-15)
                //     }))
                // }
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
                        // debugger;
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



            }
        }


    }
</script>
<style>
    body,html,#container{height: 100%;margin: 0px;font:12px Arial;}
    .circle{border-radius: 50%;border: solid 1px silver;width: 50px;height: 50px;padding: 3px;text-align: center;line-height: 25px;max-width: 50px;color:#fff;}
    .showtitle{background:#393;width:150px;height:30px;line-height:30px;color:#fff;border-radius:5px;padding-left:5px;}
    .showtitle i{font-size:16px;}
    .showcontent{background:#62ab00;width:300px;font-size:12px;margin-left:-80px;border-radius:5px;color:#fff;position:absolute;display:none;bottom:30px;z-index:99;}
    .showcontent:hover{display:block;}
    .detail-list .p{line-height:30px;padding-left:10px;margin-top:-0px;}
    .showcontent i.triangle_i{color:#62ab00;font-size:25px;display:block;width:100%;background:#fff;text-align:center;height:25px;}
    .showcontent i.close_i{position: absolute;right: 5px;top:5px;font-size:25px;z-index:99999;}
    .active{display:block}
    .side{
        with:300px;
        overflow: scroll;
        max-height: 700px;
        background: #a4c2f4;
        margin-right: 30px;
    }
    .detail-list{
        height: 150px;
        margin-bottom: 10px;
        border-bottom: grey solid 5px;
        border-radius: 8px;
        /*opacity: 0.7;*/
        /*background: yellow;*/
    }
    .detail{
        /*position: absolute;*/
        width: 100px;
        height: 25px;
        lfet:10px;
        background:white;
        border-radius: 6px;
        /*opacity: 0.7;*/
    }
    button .detail{
        margin-left: 10px;
    }
    .img{
        background: url("../../../assets/logo.png")  no-repeat;
        background-size: 100%;
    }
</style>

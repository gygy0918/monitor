<template>
    <div >
        <div>
            <el-button type="success" round style="margin:10px" @click="add">新增监控物品</el-button>
            <el-button type="success" round style="margin:10px" @click="add">仓库数据</el-button>
        </div>
        <div id="container" style="float: left;width:700px; height:700px;margin:10px">室外 </div>
        <div id="outer-box" style="margin-left: 620px;">
            <!--<div id="eventInfo">添加监控物品</div>-->
        </div>

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
<script>
    import AMap from 'AMap'
    export default {
        data(){
            return{

            }

        },
        created(){
            var datainfo=[];
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/warehouse/page',
                    params:{
                        page:1,
                        size:1000
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
               console.log('结果111',res.data.data.results)
                datainfo=res.data.data.results;
            datainfo.map((item)=>{
                let positions=[]
                if(item.lat&&item.lng){
                positions.push(item.lng);
                positions.push(item.lat);
                item.positions=positions;
            }
//                this.datainfo=datainfo;
            console.log('page',datainfo)
            window.test=datainfo;
        })

        });
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
                    zoom: 16,
                });


                AMapUI.loadUI(['misc/MarkerList', 'overlay/SvgMarker', 'overlay/SimpleInfoWindow'],
                    function(MarkerList, SvgMarker, SimpleInfoWindow){

                        var defaultIconStyle = 'red', //默认的图标样式
                            hoverIconStyle = 'green', //鼠标hover时的样式
                            selectedIconStyle = 'purple' //选中时的图标样式
                        ;

                        if (!SvgMarker.supportSvg) {
                            //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
                            alert('当前环境不支持SVG');
                        }
                        var markerList = new MarkerList({
                            //关联的map对象
                            map: map,
                            //列表的dom容器的id
                            listContainer: 'my-list',
                            //需要监听的列表节点事件
                            listElementEvents: ['click'],
                            //需要监听的marker事件
                            markerEvents: ['click', 'mouseout'],
                            //需要监听的infoWindow事件
                            infoWindowEvents: ['click', 'mouseover', 'mouseout'],
                            //返回数据项的Id
                            getDataId: function(dataItem, index) {
                                //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
//                                console.log('check',dataItem.lightId)
                                return index;
                            },
                            //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                            getPosition: function(dataItem) {
                                return dataItem.positions;
                            },
                            //返回数据项对应的Marker
                            getMarker: function(dataItem, context, recycledMarker) {
//                                console.log('maker',typeof parseInt(dataItem.state) )
//                                console.log('maker',recycledMarker )
                                var label = dataItem.lightId;
                                // var flag1=parseInt(dataItem.state);
                                //存在可回收利用的marker
//                                    if (recycledMarker) {
//                                        //直接更新内容返回
//                                        recycledMarker.setIconLabel(label);
//                                        return recycledMarker;
//                                    }

                                //返回一个新的Marker
//                                console.log('flag',flag1)
                                console.log('maker',dataItem.state )
                                return new SvgMarker(
                                    new SvgMarker.Shape.WaterDrop({
                                        height: 30,
                                        strokeWidth: 1,
                                        strokeColor: '#ccc',
                                        // fillColor: flag1===1?'green':(flag1===2?'black':'red')
                                        fillColor:'blue'
                                    }), {
//                                  iconLabel: label,
                                        containerClassNames: 'my-svg-marker',
                                        showPositionPoint: true
                                    })
                            },
                            //返回数据项对应的列表节点
                            getListElement: function(dataItem, context, recycledListElement) {

                                var tpl1= '<p><%- dataItem.ckAddress %><br/>楼层平面图：<a src="../../assets/logo.png" ></a></p>';
                                var tpl2 = '<div style="font-size:12px;overflow-y: scroll"></img>' +
                                    '<p>仓库名称：<%- dataItem.ckName %></p>' +
                                    '<p>管理员编号：<%- dataItem.ckManager%></p>'  +
                                    '<p>货柜数量：<%- dataItem.ckHgCount%>个</p>'
                                    +'<p>具体位置：<%- dataItem.ckAddress%></p>'+
                                    '</div><br/>';
                                var tpl=flag?tpl1:tpl2
                                var content = MarkerList.utils.template(tpl, {
                                    dataItem: dataItem,
                                    dataIndex: context.index
                                });

                                if (recycledListElement) {
                                    //存在可回收利用的listElement, 直接更新内容返回
                                    recycledListElement.innerHTML = content;
                                    return recycledListElement;
                                }

                                //返回一段html，MarkerList将利用此html构建一个新的dom节点
                                return '<li>' + content + '</li>';
                            },
                            getInfoWindow: function(dataItem, context, recycledInfoWindow) {
                                var flag2=parseInt(dataItem.state);
                                if (recycledInfoWindow) {
                                    //存在可回收利用的infoWindow, 直接更新内容返回
                                    recycledInfoWindow.setInfoTitle(dataItem.ckAddress);
//                                    recycledInfoWindow.setInfoBody(flag2?'当前状态：正常':'当前状态：危险');
//                                     recycledInfoWindow.setInfoBody(flag2?'当前状态：正常(点击设置电灯状态)':'当前状态：危险(点击设置电灯状态)');
                                    recycledInfoWindow.setInfoBody(点击查看仓库详细信息);
                                    return recycledInfoWindow;
                                }
                                //返回一个新的InfoWindow
                                return new SimpleInfoWindow({
                                    offset: new AMap.Pixel(0, -31),
                                    infoTitle: dataItem.lightName,
//                                    infoBody:  '<p class="my-desc"></p><button class="mybtn" id="light"  style="width: 80px;background-color:#50bfff">开关</button>' +
//                                        '<br/>'+
//                                    '<br/>'+
//                                    ' 亮度调节:' +'<br>'+
//                                    '<form oninput="x.value=parseInt(a.value)">0\n' +
//                                    '<input type="range" id="a" value="0" min="0" max="5" step="1">\n' +
//                                    '<output name="x" for="a" ></output>A\n' +
//                                    '</form>',
//                                     infoBody: flag2?'当前状态：正常(点击设置电灯状态)':'当前状态：危险(点击设置电灯状态)'
                                    infoBody: '点击查看仓库详细信息'

                                });

                            }
                        });//对象创建完毕;
//                        markerList.getInfoWindow.on('click', '.mybtn', function(event){
//                            //阻止冒泡
//                            event.stopPropagation();
//
//                            alert('Click .mybtn of infoBody');
//
//                        })
                        markerList.on('selectedChanged', function(event, info) {
//                            checkBtnStats();
                            if (info.selected) {
                                console.log('selectedinfo',info);
                                if (info.selected.marker) {
                                    //更新为选中样式
//                                    info.selected.marker.setIconStyle(selectedIconStyle);
                                }

                                //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                                if (!info.sourceEventInfo.isListElementEvent) {

                                    if (info.selected.listElement) {
                                        scrollListElementIntoView($(info.selected.listElement));
                                    }
                                }
                            }

                            if (info.unSelected && info.unSelected.marker) {
                                console.log('info.unSelected ',info.unSelected.listElement
                                )
                                //更新为默认样式
//                                info.unSelected.marker.setIconStyle(defaultIconStyle);
                            }
                        });

                        markerList.on('listElementClick listElementMouseenter listElementMouseleave ' +'markerClick markerMouseover'+
                            ' infoWindowMouseover infoWindowMouseout',
                            function(event, record) {
                                console.log('事件信息event',event,'record',record)
                                console.log('record',record.listElement)
                                var $ = MarkerList.utils.$,
                                    template = MarkerList.utils.template;

//                                $('#eventInfo').html(template('<%- record.data.lightName+record.data.lightId%>' +
//                                    '<div class="eventType">电压：<%-record.data.voltage%></div>'+
//                                    '<div class="eventType">电流：<%-record.data.electricity%></div>'+
//                                    '<div class="eventType">功率：<%-record.data.power %></div>', {
//                                    event: event,
//                                    record: record
//                                }));
                            });
                        markerList.on('infoWindowClick',function (event, record) {
                            window.location.href = "/#/singleHK"
                            console.log('8888',record.data.ckId)
                            window.localStorage.setItem("ckId",record.data.ckId);

                        })

//                        markerList.on('markerClick ',function (event, record) {
//
//                            var pre=record.listElement;
//                            pre.style.background='red';
//                        })
//                  markerList.on('markerMouseout ',function (event, record) {
//                      record.listElement.style.background='';
//                  })
                        //监听选中改变
//                        markerList.on('selectedChanged', function(event, info) {
//                            info.selected.listElement.style.background='';
//                            console.log('****event',event,'info', info);
//                        });
                        function isElementInViewport(el) {
                            var rect = el.getBoundingClientRect();

                            return (
                                rect.top >= 0 &&
                                rect.left >= 0 &&
                                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                            );
                        };
                        function scrollListElementIntoView($listEle) {

                            if (!isElementInViewport($listEle.get(0))) {
                                $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
                            }

                            //闪动一下
                            $listEle
                                .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                                    function(e) {
                                        $(this).removeClass('select');
                                    }).addClass('select');
                        };

                        var flag=0;
                        //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
//                        var data1 = [{
//                            id: '123',
//                            position: [116.358017, 39.961335],
//                            desc: '井盖_1',
//                            status:0,
//                            power:'30%',
//                            way:'WIFI',
//                            ower:'北京市国税局'
//                        }, {
//                            id: '234',
//                            position: [116.356348, 39.960368],
//                            desc: '井盖_2',
//                            status:1,
//                            power:'80%',
//                            way:'WIFI',
//                            ower:'北京房管局'
//                        }, {
//                            id: '345',
//                            position: [116.35645, 39.960405],
//                            desc: '井盖_3',
//                            status:1,
//                            power:'60%',
//                            way:'4G',
//                            ower:'北京水利'
//                        }];
                        //展示该数据
//                        var getdata=this.getdata();
//                            console.log('实时改变test',getdata)
                        var datainfo = new Array(10);
                        var obj={};


                        console.log('window.test',window.test)
//                        window.markerList=markerList;
                        markerList.render(window.test)
//                        window.setInterval()


                    })

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

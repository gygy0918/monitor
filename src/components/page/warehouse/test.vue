<template>
    <div class="main_content">

        <!--<el-button type="primary" round @click="getMonth" style="margin-left: 100px">按月份查询</el-button>-->
        <div class="handle-box">
            <el-form ref="form2" :model="form2" label-width="80px" style="display: inline-block;">
                <el-form-item label="选择日期" style="display: inline-block;width: 500px">
                    <el-date-picker
                        v-model="value7"
                        type="date"
                        placeholder="开始日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!--<el-col class="line" :span="2">-</el-col>-->
                    <el-date-picker
                        v-model="value6"
                        type="date"
                        placeholder="选结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" icon="search" @click="search">按天查询</el-button>
                <el-button type="primary" round @click="getMonth" style="margin-left: 10px">按月份查询</el-button>
                <el-button type="primary" round @click="goDetails" style="margin-left: 10px">详细信息查询</el-button>
                <el-button>取消</el-button>
            </el-form>
            <!--<el-input v-model="select_word" placeholder="筛选关键词" style="width:150px"></el-input>-->
            <div style="display: inline-block;">
            </div>
            <!--<el-button type="primary"  @click="search">新增人员</el-button>-->
        </div>
        <div id="bedroom"></div>

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                form2:{},
                chart: null,
                outnumber:[],
                intnumber:[],
                key:[],
                val:[],
                val2:[],
                value7:'',
                value6:'',
                arr:[5, 20, 40, 10, 10, 20],
                opinion: ['物品使用效果差', '物品使用效果一般', '物品使用效果很好'],
                opinionData: [
                    {value:26, name:'物品使用效果差'},
                    {value:31, name:'物品使用效果一般'},
                    {value:8, name:'物品使用效果很好'}
                ]
            }
        },
        created(){
            this.$ajax(
                {
                    method: 'get', //请求方式
                    // url: 'http://10.103.249.191:8080/check/getMonth',
                    url: 'http://10.103.249.191:8080/check/getQuarter',
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                let len=res.data.length/2;
            console.log('季度*****',res.data)
            let total=res.data
            this.intnumber=total.slice(0,len+1)
            this.outnumber=total.slice(len,res.data.length)
            this.drawLine()

        })
        },
        methods: {
            goDetails(){
                this.$router.push('/detailsCheck')
            },
            search(){
                // this.is_search = true;
                console.log('000',this.form2,this.value7.toLocaleDateString(),this.value6.toLocaleDateString())
                this.form2.startTime=this.value7.toLocaleDateString()
                this.form2.endTime=this.value6.toLocaleDateString()
                console.log('1111111111',this.form2)
                // http://10.103.249.191:8080/warehouse/pageByTime?page=1&start=2017/3/29&size=5&end=2018/4/3
                this.$ajax(
                    {

                        method: 'get', //请求方式
                        url: 'http://10.103.249.191:8080/check/getDay',
                        params:{
                            page:1,
                            size:5,
                            start:this.form2.startTime,
                            end:this.form2.endTime
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                console.log('按天查询仓库',res.data)
                let len=res.data.length/2;
                console.log('季度*****',res.data)
                let total=res.data
                this.intnumber=total.slice(0,len+1)
                this.outnumber=total.slice(len,res.data.length)
                this.drawLine()
            })
            },

            drawLine(){
                console.log('实例化',this.outnumber, this.intnumber)
                let m=new Map(this.outnumber)
                let m2=new Map(this.intnumber)
                let val2=m2.values()
                let key=m.keys()
                let val=m.values()
                this.key=[...key]
                this.val=[...val]
                this.val2=[...val2]
                console.log('0000this.key',this.key)
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('bedroom'))
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '各月份出入库数量图',
                        // subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['出库量','入库量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            // magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : [...this.key]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series : [
                        {
                            name:'出库量',
                            type:'line',
                            data:this.val,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'入库量',
                            type:'line',
                            data:this.val2,
                            markPoint : {
                                data : [
                                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                });
            },
            getMonth(){
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.249.191:8080/check/getMonth',
                        // url: 'http://10.103.249.191:8080/check/getQuarter',
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    let len=res.data.length/2;
                console.log('月份*****',res.data)
                let total=res.data
                this.intnumber=total.slice(0,len+1)
                this.outnumber=total.slice(len,res.data.length)
                this.drawLine()

            })
            },
        }
    }
</script>
<style scoped>
    #bedroom {
        position: relative;
        left: 50%;
        margin-left: -450px;
        margin-bottom: 70px;
        width:700px;
        height:500px;
        border: solid #D01257 1px;
        box-shadow: 0 0 8px #FB90B7;
        border-radius: 10px;
    }
</style>

<!--jonl-->
<!--<template>-->
<!--&lt;!&ndash;为echarts准备一个具备大小的容器dom&ndash;&gt;-->
<!--<div id="main" style="width: 600px;height: 400px;"></div>-->
<!--</template>-->
<!--<script>-->
<!--//import echarts from 'echarts'-->
<!--export default {-->
<!--name: '',-->
<!--data () {-->
<!--return {-->
<!--charts: '',-->
<!--opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],-->
<!--opinionData:[-->
<!--{value:335, name:'直接访问'},-->
<!--{value:310, name:'邮件营销'},-->
<!--{value:234, name:'联盟广告'},-->
<!--{value:135, name:'视频广告'},-->
<!--{value:1548, name:'搜索引擎'}-->
<!--]-->
<!--}-->
<!--},-->
<!--methods:{-->
<!--drawPie(id){-->
<!--this.charts = this.$echarts.init(document.getElementById(id))-->
<!--this.charts.setOption({-->
<!--tooltip: {-->
<!--trigger: 'item',-->
<!--formatter: '{a}<br/>{b}:{c} ({d}%)'-->
<!--},-->
<!--legend: {-->
<!--orient: 'vertical',-->
<!--x: 'left',-->
<!--data:this.opinion-->
<!--},-->
<!--series: [-->
<!--{-->
<!--name:'访问来源',-->
<!--type:'pie',-->
<!--radius:['50%','70%'],-->
<!--avoidLabelOverlap: false,-->
<!--label: {-->
<!--normal: {-->
<!--show: false,-->
<!--position: 'center'-->
<!--},-->
<!--emphasis: {-->
<!--show: true,-->
<!--textStyle: {-->
<!--fontSize: '30',-->
<!--fontWeight: 'blod'-->
<!--}-->
<!--}-->
<!--},-->
<!--labelLine: {-->
<!--normal: {-->
<!--show: false-->
<!--}-->
<!--},-->
<!--data:this.opinionData-->
<!--}-->
<!--]-->
<!--})-->
<!--}-->
<!--},-->
<!--//调用-->
<!--mounted(){-->
<!--this.$nextTick(function() {-->
<!--this.drawPie('main')-->
<!--})-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--* {-->
<!--margin: 0;-->
<!--padding: 0;-->
<!--list-style: none;-->
<!--}-->
<!--</style>-->


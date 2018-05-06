<template>
    <div class="main_content">
        <div id="bedroom"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chart: null,
                opinion: ['物品使用效果差', '物品使用效果一般', '物品使用效果很好'],
                opinionData: [
                    {value:26, name:'物品使用效果差'},
                    {value:31, name:'物品使用效果一般'},
                    {value:8, name:'物品使用效果很好'}
                ]
            }
        },
        methods: {
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    title: {
                        text: '物品使用效果情况调查',
                        left: 'center',
                        top: 10,
                        textStyle: {
                            fontSize: 24,
                            fontFamily: 'Helvetica',
                            fontWeight: 400
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatte: "{b}: {c} ({d}%)"
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                            dataView: {}
                        },
                        right: 15,
                        top: 10
                    },
                    legend: {
                        orient: 'vertical',
                        left: 5,
                        top: 10,
                        data: this.opinion,
                    },
                    series: [
                        {
                            name: '物品使用效果',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '60%'],
                            avoidLabelOverlap: false,
                            label: {
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '24',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.opinionData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffset: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.drawPie('bedroom')
            })
        }
    }
</script>
<style scoped>
    #bedroom {
        position: relative;
        left: 50%;
        margin-left: -400px;
        margin-bottom: 70px;
        width: 800px;
        height: 600px;
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


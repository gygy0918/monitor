<template>
    <div id='myChart' style='width：600px;height:600px'></div>
</template>
<script>
    export default {
        data() {
            return {
                data:[],
                innum:[],
                // options: {
                //     title: {
                //         text: 'Timesky'
                //     },
                //     tooltip: {
                //         trigger: 'item'
                //     },
                //     legend: {
                //         data: ['销量']
                //     },
                //     xAxis: {
                //         name: '商品',
                //         nameLocation: 'start',
                //         nameGap: '50',
                //         boundaryGap: true,
                //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                //     },
                //     // yAxis: {},      纵轴自适应
                //     yAxis: {          //纵轴标尺固定
                //         type: 'value',
                //         scale: true,
                //         name: '销量',
                //         max: 100,
                //         min: 0,
                //         boundaryGap: [0.2, 0.2]
                //     },
                //     series: [{
                //         name: '销量',
                //         type: 'bar',
                //         data: [5, 20, 36, 60, 10, 55]
                //     }]
                // }
            }
        },
        created(){
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.240.238:8080/check/getQuarter',
                        // params:{
                        //     hgId: row.hgId,
                        //     // hgId:152289888161255
                        // },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{

                    let len=res.data.length/2;
            console.log('*****',res.data)
            this.data=res.data
            console.log('请求数据',this.data)
                  this.drawLine()
                // let out=[]
                // let innum=[]
                // // out=res.data.slice(0,length)

            })


            // this.out=[54, 80, 14, 14, 5, 5, 5, 10]

        },
        methods: {
            drawLine(){
console.log('实例化',this.data)
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data:this.data
                    }]
                });
            }
        }
    }
</script>
<style>
    .echarts {
        width: 800px;
        height: 400px;
    }
</style>

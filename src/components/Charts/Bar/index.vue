<template>
    <div :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    const animationDuration = 2000
    export default {
        name: "MiniBar",
        props : {
            chartData: {
                type : Array,
                // required: true
            },
            width: {
                type: String,
                default: '100%'
            },
            title : {
                type : String,
                default : ''
            },
            height: {
                type: String,
                default: '360px'
            }
        },
        data(){
            return {
                chart : null
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.initChart()
            })
        },
        methods : {
            initChart(){
                this.chart = echarts.init(this.$el,'macarons');//初始化实例&主题配置
                this.setOptions()
            },
            setOptions(){
                this.chart.setOption({
                    title : {
                        text : this.title,
                        textStyle : {color : '#333',fontSize:14},
                        top:10
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 10,
                        top: 60,
                        containLabel: true
                    },
                    xAxis : {
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick : {
                            show : false
                        }
                    },

                    yAxis : {
                        axisTick : {
                            show : false
                        }
                    },
                    //低高度无法随鼠标移动 ？？
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    series : [
                        {
                            type: 'bar',
                            // stack: 'vistors',
                            barWidth: '60%',
                            itemStyle : {
                                color : 'rgb(24, 144, 255)'
                            },
                            data: [79, 52, 200, 334, 390, 330, 220],
                            animationDuration
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped>

</style>
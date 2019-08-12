<template>
    <div>小型折现图</div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "MiniArea",
        data(){
            return {
                chart : null
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.initChart();
            })
        },
        methods : {
            initChart(){
                this.chart = echarts.init(this.$el,'macarons');
                this.setOptions()
            },
            setOptions(){

            }
        }
    }
</script>

<style scoped>

</style>
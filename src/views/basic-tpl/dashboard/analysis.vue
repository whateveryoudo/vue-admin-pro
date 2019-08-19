<template>
    <div class="page-basic-layout analysis-container">
        <IntroduceRow></IntroduceRow>
        <div class="sales-wrapper">
            <el-tabs v-model="activeIndex" @tab-click="handleClick">
                <el-tab-pane label="销售额" name="1">
                    <Bar></Bar>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="2">访问量</el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    import IntroduceRow from './components/IntroduceRow'
    import {Bar} from '@/components/Charts'
    export default {
        name: "analysis",
        data(){
            return {
                activeIndex : '1'
            }
        },
        components : {
            IntroduceRow,
            Bar
        },
        methods : {
            handleClick(tab, event){

            }
        }
    }
</script>

<style lang="scss" scoped>
    .analysis-container{
        .card-title-icon{
            float: right;
            cursor: pointer;
        }
    }

</style>
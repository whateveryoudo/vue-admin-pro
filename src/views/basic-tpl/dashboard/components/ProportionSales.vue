<template>
        <el-card  class="sales-wrapper">
            <el-tabs v-model="activeIndex" @tab-click="handleClick">
                <el-tab-pane label="销售额" name="1">
                    <el-row gutter="20">
                        <el-col span="16">
                            <Bar
                                :title="barTitle"
                            ></Bar>
                        </el-col>
                        <el-col span="8">
                            销售额排名
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="2">访问量</el-tab-pane>
            </el-tabs>
        </el-card>
</template>

<script>
    import {Bar} from '@/components/Charts'

    export default {
        name: "ProportionSales",
        data(){
            return {
                activeIndex : '1',
                barTitle : '销售趋势'
            }
        },
        components : {
            Bar
        }
    }
</script>
<style lang="scss">
    .sales-wrapper{
        .el-tabs__item {
            font-size: 16px;
        }

    }
</style>
<style lang="scss" scoped>
    .sales-wrapper{
        margin-top: 24px;
        .el-tabs__item{
            font-size: 20px;
        }
    }
</style>
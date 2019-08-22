<template>
        <el-card  class="sales-wrapper">
            <el-tabs v-model="activeIndex" @tab-click="handleClick">
                <el-tab-pane label="销售额" name="1">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <Bar
                                :title="barTitle"
                            ></Bar>
                        </el-col>
                        <el-col :span="8">
                            <div class="sales-info">
                                <el-tooltip content="这里写了个todoList 支持双击修改" placement="left">
                                    <div class="title">销售额排名</div>
                                </el-tooltip>
                                <!--                            写个todoList -->
                                <TodoList></TodoList>
                            </div>

                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="2">访问量</el-tab-pane>
            </el-tabs>
        </el-card>
</template>

<script>
    import {Bar} from '@/components/Charts'
    import TodoList from './TodoList'
    export default {
        name: "ProportionSales",
        data(){
            return {
                activeIndex : '1',
                barTitle : '销售趋势'
            }
        },
        components : {
            Bar,
            TodoList
        },
        methods : {
            handleClick(){

            }
        }
    }
</script>
<style lang="scss">
    .sales-wrapper{
        .el-tabs__item {
            font-size: 16px;
        }
        .el-tabs__content{
            overflow: inherit;
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
    .sales-info{
        width:70%;
        margin-left: 50px;
        margin-top: 20px;
        .title{
            margin-bottom: 24px;
        }
    }
</style>
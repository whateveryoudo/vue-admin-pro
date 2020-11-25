<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <ChartCard>
                <div class="header clearfix">
                    <span>{{$t('analysis.total-sales')}}</span>
                    <el-tooltip effect="dark" :content="$t('analysis.introduce')" placement="top">
                        <i class="el-icon-warning-outline card-title-icon"></i>
                    </el-tooltip>
                </div>
                <div>
                    <p class="total">{{200000 | toThousandFilter('¥')}}</p>
                    <div class="trend-list">
                        <Trend>
                            {{$t('analysis.week')}}
                            <span class="trendText">12%</span>
                        </Trend>
                        <Trend flag="down">
                            {{$t('analysis.day')}}
                            <span class="trendText">15%</span>
                        </Trend>
                    </div>

                </div>
                <div slot="footer" class="footer">
                    <p class="daily-num">
                            <span class="daily-num-label">
                                {{$t('analysis.daily')}}
                            </span>

                        {{200000 | toThousandFilter('¥')}}
                    </p>
                </div>
            </ChartCard>
        </el-col>
        <el-col :span="6">
            <ChartCard>
                <div class="header clearfix">
                    <span>{{$t('analysis.total-sales')}}</span>
                    <el-tooltip effect="dark" :content="$t('analysis.introduce')" placement="top">
                        <i class="el-icon-warning-outline card-title-icon"></i>
                    </el-tooltip>
                </div>
                <div>
                    <p class="total">{{200000 | toThousandFilter('¥')}}</p>
                    <MiniArea :chartData="miniAreaData"></MiniArea>

                </div>
                <div slot="footer" class="footer">
                    <p class="daily-num">
                            <span class="daily-num-label">
                                {{$t('analysis.daily')}}
                            </span>

                        {{200000 | toThousandFilter('¥')}}
                    </p>
                </div>
            </ChartCard>
        </el-col>
        <el-col :span="6">
            <ChartCard>
                <div class="header clearfix">
                    <span>{{$t('analysis.total-sales')}}</span>
                    <el-tooltip effect="dark" :content="$t('analysis.introduce')" placement="top">
                        <i class="el-icon-warning-outline card-title-icon"></i>
                    </el-tooltip>
                </div>
                <div>
                    <p class="total">{{200000 | toThousandFilter('¥')}}</p>
                    <MiniBar></MiniBar>
                </div>
                <div slot="footer" class="footer">
                    <p class="daily-num">
                            <span class="daily-num-label">
                                {{$t('analysis.daily')}}
                            </span>

                        {{200000 | toThousandFilter('¥')}}
                    </p>
                </div>
            </ChartCard>
        </el-col>
        <el-col :span="6">
            <ChartCard>
                <div class="header clearfix">
                    <span>{{$t('analysis.total-sales')}}</span>
                    <el-tooltip effect="dark" :content="$t('analysis.introduce')" placement="top">
                        <i class="el-icon-warning-outline card-title-icon"></i>
                    </el-tooltip>
                </div>
                <div>
                    <p class="total">{{200000 | toThousandFilter('¥')}}</p>
                    <div class="trend-list" style="display: flex;align-items: center">
                        <MiniProgress  :percent="percent" :strokeWidth="8"></MiniProgress>
                    </div>
                </div>
                <div slot="footer" class="footer">
                    <p class="daily-num">
                        <Trend>
                            {{$t('analysis.week')}}
                            <span class="trendText">12%</span>
                        </Trend>
                        <Trend flag="down">
                            {{$t('analysis.day')}}
                            <span class="trendText">15%</span>
                        </Trend>
                    </p>
                </div>
            </ChartCard>
        </el-col>
    </el-row>
</template>

<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress } from "@/components/Charts"
import Trend from "@/components/Trend"
export default {
  name: "IntroduceRow",
  data () {
    return {
      miniAreaData: [100, 120, 161, 134, 105, 160, 165],
      percent: 0
    }
  },
  components: {
    ChartCard,
    Trend,
    MiniArea,
    MiniBar,
    MiniProgress
  },
  created () {
    window.requestAnimationFrame(() => {
      this.percent = 35;
    })
  }
}
</script>
<style lang="scss">
    .chart-card-container{
        .el-card__body{
            padding-bottom: 10px;
        }
    }
</style>
<style lang="scss" scoped>

    //卡片组
    .chart-card-container{
        color:rgba(0,0,0,.65);
        .header{
            color:rgba(0,0,0,.45);
        }
        .total{
            color: rgba(0,0,0,.85);
            font-size: 30px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        .trend-list{
            height:50px;
            line-height: 50px;
            .trendText{
                margin-left: 5px;
            }
        }
        .footer{
            border-top: 1px solid #e8e8e8;
        }
        .footer .daily-num{
            margin-top: 15px;
            .daily-num-label{
                margin-right: 5px;
            }
        }
        .card-title-icon{
            float: right;
        }
    }
</style>

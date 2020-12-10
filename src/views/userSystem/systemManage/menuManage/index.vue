<template>
  <div>
    <div id="echart-demo" style="width:500px;height:400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "AppManageList",
  data () {
    return {};
  },
  created () {},
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    const myChart2 = echarts.init(document.getElementById("echart-demo"));
    // 指定图表的配置项和数据
    const option2 = {
      grid: [
        {
          y: "20"
        }
      ],
      title: {
        text: "船舶11"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["数量"],
        selected: {
          "数量（条）": false
        }
      },

      xAxis: {
        type: "category",
        axisLabel: {
          show: true,
          textStyle: {
            color: "#a9a9a9", // 更改坐标轴文字颜色
            fontSize: 10 // 更改坐标轴文字大小
          },
          showMinLabel: true, // 显示最小值
          showMaxLabel: true // 显示最大值
        },
        data: ["2020-10-11", "2020-10-12", "2020-10-13", "2020-10-14"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "数量",
          type: "bar",
          barWidth: 10,
          data: [20, 30, 50, 60],
          itemStyle: {
            normal: {
              color: "#ff9933"
            }
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
  }
};
</script>
<style scoped>
</style>

$(function(){

  // 基于准备好的dom , 初始化echarts实例
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  var option1 = {
    // 大标题
    title: {
      // 文本
      text: '2018年注册人数'
    },
    // 提示框组件
    tooltip: {
      // 表示坐标轴触发
      //trigger: "axis"
      trigger: "item"
    },
    // 图例
    legend: {
      data:['人数', "销量"]
    },
    // x轴的数据
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴的刻度, y轴刻度不进行设置, y轴会自动根据数据最大值生成合适的刻度
    yAxis: {},
    // 数据
    series: [{
      name: '人数',
      // bar 表示柱状图,  line 表示折线图,  pie 表示饼图
      type: 'bar',
      data: [500, 1200, 390, 580, 800, 1000]
    },{
      name: '销量',
      type: 'bar',
      data: [700, 1300, 490, 680, 700, 800]
    }]
  };
})
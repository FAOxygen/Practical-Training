$(function() {
    var dom = document.getElementById("container3");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        xAxis: {
            type: 'category',
            data: ['Model Y', '哈弗H6', '宋PLUS 新能源', 'AION Y', '锋兰达', '元PLUS']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [31054,14793,22079,19306,14509, 26072,],
                type: 'bar'
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});
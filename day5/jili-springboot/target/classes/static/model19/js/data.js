$(function () {
    var dom = document.getElementById("container4");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    // Generate data
    var category = [];
    var dottedBase = +new Date();
    dottedBase -= 3600 * 24 * 1000 * 20;
    var lineData = [];
    var barData = [];

    for (var i = 0; i < 20; i++) {
        var date = new Date(dottedBase += 3600 * 24 * 1000);
        category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-'));
        var b = vm.msgCnt[i].msg;
        var d = vm.msgCnt[i].alm;
        barData.push(b)
        lineData.push(d + b);
    }


    // option
    option = {
        // title: {
        //     text: '汽车品牌销量对比'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['北京', '极氪', 'AITO',]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2022-12', '2023-01', '2023-02', '2023-03', '2023-04', '2023-05',]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '北京',
                type: 'line',
                stack: 'Total',
                data: [4301, 1504, 2095, 3369, 1254, 5897,]
            },
            {
                name: '极氪',
                type: 'line',
                stack: 'Total',
                data: [11337, 3116, 5455, 6663, 8101, 8678,]
            },
            {
                name: 'AITO',
                type: 'line',
                stack: 'Total',
                data: [10180, 4469, 3521, 3625, 2437, 4083,]
            },
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
})
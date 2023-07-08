$(function () {
    var dom = document.getElementById("container5");
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
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
        },
        series: [
            {
                name: '销量占比',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                // adjust the start angle
                startAngle: 180,
                label: {
                    show: true,
                    formatter(param) {
                        // correct the percentage
                        return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                data: [
                    { value: 14164, name: '五菱缤果' },
                    { value: 8427, name: '海鸥' },
                    { value: 7215, name: '熊猫mini' },
                    { value: 5761, name: '思皓X8 PLUS' },
                    { value: 5136, name: '蓝山DHT-PHEV' },
                    {
                        // make an record to fill the bottom 50%
                        value: 14164 + 8427 + 7215 + 5761 + 5136,
                        itemStyle: {
                            // stop the chart from rendering this piece
                            color: 'none',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        label: {
                            show: false
                        }
                    }
                ]
            }
        ]
    };


    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
})
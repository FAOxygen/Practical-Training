$(function () {
    var dom = document.getElementById("container6");
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
    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['排名', '销量', '占品牌份额']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                // prettier-ignore
                data: ['大众', '比亚迪', '丰田', '本田', '五菱汽车', '长安', '吉利', '奇瑞', '日产', '特斯拉', '奥迪', '别克']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '排名',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} '
                }
            },
            {
                type: 'value',
                name: '占比',
                position: 'right',
                alignTicks: true,
                offset: 80,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            {
                type: 'value',
                name: '销量',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value} 辆'
                }
            }
        ],
        series: [
            {
                name: 'Evaporation',
                type: 'bar',
                data: [
                    1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0
                ]
            },
            {
                name: 'Precipitation',
                type: 'bar',
                yAxisIndex: 1,
                data: [
                    10.3,9.73,8.05,5.65,4.67,4.54,4.31,3.31,3.16,3.14,2.86,2.82
                ]
            },
            {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 2,
                data: [2344818,2215896,1833328,1286867,1063182,1034101,980528,754431,718581,714907,650277,641272]
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
})
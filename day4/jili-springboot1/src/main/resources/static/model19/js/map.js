$(function(){
		var worldMapContainer1 = document.getElementById('distribution_map');
		var myChart = echarts.init(worldMapContainer1);

		//使用ajax获取后端数据
		var serie = [];
		var maxNumber=0;
		$.ajax({
			type:"get",
			url:"/chart/chartmap",
			async:false,  //使用同步获取数据
			success: function (res) {

				for(var i = 0; i < res.length; i++) {
					maxNumber=maxNumber>res[i].number?maxNumber:res[i].number;
					var item = {
						name: removeLastChar(res[i].province),
						value: res[i].number
					};
					serie.push(item);
				}
			}
		})

		var option = {
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				y: 'bottom',
				data: [
					'已安装设备'
				],
				textStyle: {
					color: '#ccc'
				}
			},
			visualMap: {
				min: 0,
				max: maxNumber,
				left: 'right',
				top: 'bottom',
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				//		color: ['#26cfe4', '#f2b600', '#ec5845'],
				textStyle: {
					color: '#fff'
				}
			},
			series: [{
					name: '已安装设备',
					type: 'map',
					aspectScale: 0.75,
					zoom: 1.2,
					mapType: 'china',
					roam: false,
					label: {
                        normal: {
                            show: true,//显示省份标签
                            textStyle:{color:"#000000"}//省份标签字体颜色
                        },    
                        emphasis: {//对应的鼠标悬浮效果
                            show: true,
                            textStyle:{color:"#800080"}
                        } 
					},
					itemStyle: {
                        normal: {
                            borderWidth: .5,//区域边框宽度
                            borderColor: '#009fe8',//区域边框颜色
                            areaColor:"#ffffff",//区域颜色
                        },
                        emphasis: {
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor:"#ffdead",
                        }
                    },
					data: function() {
						return serie;
					}()

				}
			]
		};

		myChart.setOption(option);
		
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		myChart.on('click', function (params) {//点击事件
		    if (params.componentType === 'series') {
		    }
		})

		//如果字符串最后一个汉字是"省"或者"市",就去掉
		function removeLastChar(str) {
			const pattern = /[省市]$/;
			return str.replace(pattern, '');
		}
	}
)
//设置访问拦截
if(!localStorage.getItem('user-token')){
  (location.href='./login.html')
}

// 显示数据
window.addEventListener('DOMContentLoaded',async function(){
 try {
	 const {data:res}=await axios.get('/dashboard')
   console.log(res);
  console.log(res.overview)
   for (let k in res.overview) {
     document.querySelector(`[name=${k}]`).innerHTML=res.overview[k]
   }
   one(res.year)
   two(res.salaryData)
   three(res.groupData[1])
   four(res.salaryData)
   initMapChart(res.provinceData)


   // 点击数字切换图标
document.querySelector('#btns').addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    // console.log(11)
    document.querySelector('.btn-blue').classList.remove('btn-blue')
    e.target.classList.add('btn-blue')
    three(res.groupData[e.target.innerHTML])
  }
})
} catch (error) {
	console.dir(error)
}
})



//渲染第一个图
function one(arr) {
  const myChart = echarts.init(document.getElementById('line'));

    // 指定图表的配置项和数据
   const option = {
    title:{
      text:'2023全学科薪资走势',
      textStyle:{
        fontSize:14
      },
      left:10,
      top:10,
     },
     tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      axisLine:{
        show:false,
        lineStyle:{
          color:'#ccc',
        type:'dashed'
        }
      },
       axisLabel:{
          color:"666"
        },
      data: arr.map(item => {
        return item.month
      })
    },
    yAxis: {
      type: 'value',
      splitLine:{
        show:true,
        lineStyle:{
          color:'#ccc',
          type:'dashed'
        }
      }
    },
    series: [
      {
        data: arr.map(item => {
          return item.salary
        }),
        type: 'line',
        lineStyle:{
          color:{
            type:'linear',
            x:0,
            y:0,
            x2:1,
            y2:1,
            colorStops:[{
              offset:0,color:'rgb(64, 155, 246)'
            },{
              offset:1,color:'rgb(87, 126, 227)'
            }],
            global:false
            
          },
          width:6
        },
        areaStyle:{
          color:{
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[{
              offset:0,color:'#92bff5'
            },{
              offset:0.8,color:'#fff'
            }],
            global:false
            
          }
        },
        symbolSize:10,
        smooth: true
      }
    ]
  };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//渲染第二个图

  function two(arr) {
    // console.log(document.getElementById('salary'))
    console.log(arr)
    const myChart = echarts.init(document.getElementById('salary'));
  
      // 指定图表的配置项和数据
     const option = {
      title:{
        text:'班级薪资分布',
        textStyle:{
          fontSize:16
         },
        top:15
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '85%',
        left: 'center'
      },
      color:['#fea125','#5097ff ','#3abcfa','#35d198'],
      series: [
        {
          name: '班级薪资分布',
          type: 'pie',
          // 饼图的半径
          radius: ['60%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            // 饼图的圆角
            borderRadius: 15,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: arr.map(item => {
            return ({value:item.g_count+item.b_count,name:item.label})
          })
        }
      ]
    };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  }
  


// 渲染第三个图
function three(arr) {
  const myChart = echarts.init(document.getElementById('lines'));

    // 指定图表的配置项和数据
   const option = {
    
     tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      axisLine:{
        show:false,
        lineStyle:{
          color:'#ccc',
        type:'dashed'
        }
      },
       axisLabel:{
          color:"666"
        },
      data: arr.map(item => {
        return item.name
      })
    },
    yAxis: {
      type: 'value',
      splitLine:{
        show:true,
        lineStyle:{
          color:'#ccc',
          type:'dashed'
        }
      }
     }, grid: {
      top:'7%',
      left:'7%',
      right:'7%',
      bottom:'7%'
     },
    color:[{
      type:'linear',
      x:1,
      y:1,
      x2:0,
      y2:0,
      colorStops:[{
        offset:0,color:'#fff'
      },{
        offset:0.8,color:'#2cd99c'
      }],
      global:false
      
    },{
      type:'linear',
      x:1,
      y:1,
      x2:0,
      y2:0,
      colorStops:[{
        offset:0,color:'#fff'
      },{
        offset:0.8,color:'#4ca1e4'
      }],
      global:false
      
    }],
    series: [
      {
        data: arr.map(item => {
          return item.hope_salary
        }),
        type: 'bar',
        name:'期望薪资',
        symbolSize:10,
        smooth: true
      },
      {
        data: arr.map(item => {
          return item.salary
        }),
        type: 'bar',
        name:'实际薪资',
        symbolSize:10,
        smooth: true
      }
    ]
  };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 渲染男女生薪资表
function four(arr) {
  const myChart = echarts.init(document.getElementById('gender'));

    // 指定图表的配置项和数据
   const option = {
    title: [{
       text: '男女薪资分步',
       textStyle:{
         fontSize:14
       },
       left: 10,
       top:10
     },{
       text: '男生',
       textStyle:{
         fontSize:20
       },
       left: 'center',
       top:'45%'
     },{
       text: '女生',
       textStyle:{
         fontSize:20
       },
       left: 'center',
       top:'90%'
     }],
     tooltip: {
       trigger: 'item'
     },
    //  legend: {
    //    orient: 'vertical',
    //    left: 'left',
    //    top:50
    //  },
     series: [
       {
         name: '男生',
         type: 'pie',
         radius: ['20%','25%'],
         center:['50%','25%'],
         data: arr.map(item => {
           return ({value:item.b_count,name:item.label})
         }),
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       },
       {
         
         name: '女生',
         type: 'pie',
         radius: ['20%','25%'],
         center:['50%','70%'],
         data: arr.map(item => {
          return ({value:item.g_count,name:item.label})
        }),
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       }
     ]
   };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//学生全国分布图

function  initMapChart(provinceData){
  const myEchart = echarts.init(document.querySelector('#map'))
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]
  dataList.forEach(item1 => {
    const obj = provinceData.find(item2 => {
   return item2.name.slice(0,2)==item1.name.slice(0,2)
    })
    if (obj) {
      item1.value=obj.value
    } else {
      
   }
   

  })
  let option = {
    title: {
      text: '籍贯分布',
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myEchart.setOption(option)
}
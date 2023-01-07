// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})


axios.defaults.baseURL = 'http://ajax-api.itheima.net'

//提示框
function tips(str){
  const box= document.querySelector('#myToast')
 box.querySelector('.toast-body').innerHTML=str
  const toast = new bootstrap.Toast(box,{
      animation:true,   // 开启过度动画
      autohide:true,   //开启自动隐藏
      delay:3000         //3000ms 后自动隐藏
  })
  toast.show()
}

//多网页设置用户名
const text = document.querySelector('.media .font-weight-bold')
if (text) text.innerHTML = localStorage.getItem('user-name')

//多页面设置退出按钮
const exit = document.querySelector('#logout')
if (exit) {
  exit.addEventListener('click', () => {
    console.log(111)
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-token')
    location.href='./login.html'
  })
}



//请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么


  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。

  if (error.response.status == 401) {
    // localStorage.removeItem('user-token')
    // localStorage.removeItem('user-name')
    location.href='./login.html'
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});
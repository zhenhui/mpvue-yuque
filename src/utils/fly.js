var Fly=require('flyio/dist/npm/wx')
const fly = new Fly

//配置请求基地址
fly.config.baseURL = 'https://songxiaocai.yuque.com/api/v2/'

fly.config.headers = {
  'X-Auth-Token' : 'qwOL2U/R6CvPYYs+/0DDnLH4dsMIpYlxo2VeCgnDNco='
}

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err, promise) => {
    //发生网络错误后会走到这里
    //promise.resolve("ssss")
  }
)

export default fly

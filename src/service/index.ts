// service统一出口
import PRequest from './request'

import { BASEURL, TIMEOUT } from './config'
// 本地缓存
// import useLogin from '@/stores/login/login'
// import localCache from '@/utils/cache'
// import { ElMessage } from 'element-plus'
// 获取env中的常量
// console.log(process)
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_TIME_OUT)

// console.log(TIME_OUT)
const pRequest = new PRequest({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  // 拦截处理
  interceptors: {
    requestInterceptor(config) {
      // 携带token拦截
      // const token = localCache.getCache('token')

      // if (token) {
      //   // 添加请求头
      //   config.headers.Authorization = token
      // }

      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
export default pRequest

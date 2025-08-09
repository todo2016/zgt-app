// 统一请求封装
import { getToken, removeToken } from './auth'

// 基础配置
const baseConfig = {
  baseURL: 'http://localhost:8080/api', // 开发环境API地址
  timeout: 10000,
  header: {
    'Content-Type': 'application/json'
  }
}

// 请求拦截器
const requestInterceptor = (config) => {
  // 添加token
  const token = getToken()
  if (token) {
    config.header.Authorization = `Bearer ${token}`
  }
  
  // 显示loading
  uni.showLoading({
    title: '加载中...',
    mask: true
  })
  
  return config
}

// 响应拦截器
const responseInterceptor = (response) => {
  // 隐藏loading
  uni.hideLoading()
  
  const { statusCode, data } = response
  
  if (statusCode === 200) {
    // 业务状态码处理
    if (data.code === 0) {
      return data.data
    } else if (data.code === 401) {
      // token过期，清除本地token并跳转登录
      removeToken()
      uni.reLaunch({
        url: '/pages/login/login'
      })
      uni.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none'
      })
      return Promise.reject(new Error(data.message))
    } else {
      // 其他业务错误
      uni.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject(new Error(data.message))
    }
  } else {
    // HTTP状态码错误
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    })
    return Promise.reject(new Error('网络请求失败'))
  }
}

// 错误处理
const errorHandler = (error) => {
  uni.hideLoading()
  uni.showToast({
    title: error.message || '请求失败',
    icon: 'none'
  })
  return Promise.reject(error)
}

// 统一请求方法
export const request = (options) => {
  const config = {
    ...baseConfig,
    ...options,
    url: baseConfig.baseURL + options.url
  }
  
  // 应用请求拦截器
  const interceptedConfig = requestInterceptor(config)
  
  return new Promise((resolve, reject) => {
    uni.request({
      ...interceptedConfig,
      success: (response) => {
        try {
          const result = responseInterceptor(response)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        errorHandler(error)
        reject(error)
      }
    })
  })
}

// 常用请求方法
export const get = (url, params = {}) => {
  return request({
    url,
    method: 'GET',
    data: params
  })
}

export const post = (url, data = {}) => {
  return request({
    url,
    method: 'POST',
    data
  })
}

export const put = (url, data = {}) => {
  return request({
    url,
    method: 'PUT',
    data
  })
}

export const del = (url, params = {}) => {
  return request({
    url,
    method: 'DELETE',
    data: params
  })
}

// 微信登录工具函数
import { getToken } from './auth'

// 检查是否在微信环境中
export const isWechatEnv = () => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  
  // #ifdef H5
  return /micromessenger/i.test(navigator.userAgent)
  // #endif
  
  return false
}

// 检查是否在微信小程序中
export const isWechatMiniProgram = () => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  return false
}

// 微信登录
export const wechatLogin = () => {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.code) {
          resolve(res)
        } else {
          reject(new Error('微信登录失败：未获取到授权码'))
        }
      },
      fail: (err) => {
        reject(new Error(`微信登录失败：${err.errMsg || '未知错误'}`))
      }
    })
    // #endif
    
    // #ifdef H5
    // H5环境下的微信登录逻辑
    if (typeof WeixinJSBridge !== 'undefined') {
      // 微信内置浏览器
      WeixinJSBridge.invoke('getUserInfo', {}, (res) => {
        if (res.err_msg === 'get_user_info:ok') {
          resolve(res)
        } else {
          reject(new Error('微信登录失败：用户拒绝授权'))
        }
      })
    } else {
      reject(new Error('当前环境不支持微信登录'))
    }
    // #endif
    
    // #ifndef MP-WEIXIN || H5
    reject(new Error('当前环境不支持微信登录'))
    // #endif
  })
}

// 获取微信用户信息（小程序）
export const getWechatUserInfo = () => {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        resolve(res.userInfo)
      },
      fail: (err) => {
        reject(new Error(`获取用户信息失败：${err.errMsg || '未知错误'}`))
      }
    })
    // #endif
    
    // #ifndef MP-WEIXIN
    reject(new Error('当前环境不支持获取微信用户信息'))
    // #endif
  })
}

// 检查微信登录状态
export const checkWechatLoginStatus = () => {
  const token = getToken()
  if (token && token.startsWith('wechat_token_')) {
    return true
  }
  return false
}

// 微信分享配置
export const setupWechatShare = (options = {}) => {
  // #ifdef MP-WEIXIN
  const defaultOptions = {
    title: 'ZGT应用',
    path: '/pages/index/index',
    imageUrl: '/static/logo.png'
  }
  
  const shareOptions = { ...defaultOptions, ...options }
  
  // 设置分享给朋友
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
  
  // 分享给朋友
  uni.onShareAppMessage(() => shareOptions)
  
  // 分享到朋友圈
  uni.onShareTimeline(() => shareOptions)
  // #endif
}

// 微信支付
export const wechatPay = (payData) => {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.requestPayment({
      ...payData,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(new Error(`支付失败：${err.errMsg || '未知错误'}`))
      }
    })
    // #endif
    
    // #ifndef MP-WEIXIN
    reject(new Error('当前环境不支持微信支付'))
    // #endif
  })
}

export default {
  isWechatEnv,
  isWechatMiniProgram,
  wechatLogin,
  getWechatUserInfo,
  checkWechatLoginStatus,
  setupWechatShare,
  wechatPay
}

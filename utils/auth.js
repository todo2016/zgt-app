// 鉴权管理
const TOKEN_KEY = 'zgt_token'
const USER_INFO_KEY = 'zgt_user_info'

// 存储token
export const setToken = (token) => {
  try {
    uni.setStorageSync(TOKEN_KEY, token)
  } catch (e) {
    console.error('存储token失败:', e)
  }
}

// 获取token
export const getToken = () => {
  try {
    return uni.getStorageSync(TOKEN_KEY) || ''
  } catch (e) {
    console.error('获取token失败:', e)
    return ''
  }
}

// 清除token
export const removeToken = () => {
  try {
    uni.removeStorageSync(TOKEN_KEY)
  } catch (e) {
    console.error('清除token失败:', e)
  }
}

// 存储用户信息
export const setUserInfo = (userInfo) => {
  try {
    uni.setStorageSync(USER_INFO_KEY, userInfo)
  } catch (e) {
    console.error('存储用户信息失败:', e)
  }
}

// 获取用户信息
export const getUserInfo = () => {
  try {
    return uni.getStorageSync(USER_INFO_KEY) || null
  } catch (e) {
    console.error('获取用户信息失败:', e)
    return null
  }
}

// 清除用户信息
export const removeUserInfo = () => {
  try {
    uni.removeStorageSync(USER_INFO_KEY)
  } catch (e) {
    console.error('清除用户信息失败:', e)
  }
}

// 清除所有认证信息
export const clearAuth = () => {
  removeToken()
  removeUserInfo()
}

// 检查是否已登录
export const isLoggedIn = () => {
  const token = getToken()
  return !!token
}

// 登录状态检查
export const checkLoginStatus = () => {
  if (!isLoggedIn()) {
    uni.reLaunch({
      url: '/pages/login/login'
    })
    return false
  }
  return true
}

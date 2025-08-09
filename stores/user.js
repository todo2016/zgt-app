// 用户状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { setToken, removeToken, setUserInfo, removeUserInfo, getToken } from '../utils/auth'
import * as userApi from '../api/user'
import { wechatLogin as wechatLoginUtil } from '../utils/wechat'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(getToken() || '')
  const userInfo = ref(null)
  const isLogin = ref(!!getToken())

  // 计算属性
  const hasUserInfo = computed(() => !!userInfo.value)
  const userId = computed(() => userInfo.value?.id || '')

  // 登录
  const login = async (loginData) => {
    try {
      const data = await userApi.login(loginData)
      
      // 保存token和用户信息
      token.value = data.token
      userInfo.value = data.userInfo
      isLogin.value = true
      
      // 存储到本地
      setToken(data.token)
      setUserInfo(data.userInfo)
      
      return data
    } catch (error) {
      throw error
    }
  }

  // 微信登录
  const wechatLogin = async () => {
    try {
      // 获取微信登录凭证
      const loginResult = await wechatLoginUtil()
      
      if (loginResult.code) {
        // 调用后端API，用code换取用户信息
        const data = await userApi.wechatLogin({
          code: loginResult.code
        })
        
        // 保存token和用户信息
        token.value = data.token
        userInfo.value = data.userInfo
        isLogin.value = true
        
        // 存储到本地
        setToken(data.token)
        setUserInfo(data.userInfo)
        
        return data
      } else {
        throw new Error('微信登录失败：未获取到授权码')
      }
    } catch (error) {
      console.error('微信登录失败:', error)
      throw error
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const data = await userApi.getUserInfo()
      userInfo.value = data
      setUserInfo(data)
      return data
    } catch (error) {
      throw error
    }
  }

  // 更新用户信息
  const updateUserInfo = async (updateData) => {
    try {
      const data = await userApi.updateUserInfo(updateData)
      userInfo.value = { ...userInfo.value, ...data }
      setUserInfo(userInfo.value)
      return data
    } catch (error) {
      throw error
    }
  }

  // 登出
  const logout = async () => {
    try {
      if (token.value) {
        await userApi.logout()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      // 清除状态
      token.value = ''
      userInfo.value = null
      isLogin.value = false
      
      // 清除本地存储
      removeToken()
      removeUserInfo()
    }
  }

  // 检查登录状态
  const checkLoginStatus = () => {
    const localToken = getToken()
    if (localToken && !token.value) {
      token.value = localToken
      isLogin.value = true
      return true
    }
    return isLogin.value
  }

  return {
    // 状态
    token,
    userInfo,
    isLogin,
    
    // 计算属性
    hasUserInfo,
    userId,
    
    // 方法
    login,
    wechatLogin,
    fetchUserInfo,
    updateUserInfo,
    logout,
    checkLoginStatus
  }
})

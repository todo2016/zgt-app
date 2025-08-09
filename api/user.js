// 用户相关API
import { post, get } from '../utils/request'

// 用户登录
export const login = (data) => {
  return post('/user/login', data)
}

// 用户注册
export const register = (data) => {
  return post('/user/register', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return get('/user/info')
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return post('/user/update', data)
}

// 修改密码
export const changePassword = (data) => {
  return post('/user/change-password', data)
}

// 用户登出
export const logout = () => {
  return post('/user/logout')
}

// 发送验证码
export const sendVerifyCode = (phone) => {
  return post('/user/send-code', { phone })
}

// 验证验证码
export const verifyCode = (data) => {
  return post('/user/verify-code', data)
}

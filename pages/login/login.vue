<template>
  <view class="login-container">
    <!-- 顶部Logo区域 -->
    <view class="logo-section">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="app-name">ZGT应用</text>
      <text class="app-desc">智能管理，高效运营</text>
    </view>
    
    <!-- 登录表单 -->
    <view class="form-section">
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">👤</text>
          <input 
            class="input" 
            type="text" 
            placeholder="请输入用户名" 
            v-model="formData.username"
            maxlength="20"
          />
        </view>
      </view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">🔒</text>
          <input 
            class="input" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="请输入密码" 
            v-model="formData.password"
            maxlength="20"
          />
          <text class="eye-icon" @click="togglePassword">
            {{ showPassword ? '👁️' : '🙈' }}
          </text>
        </view>
      </view>
      
      <!-- 记住密码选项 -->
      <view class="remember-section">
        <label class="remember-item">
          <checkbox 
            :checked="formData.remember" 
            @change="onRememberChange"
            color="#007AFF"
          />
          <text class="remember-text">记住密码</text>
        </label>
        <text class="forgot-password" @click="onForgotPassword">忘记密码？</text>
      </view>
      
      <!-- 登录按钮 -->
      <button 
        class="login-btn" 
        :disabled="!canLogin || loading"
        @click="handleLogin"
      >
        <text v-if="loading">登录中...</text>
        <text v-else>登录</text>
      </button>
      
      <!-- 其他登录方式 -->
      <view class="other-login">
        <text class="divider">其他登录方式</text>
        <view class="social-login">
          <view class="social-item" @click="onWechatLogin">
            <text class="social-icon">💬</text>
            <text class="social-text">微信登录</text>
          </view>
          <view class="social-item" @click="onPhoneLogin">
            <text class="social-icon">📱</text>
            <text class="social-text">手机登录</text>
          </view>
        </view>
      </view>
      
      <!-- 注册链接 -->
      <view class="register-section">
        <text class="register-text">还没有账号？</text>
        <text class="register-link" @click="goToRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useUserStore } from '../../stores/user'

// 用户store
const userStore = useUserStore()

// 响应式数据
const loading = ref(false)
const showPassword = ref(false)

const formData = reactive({
  username: '',
  password: '',
  remember: false
})

// 计算属性
const canLogin = computed(() => {
  return formData.username.trim() && formData.password.trim()
})

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 记住密码变化
const onRememberChange = (e) => {
  formData.remember = e.detail.value
}

// 忘记密码
const onForgotPassword = () => {
  uni.showToast({
    title: '请联系管理员重置密码',
    icon: 'none'
  })
}

// 微信登录
const onWechatLogin = () => {
  uni.showToast({
    title: '微信登录功能开发中',
    icon: 'none'
  })
}

// 手机登录
const onPhoneLogin = () => {
  uni.showToast({
    title: '手机登录功能开发中',
    icon: 'none'
  })
}

// 跳转注册
const goToRegister = () => {
  uni.showToast({
    title: '注册功能开发中',
    icon: 'none'
  })
}

// 处理登录
const handleLogin = async () => {
  if (!canLogin.value || loading.value) return
  
  try {
    loading.value = true
    
    // 调用登录API
    await userStore.login({
      username: formData.username.trim(),
      password: formData.password
    })
    
    // 登录成功提示
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
    
    // 跳转到首页
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }, 1500)
    
  } catch (error) {
    console.error('登录失败:', error)
    uni.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
}

.logo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 40rpx;
}

.app-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20rpx;
}

.app-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.form-section {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 40rpx;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 0 30rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #007AFF;
  background: #ffffff;
}

.icon {
  font-size: 32rpx;
  margin-right: 20rpx;
  color: #6c757d;
}

.input {
  flex: 1;
  height: 88rpx;
  font-size: 32rpx;
  color: #333333;
}

.eye-icon {
  font-size: 32rpx;
  color: #6c757d;
  padding: 20rpx;
  cursor: pointer;
}

.remember-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.remember-item {
  display: flex;
  align-items: center;
}

.remember-text {
  font-size: 28rpx;
  color: #666666;
  margin-left: 16rpx;
}

.forgot-password {
  font-size: 28rpx;
  color: #007AFF;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #007AFF 0%, #0056CC 100%);
  color: #ffffff;
  border: none;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  transition: all 0.3s ease;
}

.login-btn:disabled {
  background: #cccccc;
  opacity: 0.6;
}

.login-btn:not(:disabled):active {
  transform: scale(0.98);
}

.other-login {
  text-align: center;
  margin-bottom: 40rpx;
}

.divider {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 30rpx;
  display: block;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 60rpx;
}

.social-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.social-icon {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.social-text {
  font-size: 24rpx;
  color: #666666;
}

.register-section {
  text-align: center;
}

.register-text {
  font-size: 28rpx;
  color: #666666;
}

.register-link {
  font-size: 28rpx;
  color: #007AFF;
  margin-left: 16rpx;
  cursor: pointer;
}
</style>

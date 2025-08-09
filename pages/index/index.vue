<template>
  <view class="home-container">
    <!-- 顶部用户信息区域 -->
    <view class="user-section">
      <view class="user-info">
        <image class="avatar" :src="userInfo?.avatar || '/static/logo.png'" mode="aspectFill"></image>
        <view class="user-details">
          <text class="username">{{ userInfo?.username || '用户' }}</text>
          <text class="user-role">{{ userInfo?.role || '普通用户' }}</text>
        </view>
      </view>
      <view class="user-actions">
        <view class="action-btn" @click="goToProfile">
          <text class="action-icon">⚙️</text>
        </view>
        <view class="action-btn" @click="handleLogout">
          <text class="action-icon">🚪</text>
        </view>
      </view>
    </view>
    
    <!-- 统计卡片区域 -->
    <view class="stats-section">
      <view class="stats-title">
        <text class="title-text">数据概览</text>
        <text class="title-date">{{ currentDate }}</text>
      </view>
      <view class="stats-grid">
        <view class="stats-card" v-for="(stat, index) in statsData" :key="index">
          <view class="stat-icon">{{ stat.icon }}</view>
          <view class="stat-content">
            <text class="stat-value">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能模块区域 -->
    <view class="modules-section">
      <view class="section-title">
        <text class="title-text">功能模块</text>
      </view>
      <view class="modules-grid">
        <view 
          class="module-item" 
          v-for="(module, index) in modulesData" 
          :key="index"
          @click="handleModuleClick(module)"
        >
          <view class="module-icon">{{ module.icon }}</view>
          <text class="module-name">{{ module.name }}</text>
          <text class="module-desc">{{ module.description }}</text>
        </view>
      </view>
    </view>
    
    <!-- 快捷操作区域 -->
    <view class="quick-actions">
      <view class="section-title">
        <text class="title-text">快捷操作</text>
      </view>
      <view class="actions-list">
        <view 
          class="action-item" 
          v-for="(action, index) in quickActions" 
          :key="index"
          @click="handleQuickAction(action)"
        >
          <view class="action-icon">{{ action.icon }}</view>
          <text class="action-name">{{ action.name }}</text>
          <text class="action-arrow">></text>
        </view>
      </view>
    </view>
    
    <!-- 底部导航提示 -->
    <view class="bottom-tip">
      <text class="tip-text">左右滑动查看更多功能</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'

// 用户store
const userStore = useUserStore()

// 响应式数据
const userInfo = ref(null)
const currentDate = ref('')

// 统计数据
const statsData = ref([
  { icon: '📊', value: '1,234', label: '总订单' },
  { icon: '💰', value: '¥56,789', label: '总收入' },
  { icon: '👥', value: '89', label: '活跃用户' },
  { icon: '📈', value: '+12.5%', label: '增长率' }
])

// 功能模块
const modulesData = ref([
  { 
    icon: '🛒', 
    name: '订单管理', 
    description: '查看和管理所有订单',
    path: '/pages/orders/orders'
  },
  { 
    icon: '👥', 
    name: '用户管理', 
    description: '管理用户信息和权限',
    path: '/pages/users/users'
  },
  { 
    icon: '📦', 
    name: '商品管理', 
    description: '管理商品库存和价格',
    path: '/pages/products/products'
  },
  { 
    icon: '📊', 
    name: '数据统计', 
    description: '查看业务数据报表',
    path: '/pages/statistics/statistics'
  },
  { 
    icon: '⚙️', 
    name: '系统设置', 
    description: '配置系统参数',
    path: '/pages/settings/settings'
  },
  { 
    icon: '📝', 
    name: '日志查看', 
    description: '查看系统操作日志',
    path: '/pages/logs/logs'
  }
])

// 快捷操作
const quickActions = ref([
  { icon: '➕', name: '新增订单', action: 'addOrder' },
  { icon: '🔍', name: '搜索商品', action: 'searchProduct' },
  { icon: '📱', name: '联系客服', action: 'contactService' },
  { icon: '📋', name: '导出报表', action: 'exportReport' }
])

// 计算属性
const isLoggedIn = computed(() => userStore.isLogin)

// 生命周期
onMounted(() => {
  initPage()
})

// 页面显示时触发
const onShow = () => {
  // 每次显示页面时检查登录状态
  if (!isLoggedIn.value) {
    uni.reLaunch({
      url: '/pages/login/login'
    })
    return
  }
  
  // 获取用户信息
  fetchUserInfo()
}

// 使用 defineExpose 暴露给页面实例
defineExpose({
  onShow
})

// 初始化页面
const initPage = () => {
  // 设置当前日期
  const now = new Date()
  currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
  
  // 检查登录状态
  if (!isLoggedIn.value) {
    uni.reLaunch({
      url: '/pages/login/login'
    })
    return
  }
  
  // 获取用户信息
  fetchUserInfo()
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    if (userStore.hasUserInfo) {
      userInfo.value = userStore.userInfo
    } else {
      const data = await userStore.fetchUserInfo()
      userInfo.value = data
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    uni.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
  }
}

// 跳转个人资料
const goToProfile = () => {
  uni.showToast({
    title: '个人资料功能开发中',
    icon: 'none'
  })
}

// 处理登出
const handleLogout = () => {
  uni.showModal({
    title: '确认登出',
    content: '确定要退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await userStore.logout()
          uni.showToast({
            title: '已退出登录',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }, 1500)
        } catch (error) {
          console.error('登出失败:', error)
        }
      }
    }
  })
}

// 处理模块点击
const handleModuleClick = (module) => {
  uni.showToast({
    title: `${module.name}功能开发中`,
    icon: 'none'
  })
  
  // 这里可以根据实际需求跳转到对应页面
  // if (module.path) {
  //   uni.navigateTo({
  //     url: module.path
  //   })
  // }
}

// 处理快捷操作
const handleQuickAction = (action) => {
  switch (action.action) {
    case 'addOrder':
      uni.showToast({
        title: '新增订单功能开发中',
        icon: 'none'
      })
      break
    case 'searchProduct':
      uni.showToast({
        title: '搜索商品功能开发中',
        icon: 'none'
      })
      break
    case 'contactService':
      uni.showToast({
        title: '客服功能开发中',
        icon: 'none'
      })
      break
    case 'exportReport':
      uni.showToast({
        title: '导出报表功能开发中',
        icon: 'none'
      })
      break
    default:
      break
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f6fa;
  padding-bottom: 40rpx;
}

.user-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 40rpx 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 30rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10rpx;
}

.user-role {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.user-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-icon {
  font-size: 32rpx;
}

.stats-section {
  margin: -20rpx 40rpx 0;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.stats-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.title-date {
  font-size: 24rpx;
  color: #999999;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
}

.stats-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.stat-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666666;
}

.modules-section {
  margin: 40rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  margin-bottom: 40rpx;
}

.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
}

.module-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.module-item:active {
  transform: scale(0.95);
  background: #e9ecef;
}

.module-icon {
  font-size: 64rpx;
  margin-bottom: 20rpx;
}

.module-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
  text-align: center;
}

.module-desc {
  font-size: 22rpx;
  color: #666666;
  text-align: center;
  line-height: 1.4;
}

.quick-actions {
  margin: 0 40rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.actions-list {
  display: flex;
  flex-direction: column;
}

.action-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
  cursor: pointer;
}

.action-item:last-child {
  border-bottom: none;
}

.action-item:active {
  background: #f8f9fa;
}

.action-icon {
  font-size: 40rpx;
  margin-right: 30rpx;
}

.action-name {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
}

.action-arrow {
  font-size: 24rpx;
  color: #cccccc;
}

.bottom-tip {
  text-align: center;
  margin-top: 40rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #999999;
}
</style>

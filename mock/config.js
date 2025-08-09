// Mock 配置文件
export const mockConfig = {
  // 是否启用 mock 服务
  enabled: process.env.NODE_ENV === 'development',
  
  // 基础配置
  base: {
    // 延迟时间（毫秒）
    delay: 300,
    // 是否显示 mock 日志
    showLog: true,
    // 是否模拟网络错误
    simulateError: false,
    // 错误概率（0-1）
    errorRate: 0.1
  },
  
  // 环境配置
  env: {
    development: {
      enabled: true,
      delay: 300,
      showLog: true
    },
    test: {
      enabled: true,
      delay: 100,
      showLog: false
    },
    production: {
      enabled: false,
      delay: 0,
      showLog: false
    }
  },
  
  // API 配置
  api: {
    // 用户相关 API
    user: {
      login: '/api/user/login',
      register: '/api/user/register',
      info: '/api/user/info',
      logout: '/api/user/logout',
      update: '/api/user/update',
      changePassword: '/api/user/change-password'
    },
    
    // 订单相关 API
    order: {
      list: '/api/order/list',
      detail: '/api/order/detail',
      create: '/api/order/create',
      update: '/api/order/update',
      delete: '/api/order/delete'
    },
    
    // 商品相关 API
    product: {
      list: '/api/product/list',
      detail: '/api/product/detail',
      create: '/api/product/create',
      update: '/api/product/update',
      delete: '/api/product/delete'
    }
  }
}

// 获取当前环境配置
export const getCurrentMockConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  console.log('[Mock] 当前环境:', env)
  
  // 在小程序环境下，强制启用 mock（开发时）
  const isMiniProgram = typeof wx !== 'undefined' || typeof my !== 'undefined' || typeof swan !== 'undefined'
  const isDev = env === 'development' || isMiniProgram
  
  const config = {
    ...mockConfig.base,
    ...mockConfig.env[env],
    enabled: isDev
  }
  
  console.log('[Mock] 最终配置:', config)
  return config
}

// 检查是否应该启用 mock
export const shouldEnableMock = () => {
  const config = getCurrentMockConfig()
  return config.enabled
}

// 导出默认配置
export default mockConfig

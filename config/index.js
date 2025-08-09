// 配置文件
const config = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:8080/api',
    appName: 'ZGT应用',
    version: '1.0.0'
  },
  
  // 测试环境
  test: {
    baseURL: 'https://test-api.example.com/api',
    appName: 'ZGT应用',
    version: '1.0.0'
  },
  
  // 生产环境
  production: {
    baseURL: 'https://api.example.com/api',
    appName: 'ZGT应用',
    version: '1.0.0'
  }
}

// 获取当前环境
const getCurrentEnv = () => {
  // #ifdef H5
  if (process.env.NODE_ENV === 'development') {
    return 'development'
  }
  // #endif
  
  // #ifdef MP-WEIXIN
  // 微信小程序环境判断
  if (__wxConfig.envVersion === 'develop') {
    return 'development'
  } else if (__wxConfig.envVersion === 'trial') {
    return 'test'
  } else {
    return 'production'
  }
  // #endif
  
  // 默认返回开发环境
  return 'development'
}

// 导出当前环境配置
export default config[getCurrentEnv()]

// 导出所有环境配置
export { config }

// 导出环境判断函数
export { getCurrentEnv }

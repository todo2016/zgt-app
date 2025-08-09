// Mock 服务主入口
import { mockLogin, mockGetUserInfo } from './user'
import { getCurrentMockConfig } from './config'

// 获取当前配置
const config = getCurrentMockConfig()

// Mock 路由配置
const mockRoutes = {
  '/api/user/login': {
    method: 'POST',
    handler: (data) => {
      const { username, password } = data
      return mockLogin(username, password)
    }
  },
  '/api/user/info': {
    method: 'GET',
    handler: (token) => {
      return mockGetUserInfo(token)
    }
  },
  '/api/user/register': {
    method: 'POST',
    handler: (data) => {
      return {
        success: true,
        message: '注册成功',
        data: {
          id: Date.now(),
          username: data.username,
          nickname: data.nickname || data.username,
          role: '普通用户',
          avatar: '/static/logo.png'
        }
      }
    }
  },
  '/api/user/logout': {
    method: 'POST',
    handler: () => {
      return {
        success: true,
        message: '退出成功'
      }
    }
  }
}

// 创建延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock 拦截器
export const setupMock = () => {
  console.log('[Mock] 检查配置:', config)
  if (!config.enabled) {
    console.log('[Mock] Mock 服务未启用，跳过设置')
    return
  }

  // 保存原始的 uni.request
  const originalRequest = uni.request

  // 重写 uni.request
  uni.request = async (options) => {
    const { url, method = 'GET', data, success, fail, complete } = options

    // 检查是否是 mock 路由
    // 提取路径部分，去掉 baseURL
    const urlPath = url.replace(/^https?:\/\/[^\/]+/, '')
    const mockRoute = mockRoutes[urlPath]
    
    console.log(`[Mock] 请求检查:`, {
      originalUrl: url,
      urlPath: urlPath,
      method: method,
      hasMockRoute: !!mockRoute,
      mockRoute: mockRoute
    })
    
    if (mockRoute && mockRoute.method === method) {
      if (config.showLog) {
        console.log(`[Mock] ${method} ${url}`, data)
      }

      try {
        // 模拟网络延迟
        await delay(config.delay)
        
        // 调用 mock 处理器
        let mockData
        if (method === 'GET') {
          // GET 请求从 header 中获取 token
          const token = options.header?.Authorization || options.header?.authorization
          mockData = mockRoute.handler(token)
        } else {
          mockData = mockRoute.handler(data)
        }

        // 转换为标准响应格式
        const response = {
          statusCode: 200,
          header: { 'Content-Type': 'application/json' },
          data: {
            code: mockData.success ? 0 : 1,
            message: mockData.message || (mockData.success ? 'ok' : 'error'),
            data: mockData.data || null
          }
        }

        if (config.showLog) {
          console.log(`[Mock] Response:`, response)
        }

        // 调用成功回调
        if (success) {
          success(response)
        }
        
        // 调用完成回调
        if (complete) {
          complete(response)
        }

        return response
      } catch (error) {
        const errorResponse = {
          statusCode: 500,
          header: { 'Content-Type': 'application/json' },
          data: {
            code: 1,
            message: 'Mock 服务错误',
            data: null
          }
        }

        if (fail) {
          fail(errorResponse)
        }
        
        if (complete) {
          complete(errorResponse)
        }

        return errorResponse
      }
    } else {
      // 不是 mock 路由，使用原始请求
      return originalRequest(options)
    }
  }

  console.log('[Mock] 服务已启动')
}

// 停止 Mock 服务
export const stopMock = () => {
  if (config.enabled) {
    // 这里可以恢复原始的 uni.request
    console.log('[Mock] 服务已停止')
  }
}

// 切换 Mock 状态
export const toggleMock = () => {
  config.enabled = !config.enabled
  console.log(`[Mock] 服务已${config.enabled ? '启动' : '停止'}`)
}

// 设置 Mock 延迟
export const setMockDelay = (delay) => {
  config.delay = delay
  console.log(`[Mock] 延迟设置为 ${delay}ms`)
}

// 导出配置和路由
export { config as mockConfig, mockRoutes }

// Mock 控制面板
import { setupMock, stopMock, toggleMock, setMockDelay, mockConfig } from './index'

class MockController {
  constructor() {
    this.isInitialized = false
    this.originalConsole = console.log
    this.mockLogs = []
  }

  // 初始化控制面板
  init() {
    if (this.isInitialized) return
    
    // 启动 mock 服务
    setupMock()
    
    // 添加控制方法到全局
    if (typeof window !== 'undefined') {
      window.$mock = {
        toggle: this.toggle.bind(this),
        setDelay: this.setDelay.bind(this),
        getStatus: this.getStatus.bind(this),
        getLogs: this.getLogs.bind(this),
        clearLogs: this.clearLogs.bind(this),
        help: this.help.bind(this)
      }
    }
    
    // 添加控制台日志拦截
    this.interceptConsole()
    
    this.isInitialized = true
    console.log('[Mock] 控制面板已初始化')
    console.log('[Mock] 使用 window.$mock 或 console.$mock 控制服务')
  }

  // 切换 mock 状态
  toggle() {
    toggleMock()
    return this.getStatus()
  }

  // 设置延迟时间
  setDelay(delay) {
    if (typeof delay === 'number' && delay >= 0) {
      setMockDelay(delay)
      return { success: true, delay }
    } else {
      return { success: false, message: '延迟时间必须是大于等于0的数字' }
    }
  }

  // 获取状态信息
  getStatus() {
    return {
      enabled: mockConfig.enabled,
      delay: mockConfig.delay,
      showLog: mockConfig.showLog,
      initialized: this.isInitialized
    }
  }

  // 获取 mock 日志
  getLogs() {
    return this.mockLogs
  }

  // 清空日志
  clearLogs() {
    this.mockLogs = []
    return { success: true, message: '日志已清空' }
  }

  // 显示帮助信息
  help() {
    const helpText = `
Mock 控制面板使用说明：

1. 切换服务状态：
   $mock.toggle()

2. 设置延迟时间：
   $mock.setDelay(500)  // 500ms

3. 查看服务状态：
   $mock.getStatus()

4. 查看 mock 日志：
   $mock.getLogs()

5. 清空日志：
   $mock.clearLogs()

6. 显示帮助：
   $mock.help()

当前状态：${JSON.stringify(this.getStatus(), null, 2)}
    `
    console.log(helpText)
    return helpText
  }

  // 拦截控制台日志
  interceptConsole() {
    const self = this
    
    // 拦截 console.log
    console.log = function(...args) {
      // 调用原始方法
      self.originalConsole.apply(console, args)
      
      // 如果是 mock 日志，保存到日志数组
      const message = args.join(' ')
      if (message.includes('[Mock]')) {
        self.mockLogs.push({
          timestamp: new Date().toISOString(),
          message: message,
          type: 'log'
        })
        
        // 限制日志数量
        if (self.mockLogs.length > 100) {
          self.mockLogs.shift()
        }
      }
    }
  }

  // 销毁控制面板
  destroy() {
    if (!this.isInitialized) return
    
    // 停止 mock 服务
    stopMock()
    
    // 移除全局方法
    if (typeof window !== 'undefined' && window.$mock) {
      delete window.$mock
    }
    
    // 恢复原始控制台
    console.log = this.originalConsole
    
    this.isInitialized = false
    console.log('[Mock] 控制面板已销毁')
  }
}

// 创建全局实例
const mockController = new MockController()

// 导出控制面板
export default mockController

// 导出便捷方法
export const {
  init: initMockControl,
  toggle: toggleMockControl,
  setDelay: setMockDelayControl,
  getStatus: getMockStatus,
  getLogs: getMockLogs,
  clearLogs: clearMockLogs,
  help: showMockHelp,
  destroy: destroyMockControl
} = mockController

// 自动初始化（在 H5 环境下）
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // 延迟初始化，确保页面加载完成
  setTimeout(() => {
    mockController.init()
  }, 1000)
}

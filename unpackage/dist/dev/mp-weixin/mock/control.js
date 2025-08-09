"use strict";
const common_vendor = require("../common/vendor.js");
const mock_index = require("./index.js");
class MockController {
  constructor() {
    this.isInitialized = false;
    this.originalConsole = console.log;
    this.mockLogs = [];
  }
  // 初始化控制面板
  init() {
    if (this.isInitialized)
      return;
    mock_index.setupMock();
    if (typeof window !== "undefined") {
      window.$mock = {
        toggle: this.toggle.bind(this),
        setDelay: this.setDelay.bind(this),
        getStatus: this.getStatus.bind(this),
        getLogs: this.getLogs.bind(this),
        clearLogs: this.clearLogs.bind(this),
        help: this.help.bind(this)
      };
    }
    this.interceptConsole();
    this.isInitialized = true;
    common_vendor.index.__f__("log", "at mock/control.js:34", "[Mock] 控制面板已初始化");
    common_vendor.index.__f__("log", "at mock/control.js:35", "[Mock] 使用 window.$mock 或 console.$mock 控制服务");
  }
  // 切换 mock 状态
  toggle() {
    mock_index.toggleMock();
    return this.getStatus();
  }
  // 设置延迟时间
  setDelay(delay) {
    if (typeof delay === "number" && delay >= 0) {
      mock_index.setMockDelay(delay);
      return { success: true, delay };
    } else {
      return { success: false, message: "延迟时间必须是大于等于0的数字" };
    }
  }
  // 获取状态信息
  getStatus() {
    return {
      enabled: mock_index.config.enabled,
      delay: mock_index.config.delay,
      showLog: mock_index.config.showLog,
      initialized: this.isInitialized
    };
  }
  // 获取 mock 日志
  getLogs() {
    return this.mockLogs;
  }
  // 清空日志
  clearLogs() {
    this.mockLogs = [];
    return { success: true, message: "日志已清空" };
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
    `;
    common_vendor.index.__f__("log", "at mock/control.js:100", helpText);
    return helpText;
  }
  // 拦截控制台日志
  interceptConsole() {
    const self = this;
    console.log = function(...args) {
      self.originalConsole.apply(console, args);
      const message = args.join(" ");
      if (message.includes("[Mock]")) {
        self.mockLogs.push({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          message,
          type: "log"
        });
        if (self.mockLogs.length > 100) {
          self.mockLogs.shift();
        }
      }
    };
  }
  // 销毁控制面板
  destroy() {
    if (!this.isInitialized)
      return;
    mock_index.stopMock();
    if (typeof window !== "undefined" && window.$mock) {
      delete window.$mock;
    }
    console.log = this.originalConsole;
    this.isInitialized = false;
    common_vendor.index.__f__("log", "at mock/control.js:146", "[Mock] 控制面板已销毁");
  }
}
const mockController = new MockController();
if (typeof window !== "undefined" && true) {
  setTimeout(() => {
    mockController.init();
  }, 1e3);
}
//# sourceMappingURL=../../.sourcemap/mp-weixin/mock/control.js.map

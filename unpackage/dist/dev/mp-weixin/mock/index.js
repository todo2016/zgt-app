"use strict";
const common_vendor = require("../common/vendor.js");
const mock_user = require("./user.js");
const mock_config = require("./config.js");
const config = mock_config.getCurrentMockConfig();
const mockRoutes = {
  "/api/user/login": {
    method: "POST",
    handler: (data) => {
      const { username, password } = data;
      return mock_user.mockLogin(username, password);
    }
  },
  "/api/user/info": {
    method: "GET",
    handler: (token) => {
      return mock_user.mockGetUserInfo(token);
    }
  },
  "/api/user/register": {
    method: "POST",
    handler: (data) => {
      return {
        success: true,
        message: "注册成功",
        data: {
          id: Date.now(),
          username: data.username,
          nickname: data.nickname || data.username,
          role: "普通用户",
          avatar: "/static/logo.png"
        }
      };
    }
  },
  "/api/user/logout": {
    method: "POST",
    handler: () => {
      return {
        success: true,
        message: "退出成功"
      };
    }
  }
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const setupMock = () => {
  common_vendor.index.__f__("log", "at mock/index.js:55", "[Mock] 检查配置:", config);
  if (!config.enabled) {
    common_vendor.index.__f__("log", "at mock/index.js:57", "[Mock] Mock 服务未启用，跳过设置");
    return;
  }
  const originalRequest = common_vendor.index.request;
  common_vendor.index.request = async (options) => {
    var _a, _b;
    const { url, method = "GET", data, success, fail, complete } = options;
    const urlPath = url.replace(/^https?:\/\/[^\/]+/, "");
    const mockRoute = mockRoutes[urlPath];
    common_vendor.index.__f__("log", "at mock/index.js:73", `[Mock] 请求检查:`, {
      originalUrl: url,
      urlPath,
      method,
      hasMockRoute: !!mockRoute,
      mockRoute
    });
    if (mockRoute && mockRoute.method === method) {
      if (config.showLog) {
        common_vendor.index.__f__("log", "at mock/index.js:83", `[Mock] ${method} ${url}`, data);
      }
      try {
        await delay(config.delay);
        let mockData;
        if (method === "GET") {
          const token = ((_a = options.header) == null ? void 0 : _a.Authorization) || ((_b = options.header) == null ? void 0 : _b.authorization);
          mockData = mockRoute.handler(token);
        } else {
          mockData = mockRoute.handler(data);
        }
        const response = {
          statusCode: 200,
          header: { "Content-Type": "application/json" },
          data: {
            code: mockData.success ? 0 : 1,
            message: mockData.message || (mockData.success ? "ok" : "error"),
            data: mockData.data || null
          }
        };
        if (config.showLog) {
          common_vendor.index.__f__("log", "at mock/index.js:112", `[Mock] Response:`, response);
        }
        if (success) {
          success(response);
        }
        if (complete) {
          complete(response);
        }
        return response;
      } catch (error) {
        const errorResponse = {
          statusCode: 500,
          header: { "Content-Type": "application/json" },
          data: {
            code: 1,
            message: "Mock 服务错误",
            data: null
          }
        };
        if (fail) {
          fail(errorResponse);
        }
        if (complete) {
          complete(errorResponse);
        }
        return errorResponse;
      }
    } else {
      return originalRequest(options);
    }
  };
  common_vendor.index.__f__("log", "at mock/index.js:153", "[Mock] 服务已启动");
};
const stopMock = () => {
  if (config.enabled) {
    common_vendor.index.__f__("log", "at mock/index.js:160", "[Mock] 服务已停止");
  }
};
const toggleMock = () => {
  config.enabled = !config.enabled;
  common_vendor.index.__f__("log", "at mock/index.js:167", `[Mock] 服务已${config.enabled ? "启动" : "停止"}`);
};
const setMockDelay = (delay2) => {
  config.delay = delay2;
  common_vendor.index.__f__("log", "at mock/index.js:173", `[Mock] 延迟设置为 ${delay2}ms`);
};
exports.config = config;
exports.setMockDelay = setMockDelay;
exports.setupMock = setupMock;
exports.stopMock = stopMock;
exports.toggleMock = toggleMock;
//# sourceMappingURL=../../.sourcemap/mp-weixin/mock/index.js.map

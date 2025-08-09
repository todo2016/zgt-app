# Mock 服务使用说明

## 概述

Mock 服务是一个用于开发阶段的 API 模拟服务，它可以在没有后端服务的情况下，为前端提供完整的 API 响应数据。

## 特性

- 🚀 **自动启动**: 在开发环境下自动启动
- 🔧 **可配置**: 支持延迟时间、日志开关等配置
- 📱 **跨平台**: 支持 H5、小程序等平台
- 🎯 **智能拦截**: 自动拦截匹配的 API 请求
- 📊 **实时控制**: 提供运行时控制面板

## 目录结构

```
mock/
├── index.js          # Mock 服务主入口
├── config.js         # 配置文件
├── control.js        # 控制面板
├── user.js           # 用户相关 Mock 数据
└── README.md         # 使用说明
```

## 快速开始

### 1. 自动启动

Mock 服务会在开发环境下自动启动，无需手动配置。

### 2. 手动控制

在浏览器控制台中，你可以使用以下命令控制 Mock 服务：

```javascript
// 查看 Mock 服务状态
$mock.getStatus()

// 切换 Mock 服务开关
$mock.toggle()

// 设置请求延迟时间（毫秒）
$mock.setDelay(500)

// 查看 Mock 日志
$mock.getLogs()

// 清空日志
$mock.clearLogs()

// 显示帮助信息
$mock.help()
```

## 配置说明

### 环境配置

Mock 服务根据环境自动配置：

- **development**: 启用 Mock，延迟 300ms，显示日志
- **test**: 启用 Mock，延迟 100ms，不显示日志
- **production**: 禁用 Mock

### 自定义配置

你可以修改 `mock/config.js` 文件来自定义配置：

```javascript
export const mockConfig = {
  enabled: true,           // 是否启用
  delay: 300,              // 延迟时间
  showLog: true,           // 是否显示日志
  simulateError: false,    // 是否模拟错误
  errorRate: 0.1           // 错误概率
}
```

## API 路由配置

### 用户相关 API

- `POST /api/user/login` - 用户登录
- `POST /api/user/register` - 用户注册
- `GET /api/user/info` - 获取用户信息
- `POST /api/user/logout` - 用户登出

### 订单相关 API

- `GET /api/order/list` - 获取订单列表
- `GET /api/order/detail` - 获取订单详情
- `POST /api/order/create` - 创建订单
- `PUT /api/order/update` - 更新订单
- `DELETE /api/order/delete` - 删除订单

### 商品相关 API

- `GET /api/product/list` - 获取商品列表
- `GET /api/product/detail` - 获取商品详情
- `POST /api/product/create` - 创建商品
- `PUT /api/product/update` - 更新商品
- `DELETE /api/product/delete` - 删除商品

## 添加新的 Mock 数据

### 1. 创建数据文件

在 `mock/` 目录下创建新的数据文件，例如 `order.js`：

```javascript
// mock/order.js
export const mockOrderData = {
  orders: [
    {
      id: 1,
      orderNo: 'ORD001',
      status: 'pending',
      total: 99.99,
      createTime: '2024-01-01 10:00:00'
    }
  ]
}

export const mockGetOrders = () => {
  return {
    success: true,
    data: mockOrderData.orders
  }
}
```

### 2. 在 index.js 中添加路由

```javascript
// mock/index.js
import { mockGetOrders } from './order'

const mockRoutes = {
  // ... 现有路由
  '/api/order/list': {
    method: 'GET',
    handler: () => mockGetOrders()
  }
}
```

## 调试技巧

### 1. 查看 Mock 日志

在控制台中查看 Mock 请求和响应：

```javascript
$mock.getLogs()
```

### 2. 调整延迟时间

模拟不同的网络环境：

```javascript
// 快速响应
$mock.setDelay(0)

// 慢速网络
$mock.setDelay(2000)
```

### 3. 临时禁用 Mock

```javascript
$mock.toggle()  // 关闭
$mock.toggle()  // 重新开启
```

## 注意事项

1. **仅开发环境**: Mock 服务只在开发环境下启用
2. **请求拦截**: 会拦截匹配的 API 请求，其他请求正常发送
3. **数据持久性**: Mock 数据不会持久化，每次刷新页面会重置
4. **性能影响**: 在生产环境中会自动禁用，不会影响性能

## 故障排除

### Mock 服务未启动

检查以下几点：

1. 确认环境变量 `NODE_ENV` 为 `development`
2. 检查控制台是否有错误信息
3. 确认 `mock/control.js` 已正确导入

### API 请求未被 Mock

检查以下几点：

1. 确认 API 路径和请求方法匹配
2. 检查 `mockRoutes` 配置是否正确
3. 查看控制台 Mock 日志

### 控制面板不可用

检查以下几点：

1. 确认在 H5 环境下运行
2. 等待页面完全加载后再使用
3. 检查控制台是否有错误信息

## 更多信息

- 查看 `mock/index.js` 了解 Mock 服务实现
- 查看 `mock/config.js` 了解配置选项
- 查看 `mock/control.js` 了解控制面板功能

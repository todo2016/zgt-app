# 微信登录功能使用说明

## 功能概述

本项目已集成微信登录功能，支持微信小程序和H5环境下的微信登录。

## 功能特性

- ✅ 微信小程序登录
- ✅ H5微信内置浏览器登录
- ✅ 自动环境检测
- ✅ Mock数据支持
- ✅ 统一的用户状态管理
- ✅ 自动登录状态检查

## 配置说明

### 1. 微信小程序配置

在 `config/wechat.js` 文件中配置您的微信小程序信息：

```javascript
miniProgram: {
  appId: 'your_mini_program_appid',        // 小程序AppID
  appSecret: 'your_mini_program_secret',   // 小程序AppSecret
  version: '1.0.0'                         // 小程序版本
}
```

**获取方式：**
1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 选择您的小程序
3. 在"开发"→"开发管理"→"开发设置"中获取AppID和AppSecret

### 2. 微信开放平台配置（H5登录）

```javascript
openPlatform: {
  appId: 'your_open_platform_appid',       // 开放平台AppID
  appSecret: 'your_open_platform_secret',  // 开放平台AppSecret
  redirectUri: 'https://your-domain.com/auth/wechat/callback'  // 授权回调地址
}
```

**获取方式：**
1. 登录 [微信开放平台](https://open.weixin.qq.com/)
2. 创建网站应用
3. 获取AppID和AppSecret
4. 配置授权回调域名

## 使用方法

### 1. 在页面中使用微信登录

```vue
<template>
  <button @click="handleWechatLogin" v-if="isWechat">
    微信登录
  </button>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { isWechatEnv } from '@/utils/wechat'

const userStore = useUserStore()
const isWechat = ref(isWechatEnv())

const handleWechatLogin = async () => {
  try {
    await userStore.wechatLogin()
    uni.showToast({ title: '登录成功', icon: 'success' })
    // 跳转到首页
    uni.reLaunch({ url: '/pages/index/index' })
  } catch (error) {
    uni.showToast({ title: error.message, icon: 'none' })
  }
}
</script>
```

### 2. 检查微信登录状态

```javascript
import { checkWechatLoginStatus } from '@/utils/wechat'

const isWechatLoggedIn = checkWechatLoginStatus()
if (isWechatLoggedIn) {
  console.log('用户已通过微信登录')
}
```

### 3. 获取微信用户信息

```javascript
import { getWechatUserInfo } from '@/utils/wechat'

const getUserInfo = async () => {
  try {
    const userInfo = await getWechatUserInfo()
    console.log('微信用户信息:', userInfo)
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}
```

## API接口

### 微信登录接口

**接口地址：** `POST /api/user/wechat-login`

**请求参数：**
```json
{
  "code": "微信登录授权码"
}
```

**响应数据：**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "wechat_token_123456789",
    "userInfo": {
      "id": 3,
      "username": "wechat_user",
      "nickname": "微信用户",
      "role": "普通用户",
      "avatar": "/static/logo.png",
      "openid": "mock_openid_123456789",
      "unionid": "mock_unionid_123456789"
    }
  }
}
```

## Mock数据

开发环境下，系统会自动使用Mock数据，无需真实的后端服务。

**Mock用户数据：**
- 用户名：`wechat_user`
- 昵称：`微信用户`
- 角色：`普通用户`
- Token前缀：`wechat_token_`

## 注意事项

### 1. 权限配置

在微信小程序中，需要在 `manifest.json` 中配置相应权限：

```json
{
  "mp-weixin": {
    "permission": {
      "scope.userInfo": {
        "desc": "用于完善用户资料"
      }
    }
  }
}
```

### 2. 环境检测

系统会自动检测当前运行环境：
- 微信小程序：`#ifdef MP-WEIXIN`
- H5微信浏览器：通过User-Agent检测
- 其他环境：显示相应提示

### 3. 错误处理

常见的错误情况：
- 用户拒绝授权：提示用户重新授权
- 网络错误：提示检查网络连接
- 配置错误：检查微信配置是否正确

## 开发调试

### 1. 控制台日志

微信登录过程中会在控制台输出详细日志：
```
[微信登录] 开始登录
[微信登录] 获取授权码成功: code_123456
[微信登录] 调用登录API
[微信登录] 登录成功
```

### 2. Mock模式

开发环境下，所有微信登录请求都会被Mock服务拦截，不会发送到真实服务器。

### 3. 真机调试

在微信开发者工具中：
1. 使用"真机调试"功能
2. 在真实微信环境中测试登录流程
3. 检查网络请求和响应

## 常见问题

### Q: 微信登录按钮不显示？
A: 检查是否在微信环境中，以及 `isWechat` 和 `isMiniProgram` 的值。

### Q: 登录失败提示"当前环境不支持微信登录"？
A: 确认当前环境是否为微信小程序或H5微信浏览器。

### Q: Mock数据不生效？
A: 检查Mock服务是否启动，以及 `mock/config.js` 中的配置。

### Q: 真机调试时登录失败？
A: 检查微信小程序配置是否正确，以及网络连接是否正常。

## 更新日志

- v1.0.0: 初始版本，支持微信小程序登录
- v1.1.0: 添加H5微信登录支持
- v1.2.0: 集成Mock数据服务
- v1.3.0: 优化用户体验和错误处理

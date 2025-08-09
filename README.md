# ZGT应用

一个基于 uniapp + Vue3 + Pinia 的现代化管理应用。

## 技术栈

- **前端框架**: uniapp
- **Vue版本**: Vue3 (组合式API)
- **状态管理**: Pinia
- **样式**: SCSS + Flexbox
- **构建工具**: uni-app CLI

## 项目结构

```
zgt-app/
├── api/                    # API接口层
│   └── user.js            # 用户相关API
├── components/             # 公共组件
├── config/                 # 配置文件
│   └── index.js           # 环境配置
├── pages/                  # 页面文件
│   ├── login/             # 登录页面
│   │   └── login.vue
│   └── index/             # 首页
│       └── index.vue
├── stores/                 # 状态管理
│   └── user.js            # 用户状态
├── static/                 # 静态资源
├── utils/                  # 工具函数
│   ├── auth.js            # 鉴权管理
│   └── request.js         # HTTP请求封装
├── App.vue                 # 应用入口
├── main.js                 # 主入口文件
├── manifest.json           # 应用配置
├── pages.json             # 页面路由配置
├── uni.scss               # 全局样式
└── package.json           # 依赖配置
```

## 核心特性

### 1. 统一API管理
- 封装 `utils/request.js` 统一处理HTTP请求
- 支持请求/响应拦截器
- 自动token管理和错误处理
- 支持多种HTTP方法 (GET, POST, PUT, DELETE)

### 2. 鉴权系统
- 统一的token存储和管理
- 自动登录状态检查
- 登录过期自动跳转
- 支持记住密码功能

### 3. 状态管理
- 使用Pinia进行状态管理
- 用户信息、登录状态等统一管理
- 支持持久化存储

### 4. 路由管理
- 基于 `pages.json` 的路由配置
- 支持页面间跳转和参数传递
- 自动登录状态检查

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式
```bash
npm run dev
```

### 3. 构建生产版本
```bash
# H5版本
npm run build:h5

# 微信小程序版本
npm run build:mp-weixin
```

## 开发规范

### 代码风格
- 使用Vue3组合式API
- 组件命名使用PascalCase
- 文件命名使用kebab-case
- CSS使用scoped，优先使用flex布局

### 组件开发
- 组件尽量拆分，保证复用性
- 使用 `<script setup>` 语法
- 关键逻辑需要中文注释

### API开发
- 所有接口调用使用封装的request方法
- 请求前后要有loading提示
- 出错时使用 `uni.showToast` 提示

## 环境配置

项目支持多环境配置，在 `config/index.js` 中配置不同环境的API地址：

- **development**: 开发环境
- **test**: 测试环境  
- **production**: 生产环境

## 功能模块

### 已实现
- ✅ 用户登录/登出
- ✅ 首页数据展示
- ✅ 用户信息管理
- ✅ 基础路由系统

### 待开发
- 🔄 订单管理
- 🔄 用户管理
- 🔄 商品管理
- 🔄 数据统计
- 🔄 系统设置
- 🔄 日志查看

## 注意事项

1. 确保已安装HBuilderX或uni-app CLI
2. 首次运行需要配置后端API地址
3. 微信小程序开发需要配置AppID
4. 建议使用VSCode + uni-app插件进行开发

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

## 许可证

MIT License

## 联系方式

如有问题，请联系开发团队。

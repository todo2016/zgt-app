# 设计资源 (Design Assets)

## 🎨 设计资源库

本目录包含系统设计所需的各种资源文件，包括图标、配色方案、字体规范等。

### 📁 目录结构

```
assets/
├── icons/                    # 图标资源
│   ├── navigation/          # 导航图标
│   ├── actions/             # 操作图标
│   ├── status/              # 状态图标
│   └── categories/          # 分类图标
├── colors.png               # 配色方案图
├── typography.png           # 字体规范图
├── spacing.png              # 间距规范图
└── README.md                # 资源说明文档
```

## 🎯 图标系统

### 导航图标
- **首页**: `home.svg` - 房子图标，表示首页
- **收银台**: `pos.svg` - 收银机图标，表示收银功能
- **商品**: `products.svg` - 商品图标，表示商品管理
- **库存**: `inventory.svg` - 库存图标，表示库存管理
- **报表**: `reports.svg` - 图表图标，表示数据报表
- **设置**: `settings.svg` - 齿轮图标，表示系统设置

### 操作图标
- **添加**: `add.svg` - 加号图标，表示添加操作
- **编辑**: `edit.svg` - 编辑图标，表示编辑操作
- **删除**: `delete.svg` - 删除图标，表示删除操作
- **搜索**: `search.svg` - 搜索图标，表示搜索功能
- **筛选**: `filter.svg` - 筛选图标，表示筛选功能
- **导出**: `export.svg` - 导出图标，表示导出功能

### 状态图标
- **成功**: `success.svg` - 对勾图标，表示操作成功
- **警告**: `warning.svg` - 感叹号图标，表示警告信息
- **错误**: `error.svg` - 叉号图标，表示错误信息
- **信息**: `info.svg` - 信息图标，表示提示信息
- **加载**: `loading.svg` - 加载图标，表示加载状态

### 分类图标
- **白酒**: `baijiu.svg` - 白酒瓶图标
- **红酒**: `wine.svg` - 红酒瓶图标
- **啤酒**: `beer.svg` - 啤酒杯图标
- **洋酒**: `liquor.svg` - 洋酒瓶图标
- **其他**: `other.svg` - 通用商品图标

## 🎨 配色方案

### 主色调 (Primary)
```css
--primary-50: #eff6ff;   /* 最浅色，背景 */
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #667eea;  /* 主色，按钮 */
--primary-600: #5a67d8;  /* 深色，悬停 */
--primary-700: #4c51bf;
--primary-800: #3730a3;
--primary-900: #312e81;  /* 最深色，文字 */
```

### 辅助色 (Secondary)
```css
--secondary-50: #f8fafc;
--secondary-100: #f1f5f9;
--secondary-200: #e2e8f0;
--secondary-300: #cbd5e1;
--secondary-400: #94a3b8;
--secondary-500: #764ba2;  /* 辅助色 */
--secondary-600: #6b46c1;
--secondary-700: #5b21b6;
--secondary-800: #4c1d95;
--secondary-900: #2e1065;
```

### 功能色 (Functional)
```css
--success-500: #10b981;   /* 成功色 */
--warning-500: #f59e0b;   /* 警告色 */
--error-500: #ef4444;     /* 错误色 */
--info-500: #3b82f6;      /* 信息色 */
```

### 中性色 (Neutral)
```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;      /* 主要文字 */
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

## 📝 字体规范

### 字体族
```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 
               'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### 字体大小
```css
--text-xs: 12px;      /* 说明文字 */
--text-sm: 14px;      /* 正文小字 */
--text-base: 16px;    /* 正文 */
--text-lg: 18px;      /* 副标题 */
--text-xl: 20px;      /* 标题 */
--text-2xl: 24px;     /* 大标题 */
--text-3xl: 30px;     /* 超大标题 */
```

### 字体粗细
```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;   /* 常规 */
--font-medium: 500;   /* 中等 */
--font-semibold: 600; /* 半粗 */
--font-bold: 700;     /* 粗体 */
--font-extrabold: 800;
--font-black: 900;
```

### 行高
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;    /* 标准行高 */
--leading-relaxed: 1.625;
--leading-loose: 2;
```

## 📐 间距规范

### 基础间距单位
```css
--spacing-0: 0px;
--spacing-1: 4px;     /* 基础单位 */
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

### 组件间距
```css
--component-padding: 16px;      /* 组件内边距 */
--component-margin: 16px;       /* 组件外边距 */
--section-spacing: 24px;        /* 区块间距 */
--page-padding: 16px;           /* 页面边距 */
```

### 圆角规范
```css
--radius-none: 0px;
--radius-sm: 4px;      /* 小圆角 */
--radius-md: 8px;      /* 中圆角 */
--radius-lg: 12px;     /* 大圆角 */
--radius-xl: 16px;     /* 超大圆角 */
--radius-full: 9999px; /* 全圆角 */
```

## 🎨 设计工具

### 图标设计
- **矢量图标**: SVG格式，支持缩放
- **图标库**: FontAwesome, Material Icons
- **设计软件**: Figma, Sketch, Adobe Illustrator

### 配色工具
- **在线工具**: Coolors, Adobe Color
- **设计软件**: Figma, Sketch, Adobe Photoshop
- **代码工具**: CSS变量，设计令牌

### 字体工具
- **字体管理**: Google Fonts, Adobe Fonts
- **设计软件**: Figma, Sketch, Adobe XD
- **代码工具**: CSS字体栈，响应式字体

## 📱 使用规范

### 图标使用
- 保持视觉一致性
- 选择合适的尺寸
- 考虑不同分辨率
- 支持深色模式

### 颜色使用
- 遵循无障碍设计原则
- 保持足够的对比度
- 考虑色盲用户需求
- 支持主题切换

### 字体使用
- 确保可读性
- 保持层次结构
- 考虑多语言支持
- 优化移动端显示

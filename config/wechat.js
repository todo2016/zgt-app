// 微信配置文件
export const wechatConfig = {
  // 微信小程序配置
  miniProgram: {
    // 小程序AppID（需要在微信公众平台获取）
    appId: 'your_mini_program_appid',
    // 小程序AppSecret（需要在微信公众平台获取）
    appSecret: 'your_mini_program_secret',
    // 小程序版本
    version: '1.0.0'
  },
  
  // 微信开放平台配置（H5登录）
  openPlatform: {
    // 开放平台AppID
    appId: 'your_open_platform_appid',
    // 开放平台AppSecret
    appSecret: 'your_open_platform_secret',
    // 授权回调地址
    redirectUri: 'https://your-domain.com/auth/wechat/callback'
  },
  
  // 微信支付配置
  payment: {
    // 商户号
    mchId: 'your_merchant_id',
    // 支付密钥
    payKey: 'your_pay_key',
    // 支付回调地址
    notifyUrl: 'https://your-domain.com/payment/wechat/notify'
  },
  
  // 微信分享配置
  share: {
    // 默认分享标题
    defaultTitle: 'ZGT应用',
    // 默认分享描述
    defaultDesc: '智能管理，高效运营',
    // 默认分享图片
    defaultImage: '/static/logo.png',
    // 默认分享链接
    defaultLink: '/pages/index/index'
  },
  
  // 微信登录配置
  login: {
    // 登录超时时间（毫秒）
    timeout: 10000,
    // 是否自动获取用户信息
    autoGetUserInfo: false,
    // 用户信息授权描述
    userInfoDesc: '用于完善用户资料',
    // 是否支持静默登录
    silentLogin: true
  }
}

// 获取当前环境的微信配置
export const getWechatConfig = () => {
  // #ifdef MP-WEIXIN
  return {
    ...wechatConfig,
    currentEnv: 'miniProgram'
  }
  // #endif
  
  // #ifdef H5
  return {
    ...wechatConfig,
    currentEnv: 'h5'
  }
  // #endif
  
  return {
    ...wechatConfig,
    currentEnv: 'unknown'
  }
}

// 检查微信环境
export const checkWechatEnvironment = () => {
  const config = getWechatConfig()
  
  // #ifdef MP-WEIXIN
  if (!config.miniProgram.appId || config.miniProgram.appId === 'your_mini_program_appid') {
    console.warn('请配置微信小程序AppID')
    return false
  }
  return true
  // #endif
  
  // #ifdef H5
  if (!config.openPlatform.appId || config.openPlatform.appId === 'your_open_platform_appid') {
    console.warn('请配置微信开放平台AppID')
    return false
  }
  return true
  // #endif
  
  return false
}

// 导出默认配置
export default wechatConfig

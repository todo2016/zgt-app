import App from './App'
import { createPinia } from 'pinia'
import { setupMock } from './mock'
import './mock/control'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // 集成pinia
  const pinia = createPinia()
  app.use(pinia)
  
  // 启动 Mock 服务（仅在开发环境）
  console.log('当前环境:', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    setupMock()
  }
  
  return {
    app
  }
}
// #endif
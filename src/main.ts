import { createApp } from 'vue'
import App from './App.vue'

// 初始化css
import 'normalize.css'
import '@/assets/css/index.css'

// 导入路由
import router from './router'
// 导入状态管理
import pinia from './store'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

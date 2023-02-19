import { createPinia } from 'pinia'
// 数据持久化存储
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)
export default pinia

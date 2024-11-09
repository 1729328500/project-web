import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入element plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()

pinia.use(piniaPersist)

const app = createApp(App)

// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(pinia)
  .mount('#app')

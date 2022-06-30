import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import directives from './directives'

import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css' // dark theme change
import './permission' // router guard

const pinia = createPinia()
const app = createApp(App)

// register element plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// register directive
for (const [key, directive] of Object.entries(directives)) {
  app.directive(key, directive)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(i18n)

app.mount('#app')

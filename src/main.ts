import 'normalize.css'
import './styles/var.scss' // 默认主题
import './styles/dark/css-vars.scss' // 暗黑主题
import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

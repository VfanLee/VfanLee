import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import pinia from './stores'
import router from './router'

import 'normalize.css'
// 默认主题
import './styles/var.scss'
// 暗黑主题
import './styles/dark/css-vars.scss'
import './styles/index.scss'

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

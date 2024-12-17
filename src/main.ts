import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import pinia from './stores'
import router from './router'

import 'normalize.css'
import './styles/index.scss'

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

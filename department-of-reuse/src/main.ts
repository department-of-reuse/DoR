import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './tools/router'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'


import { createApp } from 'vue'

import router from "@/router";
import store from "@/store";

import App from './App.vue'

const app = createApp(App)
app.use(router).use(store).use(ElementPlus).mount('#app')

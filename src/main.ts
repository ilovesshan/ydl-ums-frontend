import { createApp } from "vue"

import ElementPlus from "element-plus"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import "element-plus/dist/index.css"
import "normalize.css/normalize.css"
import "@/assets/css/common.css"

import router from "@/router";
import store from "@/store";

import App from "./App.vue"


import directives from "@/directive";

const app = createApp(App)

// 注册自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key])
});

app.use(ElementPlus, { locale: zhCn })
app.use(router).use(store).mount("#app")

import { createApp } from "vue"

import ElementPlus from "element-plus"
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

app.use(router).use(store).use(ElementPlus).mount("#app")

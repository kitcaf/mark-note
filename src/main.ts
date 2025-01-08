import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from './router'

import 'virtual:uno.css'
import "@/style/globals.css"
import 'uno.css'


const app = createApp(App)

app.use(router).use(createPinia()).mount("#app");

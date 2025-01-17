import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from './router'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
// import "@/assets/index.css"
import "@/assets/globals.css"


const app = createApp(App)
const pinia = createPinia();
app.use(router).use(pinia);

app.mount("#app");

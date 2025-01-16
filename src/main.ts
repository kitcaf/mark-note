import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from './router'
// import { useSettings } from './composables/useSettings';

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import "@/assets/globals.css"
import "@/assets/index.css"


const app = createApp(App)
const pinia = createPinia();
app.use(router).use(pinia);

app.mount("#app");

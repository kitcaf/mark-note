import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from './router'
import { useSettings } from './composables/useSettings';

import 'virtual:uno.css'
import "@/style/globals.css"
import 'uno.css'


const app = createApp(App)
const pinia = createPinia();
app.use(router).use(pinia);

// 初始化设置
const { loadSettings } = useSettings();
await loadSettings();

app.mount("#app");

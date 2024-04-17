import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { unstyled: true })
app.mount("#app")

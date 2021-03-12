import { createApp } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'
import './registerServiceWorker'
import './main.css'

createApp(RouterView)
  .use(router)
  .mount('#app')

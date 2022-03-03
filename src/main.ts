import { createApp } from 'vue'
import naive from 'naive-ui'
import router from '@/router/index'
import App from '@/App.vue'

createApp(App).use(router).use(naive).mount('#app')
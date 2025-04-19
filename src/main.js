import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)   // 只创建一个 app 实例
app.use(ElementPlus)         // 在这个实例上挂载插件
app.mount('#app')            // 最后挂载
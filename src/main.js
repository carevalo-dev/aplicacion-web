import { createApp } from 'vue'
import './style.css'
//importar la libreria de element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//fin de la importacion de la libreria
import router from '@/router'
import App from './App.vue'

//importamos iconos del elemento plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(router)
app.mount('#app')

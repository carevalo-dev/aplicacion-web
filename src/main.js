import { createApp } from 'vue'
import './style.css'
//importar la libreria de element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//importamos vue-router
import router from '@/router'
//importamos el componente principal
import App from './App.vue'
//importar firebase
import FirebaseApp from '@/firebase'

//importamos iconos del elemento plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

//configuramos los iconos
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(router)
app.mount('#app')

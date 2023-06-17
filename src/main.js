import { createApp } from 'vue'
import './style.css'
//importar la libreria de element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//fin de la importacion de la libreria
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')

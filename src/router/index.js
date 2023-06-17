//importamos vue-router
import { createRouter, createWebHistory } from 'vue-router'
//importamos los componentes de las vistas
import Home from '@/views/Home.vue'

//creamos las rutas
const routes = [
    {path: '/', name: 'Home', component: Home},
]

//creamos el router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

//exportamos el router
export default router
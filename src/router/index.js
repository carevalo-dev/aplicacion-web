//importamos vue-router
import { createRouter, createWebHistory } from 'vue-router'
//importamos los componentes de las vistas
import Inicio from '@/views/Inicio.vue'
import Registro from '@/views/Registro.vue'
import IniciarSesion from '@/views/IniciarSesion.vue'
import Dashboard from '@/views/Dashboard.vue'

//creamos las rutas
const routes = [
    {path: '/', name: 'Inicio', component: Inicio},
    {path: '/registro', name: 'Registro', component: Registro},
    {path: '/iniciar-sesion', name: 'IniciarSesion', component : IniciarSesion},
    {path: '/dashboard', name: 'Dashboard', component : Dashboard},
]

//creamos el router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

//exportamos el router
export default router
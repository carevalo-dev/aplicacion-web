<script setup>

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ElLoading, ElMessage } from 'element-plus';

const labelPosition = 'top';
const rutas = useRouter()

const formIniciarSesion = reactive({
    correo: '',
    contrasena: '',
})

const reglasFormRef = ref(null)
const reglasIniciarSesion = reactive({
    correo: [
        {required: true, message: 'Por favor ingresa tu correo electrónico', trigger: 'blur'},
        {type: 'email', message: 'Por favor ingresa un correo electrónico válido', trigger: 'blur'}
    ],
    contrasena: [
        {required: true, message: 'Por favor ingresa tu contraseña', trigger: 'blur'},
        {min: 8, message: 'La contraseña debe tener al menos 8 caracteres', trigger: 'blur'}
    ]
})

const iniciarSesion = async () => {
    const formEL = reglasFormRef.value
    if(!formEL) return
    await formEL.validate(async(valid,fields) => {
        if (valid) {
            const loading = ElLoading.service({fullscreen: true})
            signInWithEmailAndPassword(auth, formIniciarSesion.correo, formIniciarSesion.contrasena)
            .then((userCredential) => { 
            loading.close()
            const user = userCredential.user
            rutas.push('/dashboard')
            })
            .catch((error) => {
                loading.close()
                const errorCode = error.code
                const errorMessage = error.message
                ElMessage.error('error: ' + errorMessage)
            })
        } else {
            return false
        }
    })
}

</script>
<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="@/assets/cube-icon.svg" alt="logo vue" class="mx-auto h-20 w-auto">
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Iniciar Sesión</h2>
            <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-xs">
                <el-form
                :model="formIniciarSesion"
                :label-position="labelPosition"
                :rules="reglasIniciarSesion"
                ref="reglasFormRef"
                hide-required-asterisk
                class="space-y-6"
                >
                    <el-form-item label="Correo electrónico" prop="correo">
                        <el-input type="email" v-model="formIniciarSesion.correo" clearable required></el-input>
                    </el-form-item>

                    <el-form-item label="Contraseña" prop="contrasena" required>
                        <el-input type="password" v-model="formIniciarSesion.contrasena" show-password></el-input>
                    </el-form-item>
                    
                    <el-button type="primary" class="w-full" @click="iniciarSesion">Iniciar Sesión</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import {auth, db} from '@/firebase'
import {doc, setDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth'

const labelPosition = 'top';
const mostrarContrasena = ref(false)

const formRegistro = reactive({
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
})

const reglasFormulario = ref(null)

const reglasRegistro = reactive(
    {
        nombres: [
            { required: true, message: 'Por favor ingrese su nombre', trigger: 'blur'}
        ],
        apellidos: [
            { required: true, message: 'Por favor ingrese sus apellidos', trigger: 'blur'}
        ],
        correo: [
            { required: true, message: 'Por favor ingrese su correo electrónico', trigger: 'blur'},
            { type: 'email', message: 'Por favor ingrese un correo electrónico válido', trigger: 'blur'}
        ],
        contrasena: [
            { required: true, message: 'Por favor ingrese su contraseña', trigger: 'blur'},
            { min: 8, message: 'La contraseña debe tener al menos 8 caracteres', trigger: 'blur'}
        ],
        confirmarContrasena: [
            { required: true, message: 'Por favor confirme su contraseña', trigger: 'blur'},
            { min: 8, message: 'La contraseña debe tener al menos 8 caracteres', trigger: 'blur'},
            {
                validator: (rule, value) => {
                    if (value === ""){
                        return new Error('Por favor confirme su contraseña')
                    } else if (value !== formRegistro.contrasena){
                        return new Error('Las contraseñas no coinciden')
                    } else {
                        return true
                    }
                }, trigger: 'blur'
            }
        ]

    }
)

const enviarFormulario = async () => {
    const formulario = reglasFormulario.value
    if(!formulario) return
    await formulario.validate(async(valid) => {
        if (valid) {
            try {
                const usuario = await createUserWithEmailAndPassword(auth, formRegistro.correo, formRegistro.contrasena)

                const docRef = doc(db, 'usuarios', usuario.user.uid)

                await setDoc(docRef, {
                    uid: usuario.user.uid,
                    nombres: formRegistro.nombres,
                    apellidos: formRegistro.apellidos,
                    correo: formRegistro.correo,
                })

                console.log('Usuario registrado')
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('error submit!!');
            return false;
        }
    })
}


</script>
<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="@/assets/vue.svg" alt="logo vue" class="mx-auto h-12 w-auto">
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrar usuario</h2>
            <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <el-form 
                :model="formRegistro"
                :label-position="labelPosition"
                :rules="reglasRegistro"
                ref="reglasFormulario"
                class="space-y-6"
                >
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Nombres" prop="nombres">
                                <el-input v-model="formRegistro.nombres" placeholder="Nombres" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Apellidos" prop="apellidos">
                                <el-input v-model="formRegistro.apellidos" placeholder="Apellidos" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Correo electrónico" prop="correo">
                        <el-input v-model="formRegistro.correo" type="email" required clearable placeholder="Correo electrónico"></el-input>
                    </el-form-item>

                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Contraseña" prop="contrasena">
                                <el-input v-model="formRegistro.contrasena" :type="mostrarContrasena ? 'text' : 'password'" placeholder="Contraseña" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Confirmar contraseña" prop="confirmarContrasena">
                                <el-input v-model="formRegistro.confirmarContrasena" :type="mostrarContrasena ? 'text' : 'password'" placeholder="Confirmar contraseña" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-checkbox v-model="mostrarContrasena">Mostrar contraseña</el-checkbox>
                    </el-form-item>

                    <el-button @click="enviarFormulario"  type="primary" class="w-full">
                        Registrar
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';

const labelPosition = 'top';

const formRegistro = reactive({
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
})
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
                >
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Nombres">
                                <el-input v-model="formRegistro.nombres" placeholder="Nombres" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Apellidos">
                                <el-input v-model="formRegistro.apellidos" placeholder="Apellidos" required clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
        </div>
    </div>
</template>
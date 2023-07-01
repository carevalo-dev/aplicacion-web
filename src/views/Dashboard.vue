<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const rutas = useRouter()
const usuarioDatos = ref(null)

//validamos que el usuario este logeado para ingresar al dashboard
onMounted(async () => {
    const auth = getAuth()
    const user = auth.currentUser
    const db = getFirestore()

    if(user){
        const docRef = doc(db, 'usuarios', user.uid)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            usuarioDatos.value = docSnap.data()
        } else {
            console.log('no existe')
        }
    } else {
        console.log('no hay usuario')
    }
})
</script>
<template>
    <h1>Dashboard</h1>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

const router = useRouter()

const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const snackbar = ref(false)
const snackbarMessage = ref('')

const register = async () => {
  if (password.value != confirmPassword.value) {
    console.error('La contraseña no coincide')
    snackbarMessage.value = 'La contraseña no coincide'
    snackbar.value = true
    password.value = ''
    confirmPassword.value = ''
    return
  }

  await userStore.register(username.value, email.value, password.value)
  if (userStore.token) {
    console.log('Sesión iniciada con éxito')
    router.push('/')
  } else {
    console.error('Error al intentar registrarse')
    snackbarMessage.value = 'Error al intentar registrarse, es posible que este usuario ya exista.'
    snackbar.value = true
    password.value = ''
    confirmPassword.value = ''
  }
}
</script>

<template>
  <v-container class="register-container">
    <v-card class="register-card">
      <v-card-title class="text-center">Crear cuenta</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="username" label="Nombre de usuario" outlined></v-text-field>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            outlined
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Crear cuenta</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
  <v-snackbar v-model="snackbar" :timeout="5000" bottom right>
    {{ snackbarMessage }}
    <v-btn color="red" @click="snackbar = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.register-card {
  width: 500px; /* Ajusta el ancho según tus preferencias */
}

/* Puedes personalizar los estilos según tus preferencias */
</style>

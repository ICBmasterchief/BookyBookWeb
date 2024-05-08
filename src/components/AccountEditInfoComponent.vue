<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits(['saveNewUserInfo', 'cancelEdit'])

const editUserInfo = reactive({
  newName: '',
  newPassword: '',
  confirmPassword: ''
})

const snackbar = ref(false)
const snackbarMessage = ref('')

const rules = [
  (v: string) => !!v || 'El campo es requerido',
  (v: string) => (v && v.length <= 100) || 'El campo debe tener menos de 100 caracteres'
]

const saveNewUserInfo = () => {
  if (
    editUserInfo.newName == '' &&
    editUserInfo.newPassword == '' &&
    editUserInfo.confirmPassword == ''
  ) {
    snackbarMessage.value = 'Los campos están vacíos.'
    snackbar.value = true
    return
  } else if (editUserInfo.newPassword !== editUserInfo.confirmPassword) {
    snackbarMessage.value = 'Las contraseñas no coinciden.'
    snackbar.value = true
    return
  }
  emit('saveNewUserInfo', editUserInfo.newName, editUserInfo.newPassword)
  editUserInfo.newName = ''
  editUserInfo.newPassword = ''
  editUserInfo.confirmPassword = ''
}

const cancelEdit = () => {
  emit('cancelEdit')
  editUserInfo.newName = ''
  editUserInfo.newPassword = ''
  editUserInfo.confirmPassword = ''
}
</script>

<template>
  <v-card>
    <v-card-title>Editar Información del Usuario</v-card-title>
    <v-card-text>
      <v-form ref="editForm">
        <v-text-field
          v-model="editUserInfo.newName"
          :rules="rules"
          label="Nuevo Nombre"
          required
        ></v-text-field>
        <v-text-field
          v-model="editUserInfo.newPassword"
          :rules="rules"
          label="Nueva Contraseña"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="editUserInfo.confirmPassword"
          :rules="rules"
          label="Confirmar Nueva Contraseña"
          type="password"
          required
        ></v-text-field>
        <v-btn @click="saveNewUserInfo">Guardar</v-btn>
        <v-btn color="error" class="ma-2" @click="cancelEdit">Cancelar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>

  <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom right>
    {{ snackbarMessage }}
    <v-btn color="red" @click="snackbar = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import AccountEditInfoComponent from '@/components/AccountEditInfoComponent.vue'

const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(async () => {
  authStore.restoreSession
  await userStore.fetchUser(authStore.userIdLoged)
})

const user = computed(() => userStore.user)
const showEditSection = ref(false)
const showDialog = ref(false)

const snackbar = ref(false)
const snackbarMessage = ref('')

const saveNewUserInfo = (newName: string, newPassword: string) => {
  userStore.fetchUpdateUser(authStore.userIdLoged, newName, newPassword)
  showEditSection.value = false
}

const cancelEdit = () => {
  showEditSection.value = false
}

const logout = () => {
  authStore.logout()
}

const confirmDeleteUser = async () => {
  const success = await userStore.fetchDeleteUser(authStore.userIdLoged)
  if (success) {
    authStore.logout()
  } else {
    snackbarMessage.value = 'Error al intentar eliminar el usuario.'
    snackbar.value = true
  }
}

const payPenaltyFee = async () => {
  const success = await userStore.fetchPayPenaltyFee(authStore.userIdLoged)
  if (!success) {
    snackbarMessage.value = 'Error al intentar pagar la multa.'
    snackbar.value = true
  }
}
</script>

<template>
  <v-card>
    <v-card-title>Información del Usuario</v-card-title>
    <v-card-text>
      <div><strong>Nombre:</strong> {{ user.userName }}</div>
      <div><strong>Email:</strong> {{ user.email }}</div>
      <div><strong>Fecha de Registro:</strong> {{ user.registrationDate }}</div>
      <div><strong>Multa:</strong> {{ user.penaltyFee }} €</div>
      <div class="buttons">
        <div>
          <v-btn @click="showEditSection = true" color="green">Editar</v-btn>
        </div>
        <div class="btn-pay">
          <v-btn @click="payPenaltyFee" color="#CCCCCC">Pagar multa</v-btn>
        </div>
        <div class="btn-logout">
          <v-btn @click="logout" color="#9C5858">Cerrar sesión</v-btn>
        </div>
      </div>
      <div class="btn-delete">
        <v-btn @click="showDialog = true" color="#C00000">Eliminar cuenta</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <AccountEditInfoComponent
    v-if="showEditSection"
    @saveNewUserInfo="saveNewUserInfo"
    @cancelEdit="cancelEdit"
  />

  <v-dialog v-model="showDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
      <v-card-text
        >¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede
        deshacer.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="showDialog = false">Cancelar</v-btn>
        <v-btn color="red darken-1" @click="confirmDeleteUser">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom right>
    {{ snackbarMessage }}
    <v-btn color="red" @click="snackbar = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<style scoped>
.buttons {
  display: flex;
}

.btn-logout {
  padding-left: 15px;
}

.btn-delete {
  float: right;
  padding-bottom: 15px;
}

.btn-pay {
  padding-left: 15px;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import AccountEditInfoComponent from '@/components/AccountEditInfoComponent.vue'

const authStore = useAuthStore()
const userStore = useUserStore()

userStore.fetchUser(authStore.userIdLoged)

const user = computed(() => userStore.user)
const showEditSection = ref(false)

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
</script>

<template>
  <!-- Sección de Información del Usuario -->
  <v-card>
    <v-card-title>Información del Usuario</v-card-title>
    <v-card-text>
      <div><strong>Nombre:</strong> {{ user.userName }}</div>
      <div><strong>Email:</strong> {{ user.email }}</div>
      <div><strong>Fecha de Registro:</strong> {{ user.registrationDate }}</div>
      <div><strong>Multa:</strong> {{ user.penaltyFee }}</div>
      <div class="buttons">
        <div>
          <v-btn @click="showEditSection = true" color="green">Editar</v-btn>
        </div>
        <div class="btn-logout">
          <v-btn class="btn-logout" @click="logout" color="grey">Cerrar sesión</v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <AccountEditInfoComponent
    v-if="showEditSection"
    @saveNewUserInfo="saveNewUserInfo"
    @cancelEdit="cancelEdit"
  />
</template>

<style scoped>
.buttons {
  display: flex;
}
.btn-logout {
  padding-left: 15px;
}
</style>

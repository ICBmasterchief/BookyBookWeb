<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import UserRowComponent from '@/components/UserRowComponent.vue'

const store = useUserStore()
store.fetchUsers()
const users = store.users
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-2">Lista de Usuarios</h1>
        <v-card>
          <v-card-text>
            <v-list>
              <user-row-component v-for="user in users" :key="user.id" :user="user" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.display-2 {
  font-size: 2rem;
}
</style>

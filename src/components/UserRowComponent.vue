<script setup lang="ts">
import type { User } from '@/core/types'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <v-list-item>
    <v-list-item-content class="book-content">
      <v-list-item-title class="headline"
        ><strong>Nombre: </strong>{{ props.user.userName }}</v-list-item-title
      >
      <v-list-item-subtitle class="subtitle-1"
        ><strong>Email: </strong>{{ props.user.email }}</v-list-item-subtitle
      >
      <v-list-item-subtitle class="subtitle-1"
        ><strong>Fecha de registro: </strong>{{ props.user.registrationDate }}</v-list-item-subtitle
      >
      <v-list-item-subtitle class="subtitle-1"
        ><strong>Multa: </strong>{{ props.user.penaltyFee }} €</v-list-item-subtitle
      >
      <v-list-item-subtitle class="subtitle-1"
        ><strong>Rol: </strong>{{ props.user.role }}</v-list-item-subtitle
      >
    </v-list-item-content>
    <v-divider></v-divider>
  </v-list-item>
</template>

<style scoped>
.headline {
  font-size: 1.2rem;
}

.subtitle-1 {
  font-size: 1rem;
  opacity: 0.8;
}

.book-content {
  float: left;
  width: 50%;
  padding: 10px;
}

@media (max-width: 1280px) {
  .headline {
    font-size: 0.75rem;
  }

  .subtitle-1 {
    font-size: 0.5rem;
  }
}
</style>

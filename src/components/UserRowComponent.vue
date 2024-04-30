<script setup lang="ts">
import { defineProps } from 'vue'
import { User } from '@/assets/types'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <v-list-item>
    <v-list-item-content class="book-content">
      <v-list-item-title class="headline">{{ props.user.name }}</v-list-item-title>
      <v-list-item-subtitle class="subtitle-1">{{ props.user.email }}</v-list-item-subtitle>
      <v-list-item-subtitle class="subtitle-1">{{
        props.user.registrationDate
      }}</v-list-item-subtitle>
      <v-list-item-subtitle class="subtitle-1">{{ props.user.penaltyFee }}</v-list-item-subtitle>
      <v-list-item-subtitle class="subtitle-1">{{ props.user.role }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-divider></v-divider>
  </v-list-item>
</template>

<style scoped>
.headline {
  font-size: 1.5rem;
}

.subtitle-1 {
  font-size: 1rem;
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

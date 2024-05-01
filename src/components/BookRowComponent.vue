<script setup lang="ts">
import type { Book } from '@/core/types'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits(['bookSelected', 'requestBorrowing'])

const emitDetails = (book: Book) => {
  emit('bookSelected', book)
}

const requestBorrowing = (book: Book) => {
  emit('requestBorrowing', book)
}
</script>

<template>
  <v-list-item>
    <v-list-item-content class="book-content">
      <v-list-item-title class="headline">{{ props.book.title }}</v-list-item-title>
      <v-list-item-subtitle class="subtitle-1">{{ props.book.author }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="book-content">
      <v-btn @click="emitDetails(book)" class="btn"> Ver detalles </v-btn>
      <v-btn v-if="authStore.isAuthenticated" @click="requestBorrowing(props.book)" class="loan-btn"
        >Solicitar préstamo</v-btn
      >
    </v-list-item-action>
    <v-divider></v-divider>
  </v-list-item>
</template>

<style scoped>
.headline {
  font-size: 1rem;
}

.subtitle-1 {
  font-size: 0.75rem;
}

.book-content {
  float: left;
  width: 50%;
  padding: 10px;
}

.btn {
  margin: 0px;
  left: -20%;
  font-size: 0.6rem;
}

.loan-btn {
  margin: 0px;
  font-size: 0.6rem;
}

@media (max-width: 1280px) {
  .headline {
    font-size: 0.75rem;
  }

  .subtitle-1 {
    font-size: 0.5rem;
  }
}

@media (max-width: 880px) {
  .btn {
    margin: 0px;
    left: -20%;
    font-size: 0.4rem;
  }

  .loan-btn {
    margin: 0px;
    font-size: 0.4rem;
  }
}
</style>

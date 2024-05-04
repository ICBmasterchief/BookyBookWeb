<script setup lang="ts">
import type { Book } from '@/core/types'

const props = defineProps<{
  book: Book
}>()
</script>

<template>
  <v-card>
    <v-card-title>Detalles del Libro</v-card-title>
    <v-card-text>
      <div><strong>Título:</strong> {{ props.book.title }}</div>
      <div><strong>Autor:</strong> {{ props.book.author }}</div>
      <div><strong>Género:</strong> {{ props.book.genre }}</div>
      <div><strong>Año:</strong> {{ props.book.year }}</div>
      <div><strong>Copias disponibles:</strong> {{ props.book.copies }}</div>
      <div><strong>Puntuación:</strong> {{ props.book.score }}</div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>

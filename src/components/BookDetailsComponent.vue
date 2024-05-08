<script setup lang="ts">
import type { Book } from '@/core/types'

defineProps<{ book: Book }>()
</script>

<template>
  <v-card v-if="book" class="details">
    <v-card-title class="headline">{{ book.title }}</v-card-title>
    <v-card-text class="subtitle-1">
      <p>Autor: {{ book.author }}</p>
      <p>Género: {{ book.genre }}</p>
      <p>Año: {{ book.year }}</p>
      <p>Puntuación: {{ book.score }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.headline {
  font-size: 1.5rem;
}

.subtitle-1 {
  font-size: 1rem;
}

.details {
  position: fixed;
  margin-top: 50px;
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

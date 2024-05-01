<script setup lang="ts">
import type { Book } from '@/core/types'

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits(['bookSelected'])

const emitDetails = (book: Book) => {
  emit('bookSelected', book)
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
    </v-list-item-action>
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

.btn {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

@media (max-width: 1280px) {
  .headline {
    font-size: 0.75rem;
  }

  .subtitle-1 {
    font-size: 0.5rem;
  }
  .btn {
    font-size: 0.5rem;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}
</style>

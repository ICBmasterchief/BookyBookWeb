<script setup lang="ts">
import { ref } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import type { Book } from '@/core/types'
import BookRowComponent from '@/components/BookRowComponent.vue'
import BookDetailsComponent from '@/components/BookDetailsComponent.vue'

const store = useBookStore()

const books = store.books
const selectedBook = ref()

const handleBookSelected = (book: Book) => {
  selectedBook.value = book
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-2">Lista de Libros</h1>
        <v-card>
          <v-card-text>
            <v-list>
              <book-row-component
                v-for="book in books"
                :key="book.id"
                :book="book"
                @bookSelected="handleBookSelected"
              />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <Book-Details-Component :book="selectedBook" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.display-2 {
  font-size: 2rem;
}
</style>

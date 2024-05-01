<script setup lang="ts">
import { reactive } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import { useRouter } from 'vue-router'
import type { Book } from '@/core/types'
import BookRowComponent from '@/components/BookRowComponent.vue'
import BookDetailsComponent from '@/components/BookDetailsComponent.vue'

const bookStore = useBookStore()
const router = useRouter()

const books = bookStore.books
const bookDetails = reactive<Book>({
  id: 0,
  title: '',
  author: '',
  genre: null,
  year: null,
  copies: 0,
  score: 0
})

const handleBookSelected = (book: Book) => {
  Object.assign(bookDetails, book)
}

const handleBorrowing = (book: Book) => {
  bookStore.selectedBook = book
  bookStore.isSelectedBook = true
  router.push('/requestborrowing')
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
                @requestBorrowing="handleBorrowing"
              />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <Book-Details-Component :book="bookDetails" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.display-2 {
  font-size: 2rem;
}

.v-container {
  padding-top: 0;
}

@media (max-width: 700px) {
  .v-container {
    padding-top: 100px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import { Book } from '@/assets/types'
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

/* .headline {
  font-size: 1.5rem;
}

.subtitle-1 {
  font-size: 1rem;
}

.booklist:after {
  display: table;
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

.details {
  position: fixed;
  margin-top: 50px;
}

@media (max-width: 1280px) {
  .display-2 {
    font-size: 1rem;
  }

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
} */
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import type { BookPOST } from '@/core/types'

const book = ref<BookPOST>({
  title: '',
  author: '',
  genre: '',
  year: null,
  copies: 0,
  score: 0
})

const titleRules = [
  (v: string) => !!v || 'El título es requerido',
  (v: string) => (v && v.length <= 100) || 'El título debe tener menos de 100 caracteres'
]
const authorRules = [
  (v: string) => !!v || 'El autor es requerido',
  (v: string) => (v && v.length <= 100) || 'El nombre del autor debe tener menos de 100 caracteres'
]
const yearRules = [
  (v: number | null) =>
    v === null ||
    (v >= -3000 && v <= new Date().getFullYear()) ||
    'El año debe ser un número entre -3000 y el año actual'
]
const copiesRules = [
  (v: number) => !!v || 'La cantidad de copias es requerida',
  (v: number) => (v && v > 0) || 'Debe haber al menos una copia'
]

const valid = computed(() => {
  return (
    book.value.title !== '' &&
    book.value.author !== '' &&
    (book.value.year === null ||
      (book.value.year >= -3000 && book.value.year <= new Date().getFullYear())) &&
    book.value.copies > 0 &&
    book.value.score >= 0
  )
})

const bookStore = useBookStore()

const submitBook = () => {
  if (valid.value) {
    bookStore.addBook(book.value)
    book.value = {
      title: '',
      author: '',
      genre: '',
      year: null,
      copies: 0,
      score: 0
    }
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Dona un libro a la biblioteca</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="book.title"
                :rules="titleRules"
                label="Título"
                required
              ></v-text-field>
              <v-text-field
                v-model="book.author"
                :rules="authorRules"
                label="Autor"
                required
              ></v-text-field>
              <v-text-field v-model="book.genre" label="Género" required></v-text-field>
              <v-text-field
                v-model="book.year"
                :rules="yearRules"
                label="Año"
                required
              ></v-text-field>
              <v-text-field
                v-model="book.copies"
                :rules="copiesRules"
                label="Cantidad de Copias"
                type="number"
                required
              ></v-text-field>
              <v-slider
                v-model="book.score"
                :max="10"
                step="0.1"
                ticks="always"
                tick-size="9"
                label="Puntuación"
              ></v-slider>
              <span class="score">{{ book.score }}</span>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" color="primary" @click="submitBook"> Añadir Libro </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.score {
  margin-left: 20px;
  font-size: 2rem;
}

.v-card-title {
  font-size: 2rem;
}

.v-btn {
  margin: 10px;
  font-size: 1.4rem;
}
</style>

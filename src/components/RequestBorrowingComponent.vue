<script setup lang="ts">
import { computed } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import { useBorrowingStore } from '@/stores/BorrowingStore'
import { useRouter } from 'vue-router'

const bookStore = useBookStore()
const borrowingStore = useBorrowingStore()
const router = useRouter()

const book = computed(() => bookStore.selectedBook)
const borrowingDate = new Date().toLocaleDateString()
const returnDate = new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString()

const confirmBorrowing = () => {
  borrowingStore.addBorrowing(book.value.id)
  bookStore.isSelectedBook = false
  router.push('/account')
}

const cancelBorrowing = () => {
  bookStore.isSelectedBook = false
  router.push('/library')
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Detalles del Libro</v-card-title>
          <v-card-text>
            <div><strong>Título:</strong> {{ book.title }}</div>
            <div><strong>Autor:</strong> {{ book.author }}</div>
            <div><strong>Género:</strong> {{ book.genre }}</div>
            <div><strong>Año:</strong> {{ book.year }}</div>
            <div><strong>Copias disponibles:</strong> {{ book.copies }}</div>
            <div><strong>Puntuación:</strong> {{ book.score }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Detalles del Préstamo</v-card-title>
          <v-card-text>
            <div><strong>Fecha del Préstamo:</strong> {{ borrowingDate }}</div>
            <div><strong>Fecha Límite de Devolución:</strong> {{ returnDate }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" class="ma-2" @click="confirmBorrowing">Confirmar Préstamo</v-btn>
      <v-btn color="error" class="ma-2" @click="cancelBorrowing">Cancelar Préstamo</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>

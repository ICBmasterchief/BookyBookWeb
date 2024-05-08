<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import { useBorrowingStore } from '@/stores/BorrowingStore'
import { useRouter } from 'vue-router'
import BorrowingBookComponent from '@/components/BorrowingBookComponent.vue'
import BorrowingDetailsComponent from '@/components/BorrowingDetailsComponent.vue'

const bookStore = useBookStore()

onMounted(async () => {
  bookStore.fetchBook
})
const borrowingStore = useBorrowingStore()
const router = useRouter()

const snackbar = ref(false)
const snackbarMessage = ref('')

const book = computed(() => bookStore.selectedBook)

const confirmBorrowing = async () => {
  const success = await borrowingStore.addBorrowing(book.value.bookId)
  if (success) {
    await bookStore.fetchBooks()
    bookStore.isSelectedBook = false
    router.push('/account')
  } else {
    snackbarMessage.value =
      'Préstamo no realizado.\nAsegúrate de no tener ya una copia del libro en préstamo o de que haya suficientes copias disponibles.'
    snackbar.value = true
  }
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
        <BorrowingBookComponent :book="book" />
      </v-col>
      <v-col cols="12" md="6">
        <BorrowingDetailsComponent />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" class="ma-2" @click="confirmBorrowing">Confirmar Préstamo</v-btn>
      <v-btn color="error" class="ma-2" @click="cancelBorrowing">Cancelar Préstamo</v-btn>
    </v-row>
    <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom right>
      {{ snackbarMessage }}
      <v-btn color="red" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBookStore } from '@/stores/BookStore'
import type { Book, Borrowing } from '@/core/types'

const bookStore = useBookStore()

const emit = defineEmits(['returnBorrowing'])

const props = defineProps<{
  borrowing: Borrowing
}>()

const book = ref<Book>({
  bookId: 0,
  title: '',
  author: '',
  genre: null,
  year: null,
  copies: 0,
  score: 0
})

onMounted(async () => {
  const data = await bookStore.fetchBook(props.borrowing.bookId)
  if (data != null) {
    book.value = data
  }
})

const returnBorrowing = (borrowingId: number) => {
  emit('returnBorrowing', borrowingId)
}
</script>

<template>
  <v-list-item>
    <v-list-item-content>
      <div><strong>Id del préstamo: </strong>{{ props.borrowing.idNumber }}</div>
      <div><strong>Título del Libro: </strong>{{ book.title }}</div>
      <div><strong>Fecha de préstamo: </strong>{{ props.borrowing.borrowingDate }}</div>
      <div><strong>Fecha límite para devolver: </strong>{{ props.borrowing.dateToReturn }}</div>
      <div><strong>Devuelto: </strong>{{ props.borrowing.returned }}</div>
      <div v-if="props.borrowing.returned">
        <strong>Fecha de devolución: </strong>{{ props.borrowing.returnedDate }}
      </div>
      <div v-if="props.borrowing.returned">
        <strong>Multa: </strong>{{ props.borrowing.penaltyFee }} €
      </div>
    </v-list-item-content>
    <v-list-item-action v-if="!props.borrowing.returned">
      <v-btn @click="returnBorrowing(props.borrowing.idNumber)">Devolver</v-btn>
    </v-list-item-action>
    <div class="divider">
      <v-divider></v-divider>
    </div>
  </v-list-item>
</template>

<style scoped>
.divider {
  padding-top: 15px;
  padding-bottom: 10px;
}
</style>

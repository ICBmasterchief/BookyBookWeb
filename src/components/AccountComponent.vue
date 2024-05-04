<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useBorrowingStore } from '@/stores/BorrowingStore'
import { useBookStore } from '@/stores/BookStore'
import AccountBorrowingsComponent from '@/components/AccountBorrowingsComponent.vue'
import AccountInfoComponent from '@/components/AccountInfoComponent.vue'

const authStore = useAuthStore()
const borrowingStore = useBorrowingStore()
const bookStore = useBookStore()
const snackbar = ref(false)
const snackbarMessage = ref('')

onMounted(async () => {
  getBorrowings()
})

async function getBorrowings() {
  const success = await borrowingStore.fetchUserBorrowings(authStore.userIdLoged)
  if (!success) {
    snackbarMessage.value = 'No se han encontrado préstamos.'
    snackbar.value = true
  }
}

const borrowings = computed(() => borrowingStore.userBorrowings)
const showingBorrowings = ref(false)

const btnBorrowings = ref('Ver préstamos')

const showBorrowings = () => {
  if (!showingBorrowings.value) {
    btnBorrowings.value = 'Ocultar préstamos'
  } else {
    btnBorrowings.value = 'Ver préstamos'
  }
  showingBorrowings.value = !showingBorrowings.value
}

const returnBorrowing = async (borrowingId: number) => {
  const success = await borrowingStore.fetchUpdateBorrowing(borrowingId)
  if (success) {
    await bookStore.fetchBooks()
    getBorrowings()
  } else {
    snackbarMessage.value = 'Error al intentar devolver el libro.'
    snackbar.value = true
  }
}
</script>

<template>
  <v-container>
    <AccountInfoComponent />
    <div class="borrowing-card">
      <v-card>
        <v-card-title>Préstamos</v-card-title>
        <v-card-text>
          <v-btn @click="showBorrowings">{{ btnBorrowings }}</v-btn>
          <div v-if="showingBorrowings" class="borrowing-list">
            <v-list>
              <AccountBorrowingsComponent
                v-for="borrowing in borrowings"
                :key="borrowing.idNumber"
                :borrowing="borrowing"
                @returnBorrowing="returnBorrowing"
              />
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
  <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom right>
    {{ snackbarMessage }}
    <v-btn color="red" @click="snackbar = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<style scoped>
.v-container {
  padding-top: 100px;
  padding-bottom: 140px;
}

.borrowing-list {
  padding-top: 5px;
}

.borrowing-card {
  padding-top: 15px;
}
</style>

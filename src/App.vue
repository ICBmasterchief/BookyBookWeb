<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useBookStore } from '@/stores/BookStore'
import { onMounted } from 'vue'

const bookStore = useBookStore()

onMounted(async () => {
  await bookStore.fetchBooks()
})
</script>

<template>
  <v-app>
    <div class="app">
      <HeaderComponent />
      <router-view class="content" />
      <FooterComponent />
    </div>
  </v-app>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  margin-top: 110px;
  margin-bottom: 120px;
}
</style>

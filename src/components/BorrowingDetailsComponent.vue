<script setup lang="ts">
const borrowingDate = new Date().toLocaleDateString()
const returnDate = new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString()
</script>

<template>
  <v-card>
    <v-card-title>Detalles del Préstamo</v-card-title>
    <v-card-text>
      <div><strong>Fecha del Préstamo:</strong> {{ borrowingDate }}</div>
      <div><strong>Fecha Límite de Devolución:</strong> {{ returnDate }}</div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>

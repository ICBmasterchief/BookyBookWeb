<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="text-h1" primary-title> BookyBook </v-card-title>
          <v-card-subtitle class="pb-4"> Tu biblioteca virtual personal </v-card-subtitle>
          <v-card-text>
            Bienvenido a BookyBook, la plataforma donde la magia de los libros cobra vida. Explora
            nuestra colección, toma prestado un título que te intrigue, o contribuye a la comunidad
            donando libros. ¡Sumérgete en el universo de la lectura sin límites!
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Navegar Libros</v-btn>
            <v-btn color="secondary">Donar un Libro</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.pa-5 {
  padding: 2rem !important;
}
</style>

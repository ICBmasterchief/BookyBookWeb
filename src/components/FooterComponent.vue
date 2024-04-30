<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <v-footer app dark>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="text-center">
          <p>Contact Information:</p>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  background-color: #333;
  color: white;
  font-size: 2vh;
}
</style>

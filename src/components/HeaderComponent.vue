<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const store = useUserStore()

const appTitle = ref('BookyBook')
</script>

<template>
  <v-toolbar class="toolbar">
    <router-link class="app-title" to="/">{{ appTitle }}</router-link>
    <div class="menu-items">
      <router-link to="/library" class="menu-link">Library</router-link>
      <router-link v-if="!store.isAuthenticated" to="/login" class="menu-link">Login</router-link>
      <router-link v-if="!store.isAuthenticated" to="/register" class="menu-link"
        >Register</router-link
      >
      <router-link v-if="store.isAuthenticated" to="/account" class="menu-link"
        >Account</router-link
      >
      <router-link v-if="store.isAuthenticated" to="/donatebook" class="menu-link"
        >Donate book</router-link
      >
      <router-link v-if="store.role === 'admin'" to="/users" class="menu-link">Users</router-link>
    </div>
    <div class="placeholder"></div>
  </v-toolbar>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #858585;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.app-title {
  font-size: 4vh;
  cursor: pointer;
  text-decoration: none;
  color: white;
  text-shadow: 2px 2px 4px black;
}

.menu-items {
  display: flex;
  gap: 1rem;
  font-size: 3vh;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.placeholder {
  width: 10%;
  visibility: hidden;
}

.menu-link {
  text-decoration: none;
  color: white;
}
</style>

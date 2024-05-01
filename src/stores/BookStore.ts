import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import type { Book, BookPOST } from '@/core/types'

export const useBookStore = defineStore('bookStore', () => {
  const books = reactive([] as Book[])
  const authStore = useAuthStore()

  async function fetchBooks() {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/book')

      if (!response.ok) {
        throw new Error('Error al obtener libros')
      }

      const data = await response.json()
      books.splice(0, books.length, ...data)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const addBook = async (book: BookPOST) => {
    console.log(JSON.stringify(book))
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/book', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de creación de libro')
      }
    } catch (error) {
      console.error('Error al donar libro:', error)
    }
  }

  return { books, fetchBooks, addBook }
})

// interfaces
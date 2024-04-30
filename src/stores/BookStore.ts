import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('bookStore', () => {
  const books = ref([] as Book[])

  async function fetchBooks() {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/book')
      const data = await response.json()
      books.value = data
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const addBook = async (book: Book) => {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ book })
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
interface Book {
  id: number
  title: string
  author: string
  genre: string
  year: number
  copies: number
  score: number
}

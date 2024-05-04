import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import type { Book, BookPOST } from '@/core/types'

export const useBookStore = defineStore('bookStore', () => {
  const books = reactive<Book[]>([])
  const authStore = useAuthStore()
  const selectedBook = reactive<Book>({
    bookId: 0,
    title: '',
    author: '',
    genre: null,
    year: null,
    copies: 0,
    score: 0
  })
  const isSelectedBook = ref(false)

  const selectBook = (book: Book) => {
    selectedBook.bookId = book.bookId
    selectedBook.title = book.title
    selectedBook.author = book.author
    selectedBook.genre = book.genre
    selectedBook.year = book.year
    selectedBook.copies = book.copies
    selectedBook.score = book.score
    isSelectedBook.value = true
  }

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
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return
    }

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

  async function fetchBook(bookId: number): Promise<Book | null> {
    try {
      const response = await fetch(`https://bookybookapi-pre.azurewebsites.net/book/${bookId}`)

      if (!response.ok) {
        throw new Error(`Error al obtener el libro ${bookId}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching book:', error)
      return null
    }
  }

  function clearBooks() {
    Object.assign(selectedBook, {
      bookId: 0,
      title: '',
      author: '',
      genre: null,
      year: null,
      copies: 0,
      score: 0
    })
    isSelectedBook.value = false
  }

  return {
    books,
    selectedBook,
    isSelectedBook,
    selectBook,
    fetchBooks,
    addBook,
    fetchBook,
    clearBooks
  }
})

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import type { Borrowing } from '@/core/types'

export const useBorrowingStore = defineStore('borrowingStore', () => {
  const borrowings = reactive<Borrowing[]>([])
  const authStore = useAuthStore()

  async function fetchBorrowings() {
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return
    }

    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/borrowing', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener prestamos')
      }

      const data = await response.json()
      borrowings.splice(0, borrowings.length, ...data)
    } catch (error) {
      console.error('Error fetching borrowings:', error)
    }
  }

  const addBorrowing = async (bookId: number) => {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/borrowing', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId })
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de creación de préstamo')
      }
    } catch (error) {
      console.error('Error al crear préstamo:', error)
    }
  }

  return { borrowings, fetchBorrowings, addBorrowing }
})

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import type { Borrowing } from '@/core/types'

export const useBorrowingStore = defineStore('borrowingStore', () => {
  const borrowings = reactive<Borrowing[]>([])
  const userBorrowings = reactive<Borrowing[]>([])
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

  const addBorrowing = async (bookId: number): Promise<boolean> => {
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return false
    }

    try {
      const response = await fetch(
        `https://bookybookapi-pre.azurewebsites.net//Borrowing?bookId=${bookId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error en la solicitud de creación de préstamo')
      }

      return true
    } catch (error) {
      console.error('Error al crear préstamo:', error)
      return false
    }
  }

  async function fetchUserBorrowings(userId: number): Promise<boolean> {
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return false
    }

    try {
      const response = await fetch(
        `https://bookybookapi-pre.azurewebsites.net/User/${userId}/borrowings`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error al obtener los prestamos del usuario ' + userId)
      }

      const data = await response.json()
      userBorrowings.splice(0, userBorrowings.length, ...data)
      return true
    } catch (error) {
      console.error('Error fetching user borrowings:', error)
      return false
    }
  }

  const fetchUpdateBorrowing = async (borrowingId: number): Promise<boolean> => {
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return false
    }

    try {
      const response = await fetch(
        `https://bookybookapi-pre.azurewebsites.net/Borrowing/${borrowingId}/return`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error en la actualización del préstamo.')
      }

      //const data = await response.json()
      //Object.assign(user, data)
      return true
    } catch (error) {
      console.error('Error al actualizar préstamo:', error)
      return false
    }
  }

  function clearBorrowings() {
    borrowings.splice(0, borrowings.length)
    userBorrowings.splice(0, userBorrowings.length)
  }

  return {
    borrowings,
    userBorrowings,
    fetchBorrowings,
    addBorrowing,
    fetchUserBorrowings,
    fetchUpdateBorrowing,
    clearBorrowings
  }
})

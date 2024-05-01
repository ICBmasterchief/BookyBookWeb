import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

export const useUserStore = defineStore('userStore', () => {
  const users = reactive([] as User[])
  const authStore = useAuthStore()

  async function fetchUsers() {
    if (!authStore.token || !authStore.isAuthenticated) {
      console.error('No autorizado: Token no disponible')
      return
    }

    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/user', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener usuarios')
      }

      const data = await response.json()
      users.splice(0, users.length, ...data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return { users, fetchUsers }
})

// interfaces
interface User {
  id: number
  name: string
  email: string
  password: string
  registrationDate: Date
  penaltyFee: number
  role: string
}

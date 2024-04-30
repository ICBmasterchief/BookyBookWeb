import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const users = ref([] as User[])
  const isAuthenticated = ref(false)
  const role = ref('')
  const token = ref('')
  const decodedToken = ref()

  function setToken(newToken: string) {
    isAuthenticated.value = true
    token.value = newToken
    decodedToken.value = decodeJwt(newToken)
    role.value = decodedToken.value.role
    console.log(role.value)
  }

  // Función para decodificar un token JWT
  function decodeJwt(token: string): Record<string, unknown> | null {
    if (!token) {
      return null
    }

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    try {
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
      return null
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión')
      }

      const data = await response.text()
      setToken(data)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de registro')
      }

      const data = await response.text()
      setToken(data)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  async function fetchUsers() {
    if (!token.value || !isAuthenticated.value) {
      console.error('No autorizado: Token no disponible')
      return
    }

    try {
      const response = await fetch('https://bookybookapi-pre.azurewebsites.net/user', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener usuarios')
      }

      const data = await response.json()
      users.value = data
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return { users, isAuthenticated, role, token, login, register, fetchUsers }
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

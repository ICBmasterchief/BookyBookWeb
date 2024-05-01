import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)
  const role = ref<string | null>(localStorage.getItem('role') ?? null)
  const token = ref<string | null>(localStorage.getItem('token') ?? null)
  const decodedToken = ref()
  const router = useRouter()

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

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('password')

    token.value = null
    role.value = null

    router.push('/login')
  }

  return { isAuthenticated, role, token, login, register }
})

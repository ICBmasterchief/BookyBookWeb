import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import { useBookStore } from '@/stores/BookStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/LibraryView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('@/views/UsersView.vue')
    },
    {
      path: '/donatebook',
      name: 'donatebook',
      meta: { requiresAuth: true },
      component: () => import('@/views/DonateBookView.vue')
    },
    {
      path: '/requestborrowing',
      name: 'requestborrowing',
      meta: { requiresAuth: true, requiresSelectedBook: true },
      component: () => import('@/views/RequestBorrowingView.vue')
    },
    {
      path: '/account',
      name: 'account',
      meta: { requiresAuth: true },
      component: () => import('@/views/AccountView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const bookStore = useBookStore()

  if (!authStore.token) {
    next()
    return
  }

  if (authStore.isTokenExpired()) {
    authStore.logout()
    next('/login')
    return
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAuth && to.meta.role && authStore.role !== to.meta.role) {
    next('/')
  } else if (to.meta.requiresSelectedBook && !bookStore.isSelectedBook) {
    next('/library')
  } else {
    next()
  }
})

export default router

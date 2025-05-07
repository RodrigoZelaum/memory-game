import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as null | { name: string; email: string },
  }),
  actions: {
    login(userData: { name: string; email: string }) {
      this.isAuthenticated = true
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('user')
    },
    loadUser() {
      const data = localStorage.getItem('user')
      if (data) {
        this.user = JSON.parse(data)
        this.isAuthenticated = true
      }
    },
  },
})

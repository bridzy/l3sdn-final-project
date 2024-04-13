import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    login(username, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u) => u.username === username && u.password === password)
      if (user) {
        this.user = user
        return true
      } else {
        return false
      }
    },
    logout() {
      this.user = null
    }
  }
})

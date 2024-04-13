import { defineStore } from 'pinia'

// Fonction pour initialiser des utilisateurs par défaut dans localStorage
function initializeUsers() {
  const users = [
    { id: 1, username: 'responsable', password: 'resp123', role: 'responsable' },
    { id: 2, username: 'manager', password: 'man123', role: 'manager' },
    { id: 3, username: 'manage', password: 'manag123', role: 'manage' }
  ]

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users))
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null // Stocke l'utilisateur actuellement connecté
  }),
  actions: {
    initialize() {
      initializeUsers() // Assurez-vous que les utilisateurs sont initialisés lors de l'utilisation du store
    },
    login(username, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u) => u.username === username && u.password === password)
      if (user) {
        this.user = user
        return { success: true, role: user.role }
      } else {
        return { success: false, message: "Nom d'utilisateur ou mot de passe incorrect" }
      }
    },

    logout() {
      this.user = null // Efface l'utilisateur connecté
    },
    resetUsers() {
      initializeUsers() // Peut être utilisé pour réinitialiser les utilisateurs dans le localStorage
    }
  }
})

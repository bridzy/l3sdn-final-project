export default () => {
  // Fonction pour initialiser les utilisateurs par défaut
  function initializeUsers() {
    const defaultUsers = [
      { id: 1, username: 'responsable', password: 'resp123', role: 'responsable' },
      { id: 2, username: 'manager', password: 'man123', role: 'manager' },
      { id: 3, username: 'manage', password: 'manag123', role: 'manage' }
    ]

    // Vérifie si les utilisateurs existent déjà pour éviter de les écraser
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
  }

  // Appel de la fonction d'initialisation des utilisateurs
  initializeUsers()

  // Fonction globale pour ajouter un nouvel utilisateur
  window.addUser = function (username, password, role) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = {
      // Utilisation de Date.now() pour un ID unique pourrait être mieux pour éviter les doublons
      id: Date.now(),
      username,
      password,
      role
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
  }

  // Fonction globale pour récupérer tous les utilisateurs (pour débogage ou gestion)
  window.getUsers = function () {
    return JSON.parse(localStorage.getItem('users') || '[]')
  }

  // Fonction globale pour effacer tous les utilisateurs (peut être utile pour la réinitialisation)
  window.clearUsers = function () {
    localStorage.removeItem('users')
    initializeUsers() // Ré-initialiser avec les utilisateurs par défaut après nettoyage
  }
}

export default function setupLocalStorage() {
  // Initialisation des utilisateurs par défaut
  function initializeUsers() {
    const defaultUsers = [
      // Définition des utilisateurs par défaut
    ]

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
  }

  // Génération d'un ID utilisateur unique
  function generateUserId() {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1
  }

  const userActions = {
    // Ajout d'un nouvel utilisateur
    addUser(username, password, role) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const newUser = {
        id: generateUserId(),
        username,
        password, // Dans un cas réel, le mot de passe devrait être hashé
        role,
        ...(role === 'manager' ? { managed: [], entretiens: {} } : {})
      }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
    },

    // Modification d'un utilisateur existant
    modifyUser(id, modifications) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const index = users.findIndex((user) => user.id === id)
      if (index !== -1) {
        users[index] = { ...users[index], ...modifications }
        localStorage.setItem('users', JSON.stringify(users))
      } else {
        console.error('Utilisateur non trouvé.')
      }
    },

    // Suppression d'un utilisateur
    deleteUser(id) {
      const users = JSON.parse(localStorage.getItem('users') || '[]').filter(
        (user) => user.id !== id
      )
      localStorage.setItem('users', JSON.stringify(users))
    },

    // Récupération de la liste de tous les utilisateurs
    getUsers() {
      return JSON.parse(localStorage.getItem('users') || '[]')
    },

    // Récupération d'un utilisateur spécifique par son ID
    getUserById(id) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      return users.find((user) => user.id === id)
    }
  }

  // Exposition des actions utilisateur globalement
  window.userActions = userActions

  // Initialisation des utilisateurs
  initializeUsers()
}

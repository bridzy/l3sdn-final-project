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
      id: users.length + 1, // Attribution d'un ID simple basé sur la longueur. À adapter selon vos besoins.
      username,
      password,
      role
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
  }
}

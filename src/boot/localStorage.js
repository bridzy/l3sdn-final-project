export default ({ app }) => {
  const users = [
    { id: 1, username: 'managerEntretien', password: 'password', role: 'managerEntretien' },
    { id: 2, username: 'manager', password: 'password', role: 'manager' },
    { id: 3, username: 'responsableManager', password: 'password', role: 'responsableManager' }
  ]

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users))
  }
}

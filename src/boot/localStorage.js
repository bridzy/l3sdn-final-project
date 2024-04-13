export default () => {
  const users = [
    { id: 1, username: 'responsable', password: 'resp123', role: 'responsable' },
    { id: 2, username: 'manager', password: 'man123', role: 'manager' },
    { id: 3, username: 'manage', password: 'manag123', role: 'manage' }
  ]

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users))
  }
}

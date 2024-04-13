const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' }, // Rediriger la racine vers la page de connexion
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Page de connexion
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true }
      }, // Protéger le tableau de bord
      { path: 'signup', component: () => import('pages/SignUpPage.vue') } // Page d'inscription (si nécessaire)
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue') // Page 404
  }
]

export default routes

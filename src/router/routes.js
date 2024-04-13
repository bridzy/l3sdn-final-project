const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' }, // Redirection de la racine vers la page de connexion
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Page de connexion
      {
        path: 'dashboard-responsable',
        name: 'dashboard-responsable',
        component: () => import('pages/DashboardResponsable.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'dashboard-manager',
        name: 'dashboard-manager',
        component: () => import('pages/DashboardManager.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'dashboard-manage',
        name: 'dashboard-manage',
        component: () => import('pages/DashboardManage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue') // Gestion des routes non trouvées (404)
  }
]

export default routes

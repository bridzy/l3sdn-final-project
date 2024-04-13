const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' }, // Redirection de la racine vers la page de connexion
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Page de connexion
      {
        // Tableau de bord pour le "Manager d'Entretien"
        path: 'dashboard-manager-entretien',
        name: 'dashboard-manager-entretien',
        component: () => import('pages/DashboardManagerEntretien.vue'),
        meta: { requiresAuth: true } // Protection de la route
      },
      {
        // Tableau de bord pour le "Manager"
        path: 'dashboard-manager',
        name: 'dashboard-manager',
        component: () => import('pages/DashboardManager.vue'),
        meta: { requiresAuth: true } // Protection de la route
      },
      {
        // Tableau de bord pour le "Responsable Manager"
        path: 'dashboard-responsable-manager',
        name: 'dashboard-responsable-manager',
        component: () => import('pages/DashboardResponsableManager.vue'),
        meta: { requiresAuth: true } // Protection de la route
      },
      { path: 'signup', component: () => import('pages/SignUpPage.vue') } // Page d'inscription
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue') // Gestion des routes non trouvées (404)
  }
]

export default routes

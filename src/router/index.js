import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import { useAuthStore } from 'src/stores/auth' // Assurez-vous que le chemin est correct
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore() // Utiliser Pinia pour l'état d'authentification
    if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.user) {
      next({ name: 'login' }) // Assurez-vous que vous avez une route nommée 'login'
    } else {
      next()
    }
  })

  return Router
})

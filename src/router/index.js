import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'

export default route(function ({ store }) {
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
    // Ici, vous pourriez vérifier un flag spécifique ou un token dans localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  })

  return Router
})

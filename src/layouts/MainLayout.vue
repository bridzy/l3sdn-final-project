<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar
          icon="home"
          class="q-mr-sm cursor-pointer"
          @click="handleHomeClick"
        />
        Mon Application
        <q-badge v-if="authStore.user" color="green" floating class="q-ml-sm">
          Bienvenue, {{ authStore.user.username }}
        </q-badge>

        <q-btn
          v-if="authStore.user"
          flat
          class="q-ml-auto"
          label="Déconnexion"
          icon="logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuthStore } from 'src/stores/auth' // Assurez-vous que le chemin est correct
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const logout = () => {
      authStore.logout() // Appel de la méthode logout du store d'authentification
      router.push('/login') // Redirection vers la page de connexion
    }

    const handleHomeClick = () => {
      if (authStore.user) {
        logout()
      } else {
        router.push('/login') // Redirection vers la page de connexion si non connecté
      }
    }

    return { authStore, logout, handleHomeClick }
  },
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

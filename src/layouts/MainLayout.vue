<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar icon="home" class="q-mr-sm cursor-pointer" @click="handleHomeClick" />
        Mon Application
        <q-badge v-if="authStore.user" color="green" floating class="q-ml-sm">
          Bienvenue, {{ authStore.user.username }}
        </q-badge>

        <!-- Bouton pour basculer entre les thèmes clair et sombre -->
        <q-btn icon="brightness_4" class="q-ml-md" @click="toggleDarkMode" />

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
import { useQuasar } from 'quasar'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const $q = useQuasar()

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

    const toggleDarkMode = () => {
      $q.dark.toggle() // Bascule le mode sombre
      updateBackgroundImage()
    }

    const updateBackgroundImage = () => {
      // Définir les chemins d'accès à vos images de fond pour les modes
      const darkBackgroundImage = "url('/src/assets/dark.jpg')" // Assurez-vous que ce chemin est correct
      const lightBackgroundImage = "url('/src/assets/test.jpg')" // Assurez-vous que ce chemin est correct
      
      // Appliquer l'image de fond en fonction du mode actif
      document.body.style.backgroundImage = $q.dark
      .isActive ? darkBackgroundImage : lightBackgroundImage
    }

    
    return { authStore, logout, handleHomeClick, toggleDarkMode }
  },
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

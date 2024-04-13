<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Mon Application
          <!-- Message de bienvenue -->
          <span v-if="authStore.user">: Bienvenue, {{ authStore.user.username }}</span>
        </q-toolbar-title>

        <!-- Affichage conditionnel basé sur si un utilisateur est connecté -->
        <div v-if="authStore.user" class="q-ml-auto flex items-center">
          <!-- Bouton de déconnexion et icône, affichés seulement si un utilisateur est connecté -->
          <q-btn flat @click="logout">{{ authStore.user.username }}</q-btn>
          <q-btn icon="logout" @click="logout"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuthStore } from 'src/stores/auth' // Vérifiez que le chemin d'accès est correct.
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter() // Utilisez useRouter pour accéder à l'instance du routeur.

    const logout = () => {
      authStore.logout() // Appeler la méthode logout du store d'authentification.
      router.push('/login') // Redirection vers la page de connexion.
    }

    return { authStore, logout }
  }
}
</script>

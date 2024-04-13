<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Mon Application</q-toolbar-title>

        <div v-if="authStore.user" class="q-ml-auto flex items-center">
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
import { useAuthStore } from '../stores/auth' // Importez le store d'authentification

export default {
  setup() {
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logout()
      this.$router.push('/login')
    }

    return { authStore, logout }
  }
}
</script>

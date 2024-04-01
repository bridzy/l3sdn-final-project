<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Ma App </q-toolbar-title>

        <!-- Affichage conditionnel du nom de l'utilisateur et du bouton de déconnexion -->
        <div v-if="isAuthenticated" class="q-ml-auto">
          <q-btn flat @click="logout">{{ userName }}</q-btn>
          <q-btn icon="logout" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userName: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userName')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    this.userName = localStorage.getItem('userName') || 'Utilisateur'
  }
}
</script>

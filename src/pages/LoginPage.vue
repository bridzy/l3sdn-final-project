<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-pa-md" style="width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Connexion</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="login">
          <q-input
            v-model="username"
            filled
            label="Nom d'utilisateur"
            :error="!!errors.username || !!loginError"
            :error-message="errors.username || loginError"
          />
          <q-input
            v-model="password"
            filled
            label="Mot de passe"
            type="password"
            :error="!!errors.password || !!loginError"
            :error-message="errors.password || loginError"
          />

          <div class="row justify-center q-mt-md">
            <q-btn label="Se connecter" type="submit" color="primary" />
          </div>
          <!-- Afficher le message d'erreur de connexion si présent -->
          <div v-if="loginError" class="text-negative q-mt-md">{{ loginError }}</div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <q-btn flat label="Mot de passe oublié ?" @click="forgotPassword" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: null,
        password: null
      },
      loginError: null // Ajout d'un état pour gérer les erreurs de connexion
    }
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    return { router, authStore }
  },
  methods: {
    async login() {
      const response = await this.authStore.login(this.username, this.password)
      if (response.success) {
        // Redirection en fonction du rôle
        let redirectRoute = ''
        switch (response.role) {
          case 'responsable':
            redirectRoute = '/dashboard-responsable'
            break
          case 'manager':
            redirectRoute = '/dashboard-manager'
            break
          case 'manage':
            redirectRoute = '/dashboard-manage'
            break
        }
        this.$router.push(redirectRoute)
      } else {
        this.loginError = response.message
      }
    },
    forgotPassword() {
      console.log('Mot de passe oublié ?')
      // Implémentation de la logique pour le mot de passe oublié
    }
  }
}
</script>

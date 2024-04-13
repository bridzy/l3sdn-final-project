<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-pa-md" style="width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Connexion</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="login">
          <q-input v-model="username" filled label="Nom d'utilisateur" :error="errors.username" />
          <q-input
            v-model="password"
            filled
            label="Mot de passe"
            type="password"
            :error="errors.password"
          />
          <div class="row justify-center q-mt-md">
            <q-btn label="Se connecter" type="submit" color="primary" />
          </div>
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

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      // Reset errors
      this.errors.username = this.errors.password = null

      if (!this.username || !this.password) {
        if (!this.username) this.errors.username = "Nom d'utilisateur requis"
        if (!this.password) this.errors.password = 'Mot de passe requis'
        return
      }

      const authStore = useAuthStore()
      const success = authStore.login(this.username, this.password)

      if (success) {
        this.$router.push({ name: 'dashboard' })
      } else {
        this.errors.username = 'Nom d’utilisateur ou mot de passe incorrect'
      }
    },
    forgotPassword() {
      // Logique pour mot de passe oublié
      console.log('Mot de passe oublié ?')
    }
  }
}
</script>

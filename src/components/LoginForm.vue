<template>
  <q-form @submit.prevent="emitLogin">
    <q-input
      v-model="loginDetails.username"
      outlined
      label="Identifiant"
      :error="Boolean(errors.username || loginError)"
      :error-message="errors.username || loginError"
    />
    <q-input
      v-model="loginDetails.password"
      outlined
      type="password"
      label="Mot de passe"
      :error="Boolean(errors.password || loginError)"
      :error-message="errors.password || loginError"
    />
    <div class="q-mt-md">
      <q-btn label="Se connecter" type="submit" color="primary" class="full-width" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    loginError: String // Prop pour recevoir les messages d'erreur de connexion du composant parent
  },
  data() {
    return {
      loginDetails: {
        username: '',
        password: ''
      },
      errors: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    validateForm() {
      this.errors.username = this.errors.password = null // Réinitialisation des erreurs

      if (!this.loginDetails.username.trim()) {
        this.errors.username = "L'identifiant est requis"
      }
      if (!this.loginDetails.password) {
        this.errors.password = 'Le mot de passe est requis'
      }

      // Si l'une des validations échoue, empêche la soumission du formulaire
      return !(this.errors.username || this.errors.password)
    },
    emitLogin() {
      if (this.validateForm()) {
        this.$emit('login', this.loginDetails)
      }
    }
  }
}
</script>

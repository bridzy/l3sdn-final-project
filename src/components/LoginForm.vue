<template>
  <q-form @submit.prevent="emitLogin">
    <q-input v-model="loginDetails.username" outlined label="Identifiant" />
    <q-input v-model="loginDetails.password" outlined type="password" label="Mot de passe" />
    <div class="q-mt-md">
      <q-btn label="Se connecter" type="submit" color="primary" class="full-width" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'LoginForm', // Ajout d'un nom au composant peut aider dans le débogage
  data() {
    return {
      loginDetails: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    emitLogin() {
      this.$emit('login', this.loginDetails)
    }
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6">Inscription</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSignUp">
          <q-input v-model="signupDetails.username" filled label="Nom d'utilisateur" />
          <q-input v-model="signupDetails.password" filled label="Mot de passe" type="password" />
          <div class="q-mt-md">
            <q-btn label="Inscription" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      signupDetails: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSignUp() {
      const users = JSON.parse(localStorage.getItem('users')) || []
      if (!users.find((u) => u.username === this.signupDetails.username)) {
        users.push(this.signupDetails)
        localStorage.setItem('users', JSON.stringify(users))
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Inscription réussie. Veuillez vous connecter.',
          icon: 'check_circle'
        })
        this.$router.replace({ name: 'Login' })
      } else {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Le nom d’utilisateur existe déjà',
          icon: 'error'
        })
      }
    }
  }
}
</script>

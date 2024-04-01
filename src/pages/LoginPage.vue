<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 90%; max-width: 400px">
      <q-card-section class="q-pb-none">
        <div class="text-h6" style="text-align: center">Connexion</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="onLogin">
          <q-input
            v-model="loginDetails.username"
            filled
            label="Nom d'utilisateur"
            :rules="[(val) => !!val || 'Nom d’utilisateur requis']"
          />
          <q-input
            v-model="loginDetails.password"
            filled
            label="Mot de passe"
            type="password"
            :rules="[(val) => !!val || 'Mot de passe requis']"
          />
          <div>
            <q-btn label="Connexion" type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-btn
          flat
          label="Pas de compte ? S'inscrire"
          class="full-width"
          @click="$router.push('/signup')"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loginDetails: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin() {
      // Pour cet exemple, nous prétendons que 'users' est stocké dans localStorage
      // sous la forme [{username: 'user1', password: 'pass1'}, ...]
      const users = JSON.parse(localStorage.getItem('users')) || []
      const userExists = users.some(
        (user) =>
          user.username === this.loginDetails.username &&
          user.password === this.loginDetails.password
      )

      if (userExists) {
        this.$q.notify({
          type: 'positive',
          message: 'Connexion réussie'
        })
        localStorage.setItem('isAuthenticated', 'true')
        this.$router.push('/') // Redirige vers la page d'accueil après la connexion
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Nom d’utilisateur ou mot de passe incorrect'
        })
      }
    }
  }
}
</script>

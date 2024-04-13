<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 90%; max-width: 400px">
      <q-card-section class="text-h6" style="text-align: center"> Inscription </q-card-section>
      <q-card-section>
        <SignUpForm @signup="handleSignUp" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import SignUpForm from 'components/SignUpForm.vue' // Assurez-vous que le chemin est correct

export default {
  components: {
    SignUpForm
  },
  methods: {
    handleSignUp(signupDetails) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      if (
        users.some(
          (user) => user.username === signupDetails.username || user.email === signupDetails.email
        )
      ) {
        this.$q.notify({ color: 'negative', message: 'Nom d’utilisateur ou email déjà utilisé.' })
        return
      }
      users.push({
        fullName: signupDetails.fullName,
        email: signupDetails.email,
        username: signupDetails.username,
        password: signupDetails.password
      })
      localStorage.setItem('users', JSON.stringify(users))
      this.$q.notify({
        color: 'positive',
        message: 'Inscription réussie. Veuillez vous connecter.'
      })
      this.$router.push('/login')
    }
  }
}
</script>

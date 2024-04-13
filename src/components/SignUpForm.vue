<template>
  <q-form class="q-gutter-md" @submit.prevent="onSignUp">
    <q-input
      v-model="signupDetails.fullName"
      filled
      label="Nom complet"
      :rules="[(val) => !!val || 'Nom complet requis']"
    />
    <q-input v-model="signupDetails.email" filled label="Email" :rules="emailRules" />
    <q-input
      v-model="signupDetails.username"
      filled
      label="Nom d'utilisateur"
      :rules="[(val) => !!val || 'Nom d’utilisateur requis']"
    />
    <q-input
      v-model="signupDetails.password"
      filled
      type="password"
      label="Mot de passe"
      :rules="passwordRules"
    />
    <q-input
      v-model="signupDetails.confirmPassword"
      filled
      type="password"
      label="Confirmez le mot de passe"
      :rules="[(val) => val === signupDetails.password || 'Les mots de passe ne correspondent pas']"
    />
    <q-btn label="S'inscrire" type="submit" color="primary" class="full-width" />
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      signupDetails: {
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      emailRules: [
        (val) => !!val || 'Email requis',
        (val) => /.+@.+\..+/.test(val) || 'Ce champ doit être un email'
      ],
      passwordRules: [
        (val) => !!val || 'Mot de passe requis',
        (val) => val.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères',
        (val) => /[A-Z]/.test(val) || 'Doit contenir au moins une majuscule',
        (val) => /[a-z]/.test(val) || 'Doit contenir au moins une minuscule',
        (val) => /[0-9]/.test(val) || 'Doit contenir au moins un chiffre',
        (val) => /[\W]/.test(val) || 'Doit contenir au moins un caractère spécial'
      ]
    }
  },
  methods: {
    onSignUp() {
      this.$emit('signup', this.signupDetails)
    }
  }
}
</script>

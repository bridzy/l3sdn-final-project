<template>
  <q-page>
    <div v-if="userRole === 'managerEntretien'">Dashboard Manager d'entretien</div>
    <div v-else-if="userRole === 'manager'">Dashboard Manager</div>
    <div v-else>Dashboard Responsable du manager</div>
  </q-page>
</template>

<script>
export default {
  computed: {
    userRole() {
      return this.$store.state.auth.user?.role
    }
  }
}
</script>

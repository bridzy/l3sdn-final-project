<template>
  <q-page class="dashboard-manage q-pa-md">
    <div class="entretien-section">
      <h2>Votre Entretien</h2>
      <div v-if="isLoading" class="q-my-md text-center">
        Chargement...
        <q-spinner color="primary" />
      </div>
      <template v-else>
        <div v-if="managedInfo && managedInfo.entretienDate">
          <p class="entretien-info">
            <span>Date d'entretien:</span>
            <strong>{{ formatDate(managedInfo.entretienDate) }}</strong>
          </p>
          <p class="manager-info">
            <span>Manager:</span>
            <strong>{{ managedInfo.managerName || 'Non attribué' }}</strong>
          </p>
        </div>
        <div v-else class="no-entretien">
          <p>Aucun entretien planifié ou informations non disponibles.</p>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      managedInfo: null,
      isLoading: true,
    }
  },
  methods: {
    async loadManagedInfo() {
      this.isLoading = true
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simuler le chargement des données
      try {
        const currentUserUsername = 'manage' // Devrait être dynamiquement déterminé
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        this.managedInfo = users.find(u => u.username === currentUserUsername && u.role === 'manage')
        if (!this.managedInfo) {
          throw new Error('Informations du managé non trouvées.')
        }
      } catch (error) {
        console.error('Erreur lors du chargement des informations:', error)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Impossible de charger les informations.',
          icon: 'report_problem',
        })
      } finally {
        this.isLoading = false
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
  },
  mounted() {
    this.loadManagedInfo()
  },
}
</script>


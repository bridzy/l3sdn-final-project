<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h6">Votre Entretien</div>
      <div v-if="isLoading">
        <q-spinner color="primary" />
      </div>
      <div v-else-if="managedInfo && managedInfo.entretienDate">
        <p>Date d'entretien: {{ managedInfo.entretienDate }}</p>
        <p>Manager: {{ managedInfo.managerName }}</p>
      </div>
      <div v-else>
        <p>Aucun entretien planifié ou informations non disponibles.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { QSpinner } from 'quasar'

export default {
  components: {
    QSpinner,
  },
  data() {
    return {
      managedInfo: null,
      isLoading: true,
    }
  },
  methods: {
    loadManagedInfo() {
      this.isLoading = true
      try {
        // Simuler la récupération de l'utilisateur connecté
        const currentUserUsername = 'manage' // Remplacez ceci par le mécanisme réel déterminant l'utilisateur connecté
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const managedInfo = users.find(u => u.username === currentUserUsername)
        if (managedInfo) {
          this.managedInfo = managedInfo
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
  },
  mounted() {
    this.loadManagedInfo()
  },
}
</script>

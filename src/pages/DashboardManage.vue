<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h6">Votre Entretien</div>
      <div v-if="managedInfo && managedInfo.entretien">
        <p>Date d'entretien: {{ managedInfo.entretien.date }}</p>
        <p>Manager: {{ managerName }}</p>
      </div>
      <div v-else>
        <p>Aucun entretien planifié.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      managedInfo: null,
      managerName: ''
    }
  },
  methods: {
    findManagerById(managerId) {
      // Implémentez cette fonction pour rechercher les informations du manager par ID
      const manager = window.userActions.getUserById(managerId)
      return manager ? manager.username : 'Inconnu'
    },
    loadManagedInfo() {
      // Implémentez cette fonction pour charger les informations du managé connecté
      this.managedInfo = window.userActions.getCurrentManaged() // Exemple, ajustez selon votre logique d'authentification
      if (this.managedInfo && this.managedInfo.entretien) {
        this.managerName = this.findManagerById(this.managedInfo.entretien.managerId)
      }
    }
  },
  mounted() {
    this.loadManagedInfo()
  }
}
</script>

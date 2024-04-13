<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Tableau de Bord du Responsable</div>

    <!-- Boutons d'action -->
    <div class="q-mb-md">
      <q-btn label="Ajouter un Manager" color="primary" @click="showAddManager = true" />
      <q-btn label="Ajouter un Managé" color="primary" @click="showAddManage = true" />
    </div>

    <!-- Formulaire d'ajout d'un Manager - Popup -->
    <q-dialog v-model="showAddManager">
      <q-card>
        <q-card-section>
          <div class="text-h6">Ajouter un Manager</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newManager.username" label="Nom d'utilisateur" />
          <q-input v-model="newManager.password" label="Mot de passe" type="password" />
          <!-- Ajoutez d'autres champs au besoin -->
        </q-card-section>

        <q-card-section align="right">
          <q-btn v-close-popup flat label="Annuler" color="primary" />
          <q-btn flat label="Ajouter" color="primary" @click="addManager" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Formulaire d'ajout d'un Managé - Popup (similaire au Manager, donc non montré pour simplifier) -->

    <!-- Liste des Managers et des Managés (exemple simplifié) -->
    <div>
      <div class="text-subtitle1">Managers</div>
      <q-list bordered>
        <q-item v-for="manager in managers" :key="manager.id">
          <q-item-section>{{ manager.username }}</q-item-section>
          <q-item-section side top>
            <q-btn flat icon="edit" @click="editManager(manager)" />
            <q-btn flat icon="delete" @click="deleteManager(manager.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Liste des Managés (similaire aux Managers, donc non montré pour simplifier) -->
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddManager: false,
      showAddManage: false,
      newManager: { username: '', password: '' }, // Exemple simplifié
      managers: [] // Liste des managers pour l'affichage
    }
  },
  created() {
    this.loadManagers() // Chargez les managers existants lors de la création du composant
  },
  methods: {
    loadManagers() {
      // Charge tous les managers de localStorage au démarrage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      this.managers = users.filter((user) => user.role === 'manager')
    },
    addManager() {
      const newManager = { ...this.newManager, id: Date.now(), role: 'manager' }
      this.managers.push(newManager)

      // Met à jour localStorage avec le nouveau manager
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      users.push(newManager)
      localStorage.setItem('users', JSON.stringify(users))

      this.newManager = { username: '', password: '' }
      this.showAddManager = false
    },
    editManager(manager) {
      console.log('Modifier le manager:', manager)
      // Ici, vous intégrerez la logique de modification
    },
    deleteManager(managerId) {
      console.log("Supprimer le manager avec l'ID:", managerId)
      this.managers = this.managers.filter((manager) => manager.id !== managerId)

      // Supprime également le manager de localStorage
      const users = JSON.parse(localStorage.getItem('users'))
      const updatedUsers = users.filter((user) => user.id !== managerId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
    // Méthodes pour ajouter, éditer, supprimer des managés seraient similaires
  }
}
</script>

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
      // Managés non inclus dans cet exemple pour simplifier
    }
  },
  methods: {
    addManager() {
      // Ici, vous ajouteriez le manager à votre liste et/ou base de données
      console.log('Ajouter le manager:', this.newManager)
      this.managers.push({ ...this.newManager, id: Date.now() }) // Simplification
      this.newManager = { username: '', password: '' }
      this.showAddManager = false
    },
    editManager(manager) {
      // Logique pour modifier un manager
      console.log('Modifier le manager:', manager)
    },
    deleteManager(managerId) {
      // Logique pour supprimer un manager
      console.log("Supprimer le manager avec l'ID:", managerId)
      this.managers = this.managers.filter((manager) => manager.id !== managerId)
    }
    // Méthodes pour ajouter, éditer, supprimer des managés seraient similaires
  }
}
</script>

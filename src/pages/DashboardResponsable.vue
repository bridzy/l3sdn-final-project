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

    <!-- Formulaire d'ajout d'un Managé - Popup -->
    <q-dialog v-model="showAddManage">
      <q-card>
        <q-card-section>
          <div class="text-h6">Ajouter un Managé</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newManage.username" label="Nom d'utilisateur" />
          <q-input v-model="newManage.password" label="Mot de passe" type="password" />
          <!-- Ajoutez d'autres champs au besoin -->
        </q-card-section>

        <q-card-section align="right">
          <q-btn v-close-popup flat label="Annuler" color="primary" />
          <q-btn flat label="Ajouter" color="primary" @click="addManage" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Liste des Managers (inchangé) -->

    <!-- Liste des Managés -->
    <div>
      <div class="text-subtitle1 q-mt-md">Managés</div>
      <q-list bordered>
        <q-item v-for="manage in manages" :key="manage.id">
          <q-item-section>{{ manage.username }}</q-item-section>
          <q-item-section side top>
            <q-btn flat icon="edit" @click="editManage(manage)" />
            <q-btn flat icon="delete" @click="deleteManage(manage.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddManager: false,
      showAddManage: false,
      newManager: { username: '', password: '' },
      newManage: { username: '', password: '' }, // Nouveau managé
      managers: [],
      manages: [] // Liste des managés pour l'affichage
    }
  },
  created() {
    this.loadManagers()
    this.loadManages() // Chargez les managés existants lors de la création du composant
  },
  methods: {
    loadManagers() {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      this.managers = users.filter((user) => user.role === 'manager')
    },
    loadManages() {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      this.manages = users.filter((user) => user.role === 'manage')
    },
    addManager() {
      const newManager = { ...this.newManager, id: Date.now(), role: 'manager' }
      this.managers.push(newManager)

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      users.push(newManager)
      localStorage.setItem('users', JSON.stringify(users))

      this.newManager = { username: '', password: '' }
      this.showAddManager = false
    },
    addManage() {
      const newManage = { ...this.newManage, id: Date.now(), role: 'manage' }
      this.manages.push(newManage)

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      users.push(newManage)
      localStorage.setItem('users', JSON.stringify(users))

      this.newManage = { username: '', password: '' }
      this.showAddManage = false
    },
    editManager(manager) {
      // La logique pour éditer un manager peut être complexe car cela implique
      // généralement un formulaire de mise à jour et la réflexion des changements dans localStorage.
      // Cette implémentation dépend de la façon dont vous gérez les mises à jour dans votre UI.
      console.log('Modifier le manager:', manager)
      // Placez ici la logique de mise à jour.
    },
    deleteManager(managerId) {
      this.managers = this.managers.filter((manager) => manager.id !== managerId)

      const users = JSON.parse(localStorage.getItem('users'))
      const updatedUsers = users.filter((user) => user.id !== managerId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    },
    editManage(manage) {
      // Similaire à editManager, la logique pour éditer un managé dépend de votre UI.
      console.log('Modifier le managé:', manage)
      // Placez ici la logique de mise à jour.
    },
    deleteManage(manageId) {
      this.manages = this.manages.filter((manage) => manage.id !== manageId)

      const users = JSON.parse(localStorage.getItem('users'))
      const updatedUsers = users.filter((user) => user.id !== manageId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
  }
}
</script>

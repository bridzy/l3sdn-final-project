<template>
   <q-page class="dashboard-responsable">
    <div class="header">
      <h2>Tableau de Bord du Responsable</h2>
      <div class="action-buttons">
        <q-btn label="Ajouter un Manager" color="primary" class="action-button" @click="openDialog('manager')" />
        <q-btn label="Ajouter un Managé" color="primary" class="action-button" @click="openDialog('manage')" />
        <q-btn label="Planifier un Entretien" color="secondary" class="action-button" @click="showScheduleInterviewDialog = true" />
      </div>
    </div>

    <!-- Dialogues pour l'ajout et l'édition des managers et des managés -->
    <q-dialog v-model="showAddManager">
      <q-card>
        <q-card-section class="text-h6">Ajouter un Manager</q-card-section>
        <q-card-section>
          <q-input v-model="formData.username" label="Nom d'utilisateur" />
          <q-input v-model="formData.password" label="Mot de passe" type="password" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn v-close-popup flat label="Annuler" color="primary" />
          <q-btn flat label="Confirmer" color="primary" @click="saveItem('manager')" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAddManage">
      <q-card>
        <q-card-section class="text-h6">Ajouter un Managé</q-card-section>
        <q-card-section>
          <q-input v-model="formData.username" label="Nom d'utilisateur" />
          <q-input v-model="formData.password" label="Mot de passe" type="password" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn v-close-popup flat label="Annuler" color="primary" />
          <q-btn flat label="Confirmer" color="primary" @click="saveItem('manage')" />
        </q-card-section>
      </q-card>
    </q-dialog>
      
      <!-- Dialogue pour la planification d'un entretien -->
      <q-dialog v-model="showScheduleInterviewDialog">
      <q-card>
        <q-card-section class="text-h6">Planifier un Entretien</q-card-section>
        <q-card-section>
          <q-select v-model="interview.managerId" label="Sélectionner un Manager" :options="managerOptions" />
          <q-input v-model="interview.date" filled mask="####-##-##" label="Date (YYYY-MM-DD)" />
          <q-input v-model="interview.time" filled mask="##:##" label="Heure (HH:MM)" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn v-close-popup flat label="Annuler" color="primary" />
          <q-btn flat label="Planifier" color="secondary" @click="scheduleInterview" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Liste des Managers -->
    <div class="text-subtitle1 q-mt-md">Managers</div>
    <q-list bordered>
      <q-item v-for="manager in managers" :key="manager.id">
        <q-item-section>{{ manager.username }}</q-item-section>
        <q-item-section side top>
          <q-btn flat icon="edit" @click="editItem(manager, 'manager')" />
          <q-btn flat icon="delete" @click="deleteItem(manager.id, 'manager')" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Liste des Managés -->
    <div class="text-subtitle1 q-mt-md">Managés</div>
    <q-list bordered>
      <q-item v-for="manage in manages" :key="manage.id">
        <q-item-section>{{ manage.username }}</q-item-section>
        <q-item-section side top>
          <q-btn flat icon="edit" @click="editItem(manage, 'manage')" />
          <q-btn flat icon="delete" @click="deleteItem(manage.id, 'manage')" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddManager: false,
      showAddManage: false,
      showScheduleInterviewDialog: false,
      formData: { id: null, username: '', password: '' },
      interview: { managerId: null, date: '', time: '' },
      managers: [],
      manages: [],
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    managerOptions() {
      return this.managers.map(manager => ({ label: manager.username, value: manager.id }))
    },
  },
  methods: {
    loadData() {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      this.managers = users.filter(user => user.role === 'manager')
      this.manages = users.filter(user => user.role === 'manage')
    },
    openDialog(type, action, item = null) {
      this.formData = item ? { ...item } : { id: null, username: '', password: '' }
      if (type === 'manager') this.showAddManager = true
      if (type === 'manage') this.showAddManage = true
    },
    saveItem(type) {
      let users = JSON.parse(localStorage.getItem('users') || '[]')
      if (this.formData.id) {
        const index = users.findIndex(user => user.id === this.formData.id)
        users[index] = { ...users[index], ...this.formData }
      } else {
        const newItem = { ...this.formData, id: Date.now(), role: type }
        users.push(newItem)
      }
      localStorage.setItem('users', JSON.stringify(users))
      this.showAddManager = false
      this.showAddManage = false
      this.loadData()
    },
    deleteItem(id, type) {
      let users = JSON.parse(localStorage.getItem('users') || '[]')
      users = users.filter(user => user.id !== id)
      localStorage.setItem('users', JSON.stringify(users))
      this.loadData()
    },
    editItem(item, type) {
      this.openDialog(type, 'edit', item)
    },
    scheduleInterview() {
      if (!this.interview.managerId || !this.interview.date || !this.interview.time) {
        this.$q.notify({
          color: 'negative',
          message: 'Tous les champs sont requis pour planifier un entretien.'
        })
        return
      }

      let users = JSON.parse(localStorage.getItem('users') || '[]')
      const index = users.findIndex(user => user.id === this.interview.managerId)

      if (index !== -1) {
        if (!users[index].entretiens) {
          users[index].entretiens = []
        }

        users[index].entretiens.push({
          date: this.interview.date,
          time: this.interview.time
        })

        localStorage.setItem('users', JSON.stringify(users))
        this.showScheduleInterviewDialog = false
        this.interview = { managerId: null, date: '', time: '' }
        this.$q.notify({
          color: 'positive',
          message: 'L\'entretien a été planifié avec succès.'
        })
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Manager non trouvé.'
        })
      }
    },
  }
}
</script>
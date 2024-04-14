<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Gestion des Managés</div>
    <q-btn color="primary" label="Ajouter un Managé" @click="openManageDialog({})" />
    <q-list bordered class="q-mt-md">
      <q-item v-for="manage in manages" :key="manage.id">
        <q-item-section>
          {{ manage.username }} - Entretien: {{ manage.entretienDate || 'Non planifié' }}
        </q-item-section>
        <q-item-section side top>
          <q-btn flat icon="edit" @click="() => openManageDialog(manage)" />
          <q-btn flat icon="delete" @click="() => deleteManage(manage.id)" />
          <q-btn flat icon="event" @click="() => openScheduleDialog(manage)" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Dialog for Adding/Editing a Manage -->
    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <q-input v-model="currentManage.username" label="Nom d'utilisateur" />
          <q-input v-model="currentManage.password" type="password" label="Mot de passe" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Annuler" @click="resetDialog" />
          <q-btn flat label="Sauvegarder" @click="saveManage" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog for Scheduling an Interview -->
    <q-dialog v-model="scheduleDialogOpen">
      <q-card>
        <q-card-section>
          <q-input v-model="currentManage.entretienDate" type="date" label="Date d'entretien" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Annuler" @click="resetScheduleDialog" />
          <q-btn flat label="Planifier" @click="saveEntretien" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      manages: [],
      currentManage: { id: null, username: '', password: '', entretienDate: '' },
      dialogOpen: false,
      scheduleDialogOpen: false
    }
  },
  methods: {
    loadManages() {
      // Assurez-vous d'initialiser userActions dans votre script localStorage ou main.js
      this.manages = window.userActions.getUsers().filter((user) => user.role === 'manage')
    },
    openManageDialog(manage) {
      this.currentManage = manage
        ? { ...manage }
        : { id: null, username: '', password: '', entretienDate: '' }
      this.dialogOpen = true
    },
    openScheduleDialog(manage) {
      this.currentManage = { ...manage }
      this.scheduleDialogOpen = true
    },
    saveManage() {
      if (!this.currentManage.id) {
        window.userActions.addUser(
          this.currentManage.username,
          this.currentManage.password,
          'manage'
        )
      } else {
        window.userActions.modifyUser(this.currentManage.id, {
          username: this.currentManage.username,
          password: this.currentManage.password
          // Assurez-vous d'inclure entretienDate si vous la modifiez aussi dans ce dialogue
        })
      }
      this.resetDialog()
      this.loadManages()
    },
    deleteManage(id) {
      window.userActions.deleteUser(id)
      this.loadManages()
    },
    saveEntretien() {
      window.userActions.modifyUser(this.currentManage.id, {
        entretienDate: this.currentManage.entretienDate
      })
      this.resetScheduleDialog()
      this.loadManages()
    },
    resetDialog() {
      this.dialogOpen = false
      this.currentManage = { id: null, username: '', password: '', entretienDate: '' }
    },
    resetScheduleDialog() {
      this.scheduleDialogOpen = false
      // Pas besoin de réinitialiser currentManage ici si vous voulez garder les modifications non enregistrées accessibles
    }
  },
  created() {
    this.loadManages()
  }
}
</script>

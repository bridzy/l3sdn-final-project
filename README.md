# IMPORTANT ! 
## Configuration de l'utilisateur responsable

Étant donné que j'ai mis en place une base de données locale (`localStorage`), il est nécessaire d'ajouter au moins un utilisateur, le responsable, pour pouvoir se connecter et créer d'autres utilisateurs.

Voici un script que vous pouvez exécuter dans la console de votre navigateur lorsque vous lancez le projet. Ce script ajoutera automatiquement les utilisateurs à la base de données :

```javascript
const users = [
  { id: 1, username: 'responsable', password: 'resp123', role: 'responsable' },
  { id: 2, username: 'manager', password: 'man123', role: 'manager' },
  { id: 3, username: 'manage', password: 'manag123', role: 'manage' }
];

localStorage.setItem('users', JSON.stringify(users));

""

# Quasar App (quasar-project)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

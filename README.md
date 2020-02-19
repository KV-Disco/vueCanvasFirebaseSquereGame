# Vue Firebase multyuser interacion test

In this small project, I'm testing the plausibility of using firebase to make a small multiplayer 2d game.

## Project setup

```
yarn install
```

You will need to create a file `firebaseConfig.js` on the src and export from there the configuration of your firebase.

The file shoul contain something like this:

```
export default {
  apiKey: "<your apiKey>",
  authDomain: "<your authDomain>",
  databaseURL: "<your databaseURL>",
  projectId: "<your projectId>",
  storageBucket: "<your storageBucket>",
  messagingSenderId: "<your messagingSenderId>",
  appId: "<your appId>"
};
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Vue Firebase multyuser interacion test

In this small project, I'm testing the plausibility of using firebase to make a small multiplayer 2d game.

For now is liited to 2 users at the same time.

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

The first time you start the app your firebase database is probably empty, don't worry the file Game.vue checks if the database has the necessary information, if not it creates the 2 necessaries docs.

The database will probably end looking like this:

```
{
  "cubes" : {
    "-M0IhrnZmylmFy-Ar5Ef" : {
      "color" : "blue",
      "online" : false,
      "x" : 20,
      "y" : 20
    },
    "-M0IjLvQ3aMOIxY579GU" : {
      "color" : "red",
      "online" : false,
      "x" : 20,
      "y" : 20
    }
  }
}
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

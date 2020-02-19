<template>
  <div v-if="cubeKey && otherCubeKey && currentCubeInit">
    <!--  eslint-disable -->
    <CanvasGame
      :cubeKey="cubeKey"
      :currentCubeInit="currentCubeInit"
      :otherCubeKey="otherCubeKey"
      :cubesRef="cubesRef"
    />
    <!--  eslint-enabled -->
  </div>
</template>

<script>
// @ is an alias to /src
import Firebase from "firebase";
import config from "@/firebaseConfig";
import CanvasGame from "@/components/CanvasGame/CanvasGame.vue";

let app = Firebase.initializeApp(config);
let db = app.database();
let cubesRef = db.ref("cubes");

export default {
  name: "Game",
  data() {
    return {
      cubeKey: null,
      cubesRef,
      currentCubeInit: null
    };
  },
  components: {
    CanvasGame
  },
  methods: {
    poluteDataBase() {
      const newCube = {
        online: false,
        x: 20,
        y: 20
      };
      let nextStep = false;
      const restart = nextStep => {
        if (nextStep) {
          this.start();
        }
      };

      this.cubesRef.push({ ...newCube, color: "blue" }).then(() => {
        restart(nextStep);
        nextStep = true;
      });
      this.cubesRef.push({ ...newCube, color: "red" }).then(() => {
        restart(nextStep);
        nextStep = true;
      });
    },
    selecCube(docs) {
      const keys = Object.keys(docs);
      this.cubeKey = keys.find(key => docs[key].online == false);
      if (this.cubeKey) {
        this.currentCubeInit = docs[this.cubeKey];
        cubesRef.child(this.cubeKey).update({ online: true });
      }
      this.otherCubeKey = keys.find(key => key !== this.cubeKey);
    },
    start() {
      cubesRef.once("value", snap => {
        const docs = snap.val();
        if (!docs) {
          this.poluteDataBase();
        } else {
          this.selecCube(docs);
        }
      });
    }
  },
  mounted() {
    this.start();
  }
};
</script>

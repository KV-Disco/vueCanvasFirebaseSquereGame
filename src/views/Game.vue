<template>
  <div v-if="cubeKey && otherCubeKey">
    <!--  eslint-disable -->
    <CanvasGame :cubeKey="cubeKey" :otherCubeKey="otherCubeKey" :cubesRef="cubesRef" />
    <!--  eslint-enabled -->
  </div>
</template>

<script>
// @ is an alias to /src
import Firebase from "firebase";
import config from "@/config";
import CanvasGame from "@/components/CanvasGame/CanvasGame.vue";

let app = Firebase.initializeApp(config);
let db = app.database();
let cubesRef = db.ref("cubes");

export default {
  name: "Game",
  data() {
    return {
      cubeKey: null,
      cubesRef
    };
  },
  components: {
    CanvasGame
  },
  mounted() {
    cubesRef.once("value", snap => {
      const docs = snap.val();
      const keys = Object.keys(docs);

      this.cubeKey = keys.find(key => docs[key].online == false);
      if (this.cubeKey) cubesRef.child(this.cubeKey).update({ online: true });
      this.otherCubeKey = keys.find(key => key !== this.cubeKey);
    });
  }
};
</script>

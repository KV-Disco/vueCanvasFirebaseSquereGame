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
import config from "@/fireBaseConfig";
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
  mounted() {
    cubesRef.once("value", snap => {
      const docs = snap.val();
      const keys = Object.keys(docs);

      this.cubeKey = keys.find(key => docs[key].online == false);
      if (this.cubeKey) {
        this.currentCubeInit = docs[this.cubeKey];
        cubesRef.child(this.cubeKey).update({ online: true });
      }
      this.otherCubeKey = keys.find(key => key !== this.cubeKey);
    });
  }
};

//this.cubesRef
//  .push({
//    color: "red",
//    x: 20,
//    y: 20,
//    width: 20,
//    height: 20,
//    ySpeed: 0,
//    gravity: 0.5,
//    xSpeed: 0,
//    friction: 0.4,
//    acceleration: 0.3,
//    jumpForce: 8,
//    xBounce: false,
//    yBounce: false,
//    alreadyJumped: false,
//    online: false,
//    movement: {
//      left: false,
//      right: false,
//      jump: false
//    }
//  })
//  .then(cube => {
//    this.cubeKey = cube.key;
//  });
</script>

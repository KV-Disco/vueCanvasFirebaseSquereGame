<template>
  <div v-if="cubeKey">
    <CanvasGame :cubeKey="cubeKey" :cubesRef="cubesRef" />
  </div>
</template>

<script>
// @ is an alias to /src
import Firebase from "firebase";
import config from "@/config";
import CanvasGame from "@/components/CanvasGame/CanvasGame.vue";

let app = Firebase.initializeApp(config);
console.log("app", app);
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
    this.cubesRef
      .push({
        color: "red",
        x: 20,
        y: 20,
        width: 20,
        height: 20,
        ySpeed: 0,
        gravity: 0.5,
        xSpeed: 0,
        friction: 0.4,
        acceleration: 0.3,
        jumpForce: 8,
        xBounce: false,
        yBounce: false,
        alreadyJumped: false,
        movement: {
          left: false,
          right: false,
          jump: false
        }
      })
      .then(cube => {
        this.cubeKey = cube.key;
      });
  },
  destroyed() {
    const updates = {
      [this.cubeKey]: null
    };

    this.cubesRef.update(updates);
  }
};
</script>

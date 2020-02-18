<template>
  <div id="game">
    <canvas id="myGame" ref="canvas"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
// import db from "@/main.js";
// console.log("db", db);

// let cubesRef = db.ref("cubes");

export default {
  name: "CanvasGame",
  firebase() {
    return {
      otherCube: this.cubesRef.child(this.otherCubeKey)
    };
  },

  /////////////////////////////////////////////
  ////                 DATA                ////
  /////////////////////////////////////////////
  data() {
    return {
      canvas: null,
      ctx: null,
      currentCubeRef: this.cubesRef.child(this.cubeKey),
      canvasObj: {
        width: 650,
        height: 450
      },
      currentCube: {
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
        online: false,
        movement: {
          left: false,
          right: false,
          jump: false
        }
      }
    };
  },
  props: {
    cubeKey: String,
    otherCubeKey: String,
    cubesRef: Object,
    currentCubeInit: Object
  },

  /////////////////////////////////////////////
  ////              COMPUTED               ////
  /////////////////////////////////////////////
  computed: {
    fps() {
      return 1000 / 60;
    },
    floor() {
      return {
        color: "green",
        x: 0,
        y: this.canvasObj.height - 30,
        width: this.canvasObj.width,
        height: this.canvasObj.height - (this.canvasObj.height - 30)
      };
    }
  },

  /////////////////////////////////////////////
  ////               METHODS               ////
  /////////////////////////////////////////////
  methods: {
    returnData() {
      return this.canvasObj;
    },
    rectangle({ width, height, color, x, y }) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    },
    drawCanvas({ width, height }) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, width, height);
    },
    cubeGravity() {
      const cube = this.currentCube;
      const { y: cubeY, height: cubeHeight, gravity, ySpeed } = cube;
      const { y: floorY } = this.floor;

      this.currentCube.y += this.currentCube.ySpeed;

      // Cube is falling
      if (cubeY <= floorY - cubeHeight) {
        // Max Velocity
        if (ySpeed <= 30) {
          this.currentCube.ySpeed += gravity;
        }
      } else {
        this.currentCube.alreadyJumped = false;
        this.currentCube.ySpeed = 0;
        this.currentCube.y = floorY - cubeHeight;
        if (ySpeed >= 4) this.currentCube.ySpeed = (ySpeed / 3) * -1;
      }
    },
    xMovement(direction) {
      const {
        x: cubeX,
        width: cubeWidth,
        xSpeed,
        acceleration
      } = this.currentCube;
      const { width: canvasWidth } = this.canvasObj;

      this.currentCube.x += xSpeed * direction;

      // Cube is falling
      if (cubeX >= 0 && cubeX <= canvasWidth - cubeWidth) {
        // Max Velocity
        if (xSpeed <= 5) {
          this.currentCube.xSpeed += acceleration;
        }
      } else {
        this.currentCube.xSpeed = 0;
        if (cubeX >= canvasWidth - cubeWidth)
          this.currentCube.x = canvasWidth - cubeWidth;
        if (cubeX <= 0) this.currentCube.x = 0;
      }
    },
    cube1Jump() {
      const { alreadyJumped, jumpForce } = this.currentCube;

      if (!alreadyJumped) {
        this.currentCube.alreadyJumped = true;
        this.currentCube.ySpeed = jumpForce * -1;
      }
    },
    friction() {
      const { movement } = this.currentCube;
      const { left, right } = movement;

      // console.log('!(left && right): ', !(left && right));
      if (!(left || right)) {
        this.currentCube.xSpeed = 0;
      }
    },
    cube1Movement() {
      const { movement } = this.currentCube;
      const { left, right, jump } = movement;
      if (left) this.xMovement(-1);
      if (right) this.xMovement(1);
      if (jump) this.cube1Jump();
      this.friction();
    },
    keyDown(e) {
      const code = e.keyCode;

      switch (code) {
        case 65:
          this.currentCube.movement.left = true;
          break; //"a" key
        case 37:
          if (this.jump) return;
          this.currentCube.movement.left = true;
          break; //Left key
        case 87:
          if (this.jump) return;
          this.currentCube.movement.jump = true;
          break; //"w" key
        case 38:
          this.currentCube.movement.jump = true;
          break; //Up key
        case 68:
          this.currentCube.movement.right = true;
          break; //"d" key
        case 39:
          this.currentCube.movement.right = true;
          break; //Right key
        // case 83:
        //   cPosY += 5;
        //   break; //"s" key
        // case 40:
        //   cPosY += 5;
        //   break; //Down key
        default:
          console.log(code); //Everything else
      }
    },
    keyUp(e) {
      const code = e.keyCode;

      switch (code) {
        case 65:
          this.currentCube.movement.left = false;
          break; //"a" key
        case 37:
          this.currentCube.movement.left = false;
          break; //Left key
        case 87:
          this.currentCube.movement.jump = false;
          break; //"w" key
        case 38:
          this.currentCube.movement.jump = false;
          break; //Up key
        case 68:
          this.currentCube.movement.right = false;
          break; //"d" key
        case 39:
          this.currentCube.movement.right = false;
          break; //Right key
        // case 83:
        //   cPosY += 5;
        //   break; //"s" key
        // case 40:
        //   cPosY += 5;
        //   break; //Down key
        default:
          console.log(code); //Everything else
      }
    },
    createCube() {
      this.cubeGravity();
      this.cube1Movement();
      this.rectangle(this.currentCube);
    },
    setCube() {
      const { x, y } = this.currentCube;
      this.currentCubeRef.update({ x, y });
    }
  },

  /////////////////////////////////////////////
  ////               MOUNTED               ////
  /////////////////////////////////////////////
  mounted() {
    this.currentCubeRef.onDisconnect().update({ online: false });
    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);
    this.currentCube.x = this.currentCubeInit.x;
    this.currentCube.y = this.currentCubeInit.y;
    this.currentCube.color = this.currentCubeInit.color;
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    let count = 0;

    const nuevaFotograma = () => {
      count += 1;
      this.drawCanvas(this.canvasObj);
      if (this.otherCube) {
        this.rectangle({
          ...this.otherCube,
          width: this.currentCube.width,
          height: this.currentCube.height
        });
      }
      this.createCube(this.cubeKey);
      this.rectangle(this.floor);

      if (count == 1) {
        count = 0;
        this.setCube();
      }

      window.requestAnimationFrame(nuevaFotograma);
    };

    window.requestAnimationFrame(nuevaFotograma);

    // setInterval(() => {
    //   count += 1;
    //   this.drawCanvas(this.canvasObj);
    //   this.createCube(this.cubeKey);
    //   if (this.otherCube) {
    //     this.rectangle({
    //       ...this.otherCube,
    //       width: this.currentCube.width,
    //       height: this.currentCube.height
    //     });
    //   }
    //   this.rectangle(this.floor);

    //   if (count == 1) {
    //     count = 0;
    //     this.setCube();
    //   }
    // }, this.fps);
  },
  beforeDestroy() {
    this.currentCubeRef.update({ online: false });
  }
};
</script>

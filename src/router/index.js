import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";
import CanvasTestPage from "../views/CanvasTestPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  },
  {
    path: "/canvas-test",
    name: "Canvas",
    component: CanvasTestPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

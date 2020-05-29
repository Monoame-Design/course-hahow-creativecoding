import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Notes from "../views/Notes.vue";
import Test from "../views/Test.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {}
    //import("../views/About.vue")
  } //webpackChunkName: "about"
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

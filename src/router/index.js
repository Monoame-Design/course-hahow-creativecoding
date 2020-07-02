import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Articles from "../views/Articles.vue";
import Article from "../views/Article.vue";
import Notes from "../views/Notes.vue";
import Note from "../views/Note.vue";
import Test from "../views/Test.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Notes
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/articles/:id?",
    name: "Articles",
    component: Articles
  },
  {
    path: "/article/:id?",
    name: "Article",
    component: Article
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes
  },
  {
    path: "/note/:hash",
    name: "Note",
    component: Note
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

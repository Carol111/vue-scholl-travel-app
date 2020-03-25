import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  },
  {
    path: "/brazil",
    name: "Brazil",
    component: function() {
      return import(/* webpackChunkName: "brazil" */ "../views/Brazil.vue");
    }
  },
  {
    path: "/hawaii",
    name: "Hawaii",
    component: function() {
      return import(/* webpackChunkName: "hawaii" */ "../views/Hawaii.vue");
    }
  },
  {
    path: "/jamaica",
    name: "Jamaica",
    component: function() {
      return import(/* webpackChunkName: "jamaica" */ "../views/Jamaica.vue");
    }
  },
  {
    path: "/panama",
    name: "Panama",
    component: function() {
      return import(/* webpackChunkName: "panama" */ "../views/Panama.vue");
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;

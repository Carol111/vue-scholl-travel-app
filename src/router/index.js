import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

Vue.use(VueRouter);

const linkExactActiveClass = "vue-school-active-class";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/details/:id",
    name: "DestinationDetails",
    component: function() {
      return import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails"
      );
    }
  }
];

const router = new VueRouter({
  linkExactActiveClass,
  routes
});

export default router;

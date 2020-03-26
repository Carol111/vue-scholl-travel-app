import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

Vue.use(VueRouter);

const mode = "history";

const linkExactActiveClass = "vue-school-active-class";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/details/:slug",
    name: "DestinationDetails",
    props: true,
    component: function() {
      return import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails"
      );
    }
  }
];

const router = new VueRouter({
  mode,
  linkExactActiveClass,
  routes
});

export default router;

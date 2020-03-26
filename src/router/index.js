import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import store from "@/store";

Vue.use(VueRouter);

const mode = "history";

const linkExactActiveClass = "vue-school-active-class";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: function() {
      return import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails"
      );
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: function() {
          return import(
            /* webpackChunkName: "experienceDetails" */ "../views/ExperienceDetails"
          );
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        destination => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "notFound" });
      }
    }
  },
  {
    path: "404",
    alias: "*",
    name: "notFound",
    component: function() {
      return import(/* webpackChunkName: "notFound" */ "../views/NotFound");
    }
  }
];

const router = new VueRouter({
  mode,
  linkExactActiveClass,
  routes
});

export default router;

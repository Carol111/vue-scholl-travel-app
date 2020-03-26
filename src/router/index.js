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
    ]
  }
];

const router = new VueRouter({
  mode,
  linkExactActiveClass,
  routes
});

export default router;

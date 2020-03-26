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
    path: "/user",
    name: "user",
    component: function() {
      return import(/* webpackChunkName: "user" */ "../views/User");
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: function() {
      return import(/* webpackChunkName: "login" */ "../views/Login");
    }
  },
  {
    path: "/invoices",
    name: "invoices",
    component: function() {
      return import(/* webpackChunkName: "invoices" */ "../views/Invoices");
    },
    meta: {
      requiresAuth: true
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "experience") {
          position.offset = { y: 100 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

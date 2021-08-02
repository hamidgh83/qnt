import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./stores/user";

Vue.use(Router);

const router = new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: "Dashboard",
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        title: "Register",
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  var routes = ["login", "register"]
  
  /* Redirect to home if user is logged in */
  if (localStorage.token && routes.indexOf(to.name) > -1) {
    return router.push({ name: "dashboard" })
  }
  
  /* Redirect to login if user is logged out */
  if (!localStorage.token) {
    if (routes.indexOf(to.name) == -1) {
      return router.push({ name: "login" })
    }
  }

  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
    store.state.pageTitle = to.meta.title;
  }

  return next();
});

export default router;

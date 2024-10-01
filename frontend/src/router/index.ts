import { createRouter, createWebHistory } from "vue-router";
import AddProjectView from "../pages/AddProjectView.vue";
import AddUserView from "../pages/AddUserView.vue";
import EditUserView from "../pages/EditUserView.vue";
import ListProjectView from "../pages/ListProjectView.vue";
import UsersView from "../pages/ListUsersView.vue";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import { isAdmin } from "../utils/checkAdmin";

const routes = [
  { path: "/", redirect: "/users" },
  { path: "/users", component: UsersView, meta: { requiresAdmin: true } },
  { path: "/users/add", component: AddUserView, meta: { requiresAdmin: true } },
  {
    path: "/users/:id",
    component: EditUserView,
    meta: { requiresAdmin: true },
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  {
    path: "/projects",
    alias: "/myprojects",
    component: ListProjectView,
    meta: { requiresAdmin: true },
  },
  {
    path: "/projects/add",
    component: AddProjectView,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin && !isAdmin()) {
    next("/login");
  } else {
    next();
  }
});

export default router;

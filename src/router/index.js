import { createRouter, createWebHistory } from 'vue-router';

const jwt = require('jsonwebtoken');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import(/* webpackChunkName: "recipes" */ '../views/Recipes.vue'),
  },
  {
    path: '/recipe/:id',
    name: 'RecipePage',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/RecipePage.vue'),
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    meta: {
      requiresAuth: true,
      requiresAnon: false,
    },
    component: () => import(/* webpackChunkName: "add-recipe" */ '../views/AddRecipe.vue'),
  },
  {
    path: '/favourites',
    name: 'Favourites',
    meta: {
      requiresAuth: true,
      requiresAnon: false,
    },
    component: () => import(/* webpackChunkName: "favourites" */ '../views/Favourites.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAnon: true,
      requiresAuth: false,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresAnon: true,
      requiresAuth: false,
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let user;

  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);
    user = decodedToken.id;
  } catch (err) {
    // don't need to do anything here
  }

  if ((user && to.meta.requiresAnon) || (!user && to.meta.requiresAuth)) {
    return next('/');
  }
  return next();
});

export default router;

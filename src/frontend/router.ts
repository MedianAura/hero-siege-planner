import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

let allRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/home.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoutes,
  linkActiveClass: 'is-active',
});

export default router;

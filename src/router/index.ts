import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/artwork/:id',
    name: 'artwork',
    component: () => import('../views/ArtworkView.vue'),
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../views/RandomView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/trending',
    name: 'trending',
    component: () => import('../views/TrendingView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

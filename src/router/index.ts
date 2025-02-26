import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
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
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Check if the user is already logged in
  await authStore.fetchUser(); // Fetch the user data

  if (to.name === 'login' && authStore.isLoggedIn()) {
    next({ name: 'search' }); // Redirect logged-in users to the search page
  } else if (to.meta.requiresAuth && !authStore.isLoggedIn()) {
    next({ name: 'login' }); // Redirect to login page if not authenticated
  } else {
    next(); // Allow access to the route
  }
});

export default router;

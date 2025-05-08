import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import RankingView from '@/views/RankingView.vue';

const isAuthenticated = () => {
  const auth = useAuthStore();
  return auth.isAuthenticated;
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { public: true },
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView,
    meta: { requiresAuth: true },
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;

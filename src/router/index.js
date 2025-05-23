import { createRouter, createWebHistory } from 'vue-router';
import BlogView from '../views/BlogView.vue';  

const routes = [
  { path: '/', component: BlogView },
  { path: '/blogs', redirect: '/' },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

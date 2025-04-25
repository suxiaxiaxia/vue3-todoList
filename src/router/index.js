// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import TodoPage from '@/views/TodoPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/todos', component: TodoPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

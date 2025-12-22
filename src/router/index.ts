import { createWebHashHistory, createRouter } from 'vue-router';
import { staticRouter } from './static';

const routes = [
  ...staticRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default router;

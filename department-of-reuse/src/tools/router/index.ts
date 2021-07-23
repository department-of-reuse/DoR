import { createRouter, createWebHistory } from "vue-router";

import Home from '../../pages/Home.vue';
import Contributors from '@/pages/Contributors.vue';

const routerHistory = createWebHistory(process.env.BASE_URL);

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/', component: Home },
        { path: '/contributors', component: Contributors},
    ]
});

export default router;
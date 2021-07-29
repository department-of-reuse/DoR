import { createRouter, createWebHistory } from "vue-router";

import Home from '../../pages/Home.vue';
import Contributors from '@/pages/Contributors.vue';
import Paper from '@/pages/Paper.vue';

const routerHistory = createWebHistory(process.env.BASE_URL);

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/', component: Home, name: "home" },
        { path: '/contributors', component: Contributors, name: "contributors"},
        { path: '/doi/:doiPrefix/:doiSuffix', component: Paper, name: "paper" },
    ]
});

export default router;
import { createRouter, createWebHistory } from "vue-router";

import Home from '../../pages/Home.vue';
import Contributors from '@/pages/Contributors.vue';
import Paper from '@/pages/Paper.vue';
import ReuseData from '@/pages/ReuseData.vue';
import ReuseMetrics from '@/pages/ReuseMetrics.vue'

const routerHistory = createWebHistory(process.env.BASE_URL);

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/', component: Home, name: "home" },
        { path: '/contributors', component: Contributors, name: "contributors"},
        { path: '/doi/:doiPrefix/:doiSuffix', component: Paper, name: "paper" },
        { path: '/rmetrics', component: ReuseMetrics, name: "reusemetrics"}
    ]
});

export default router;
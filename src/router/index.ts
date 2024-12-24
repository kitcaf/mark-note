// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layouts/layout.vue';
import Index from '../pages/index.vue';

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: Index,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
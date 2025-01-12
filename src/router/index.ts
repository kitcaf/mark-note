// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layouts/layout.vue';
import Index from '../pages/EditorIndex.vue';
import NoFile from '../pages/NoFile.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: Index,
                name: 'editorIndex'
            },
            {
                path: '/no-file',
                name: 'NoFile',
                component: NoFile
            }
        ],
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
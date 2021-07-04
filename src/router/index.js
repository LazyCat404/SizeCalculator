import { createRouter, createWebHashHistory } from "vue-router";


import Index from '../views/Index.vue';

const routes = [
    // 首页路由
    {
        path: '/',
        name: 'Index',
        meta:{requireAuth:true},
        component:Index  
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
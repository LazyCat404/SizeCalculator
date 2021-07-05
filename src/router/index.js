import { createRouter, createWebHashHistory } from "vue-router";


import Index from '../views/Index.vue';
import Recommend from '../views/Recommend.vue';

const routes = [
    // 首页路由
    {
        path: '/',
        name: 'Index',
        meta:{requireAuth:true},
        component:Index  
    },
    // 推荐
    {
        path: '/Recommend',
        name: 'Recommend',
        meta:{requireAuth:true},
        component:Recommend  
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
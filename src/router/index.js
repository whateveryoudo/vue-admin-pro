import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import LayoutInline from '@/layout/layout-inline'
import LayoutNormal from '@/layout/layout-normal'


const main1ChildRouters = [
    {
        path: 'main1',
        component: LayoutNormal,
        redirect: '/main1/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/main1//dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
]


//不需要判断动态判断权限的路由（一些通用页面）

const constantRoutes = [
    // {
    //     path : '/',
    //     redirect: '/login',
    // },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path : '/',
        component: LayoutInline,
        redirect: '/main1',
        children : main1ChildRouters
    }
]
const createRouter = () => new Router({
    routes : constantRoutes,
    scrollBehavior : () => ({y : 0})
})

const router = createRouter();


export default router


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


//不需要判断动态判断权限的路由（一些通用页面）

const constantRoutes = [
    {
        path : '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }
]
const createRouter = () => new Router({
    routes : constantRoutes,
    scrollBehavior : () => ({y : 0})
})

const router = createRouter();


export default router


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import LayoutOuter from '@/layout/layout-outer'
import LayoutInner from '@/layout/layout-inner'


const main1ChildRouters = [
    {
        path: 'main1',
        component: LayoutInner,
        redirect: '/main1/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/main1/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard'}
            }
        ]
    },
]



const main2ChildRouters = [
    {
        path: 'example',
        component: LayoutInner,
        redirect: '/main2/example/goodsList',
        children: [
            {
                path: 'goodsList',
                component: () => import('@/views/main2/example/goodsList'),
                name: 'GoodsList',
                meta: { title: 'GoodsList', icon: 'dashboard'}
            }
        ]
    },
]

//不需要判断动态判断权限的路由（一些通用页面）

export const  constantRoutes = [
    // {
    //     path : '/',
    //     redirect: '/login',
    // },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }
]

//需要根据用户角色 判断的路由
export const asyncRoutes = [
    {
        path : '\/',
        component: LayoutOuter,
        redirect: '/main1',
        children : main1ChildRouters,
        meta : {
            title : '菜单一'
        }
    },
    {
        path : '/main2',
        component: LayoutOuter,
        redirect: '/main2/example',
        children : main2ChildRouters,
        meta : {
            title : '菜单二'
        }
    }
];


const createRouter = () => new Router({
    routes : constantRoutes,
    scrollBehavior : () => ({y : 0})
})

const router = createRouter();


export default router


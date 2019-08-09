import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import LayoutOuter from '@/layout/layout-outer'
import LayoutInner from '@/layout/layout-inner'

const TplChildRouters = [
    {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/basic-tpl/dashboard/index'),
        meta: {
            title: 'Dashboard',
            icon: 'dashboard',
            affix : true
        }
    },
]

const main2ChildRouters = [
    {
        path: 'example',
        component: LayoutInner,
        redirect: '/main2/example/goodsList',
        meta: { title: '表格', icon: 'dashboard'},

        children: [
            {
                path: 'goodsList',
                component: () => import('@/views/main2/example/goodsList'),
                name: 'GoodsList',
                meta: { title: '商品列表'}
            },
            {
                path: 'userList',
                component: () => import('@/views/main2/example/userList'),
                name: 'UserList',
                meta: { title: '用户列表'}
            },
        ]
    },
]

//不需要判断动态判断权限的路由（一些通用页面）

export const  constantRoutes = [
    //添加redirect跳转路由（tabs刷新当前页）
    {
        path: '/redirect',
        component: LayoutOuter,
        hidden: true,
        children : [
            {
                path : '/redirect/:path*',//为什么加个* 才能匹配到？？
                component: () => import('@/views/redirect/index'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }
]

//需要根据用户角色 判断的路由
export const asyncRoutes = [
    {
        path : '/',
        component: LayoutOuter,
        redirect: '/basic-tpl',
        hiddenInNavbar : true
    },
    {
        path : '/basic-tpl',
        component: LayoutOuter,
        redirect: '/basic-tpl/dashboard',
        children : TplChildRouters,
        meta : {
            title : '基础模板'
        }
    },
    // {
    //     path : '/main2',
    //     component: LayoutOuter,
    //     redirect: '/main2/example',
    //     children : main2ChildRouters,
    //     meta : {
    //         title : '菜单二'
    //     }
    // }
];


const createRouter = () => new Router({
    routes : constantRoutes,
    scrollBehavior : () => ({y : 0})
})

const router = createRouter();


export default router


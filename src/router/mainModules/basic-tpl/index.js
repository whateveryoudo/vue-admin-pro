/**
 * fileName : basic-tpl.js
 * author:ykx
 * date：2019/8/10 17:15
 * desc：basic-tpl 路由模块（当子模块太长建议按照模块分割）
 */
import LayoutInner from '@/layout/layout-inner'
const BaseModulePath = '/basic-tpl'
const TplChildRouters = [
    {
        path: 'dashboard',
        name: 'Dashboard',
        component: LayoutInner,
        redirect:`${BaseModulePath}/dashboard/analysis`,
        meta: {
            title: 'dashboard',
            icon: 'dashboard'
        },
        children : [
            {
                path: 'analysis',
                name: 'Analysis',
                component: () => import('@/views/basic-tpl/dashboard/analysis'),
                meta : {
                    title : '分析页'
                }
            }
        ]
    },
    {
        path: 'tabulation',
        component: LayoutInner,
        redirect: '/basic-tpl/tabulation/basic-list',
        meta: { title: '列表页面', icon: 'dashboard'},

        children: [
            {
                path: 'basic-list',
                component: () => import('@/views/basic-tpl/tabulation/basic-list'),
                name: 'basic-list',
                meta: { title: '基础列表'}
            },
        ]
    },
]
export default TplChildRouters
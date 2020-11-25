import Vue from "vue"
import Router from "vue-router"

/* Layout */
import BasicLayout from "@/layout/BasicLayout"

Vue.use(Router);
// 不需要判断动态判断权限的路由（一些通用页面）

export const constantRoutes = [
  // 添加redirect跳转路由（tabs刷新当前页）
  {
    path: "/redirect",
    component: BasicLayout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*", // 为什么加个* 才能匹配到？？
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  }
]
const createRouter = () => new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 })
})

const router = createRouter();

export default router


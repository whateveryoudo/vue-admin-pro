// 后台映射路由
export default {
  BasicLayout: () => import("@/layout/BasicLayout"),
  Layout: () => import("@/layout/PageView"),
  // 动态添加路由
  //   Dashboard: () => import("@/views/dashboard/Index.vue"), // 看板界面
  //   UserManage: () => import("@/views/system/userManage/Index.vue"), // 用户管理
  //   MenuManage: () => import("@/views/system/menuManage/Index.vue"), // 菜单权限管理
  MenuManageList: () => import("@userSys/systemManage/menuManage"), // 菜单权限管理
  AppManageList: () => import("@userSys/systemManage/appManage") // 菜单权限管理
}

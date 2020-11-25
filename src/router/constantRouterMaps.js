// 后台映射路由
export default {
  BasicLayout: () => import("@/layout/BasicLayout"),
  Layout: () => import("@/layout/PageView"),
  // 动态添加路由
  AppManageList: () => import("@userSys/systemManage/appManage") // 应用权限管理
}

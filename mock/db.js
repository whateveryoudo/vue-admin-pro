// 应用列表数据（默认一条数据）
const appData = [
  { id: "5da58ac7800eca25b86d4496", name: "UserSystem", path: "/userSystem", component: "BasicLayout", showSider: true, title: "用户系统", code: "", instructions: "", sort: 1, createTime: "", status: 1, icon: "setting" }
];
// 应用映射菜单(id映射)
const treeMenuMap = {
  "5da58ac7800eca25b86d4496": [
    {
      path: "/systemManage",
      title: "系统管理",
      component: "Layout",
      meta: { title: "系统管理", elemIcon: "el-icon-setting" },
      children: [
        { path: "/menuManage", name: "MenuManage", meta: { elemIcon: "el-icon-menu", title: "菜单权限管理" }, component: "MenuManageList" },
        { path: "/appManage", name: "AppManage", meta: { elemIcon: "el-icon-s-shop", title: "应用管理" }, component: "AppManageList" }
      ]
    }
  ]
}
const paramsMap = {
  SYSTEM_MENU_TYPE: [
    { value: 1, label: "菜单" },
    { value: 2, label: "按钮" }
  ],
  ACCOUT_STATUS: [
    { value: 0, label: "禁用", color: "#f56c6c" },
    { value: 1, label: "启用", color: "#67c23a" }
  ],
  APP_STATUS: [
    { value: 0, label: "禁用", color: "#f56c6c" },
    { value: 1, label: "启用", color: "#67c23a" }
  ]
}
module.exports = {
  appData,
  treeMenuMap,
  paramsMap
}

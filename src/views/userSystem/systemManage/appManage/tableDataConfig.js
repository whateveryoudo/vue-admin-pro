
// 顶部搜索表单
export const searchFormData = [
  {
    label: "菜单/操作名称",
    component: "Input",
    fieldKey: "title"
  },
  {
    label: "组件/按钮标记",
    component: "Input",
    fieldKey: "component"
  }
]
// 顶部操作按钮集
export const searchOptData = [
  {
    name: "新增",
    func: "handleAdd",
    key: "check",
    group: "btns",
    btnType: "primary",
    sort: 1
  },
  {
    name: "批量删除",
    func: "handleDelete",
    key: "delete",
    group: "btns",
    btnType: "danger",
    sort: 2
  }
]
// 右侧按钮渲染数据
export const operationData = [
  {
    name: "查看",
    func: "handleDetail",
    key: "check",
    group: "btns",
    btnType: "success",
    sort: 1
  },
  {
    name: "编辑",
    func: "handleEdit",
    funcParams: [3],
    key: "edit",
    group: "btns",
    btnType: "primary",
    sort: 2
  },
  {
    name: "删除",
    func: "handleDelete",
    key: "delete",
    group: "btns",
    btnType: "danger",
    sort: 3
  }
]

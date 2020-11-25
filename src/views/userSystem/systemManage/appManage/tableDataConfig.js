
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

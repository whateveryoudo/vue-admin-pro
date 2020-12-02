const appData = require("./db").appData;
const { getUuid } = require("./util");
const treeMenuMap = require("./db").treeMenuMap;
const paramsMap = require("./db").paramsMap;
module.exports = [
  {
    url: "/system-api/sysParams",
    type: "post",
    response: (req) => {
      const type = req.body.type;
      return {
        code: 20000,
        data: paramsMap[type]
      }
    }
  },
  {
    url: "/system-api/getApps",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: appData
      }
    }
  },
  {
    url: "/system-api/fetchList",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: {
          list: appData,
          total: 1,
          page: 1,
          pageSize: 10
        }
      }
    }
  },
  {
    url: "/system-api/fetchDetail",
    type: "get",
    response: (req) => {
      const appInfo = appData.find(item => item.id === req.query.id) || {};
      return {
        code: 20000,
        data: appInfo
      }
    }
  },
  // 应用添加
  {
    url: "/system-api/addApp",
    type: "post",
    response: (req) => {
      const newApp = req.body;
      const id = getUuid();
      appData.push({ ...newApp, id });
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: "/system-api/getMenus",
    type: "get",
    response: (req) => {
      const { appId } = req.query;
      const curApp = appData.find(app => app.id === appId);
      const treeMemu = treeMenuMap[appId];
      // 这里构建添加首层应用路由结构
      const appRoute = [
        {
          path: "/",
          redirect: curApp.path
        },
        {
          ...curApp,
          meta: { icon: curApp.icon, title: curApp.title },
          children: treeMemu
        }
      ]
      return {
        code: 20000,
        data: appRoute
      }
    }
  }
]

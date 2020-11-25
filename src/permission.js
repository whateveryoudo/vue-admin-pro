/*
 *@description: 路由权限拦截
 *@author: zdww Chengdu r&d center
 *@date: 2020-05-14 11:31:24
 *@version: V1.0.5
 */
import router from "./router";
import store from "./store";
import constantRouterComponents from "@/router/constantRouterMaps"
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { Message } from "element-ui";
/*
 *@functionName: 递归路由过滤
 *@params {Array} routerMap 后台接口路由表（传入一维处理后的数据类型）
 *@params {Object} 父级路由对象（用于拼接path）
 */
export const filterAsyncRoutes = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      path: `${parent ? parent.path : ""}${item.path}`,
      name: item.name, // 用于keep-alive，确保唯一性
      component: constantRouterComponents[item.component], // 添加对应组件
      meta: item.meta
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith("http")) {
      currentRouter.path = currentRouter.path.replace("//", "/")
    }
    item.path === "/" && (currentRouter.redirect = item.redirect);
    // 含有子项则递归处理
    if (item.children && item.children.length > 0) {
      // 添加重定向
      currentRouter.redirect = `${currentRouter.path}${item.children[0].path}`;
      currentRouter.children = filterAsyncRoutes(item.children, currentRouter)
    }
    return currentRouter
  })
}

const whiteList = ["/login"];
NProgress.configure({ showSpinner: false }); // NProgress Configuration
let isAddedRoutes = false; // 是否追加过路由
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = store.state.user.token;
  if (hasToken) {
    // 已登录
    if (isAddedRoutes) {
      if (to.path === "/login") {
        // 已登录跳转首个返回地址
        const transformedRoutes = store.getters["permission/transformedRoutes"];
        const { path } = transformedRoutes[0];
        next({ path });
        NProgress.done();
      } else {
        const userInfo = store.state.user.userInfo;
        if (from.path === "/login") {
          Message({
            dangerouslyUseHTMLString: true,
            message:
              "<div><span style=\"color: rgb(64, 158, 255);margin-right:5px\">" +
              userInfo.name +
              "</span>,欢迎回来</div>",
            type: "success"
          });
        }
        next();
      }
    } else {
      let newRoutes = store.state.permission.newRoutes;
      let apps = store.state.permission.apps;
      if (!apps || apps.length === 0) {
        const res = await store.dispatch("permission/getApplication");
        if (res.code === 20000 && res.data) {
          apps = res.data;
          newRoutes = await store.dispatch("permission/generateRoutes", apps[0].id);
        }
      }
      console.log(newRoutes);
      router.addRoutes(newRoutes);
      isAddedRoutes = true;
      next({ ...to, replace: true });
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      to.fullPath === "/" ? next("/login") : next(`/login?redirect=${to.fullPath}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

/**
 * 检测传入的标识是否有权访问
 * @param {Array} permission
 * @desc 这里采用的是后台返回角色的标识，例如 ['admin','add'] , ['editor'] ,前端按钮绑定有操作权限的角色，是一个数据 例如       v-permission = ['editor', 'admin'] ，当然后台也可以返回根据模块来返回标识，前端同样的去匹配，例如后台返回['user:add','user:delete','menu:add']等等，前端使用 v-permission=['user:delete']等等
 */
export const checkPermission = (permissions) => {
  const permission = store.state.role || [];
  if (permissions && permissions instanceof Array && permissions.length > 0) {
    const hasPermission = permission.some(role => {
      return permissions.includes(role)
    })
    return hasPermission
  } else {
    throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
  }
}

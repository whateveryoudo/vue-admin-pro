import { getMenus, getApplication } from "@/api/user"
import { filterAsyncRoutes } from "@/permission"
/**
 * 递归路由为一维数组
 * @param {Array} routers - 过滤后的路由
 */
export const loopTranformRouter = (routers = []) => {
  let newRouter = [];
  routers.forEach(item => {
    const tmp = { ...item }
    const { path, children, meta } = tmp;
    if (children && children.length > 0) {
      newRouter = newRouter.concat(loopTranformRouter(children));
    } else {
      newRouter.push(meta && meta.code ? { path, code: meta.code } : { path }); // 考虑携带参数
    }
  })
  return newRouter
};
const state = {
  mainNavPath: "/basic-tpl", // 一级选中路由路径(默认首页)
  apps: [], // 用户能够访问的应用集合
  leftRoutes: [], // 用于左侧渲染
  newRoutes: [] // 后台路由集合
}

const getters = {
  // 转换后的一维数组
  transformedRoutes: (state) => {
    const { newRoutes } = state;
    if (newRoutes && newRoutes.length > 0) {
      return loopTranformRouter(newRoutes);
    }
    return []
  }
}
const mutations = {
  CHANGE_NAV: (state, path) => {
    state.mainNavPath = path;
  },
  SET_APPS: (state, apps) => {
    state.apps = apps;
  },
  SET_ROUTES: (state, routes) => {
    state.newRoutes = routes;
    state.leftRoutes = routes[1].children; // 注：这里取第二项，第一项添加了 / 重定向
  }
}
const actions = {
  // 根据用户获取相关应用列表
  async getApplication ({ commit }) {
    const res = await getApplication();
    commit("SET_APPS", res.data)
    return res;
  },
  // 获取菜单路由表
  async generateRoutes ({ commit }, appId) {
    const res = await getMenus(appId); // 获取后台路由表
    const accessedRoutes = filterAsyncRoutes(res.data);
    // 这里手动添加 404 界面
    accessedRoutes.push({
      path: "/404",
      component: () => import("@/views/errorPage/404.vue")
    })
    commit("SET_ROUTES", accessedRoutes)
    return accessedRoutes;
  }
}

export default {
  namespaced: true,
  mutations,
  state,
  actions,
  getters
}

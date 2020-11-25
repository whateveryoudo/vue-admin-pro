import Vue from "vue"
import Vuex from "vuex"
import { getFormatParams } from "@/api/common";
Vue.use(Vuex)
const state = {
  /** **字典表合集 start*****/
  SYSTEM_MENU_TYPE: [],
  ACCOUT_STATUS: [],
  APP_STATUS: []
  /** ***end*****/
}
const getters = {
  open: state => state.app.sidebar.open,
  roles: state => state.user.info.roles
}
const mutations = {
  SET_FORMATE_PARAMS: (state, payload) => {
    const { key, data } = payload;
    state[key] = data
  }
}
const actions = {
  // 获取指定模块参数
  async getParamsByType ({ commit }, payload) {
    const res = await getFormatParams(payload);
    if (res && res.code === 20000) {
      commit("SET_FORMATE_PARAMS", { key: payload.type, data: res.data });
    }
  }
}
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// console.log(modulesFiles);

// 讲modules下的文件按照文件名作为module名转为 {xx1 : {state,action} }
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 正则转换路径为module名  ./app.js => app

  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");// 研究下正则

  const value = modulesFiles(modulePath);

  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
  actions,
  mutations,
  state
})

export default store

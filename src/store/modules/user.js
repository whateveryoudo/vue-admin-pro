import { login, logOut } from "@/api/user"
import { getStore, setStore, removeStore } from "@/utils"
const state = {
  name: "",
  token: getStore("access_token") || "", // 默认获取本地存储的
  userInfo: getStore("user_info") ? JSON.parse(getStore("user_info")) : {}// 用户信息对象
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 设置用户信息
  SET_USETINFO: (state, info) => {
    state.userInfo = info;
  }
}
const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo;
    // return await login({username : username.trim(),password});
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(res => {
        const { token, userInfo } = res.data;
        // 将token保存 vuex
        commit("SET_TOKEN", token);
        commit("SET_USETINFO", userInfo);
        token && (setStore("access_token", token));
        userInfo && (setStore("user_info", JSON.stringify(userInfo)));
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  // 退出登录
  loginOut ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logOut({ token: state.token }).then(() => {
        // 清除vuex 本地数据
        commit("SET_TOKEN", "");
        commit("SET_USETINFO", {});
        removeStore("access_token");
        // TODO 重置路由
        resolve();
      }).catch(err => {
        reject(err);
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

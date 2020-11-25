// 全局一些配置
import { getStore, setStore } from "@/utils"

import { getLanguage } from "@/locales"

const state = {
  language: getLanguage(),
  sidebar: {
    open: !!Number(getStore("sideStatus")) || true // 左边展开/收起 default:展开
  }
}
const mutations = {
  // 修改左边 1 - 展开/ 0 - 收起
  TOGGLE_SIDEBAR: state => {
    state.sidebar.open = !state.sidebar.open;
    setStore("sideStatus", state.sidebar.open ? 1 : 0);
  },
  // 设置语言
  SET_LANGUAGE: (state, locale) => {
    state.language = locale;
    setStore("language", locale);
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

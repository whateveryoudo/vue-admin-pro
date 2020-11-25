/**
 * Created by 86159 on 2019/8/4.
 */

import variables from "@/styles/variables.scss"
import defaultSettings from "@/settings"

const { menuStyle, fixedSidebar, fixedHeader, hideHeaderScrolling, accordion, hideTabs } = defaultSettings;

const state = {
  theme: variables.theme,
  menuStyle: menuStyle, // 导航风格
  fixedSidebar: fixedSidebar,
  fixedHeader: fixedHeader,
  hideHeaderScrolling: hideHeaderScrolling,
  accordion: accordion,
  hideTabs: hideTabs
}

const mutations = {
  // 更新主题
  CHANGE_SETTING (state, { key, value }) {
    // 1.防止hasOwnProperty被重写，2.Object.create(null)的情况（此情况下{} 不含有原型，不具有Object方法）
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value;
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

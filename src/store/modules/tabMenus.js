// 标签module
import { getStore, setStore } from "@/utils"

console.log(getStore("activeIndex"));
const state = {
  tabs: JSON.parse(getStore("userTabs")) || [], // 存入标签对象
  cachedTabs: [], // 缓存组件（注意这里未写到getter中,当刷新router 需要从 keepalive 的include中移除 不能依赖tabs计算）
  activeIndex: getStore("activeIndex") || 0
  // tabs : [
  //     {title : '菜单1',path : '/',name : '1',icon : 'dashboard'},
  //     {title : '菜单2',path : '/basic-tpl',name : '2',icon : 'dashboard'}
  // ]  //存入标签对象
}
const getters = {
  activeTab: state => Number(state.activeIndex) + 1 + "" // element tabs 得name作为对应 name 为 索引值+1
}

/**
 *  统一更新state  tabs内容
 * @param  {Object}  state 状态集
 * @param  {Array}  prevTabs 转换前tabs
 */
const commonUpdateTabs = (state, prevTabs) => {
  // 重新更新name序列
  const sortedTabs = prevTabs.map((item, index) => {
    return {
      ...item,
      tabName: index + 1 + ""
    }
  });
    // 将用户tabs/activeIndex存入本地
  setStore("userTabs", JSON.stringify(sortedTabs));
  setStore("activeIndex", state.activeIndex);
  state.tabs = sortedTabs;
  state.cachedTabs = sortedTabs.filter(tab => !tab.meta || !tab.meta.noCache);
}
const mutations = {
  INIT_TABS (state, affixTabs) {
    if (!state.tabs || state.tabs.length === 0) { // 本地存储有则走本地存储
      state.tabs = affixTabs;
    }
  },
  ADD_TAB (state, route) {
    const tempTabs = [...state.tabs];
    const { path, meta } = route;
    const targetIndex = tempTabs.findIndex(tab => tab.path === path);
    // 构建单个tab
    const addTabObj = {
      title: meta.title,
      icon: meta.icon,
      path
    };
    if (targetIndex >= 0) { // 已经存在 修改选中位置
      state.activeIndex = targetIndex;
    } else {
      state.activeIndex = tempTabs.length === 0 ? 0 : tempTabs.length;
      tempTabs.push(addTabObj)
    }
    commonUpdateTabs(state, tempTabs);
  },

  CLOSE_TAB (state, value) {
    const { tabs } = state;
    const tempTabs = [...tabs];
    const index = Number(value) - 1;
    const targetIndex = Number(state.activeIndex);
    let nextActiveIndex = targetIndex;

    if (index === tempTabs.length - 1 && index === targetIndex) { // 当前项为最后一项
      nextActiveIndex = tempTabs.length - 2;
    } else {
      if (index <= targetIndex) {
        nextActiveIndex = targetIndex - 1;
      }
    }
    tempTabs.splice(index, 1);
    state.activeIndex = nextActiveIndex;
    commonUpdateTabs(state, tempTabs);
  },

  CLOSE_CACHED_TAB (state, value) {
    const tempTabs = [...state.cachedTabs];
    tempTabs.splice(Number(value) - 1, 1);
    state.cachedTabs = tempTabs;
  },
  CLOSE_OTHER_TABS (state, value) {
    let resultTabs = [];
    resultTabs = [...state.tabs].filter(tab => {
      const { meta, tabName } = tab;
      return tabName === value || (meta && meta.affix)
    })
    state.activeIndex = resultTabs.length - 1;
    commonUpdateTabs(state, resultTabs);
  },
  CLOSE_ALL_TABS (state) {
    let resultTabs = [];
    resultTabs = [...state.tabs].filter(tab => {
      const { meta } = tab;
      return meta && meta.affix
    })
    state.activeIndex = 0;
    commonUpdateTabs(state, resultTabs);
  },
  // 按照当前选择分割 left right 部分   关闭左侧-  左侧部分（仅显示affix和自身） + 右侧部分   关闭右侧 - 反之即可
  CLOSE_LEFT_TABS (state, value) {
    const tempTabs = [...state.tabs];
    const leftTabs = tempTabs.slice(0, Number(value) - 1);
    const rightTabs = tempTabs.slice(Number(value) - 1);
    const resultTabs = leftTabs.filter(tab => {
      const { meta } = tab;
      return meta && meta.affix
    }).concat(rightTabs);
    state.activeIndex = resultTabs.length - 1;
    commonUpdateTabs(state, resultTabs);
  },
  CLOSE_RIGHT_TABS (state, value) {
    const tempTabs = [...state.tabs];
    const leftTabs = tempTabs.slice(0, Number(value));
    const rightTabs = tempTabs.slice(Number(value));
    const resultTabs = leftTabs.concat(
      rightTabs.filter(tab => {
        const { meta } = tab;
        return meta && meta.affix
      })
    )
    state.activeIndex = Number(value) - 1;
    commonUpdateTabs(state, resultTabs);
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}

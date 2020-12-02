/*
 *@description: 集中处理数据字典请求
 *@modifyContent:
 *@author: ykx
 *@date: 2020-11-19 18:55:55
*/
export default {
  data () {
    return {}
  },
  computed: {
    // vuex - state中存放的选项
    optionListObj () {
      const tempObj = {};
      const stateKeys = this.vuexOptionsList ? this.vuexOptionsList.map(item => item.typeKey) : [];
      stateKeys.forEach(key => {
        if (this.$store.state[key]) {
          tempObj[key] = this.$store.state[key]
        }
      })
      return tempObj;
    },
    // 返回当前组件全量数据字段
    allOptionsList () {
      const allOptions = {};
      if (this.vuexOptionsList.length > 0) {
        this.vuexOptionsList.length.forEach(key => {
          allOptions[key] = this.$store.state[key];
        })
      }
      return allOptions;
    }
  },
  created () {
    this.initAllOptionList(); // 初始化所有下拉项
  },
  methods: {
    initAllOptionList () {
      if (this.vuexOptionsList && this.vuexOptionsList.length > 0) {
        this.vuexOptionsList.forEach(option => {
          const { actionKey, params, typeKey } = option;
          actionKey && (this.$store.dispatch(actionKey, {
            type: typeKey,
            params
          })); // 执行action的方法
        })
      }
    },
    /*
       *@functionName:根据类型获取响应字段的翻译
       *@params1: {String | Number} value 翻译项的值
       *@params2: {String} 字典字段名
       *return: {Object}  这里仅处理 形如{label : xx, value: xx}的数据集
       */
    getTypeDesc (value, optionType) {
      if (!this.optionListObj || !this.optionListObj[optionType]) {
        throw new Error("无相关数据集");
      }
      const optionList = this.optionListObj[optionType];
      if (optionList && optionList.length > 0) {
        const target =
          optionList.find((item) => item.value === value) || "";
        return { text: target ? target.label : "", color: target ? target.color : "" };
      }
      return { text: "", color: "" };
    }
  }
}

/*
 *@description: 集中处理表单一些通用操作（翻页 & 刷新  & 操作栏渲染）
 *@modifyContent:
 *@author: ykx
 *@date: 2020-11-19 18:55:55
*/
import { getStore, removeStore, setStore } from "@/utils"
import OperationRender from "@/components/OperationRender"; // 操作组件渲染
export default {
  data () {
    return {
      loading: false, // 请求loading
      pageSizeOptions: [10, 30, 50, 100], // table sizes集合
      dataSource: [], // 数据源显示
      searchParams: {}, // 界面顶部搜索数据集
      extraParams: {}, // 额外固定参数（非绑定搜索）
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      }, // 分页参数（这里单独提取）
      advanceFlag: false, // 搜索更多 显示 | 隐藏
      needCacheParams: false // 是否需缓存搜索条件,请按照相同key,存入session中（例：返回列表记住前搜索条件）
    }
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
    },
    // 参数转换
    reqParams () {
      let cacheSearchParams, cacheExtraParams, cachePagination;
      if (this.needCacheParams) {
        const cacheParamsJson = getStore(this.$route.path);
        let cacheParams = {};
        if (cacheParamsJson) {
          cacheParams = JSON.parse(cacheParamsJson);
        }
        cacheSearchParams = cacheParams.cacheSearchParams;
        cacheExtraParams = cacheParams.cacheExtraParams;
        cachePagination = cacheParams.cachePagination;
        removeStore(this.$route.path);
      };
      return {
        ...(cacheSearchParams ? { ...this.searchParams, ...cacheSearchParams } : this.searchParams),
        ...(cacheExtraParams ? { ...this.extraParams, ...cacheExtraParams } : this.extraParams),
        page: (cachePagination || this.pagination).page,
        pageSize: (cachePagination || this.pagination).pageSize
      }
    }
  },
  created () {
    this.searchParams = { ...this.defaultParams }; // 初始化搜索参数
    this.queryData();
    this.initAllOptionList(); // 初始化所有下拉项
  },
  components: {
    OperationRender
  },
  methods: {
    // 提供顶部搜索组件使用
    handleChangeField (key, value) {
      this.searchParams[key] = value;
    },
    handleReset () {
      this.searchParams = { ...this.defaultParams };
      this.queryData();
    },
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
       *@functionName: 列表请求 | 刷新
      */
    async queryData (isSearch = false) {
      if (!this.queryDataFunc || typeof this.queryDataFunc !== "function") {
        throw new Error("业务界面请提供: queryDataFunc方法");
      }
      isSearch && (this.pagination.page = 1);
      try {
        this.loading = true;
        const res = await this.queryDataFunc(this.reqParams);
        this.loading = false;
        const { code, data, message } = res;
        if (code === 20000) {
          this.dataSource = data.list;
          this.pagination.total = data.total;
          // 删除后非首页没有数据，则查询前一页数据
          if (data.list.length === 0 && this.pagination.page !== 1) {
            this.pagination.page--;
            this.queryData(isSearch);
          }
        } else {
          this.$message.error(message || "服务器内部错误")
        }
      } catch (e) {
        this.loading = false;
      }
    },
    // 操作前条件存入缓存
    handleCacheParams () {
      setStore(this.$route.path, {
        cacheSearchParams: this.searchParams,
        cacheExtraParams: this.extraParams,
        cachePagination: this.pagination
      })
    },
    /*
       *@functionName:最大页变化
       *@params1: {Number} curSize 当前最大页
       */
    handleSizeChange (curSize) {
      this.pagination = {
        ...this.pagination,
        page: 1,
        size: curSize
      };
      this.queryData();
    },
    /*
       *@functionName:页码变化
       *@params1: {Number} curPage 当前页
       */
    handleCurrentChange (curPage) {
      this.pagination = {
        ...this.pagination,
        page: curPage
      };
      this.queryData();
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
    },
    // 当前行点击(调用组件内方法)
    handleClick (funcObj, record) {
      const { func, funcParams } = funcObj;
      if (this[func]) {
        // 参数判断
        if (funcParams) {
          this[func](...funcParams, record);
        } else {
          this[func](record);
        }
      }
    }
  }
}

<template>
  <div>
    <template v-if="btnsList.length > 0">
      <el-button
        @click="handleClick(btn)"
        v-for="btn in btnsList"
        :key="btn.key"
        size="mini"
        :type="btn.btnType"
      >
        {{ btn.name }}
      </el-button>
    </template>
    <el-dropdown
      v-if="dropDownList.length > 0"
      style="margin-left: 10px"
      size="mini"
      @command="(key) => handleCommand(key)"
    >
      <el-button size="mini">
        更多<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu class="operate-dropdown-menus" slot="dropdown">
        <el-dropdown-item
          :command="dItem.key"
          v-for="dItem in dropDownList"
          :key="dItem.key"
        >
          <el-button size="mini" :type="dItem.btnType">
            {{ dItem.name }}
          </el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    operationData: {
      type: Array,
      default: () => []
    },
    record: {
      type: Object,
      default: () => {}
    },
    triggerEvent: {
      type: Function
    }
  },
  data () {
    return {};
  },
  computed: {
    sortedData () {
      const tempArr = this.$utils.deepCopy(this.operationData);
      if (this.operationData.length > 0) {
        tempArr.sort((item1, item2) => {
          return item1.sort - item2.sort;
        });
      }
      return tempArr;
    },
    btnsList () {
      return this.sortedData.filter((item) => item.group === "btns") || [];
    },
    dropDownList () {
      return this.sortedData.filter((item) => item.group === "dropDown") || [];
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleCommand (key) {
      const targetItem =
        this.dropDownList.find((item) => item.key === key) || {};
      // 整合参数
      this.handleClick(targetItem);
    },
    handleClick (item) {
      this.triggerEvent(item);
    }
  }
};
</script>
<style scoped>
</style>

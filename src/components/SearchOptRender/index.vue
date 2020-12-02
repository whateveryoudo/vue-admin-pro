<template>
  <el-row class="table-list-toolbar">
    <el-col>
      <el-button
        @click="handleClick(btn)"
        v-for="btn in btnsList"
        :key="btn.key"
        :type="btn.btnType"
      >
        {{ btn.name }}
      </el-button>
    </el-col>
  </el-row>
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
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleClick (item) {
      this.triggerEvent(item);
    }
  }
};
</script>
<style scoped>
</style>

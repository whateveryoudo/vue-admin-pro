<template>
  <div class="table-search-filter">
    <el-row :gutter="layoutGutter" class="search-fields-wrapper">
      <el-col
        :span="item.layoutCol || layoutCol"
        v-for="item in showFieldsData"
        :key="item.fieldKey"
      >
        <component
          :is="item.component"
          :label="item.label"
          :labelWidth="item.labelWidth || labelWidth"
          :wrapperWidth="item.wrapperWidth || wrapperWidth"
          :value="filedValues[item.fieldKey]"
          @change="val => changeField(item.fieldKey, val)"
        />
      </el-col>
      <el-col
        :span="layoutCol"
        :offset="calcOffset"
        class="operation-wrapper"
        v-if="!showAdvance"
      >
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh-right" @click="handleReset">重置</el-button>
        <span
          class="collapse-up-pointer"
          @click="showAdvance = true"
          v-if="fieldsData.length > advanceCount"
          >展开
          <i class="el-icon-arrow-down"></i>
        </span>
      </el-col>
    </el-row>
    <el-row v-if="showAdvance">
      <el-col class="operation-wrapper">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh-right" @click="handleReset">重置</el-button>
        <span class="collapse-up-pointer" @click="showAdvance = false"
          >收起
          <i class="el-icon-arrow-up"></i>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Input } from './fieldsComponents';
export default {
  props: {
    filedValues: {
      type: Object,
      default: () => {}
    },
    advanceCount: {
      type: Number,
      default: 3
    },
    // 表单控件json
    fieldsData: {
      type: Array,
      default: () => []
    },
    layoutGutter: {
      type: Number,
      default: 10
    },
    layoutCol: {
      type: Number,
      default: 6
    },
    labelWidth: {
      type: [Object, Number, String],
      default: 'auto'
    },
    wrapperWidth: {
      type: [Object, Number, String]
    }
  },
  components: {
    Input
  },
  data () {
    return {
      formValues: {},
      showAdvance: false // 这里收起展开不放入外层组件
    };
  },
  computed: {
    // 收起的展示项
    showFieldsData () {
      return this.showAdvance
        ? this.fieldsData
        : this.fieldsData.slice(0, this.advanceCount);
    },
    // 计算操作栏的偏移量
    calcOffset () {
      const index = parseInt(24 / this.layoutCol);
      return this.fieldsData.length <= index
        ? (index - this.fieldsData.length - 1) * this.layoutCol
        : 0;
    }
  },
  created () {},
  mounted () {},
  methods: {
    changeField (key, value) {
      this.$emit('onChangeField', key, value);
    },
    handleSearch () {
      this.$emit('onSearch');
    },
    handleReset () {
      this.$emit('onReset');
    }
  }
};
</script>
<style lang="scss">
.table-search-filter {
  margin-bottom: 16px;
  .search-fields-wrapper>.el-col {
    margin-bottom: 24px;
  }
  .el-col {
    display: flex;
    align-items: center;
    .el-row {
      display: flex;
      align-items: center;
    }
    &.operation-wrapper {
      justify-content: flex-end;
    }

    .label-text {
      text-align: right;
      &:after {
        content: ":";
        position: relative;
        top: -0.5px;
        margin: 0 8px 0 2px;
      }
    }
  }
  .collapse-up-pointer {
    cursor: pointer;
    margin-left: 20px;
    color: #409eff;
  }
}
</style>

<template>
  <el-row class="field-item-wrapper">
    <el-col v-bind="getItemWidth(labelWidth)" class="label-text">
      {{ label }}
    </el-col>
    <el-col v-bind="getItemWidth(wrapperWidth)">
      <el-input placeholder="请输入" :value="value" @input="handleInputChange"/>
    </el-col>
  </el-row>
</template>

<script>
import filedsMixins from "./fieldsMixins";
export default {
  props: {
    value: [String, Number],
    labelWidth: {
      type: [Object, Number, String]
    },
    wrapperWidth: {
      type: [Object, Number, String]
    },
    label: String
  },
  mixins: [filedsMixins],
  data () {
    return {};
  },
  created () {},
  mounted () {},
  methods: {
    handleInputChange (value) {
      this.$emit("change", value);
    },
    handleEnterChange (value) {
      this.$emit("enter", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.field-item-wrapper{
  width: 100%;
}
</style>

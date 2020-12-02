// 参考：https://github.com/vueComponent/ant-design-vue-pro/blob/feature/blocks/src/components/tools/DetailList.vue
<template>
<div class="detail-list">
  <div v-if="title" class="title">{{title}}</div>
  <el-row>
    <slot/>
  </el-row>
</div>
</template>

<script>

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}
// 内部元素
const Item = {
  name: "DetailListItem",
  props: {
    term: {
      type: String,
      default: ""
    },
    itemCol: {
      type: [String, Number]
    }
  },
  inject: {
    col: {
      type: [String, Number]
    }
  },
  render () {
    return (
      <el-col {...{ props: responsive[this.itemCol || this.col] }}>
        <div class="term">{this.$props.term}</div>
        <div class="content">{this.$slots.default}</div>
      </el-col>
    )
  }
}
export default {
  Item,
  props: {
    title: {
      type: String,
      default: ""
    },
    col: {
      type: [String, Number],
      default: 3
    }
  },
  provide () {
    return {
      col: this.col > 4 ? 4 : this.col
    }
  },
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="scss">
  .detail-list {
    .title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .term {
      color: rgba(0,0,0,.85);
      display: table-cell;
      line-height: 20px;
      margin-right: 8px;
      padding-bottom: 16px;
      white-space: nowrap;
      &:after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -.5px;
      }
    }
    .content {
      color: rgba(0,0,0,.65);
      display: table-cell;
      line-height: 22px;
      padding-bottom: 16px;
      width: 100%;
    }
    &.small {
      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      .term, .content {
        padding-bottom: 8px;
      }
    }
    &.large {
      .term, .content {
        padding-bottom: 16px;
      }
      .title {
        font-size: 16px;
      }
    }
    &.vertical {
      .term {
        padding-bottom: 8px;
      }
      .term, .content {
        display: block;
      }
    }
  }
</style>

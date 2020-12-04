<template>
    <svg :class="svgCls">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
export default {
  name: "index",
  props: {
    className: {
      type: String,
      default: ""
    },
    // 图标类型（引用链接）
    iconClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    svgCls () {
      return `svg-icon ${this.className}`;
    },
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped>
    .svg-icon{
        width: 1em;
        height:1em;
        fill: currentColor;
        vertical-align: -0.15em;
    }
</style>

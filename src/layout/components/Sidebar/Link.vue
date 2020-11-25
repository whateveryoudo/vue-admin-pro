<template>
    <!--动态组件写法-->
    <component :is="to" v-bind="linkProps">
        <slot></slot>
    </component>
</template>

<script>
import { isExternal } from "@/utils/validate"
export default {
  name: "Link",
  props: {
    to: { type: String, required: true }
  },
  computed: {
    // 根据不同url返回不同属性
    linkProps () {
      if (isExternal(this.to)) {
        return {
          href: this.to,
          target: "_blank"
        }
      }
      return {
        is: "router-link",
        to: this.to
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>

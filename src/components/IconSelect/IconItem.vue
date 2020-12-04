<template>
  <div>
      <i :class="url" v-if="type === 'elem'"></i>
      <img class="img-icon" :src="url" v-else-if="type === 'img'"></img>
      <svg-icon v-else :iconClass="url"></svg-icon>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
export default {
  props: {
    url: {
      type: String
    },
    type: {
      type: String
    }
  },
  data () {
    return {};
  },
  components: {
    SvgIcon
  },
  created () {},
  mounted () {}
};
</script>
<style scoped lang="scss">
.img-icon{
    width:14px;
    height: 14px;
    margin-top: 4px;
}
</style>

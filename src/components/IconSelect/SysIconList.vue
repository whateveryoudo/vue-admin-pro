<template>
  <div>
    <el-scrollbar wrap-class="modal-scroll-wrapper">
      <div style="max-height: 300px">
        <ul class="icon-list">
          <li
            v-for="iconLink in sysIconData"
            :key="iconLink"
            @click="handleChoose(iconLink)"
            :class="[curIcon === iconLink && 'selected']"
          >
            <svg-icon :iconClass="iconLink"></svg-icon>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { sysIconData } from "./iconData";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    curIcon: {
      type: String
    }
  },
  data () {
    return {
      sysIconData
    };
  },
  created () {},
  mounted () {
    console.log(this.sysIconData);
  },
  methods: {
    handleChoose (name) {
      this.handleClose();
      this.$emit("onChoose", name, "sys");
    },
    handleClose () {
      this.$emit("closeModal");
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-list {
  list-style: none;
  overflow: hidden;
  padding: 0 !important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
  margin-right: 1px;
  margin-bottom: 1px;
}
.icon-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 13px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
  cursor: pointer;
}
.icon-list li svg {
  display: block;
  font-size: 28px;
  color: #606266;
  margin: 0;
  transition: color 0.15s linear;
}
.icon-list li.selected {
  svg {
    color: #5cb6ff;
  }
}
.icon-list li:hover svg {
  color: #5cb6ff;
}
</style>

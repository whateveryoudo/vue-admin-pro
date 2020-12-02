<template>
  <div>
    <el-scrollbar wrap-class="modal-scroll-wrapper">
      <div style="max-height: 300px">
        <ul class="icon-list">
          <li
            v-for="name in elemIconData"
            :key="name"
            @click="handleChoose(name)"
          >
            <span>
              <i :class="'el-icon-' + name"></i>
            </span>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { elemIconData } from "./iconData";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      elemIconData
    };
  },
  created () {},
  mounted () {},
  methods: {
    handleChoose (name) {
      this.handleClose();
      this.$emit("onChoose", name);
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
  color: #666;
  font-size: 13px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
  cursor: pointer;
}
.icon-list li i {
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  color: #606266;
  transition: color 0.15s linear;
}
.icon-list li span {
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
  color: #99a9bf;
  transition: color 0.15s linear;
}
.icon-list li:hover span,
.icon-list li:hover i {
  color: #5cb6ff;
}
</style>

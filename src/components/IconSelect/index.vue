<template>
  <el-dialog
    title="图标选择"
    :append-to-body="appendToBody"
    :visible="visible"
    @close="handleClose"
  >
    <el-tabs v-model="activeKey">
      <el-tab-pane
        label="elem图标"
        name="1"
      >
        <ElemIconList
          @onChoose="handleChoose"
          @closeModal="handleClose"
          :curIcon="curIcon"
        />
      </el-tab-pane>
      <el-tab-pane
        label="系统内置图标"
        name="2"
      >
        <SysIconList
          @onChoose="handleChoose"
          @closeModal="handleClose"
          :curIcon="curIcon"
        />
      </el-tab-pane>
      <!-- 延迟渲染 -->
      <el-tab-pane
        label="自定义上传"
        name="3"
        lazy
      >
        <UploadIcon
          @onChoose="handleChoose"
          @closeModal="handleClose"
          :curIcon="curIcon"
        />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import iconData from "./iconData";
import ElemIconList from "./ElemIconList";
import SysIconList from "./SysIconList";
import UploadIcon from "./UploadIcon";
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
      iconData,
      activeKey: "1"
    };
  },
  components: {
    ElemIconList,
    SysIconList,
    UploadIcon
  },
  created () {},
  mounted () {},
  methods: {
    handleChoose (name, type) {
      this.handleClose();
      this.$emit("onChoose", name, type);
    },
    handleClose () {
      this.$emit("closeModal");
    }
  }
};
</script>


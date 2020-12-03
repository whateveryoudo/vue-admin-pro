<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :auto-upload="false"
    >
      <i
        slot="default"
        class="el-icon-plus"
      ></i>
      <div
        slot="file"
        slot-scope="{file}"
        class="el-upload-list__item-wrapper"
      >
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
        <span class="el-upload-list__item-actions">
          <span
            title="查看大图"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            title="裁剪"
            @click="handleTailor(file)"
          >
            <i class="el-icon-scissors"></i>
          </span>
          <span
            title="还原"
            @click="handleRestore(file)"
          >
            <i class="el-icon-refresh-right"></i>
          </span>
          <span
            title="删除"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
    >
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
    <TailorImg
      :optFile="optFile"
      :visible="tailorVisible.visible"
      v-if="tailorVisible.destroy"
      @closeModal="toggleModal('tailorVisible', false)"
      @updateImg="updateImg"
    />
  </div>
</template>
<script>
import { toggleModal } from "@/utils";
import TailorImg from "@/components/TailorImg";
export default {
  data () {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 裁剪modal
      tailorVisible: {
        destroy: false,
        visible: false
      },
      optFile: {} // 当前查看的file对象
    };
  },
  components: {
    TailorImg
  },
  methods: {
    toggleModal,
    beforeUpload (file) {
      const isImg = ["image/jpeg", "image/png"].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error("上传头像图片只能是 JPG 、PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImg && isLt2M;
    },
    changeUpload (file) {
      console.log(file);
    },
    handleTailor (file) {
      file.originUrl = file.url;
      this.optFile = file;
      this.toggleModal("tailorVisible");
    },
    handleRemove (file) {
      console.log(file);
    },
    handleRestore (file) {
      this.optFile.url = file.originUrl;
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
      console.log(file);
    },
    updateImg (img) {
      this.optFile.url = img;
    }
  }
};
</script>
<style lang="scss" scoped>
  .el-upload-list__item-wrapper{
    position: relative;
  }
</style>

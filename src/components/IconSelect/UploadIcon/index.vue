<template>
  <div>
    <el-upload
      ref="upload"
      action="#"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :auto-upload="false"
      :on-change="handleChange"
      :file-list="fileList"
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
        <label
          v-if="choosedUrl === file.url"
          class="el-upload-list__item-status-label"
        ><i class="el-icon-upload-success el-icon-check"></i></label>
        <div class="el-upload-list__item-actions">
          <div>
            <div class="opt-icon-wrapper">
              <span
                :title="item.label"
                v-for="(item, index) in optIcons.slice(0, 2)"
                :key="index"
                @click="handleOpt(file,item.handleFunc)"
              >
                <i :class="item.icon"></i>
              </span>
            </div>
            <div class="opt-icon-wrapper">
              <span
                :title="item.label"
                v-for="(item, index) in optIcons.slice(2)"
                :key="index"
                @click="handleOpt(file,item.handleFunc)"
              >
                <i :class="item.icon"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-upload>
    <form action="/mock/file-api/upload" method="post" enctype="multipart/form-data">
      <input type="file" class="files" id="files" name="files">
      <input type="submit" class="uploadFile" value="文件上传">
    </form>
    <div class="bto-setting">
      <el-button
        type="primary"
        :disabled="!choosedUrl"
        @click="uploadAndSetting"
      >上传并且设置</el-button>
    </div>
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
import { uploadFile } from "@/api/common"
export default {
  data () {
    return {
      choosedUrl: "",
      fileList: [
        {
          name: "11",
          url:
            "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        }
      ],
      optIcons: [
        {
          label: "查看大图",
          handleFunc: "handlePictureCardPreview",
          icon: "el-icon-zoom-in"
        },
        {
          label: "裁剪",
          handleFunc: "handleTailor",
          icon: "el-icon-scissors"
        },
        {
          label: "还原",
          handleFunc: "handleRestore",
          icon: "el-icon-refresh-right"
        },
        {
          label: "删除",
          handleFunc: "handleRemove",
          icon: "el-icon-delete"
        },
        {
          label: "勾选",
          handleFunc: "handleChoose",
          icon: "el-icon-check"
        }
      ],
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
    handleOpt (file, func) {
      this[func] && this[func](file);
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
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
    handleChoose (file) {
      this.choosedUrl = file.url;
    },
    handleDownload (file) {
      console.log(file);
    },
    updateImg (img) {
      this.optFile.url = img;
    },
    uploadFile (params) {
      console.log(params);
    },
    async uploadAndSetting () {
      debugger;
      if (this.fileList && this.fileList.length > 0) {
        const target = this.fileList.find(item => item.url === this.choosedUrl);
        if (target.status === "success") { // 直接设置
          this.$emit("onChoose", target.url, "img");
        } else {
          const formData = new FormData();
          formData.append("file", target.raw);
          const res = await uploadFile(formData);
          console.log(res);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-upload-list__item-wrapper {
  position: relative;
  .el-upload-list__item-status-label {
    display: block;
  }
  .opt-icon-wrapper {
    display: flex;
    justify-content: space-around;
    &:first-child {
      justify-content: center;
    }
  }
  .el-upload-list__item-actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.bto-setting {
  margin-top: 10px;
  text-align: center;
}
// 去除hover效果
.el-upload-list--picture-card
  .el-upload-list__item:hover
  .el-upload-list__item-status-label {
  display: block;
}
</style>

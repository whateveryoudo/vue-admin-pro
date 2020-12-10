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
    <div class="bto-setting">
      <el-button
        type="primary"
        :disabled="!choosedUrl"
        :loading="loading"
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
import { uploadFile, deleteFile, initFileList } from "@/api/common"
export default {
  data () {
    return {
      choosedUrl: "",
      loading: false, // 上传loading
      fileList: [],
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
  mounted () {
    this.initFileList();
  },
  methods: {
    toggleModal,
    async initFileList () {
      const res = await initFileList();
      if (res && res.code === 20000) {
        this.fileList = res.data.map(item => ({ url: item }));
      }
    },
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
    async handleRemove (file) {
      const { status, url } = file;
      const delIndex = this.fileList.findIndex(item => item.url === url);
      if (status === "success") {
        const res = await deleteFile(file.url);
        if (res && res.code === 20000) {
          this.fileList.splice(delIndex, 1);
        }
      } else {
        this.fileList.splice(delIndex, 1);
      }
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
      if (this.fileList && this.fileList.length > 0) {
        const target = this.fileList.find(item => item.url === this.choosedUrl);
        if (target.status === "success") { // 直接设置
          this.$emit("onChoose", target.url, "img");
        } else {
          const formData = new FormData();
          formData.append("file", target.raw);
          this.loading = true;
          const res = await uploadFile(formData);
          this.loading = false;
          if (res && res.code === 20000) { // 这里为本地传输(会无法显示图片，无法配置多端口？？)
            target.url = res.data.url;
            this.$emit("onChoose", target.url, "img");
          }
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
  cursor: pointer;
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

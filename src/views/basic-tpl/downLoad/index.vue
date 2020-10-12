<template>
  <div class="page-basic-layout analysis-container">
    <el-button type="primary" @click="handleDownLoad()">点击下载</el-button>
    <el-progress type="circle" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import { downFile } from "@/api/common";
export default {
  name: "DownLoad",
  data () {
      return {
          percentage: 0
      }
  },
  methods: {
    async handleDownLoad() {
      const res = await downFile({
          id: 11
      },evt => {
          this.percentage = parseInt((evt.loaded / evt.total) * 100)
      });
      this.DataDownLoad(res);
    },
    DataDownLoad(res) {
      let blob = new Blob([res], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      });
    //   let contentDisposition = row.reportFileName;
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob);
      downloadElement.style.display = "none";
      downloadElement.href = href;
    //   downloadElement.download = contentDisposition;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      window.URL.revokeObjectURL(href);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog
      title="图片裁剪"
      append-to-body
      :visible="visible"
      class="tailor-container"
      @close="handleClose"
    >
      <div class="cropper-content">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div
          class="show-preview"
          :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}"
        >
          <div
            :style="previews.div"
            class="preview"
          >
            <img
              :src="previews.url"
              :style="previews.img"
            >
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleCheck('prev')"
          type="success"
          plain
        >上一张</el-button>
        <el-button
          @click="handleCheck('next')"
          type="success"
          plain
        >下一张</el-button>
        <el-button
          @click="changeScale(1)"
          type="primary"
          plain
        >+</el-button>
        <el-button
          @click="changeScale(-1)"
          type="primary"
          plain
        >-</el-button>
        <el-button
          @click="handleRotate('left')"
          type="primary"
          plain
        >↺</el-button>
        <el-button
          @click="handleRotate('right')"
          type="primary"
          plain
        >↻</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button
          @click="handleOk"
          type="primary"
          plain
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    optFile: {
      type: Object
    },
    tailorOption: {}
  },
  computed: {
    newOption () {
      return {
        ...this.option,
        ...this.tailorOption
      };
    }
  },
  data () {
    return {
      // 裁剪组件的基础配置option,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 148, // 默认生成截图框宽度
        autoCropHeight: 148, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      previews: {}
    };
  },
  created () {},
  mounted () {
    this.option.img = this.optFile.url;
  },
  methods: {
    // 实时预览函数
    realTime (data) {
      this.previews = data;
    },
    handleClose () {
      this.$emit("closeModal");
    },
    handleCheck (direct) {
      console.log(direct);
    },
    handleRotate (direct) {
      direct === "left"
        ? this.$refs.cropper.rotateLeft()
        : this.$refs.cropper.rotateLet();
    },
    handleOk () {
      // base64  blob两种类型
      this.$refs.cropper.getCropBlob((data) => {
        const img = window.URL.createObjectURL(data);
        this.$emit("closeModal");
        this.$emit("updateImg", img);
      });
    },
    changeScale (num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    }
  }
};
</script>
<style scoped lang="scss">
// 注意设置截图容器宽高
.cropper-content {
  display: flex;
  justify-content: flex-end;
  .cropper {
    width: 350px;
    height: 300px;
  }
  .show-preview {
    flex: 1;
    display: flex;
    justify-content: center;
    .preview {
      margin-left: 40px;
      overflow: hidden;
    }
  }
}
.tailor-container .dialog-footer {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <el-dialog
    :title="menuModalTitle"
    :visible="visible"
    @close="handleClose"
  >
    <el-form
      v-loading="loading"
      :model="form"
      ref="addMenuForm"
      :rules="rules"
      class="add-menu-form-wrapper"
      :label-width="formLabelWidth"
    >
      <el-form-item
        label="应用编码"
        prop="code"
      >
        <el-input
          v-model="form.code"
          placeholder="请输入应用编码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="应用名称"
        prop="title"
      >
        <el-input
          v-model="form.title"
          placeholder="请输入应用名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="应用状态"
        prop="status"
      >
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form-item>
      <el-form-item
        label="应用图标"
        prop="icon"
        class="click-item"
      >
        <el-input
          v-model="form.icon"
          readonly
          @click.native="toggleModal('iconModalVisible')"
          placeholder="请选择"
          autocomplete="off"
        >
          <IconItem  slot="append" :url="form.icon" :type="iconType"/>
        </el-input>
      </el-form-item>
      <el-form-item
        label="应用描述"
        prop="desc"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入内容,至少5个字符"
          v-model="form.desc"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="排序"
        prop="sort"
      >
        <el-input-number
          v-model="form.sort"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="submitForm('addMenuForm')"
      >确 定</el-button>
    </div>
    <IconSelect
      @onChoose="handleChoosed"
      append-to-body
      v-if="iconModalVisible.destroy"
      :visible="iconModalVisible.visible"
      @closeModal="toggleModal('iconModalVisible',false)"
    />
  </el-dialog>
</template>

<script>
import IconSelect from "@/components/IconSelect";
import IconItem from "@/components/IconSelect/IconItem";
import { addApp, editApp } from "@/api/appManage";
import { toggleModal } from "@/utils";
export default {
  name: "AppEdit",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    appId: {
      type: String
    },
    parentNode: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      formLabelWidth: "120px",
      iconType: "",
      btnLoading: false,
      iconModalVisible: {
        visible: true,
        destroy: true
      },
      form: {
        code: "",
        title: "",
        icon: "",
        desc: "",
        sort: 1,
        status: 1
      },
      rules: {
        code: [{ required: true, message: "请输入菜单编码" }],
        title: [{ required: true, message: "请输入菜单名称" }],
        path: [
          { required: true, message: "请输入菜单路径" },
          { pattern: /^\/.*$/g, message: "路径需以/开头" }
        ],
        desc: [
          { required: true, message: "请输入应用描述" },
          { pattern: /^.{5,}$/g, message: "至少输入5个字符" }
        ],
        component: [
          { required: true, message: "请输入前端组件" },
          { pattern: /^[a-zA-Z]*$/g, message: "组件应为字母组合" }
        ],
        icon: [{ required: true, message: "请选择图标" }],
        sort: [{ required: true, message: "请输入排序" }]
      }
    };
  },
  computed: {
    isRoot () {
      return this.$utils.isObjNull(this.parentNode);
    },
    menuModalTitle () {
      return this.isEdit ? "编辑应用" : "新增应用";
    }
  },
  components: {
    IconSelect,
    IconItem
  },
  created () {
    this.isEdit && this.menuId && this.initForm();
  },
  methods: {
    toggleModal,
    // 初始化列表
    async initForm () {
      this.loading = true;
      const res = await this.$api.system.fetchDetail(this.menuId);
      this.loading = false;
      this.form = res.data && res.data.menuInfo;
    },
    handleChoosed (name, type) {
      this.form.icon = type === "elem" ? "el-icon-" + name : name;
      this.iconType = type;
    },
    handleClose () {
      this.$emit("closeModal");
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.btnLoading = true;
          const apiFunc = this.isEdit ? editApp : addApp;
          const res = apiFunc(
            this.isEdit
              ? this.form
              : {
                ...this.form,
                id: this.appId
              }
          );
          this.btnLoading = false;
          if (res.code === 20000 && res.data) {
            this.$message({
              message: `${this.isEdit ? "编辑" : "新增"}成功`,
              type: "success"
            });
            this.$emit("refreshTable");
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-menu-form-wrapper {
  padding-right: 50px;
}
</style>

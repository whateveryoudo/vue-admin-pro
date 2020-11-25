<template>
  <div class="nav-right-content">
    <el-dropdown class="actions-item">
      <div class="action-trigger">
        <img :src="userInfo.avatar" class="avatar" alt="" />
        <span class="user-name">{{ userInfo.name }}</span>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user"> 个人中心 </el-dropdown-item>
        <el-dropdown-item icon="el-icon-setting"> 个人设置 </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display: block" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="actions-item">
      <div class="action-trigger language">
        <svg-icon iconClass="language"></svg-icon>
      </div>
      <!--给vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自Item组件自定义的事件-->
      <el-dropdown-menu>
        <el-dropdown-item
          :class="{ selected: language === 'zh' }"
          @click.native="setLanguage('zh')"
        >
          <span style="font-size: 10px">CN</span>&nbsp;简体中文
        </el-dropdown-item>
        <el-dropdown-item
          :class="{ selected: language === 'en' }"
          @click.native="setLanguage('en')"
        >
          <span style="font-size: 10px">GB</span>&nbsp;English
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "NavRight",
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      language: state => state.app.language
    })
  },
  methods: {
    ...mapActions("user", ["loginOut"]),
    ...mapMutations("app", ["SET_LANGUAGE"]),
    logout () {
      this.$confirm("是否退出登录？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.loginOut();
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {});
    },
    // 设置语言
    setLanguage (lang) {
      this.$i18n.locale = lang; // 设置语言
      this.SET_LANGUAGE(lang);
    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.nav-right-content {
  float: right;
  .actions-item {
    text-align: center;
    transition: background-color 0.3s;
    background-color: #fff;
    padding: 0 12px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .action-trigger {
      cursor: pointer;
      &.language {
        transform: scale(1.3); //这里fontsize 回影响左边高度（line-height?）

        .svg-icon {
          margin-right: 0;
        }
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
  }
}
.el-dropdown-menu__item.selected {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>

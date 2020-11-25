<template>
  <div class="basicLayout" :class="changeCls">
    <Sidebar :class="{ ' fixed': fixedSidebar }"></Sidebar>
    <div
      class="main-content"
      :style="{
        'margin-left': fixedSidebar ? sideBarWidth : 0,
        'padding-top': fixedHeader ? paddingTop : 0,
      }"
    >
      <div
        class="global-header"
        :class="{ fixed: fixedHeader }"
        :style="{
          width: fixedHeader ? `calc(100% - ${sideBarWidth})` : '100%',
        }"
      >
        <Navbar></Navbar>
        <TabMenus></TabMenus>
      </div>
      <HeaderWrapper></HeaderWrapper>
      <app-main></app-main>
      <SettingDrawer></SettingDrawer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  AppMain,
  Navbar,
  Sidebar,
  TabMenus,
  HeaderWrapper,
  SettingDrawer
} from "./components";
import variables from "@/styles/variables.scss";
export default {
  name: "index",
  data () {
    return {};
  },
  created () {},
  computed: {
    ...mapState("tabMenus", ["tabs"]),
    ...mapState("settings", ["fixedSidebar", "fixedHeader", "hideTabs"]),
    ...mapGetters(["open"]),
    // 改变后的样式类型
    changeCls () {
      return {
        hideSidebar: !this.open
      };
    },
    sideBarWidth () {
      return this.open ? variables.sideBarWidth : variables.colSideBarWidth;
    },
    paddingTop () {
      return this.hideTabs ? "80px" : this.tabs.length > 0 ? "105px" : "60px";
    }
  },
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TabMenus,
    HeaderWrapper,
    SettingDrawer
  }
};
</script>

<style lang="scss">
.el-menu.el-menu--popup {
  .el-menu-item,
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
}
.basicLayout {
  .sidebar-container {
    .el-submenu__title {
      height: 50px;
      line-height: 50px;
    }
  }
}
/*收起隐藏*/
.basicLayout.hideSidebar {
  .sidebar-container {
    .el-menu--collapse {
      width: 54px;
    }
    .el-submenu,
    .el-menu-item,
    .el-submenu__title {
      //这里不要拦截图标显示
      & > span,
      & > i.el-icon-arrow-right {
        display: none;
      }
    }
    .el-submenu__title,
    .el-menu-item {
      padding: 0 !important;
      text-align: center;
      .svg-icon,
      [class^="el-icon-"] {
        margin: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "../styles/variables.scss";
.global-header {
  background-color: #fff;
  transition: width 0.28s;
  position: relative;
  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 200;
  }
}
.basicLayout {
  background-color: #f0f2f5;
  min-height: 100vh;
  /*左边菜单组件*/
  display: flex;
  .sidebar-container {
    position: relative;
    z-index: 10;
    height:100%;
    &.fixed {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
  .main-content {
    background-color: $normalBg;
    transition: margin-left 0.28s;
    flex: 1;
    overflow-x: hidden;
  }
  &.hideSidebar {
    .sidebar-container {
      width: 54px;
    }
    .main-content {
      margin-left: 54px;
    }
  }
}
</style>

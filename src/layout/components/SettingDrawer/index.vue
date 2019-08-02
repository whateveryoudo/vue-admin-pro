<template>
    <div class="setting-drawer-wrapper" :style="{right : visible ? drawerWidth :0}">
        <div class="drawer-trigger"
             @click="toggleDrawer"
             :title="visible ? '关闭设置' : '打开设置'">
            <i class="el-icon-s-tools" v-show="!visible"></i>
            <i class="el-icon-close" v-show="visible"></i>
        </div>
        <el-drawer
                title="界面全局配置"
                :size="drawerWidth"
                :visible.sync="visible"
                :direction="direction">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "SettingDrawer",
        data(){
            return {
                drawerWidth : '300px', //注意这里传入 number无效
                visible : false,
                direction : 'rtl'
            }
        },
        methods : {
            toggleDrawer(){
                this.visible = !this.visible
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setting-drawer-wrapper{
        transition:right 225ms cubic-bezier(0,0,.2,1) 0s; //这里拷贝的drawer组件动画参数
        position: fixed;
        right:0;
        top:300px;
        z-index:3000;
        .drawer-trigger{
            display: flex;
            width: 48px;
            height: 48px;
            align-items: center;
            justify-content: center;
            background: #1890ff;
            border-radius: 4px 0 0 4px;
            cursor: pointer;
            pointer-events: auto;
            i{
                color:#fff;
                font-size: 23px;
            }
        }
    }
</style>
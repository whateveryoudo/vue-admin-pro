<template>
    <div class="setting-drawer-wrapper" :style="{right : visible ? drawerWidth :0}">
        <div class="drawer-trigger"
             :style="{'background-color' : theme}"
             @click="toggleDrawer"
             :title="visible ? '关闭设置' : '打开设置'">
            <i class="el-icon-s-tools" v-show="!visible"></i>
            <i class="el-icon-close" v-show="visible"></i>
        </div>
        <el-drawer
                :size="drawerWidth"
                :visible.sync="visible"
                :direction="direction">
            <h3 slot="title">界面全局配置</h3>
            <DrawerContent/>
        </el-drawer>
    </div>
</template>

<script>
    import DrawerContent from './DrawerContent.vue'
    export default {
        name: "SettingDrawer",
        data(){
            return {
                drawerWidth : '300px', //注意这里传入 number无效
                visible : false,
                direction : 'rtl'
            }
        },
        computed : {
            theme() {
                return this.$store.state.settings.theme
            }
        },
        components : {
            DrawerContent
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
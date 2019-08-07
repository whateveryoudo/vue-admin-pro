<template>
    <div class="sidebar-container " :class="[menuStyle === 'dark' ? 'dark' : 'light']"
         :style="{'background-color' : variables[`${menuStyle}MenuBg`]}">
        <Logo :collapse="!open"/>
        <!--   左边菜单列表     -->
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :background-color="variables[`${menuStyle}MenuBg`]"
                    :text-color="variables[`${menuStyle}MenuText`]"
                    :active-text-color="variables[`${menuStyle}MenuActiveColor`]"
                    :collapse-transition="false"
                    :collapse="!open"
                    :unique-opened="accordion"
            >
                <!-- 注意：这里采用二级路由遍历,故在根路由添加当前navpath-->
                <SidebarItem
                        v-for="route in currentMenuRoutes"
                        :key="route.path"
                        :item="route"
                        :base-path="`${mainNavPath}/${route.path}`"
                >

                </SidebarItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters,mapState} from 'vuex'
    import variables from '@/styles/variables.scss'
    import SidebarItem from './SidebarItem'
    import Logo from './Logo.vue'
    export default {
        data(){
            return {

            }
        },
        components : {Logo,SidebarItem},
        computed : {
            ...mapState('permission',['mainNavPath']),
            ...mapState('settings',['menuStyle','accordion']),
            ...mapGetters({
                open : 'open',
                currentMenuRoutes : 'permission/currentMenuRoutes'
            }),
            variables() { //TODO 修改为引用scss的变量（做主题配置）
                return variables;
            },
            activeMenu(){
                return this.$route.path;
            }
        }
    }
</script>
<style lang="scss">
    .sidebar-container{
        box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
        //这里未提供相关props，采用样式覆盖了
        &.light{
            .logo-wrapper{
                background: #fff;
                margin-bottom: 1px;
                box-shadow: 1px 1px 0 0 #e8e8e8;
                h1.sidebar-title{
                    color:#409EFF;
                }
            }
            border-right: 1px solid #e8e8e8;
            .el-submenu__title:focus,.el-submenu__title:hover,
            .el-menu-item:focus, .el-menu-item:hover {
                outline: none;
                background-color: #ecf5ff !important;
            }
        }
        .el-menu{
            border: none;//去除右边框
            a{
                display: inline-block;
                width:100%;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .sidebar-container{
        transition: width 0.28s;
        width:210px;
    }
    .scrollbar-wrapper{
        overflow-x: hidden !important;
    }
</style>
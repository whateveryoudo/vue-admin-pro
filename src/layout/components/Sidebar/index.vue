<template>
    <div class="sidebar-container" >
        <Logo :collapse="!open"/>
        <!--   左边菜单列表     -->
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :active-text-color="variables.menuActiveColor"
                    :collapse-transition="false"
                    :collapse="!open"
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
            ...mapGetters({
                open : 'open',
                currentMenuRoutes : 'permission/currentMenuRoutes'
            }),
            variables() { //TODO 修改为引用scss的变量（做主题配置）
                return variables
            },
            activeMenu(){
                return this.$route.path;
            }
        }
    }
</script>
<style lang="scss">
    .sidebar-container{
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
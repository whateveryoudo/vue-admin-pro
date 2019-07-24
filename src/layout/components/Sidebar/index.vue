<template>
    <div class="sidebar-container" >
        <Logo :collapse="!open"/>
        <!--   左边菜单列表     -->
        <el-scrollbar>
            <el-menu
                :collapse="!open"
            >
                <SidebarItem
                        v-for="route in currentMenuRoutes"
                        :key="route.path"
                        :item="route"
                        :base-path="route.path"
                >

                </SidebarItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './SidebarItem'
    import Logo from './Logo.vue'
    export default {
        data(){
            return {

            }
        },
        components : {Logo,SidebarItem},
        computed : {
            ...mapGetters({
                open : 'open',
                currentMenuRoutes : 'permission/currentMenuRoutes'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar-container{
        transition: width 0.28s;
        width:210px;
    }
</style>
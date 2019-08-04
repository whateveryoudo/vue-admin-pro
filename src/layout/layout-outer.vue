<template>
    <div class="basicLayout" :class="changeCls">
        <Sidebar :class="{' fixed' : fixedSidebar}"></Sidebar>
        <div class="main-content" :style="{'padding-left' : fixedSidebar ? sideBarWidth + 'px' : 0}">
            <div class="global-header">
                <Navbar></Navbar>
                <TabMenus></TabMenus>
                <HeaderWrapper></HeaderWrapper>
                <app-main></app-main>
            </div>
            <SettingDrawer></SettingDrawer>
        </div>
    </div>

</template>

<script>
    import {mapGetters,mapState} from 'vuex'
    import {AppMain,Navbar,Sidebar,TabMenus,HeaderWrapper,SettingDrawer} from './components'
    import variables from '@/styles/variables.scss'
    export default {
        name: "index",
        data(){
            return {

            }
        },
        created(){

        },
        computed : {
            ...mapState('settings',['fixedSidebar']),
            ...mapGetters([
                'open'
            ]),
            //改变后的样式类型
            changeCls(){
                return {
                    hideSidebar : !this.open
                }
            },
            sideBarWidth(){
                return variables.sideBarWidth;
            }
        },
        components : {
            AppMain,
            Navbar,
            Sidebar,
            TabMenus,
            HeaderWrapper,
            SettingDrawer
        }
    }
</script>

<style lang="scss">
    /*收起隐藏*/
    .basicLayout.hideSidebar{
        .sidebar-container{
            .el-menu--collapse{
                width:54px;
            }
            .el-submenu,.el-menu-item,.el-submenu__title{
                &>span,&>i{
                    display: none;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    @import "../styles/variables.scss";
    .global-header{
        position: relative;
    }
    .basicLayout{
        /*左边菜单组件*/
        display: flex;
        .sidebar-container{
            position: relative;
            z-index: 10;
            min-height: 100vh;
            &.fixed{
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
            }
        }
        .main-content{
            transition: margin-left .28s;
            flex:1;
        }
        &.hideSidebar{
            .sidebar-container{
                width:54px;
            }
            .main-content{
                margin-left: 54px;
            }
            .el-submenu .el-submenu__title{
                &>span,&>i{
                    display: none;
                }
            }
        }
    }

</style>
<template>
    <div class="basicLayout" :class="changeCls">
        <Sidebar class="sidebar-container"></Sidebar>
        <div class="main-content">
            <div class="global-header">
                <Navbar></Navbar>
                <TabMenus></TabMenus>
                <app-main></app-main>
            </div>
            <div class="right-content">
                我是右侧内容
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import {AppMain,Navbar,Sidebar,TabMenus} from './components'
    export default {
        name: "index",
        data(){
            return {

            }
        },
        created(){

        },
        computed : {
            ...mapGetters([
                'open'
            ]),
            //改变后的样式类型
            changeCls(){
                return {
                    hideSidebar : !this.open
                }
            }
        },
        components : {
            AppMain,
            Navbar,
            Sidebar,
            TabMenus
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables.scss";
    .basicLayout{
        /*左边菜单组件*/
        .sidebar-container{
            background-color: $menuBg;
            position: fixed;
            top:0;
            bottom:0;
            left: 0;
            height:100%;
        }
        .main-content{
            transition: margin-left .28s;
            margin-left: 210px;
        }
        &.hideSidebar{
            .sidebar-container{
                width:54px;
            }
            .main-content{
                margin-left: 54px;
            }
        }
    }

</style>
<template>
    <div class="basicLayout">
        <Sidebar class="sidebar-container"></Sidebar>
        <div class="main-content">
            <div class="global-header">
                <Navbar></Navbar>
                <app-main></app-main>
            </div>
            <div class="right-content">
                我是右侧内容
            </div>
        </div>
    </div>

</template>

<script>

    import {AppMain,Navbar,Sidebar} from './components'
    export default {
        name: "index",
        data(){
            return {

            }
        },

        components : {
            AppMain,
            Navbar,
            Sidebar
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables.scss";
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
        margin-left: 210px;
    }
</style>
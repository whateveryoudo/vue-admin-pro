<template>
    <div class="nav-wrapper clearfix">
        <div class="side-menu-switch" @click="toggleSideMenu">
            <i :class="foldCls"></i>
        </div>
        <!--    :background-color="variables.navBarBg   active-text-color="#ffd04b"  text-color="#fff""-->
        <el-menu  :default-active="activeMenu"

                  router

                  mode="horizontal">
            <navbar-item
                    v-for="route in permission_routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
            >
            </navbar-item>
        </el-menu>

    </div>
</template>
<script>
    import {mapGetters,mapMutations} from 'vuex'
    import NavbarItem from './NavbarItem.vue'
    import variables from '@/styles/variables.scss'
    export default {
        name: 'Navbar',
        data(){
            return {
                activeIndex : '1'
            }
        },
        components : {
            NavbarItem
        },
        computed : {
            ...mapGetters([
                'permission_routes',
                'open'
            ]),
            foldCls(){
                return (this.open ?  'el-icon-s-fold' : 'el-icon-s-unfold')
            },
            activeMenu(){
                const route = this.$route;

                return route.matched[0].path || '/';//采用第一层路由path,作为显示 ？？这里设置的 '/'，返回来的是个 ''
            },
            variables() { //TODO 修改为引用scss的变量（做主题配置）
                return variables
            },
        },
        methods : {
            ...mapMutations('app',[
                'TOGGLE_SIDEBAR',
            ]),
            toggleSideMenu(){
                this.TOGGLE_SIDEBAR();
            }
        }
    }
</script>
<style lang="scss">
    .nav-wrapper{
        box-shadow: 2px 2px 8px #f0f1f2;//水平向右边偏移
        position: relative;
        .el-menu{
            padding-left: 300px;
            float: left;
        }

        .el-menu.el-menu--horizontal {
            border-bottom: none;
        }
    }

</style>
<style lang="scss" scoped>
    .side-menu-switch{
        width:25px;
        padding:0 15px;
        display: inline-block;
        height:60px;

        float: left;
        cursor: pointer;
        transition: background .3s;
        &:hover{
            background-color: rgba(0, 0, 0, 0.025);
        }
        i{
            font-size: 25px;
            line-height: 60px;//父级无效...
        }
    }
</style>
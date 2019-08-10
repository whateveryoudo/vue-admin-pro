<template>
    <!--这里只会做单层遍历,为根节点-->
    <el-menu-item :index="basePath" v-if="!item.hidden && !item.hiddenInNavbar">
            {{generateTitle(item.meta.title)}}
        <!--{{basePath}}-->
    </el-menu-item>
</template>
<script>
    import {generateTitle} from '@/utils'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Navbar',
        props : {
            //单个路由对象
            item : {
                type: Object,
                required: true
            },
            basePath : {
                type : String,
                default: ''
            }
        },
        data(){
            return {
            }
        },
        computed : {
            ...mapGetters([
                'permission_routes'
            ])
        },
        methods : {
            generateTitle
        }
    }
</script>
<style lang="scss">
    .nav-wrapper .el-menu{
        padding-left: 100px;
    }
    .el-menu-item{
      padding-left: 200px;
      width: 130px;
      background-color:white;
      text-align:center;
      height: 55px;
    }
</style>
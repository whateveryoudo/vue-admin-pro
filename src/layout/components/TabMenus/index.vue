<template>
    <div class="tab-menu-container" v-if="tabs.length > 0">
        <el-tabs :value="activeTab" type="card"  closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in tabs"
                    :key="index"
                    :name="item.name"
            >
                  <span slot="label" style="padding: 8px">
                      <svg-icon v-if="item.icon" :iconClass="item.icon"></svg-icon>
                     {{item.title}}
                  </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return {}
        },
        computed : {
            ...mapState('tabMenus',['tabs']),
            ...mapGetters('tabMenus',['activeTab'])
        },
        methods : {
            ...mapMutations('tabMenus',['ADD_TAB','REMOVE_TAB']),
            /**
             * 删除tab
             * @param  currentTabIndex {String} 当前菜单索引值
             */
            removeTab(currentTabIndex){
                this.REMOVE_TAB(currentTabIndex);
            }
        },
        watch : {
            //监听路由改变
            $route(){
                if(this.$route.name){
                    this.ADD_TAB(this.$route);//添加/更新tabs对象
                }
            }
        }
    }
</script>
<style lang="scss">
    .tab-menu-container{
        .el-tabs__item{
            float:left;//这里display : inline-block 与  每一项得overflow:hidden 会多出5px??
            display: block;
            width:150px;
            padding:0 !important;
             text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            background-color: #fafafa;
            &:hover{
                background-color: transparent;

            }
        }
        .el-tabs__item.is-active{
            background-color: transparent;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:10px;
        }
        .el-tabs__nav-wrap{
            margin-bottom: 0;
            box-shadow: 1px 2px 2px #ccc;
        }
    }
</style>
<style lang="scss" scoped>
    .tab-menu-container{
        height:40px;
        padding:10px 0;
        .svg-icon{
            margin-right: 2px;
        }
    }
</style>
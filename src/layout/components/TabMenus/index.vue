<template>
    <!--v-if="tabs.length > 0"-->
    <div class="tab-menu-container" ref="menu" v-if="tabs.length > 0">
        <el-tabs :value="activeTab" type="card"  closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in tabs"
                    :key="index"
                    :name="item.name"
            >
                  <span slot="label"
                        class="inner-menu-item"
                  >
                      <svg-icon v-if="item.icon" :iconClass="item.icon"></svg-icon>
                      <!--contextmenu 此事件只能a链接触发-->
                     <router-link
                        :to="{path : item.path,query : item.query,fullPath : item.fullPath}"
                        @contextmenu.prevent.native="openMoreMenu(item,$event)"
                     >
                         {{item.title}}
                     </router-link>
                  </span>
            </el-tab-pane>
        </el-tabs>
        <context-menu

            :visible="menuVisbile"
            :position="menuPos"
            @clickMenu = "handleClickMenu"
        >

        </context-menu>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex'
    import ContextMenu from './ContextMenu.vue'
    export default {
        name: "index",
        data(){
            return {
                menuVisbile : false,
                menuPos : {} //弹层的位置
            }
        },
        components : {
            ContextMenu
        },
        computed : {
            ...mapState('tabMenus',['tabs']),
            ...mapGetters('tabMenus',['activeTab'])
        },
        methods : {
            ...mapMutations('tabMenus',['ADD_TAB','REMOVE_TAB']),
            ...mapMutations('permission',['CHANGE_NAV']),
            //删除tab
            removeTab(currentTabIndex){
                this.REMOVE_TAB(currentTabIndex);
            },
            //右键打开更多操作菜单
            openMoreMenu(tab,e){
                //$el 当前容器root元素
                const offsetLeft = this.$el.getBoundingClientRect().left;//menu距离文档左侧距离
                const offsetWidth = this.$el.offsetWidth;
                //TODO X方向临界值计算

                const left = e.clientX - offsetLeft + 15; //向右移动15

                const top = e.clientY;

                this.menuPos = {
                    left,
                    top
                };
                this.menuVisbile = true;
            },
            //关闭menu菜单
            closeContextMenu(){
                this.menuVisbile = false;
            },
            //点击子组件列表项
            handleClickMenu(key){

            }
        },
        watch : {
            //监听路由改变
            $route(){
                if(this.$route.name){
                    this.CHANGE_NAV(this.$route.matched[0].path);//更新当前sidebar对象
                    this.ADD_TAB(this.$route);//添加/更新tabs对象
                }
            },
            menuVisbile(val){
                if(val){//显示,绑定点击关闭操作
                    document.body.addEventListener('click',this.closeContextMenu);
                }else{
                    document.body.removeEventListener('click',this.closeContextMenu);
                }
            }
        }
    }
</script>
<style lang="scss">
    .tab-menu-container{
        font-size: 12px;
        .el-tabs__item{
            float:left;//这里display : inline-block 与  每一项得overflow:hidden 会多出5px??
            display: block;
            width:120px;
            line-height: 30px;
            padding:0 !important;
             text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            height:30px;
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
            top:60%;
            transform: translateY(-50%);
            right:10px;
        }
        .el-tabs__nav-wrap{
            margin-bottom: 0;
            box-shadow: 1px 2px 2px #dfdfdf;
        }
    }
</style>
<style lang="scss" scoped>
    .tab-menu-container{
        height:30px;
        padding:10px 0;
        padding-top: 8px;
        .svg-icon{
            margin-right: 4px;
        }
        .el-tabs__item{
            .inner-menu-item{
                box-sizing: border-box;
                padding:0 8px;
                padding-left:10px;
                display: block;
                //这里占满 利于触发跳转
                a{
                    display: inline-block;
                    width: 100%;
                    font-size: 12px;
                }
            }

        }
    }
</style>
<template>
    <!--v-if="tabs.length > 0"-->
    <div class="tab-menu-container" ref="menu" v-if="tabs.length > 0">
        <el-tabs :value="activeTab" type="card" @tab-remove="closeTab">
            <el-tab-pane
                    v-for="(item, index) in tabs"
                    :key="index"
                    :name="item.tabName"
                    :closable="!item.meta || !item.meta.affix"
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
            :currentTab = "operateTab"
            :tabs = "tabs"
        >

        </context-menu>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex'
    import ContextMenu from './ContextMenu.vue'
    import path from 'path'
    export default {
        name: "index",
        data(){
            return {
                menuVisbile : false,
                menuPos : {}, //弹层的位置
                operateTab : {},//操作的路由对象
            }
        },
        components : {
            ContextMenu
        },
        computed : {
            ...mapState('tabMenus',['tabs']),
            ...mapState('permission',['mainNavPath']),
            ...mapGetters('tabMenus',['activeTab']),
            ...mapGetters(['permission_routes'])
        },
        mounted(){
            this.initTabs();
        },
        methods : {
            ...mapMutations('tabMenus',
                [
                    'ADD_TAB',
                    'CLOSE_TAB',
                    'INIT_TABS',
                    'CLOSE_CACHED_TAB',
                    'CLOSE_OTHER_TABS',
                    'CLOSE_ALL_TABS',
                    'CLOSE_LEFT_TABS',
                    'CLOSE_RIGHT_TABS'
                ]
            ),
            ...mapMutations('permission',['CHANGE_NAV']),
            //初始化tabs
            initTabs(){
                //获取所有设置了固定显示的tab
                const affixTabs = this.filterAffixTabs(this.permission_routes);

                //这里处理结构（由于使用tabs 的name属性与 keepalive冲突,故 tabs显示 使用 tabName 字段）
                const tranformAffixTabs = affixTabs.length > 0 &&
                    (affixTabs.map((item,i) => {return {...item, tabName: `${i + 1}`}}))
                if(affixTabs.length > 0){
                    this.INIT_TABS(tranformAffixTabs);
                }
            },
            //递归过滤固定tab
            filterAffixTabs(routes,basePath = this.mainNavPath){
                let affixTabs = [];
                if(routes.length > 0){
                    routes.forEach(route => {
                        const {meta,name,path : routerPath ,icon,children} = route;
                        //获取相对basePath的路径
                        const relativePath = path.resolve(basePath,routerPath);
                        if(name && meta && meta.affix){
                            affixTabs.push({
                                title : meta.title,
                                name,
                                meta,
                                path : relativePath,
                                icon
                            })
                        }
                        if(children && children.length > 0){
                            let tempTabs = this.filterAffixTabs([...children],relativePath);
                            affixTabs = [...affixTabs,...tempTabs];
                        }
                    })
                }
                return affixTabs;
            },
            //删除tab
            closeTab(currentTabIndex){
                this.CLOSE_TAB(currentTabIndex);
                //跳转当前选中界面
                this.moveToCurrentPage();
            },
            //右键打开更多操作菜单
            openMoreMenu(tab,e){
                //$el 当前容器root元素
                const offsetLeft = this.$el.getBoundingClientRect().left;//menu距离文档左侧距离
                const offsetWidth = this.$el.offsetWidth;
                //TODO X方向临界值计算

                const left = e.clientX - offsetLeft + 15; //向右移动15

                const top = e.clientY;
                this.operateTab = {...tab};
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
                //先关闭框
                this.closeContextMenu();
                switch (key){
                    case 'refresh':
                        this.refresh();
                        break;
                    case 'close' :
                        this.closeTab(this.operateTab.tabName);
                        break;
                    case 'close-other':
                        this.closeOther();
                        break;
                    case 'close-all':
                        this.closeAll();
                        break;
                    case 'close-l':
                        this.closeLeft();
                        break;
                    case 'close-r':
                        this.closeRight();
                        break;
                }
            },
            //刷新选中路由
            refresh(){
               const {tabName,path} = this.operateTab;
               this.CLOSE_CACHED_TAB(tabName);
                //借鉴刷新当前路由
                this.$nextTick(() => {
                    this.$router.replace({
                        path: '/redirect' + path
                    })
                })
            },
            //关闭其他tabs
            closeOther(){
                this.CLOSE_OTHER_TABS(this.operateTab.tabName);
                //跳转当前选中界面
                this.moveToCurrentPage();
            },
            //关闭所有
            closeAll(){
                this.CLOSE_ALL_TABS();
                //跳转当前选中界面
                this.moveToCurrentPage();
            },
            //关闭当前左侧
            closeLeft(){
                this.CLOSE_LEFT_TABS(this.operateTab.tabName)
                //跳转当前选中界面
                this.moveToCurrentPage();
            },
            //关闭当前右侧
            closeRight(){
                this.CLOSE_RIGHT_TABS(this.operateTab.tabName)
                //跳转当前选中界面
                this.moveToCurrentPage();
            },
            moveToCurrentPage(){
                const targetTab = this.tabs.find(tab => tab.tabName === this.activeTab);
                if(!targetTab){throw new Error('无tab选中...')};

                this.$router.push({
                    path: targetTab.path
                })
            },
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
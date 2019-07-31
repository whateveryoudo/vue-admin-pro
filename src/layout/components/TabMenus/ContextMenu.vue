<template>
    <transition name="fade">
        <div class="context-menu-wrapper" :style="{left : position.left + 'px',top : position.top + 'px'}" v-show="visible">
            <ul>
                <li class="menu-item " :class="{divider : item.key === 'divider'}" v-for="item in menuData" :key="item.key">
                    <i class="menu-icon" :class="item.iconCls"></i>{{item.text}}
                </li>

            </ul>
        </div>
    </transition>

</template>

<script>
    export default {
        name: "ContextMenu",
        props : {
            visible : {
                type : Boolean,
                defaultValue : false
            },
            position : {
                type : Object,
                defaultValue : {left : 0,top : 0}
            },
            clickMenu: Function
        },
        data(){
            return {
                menuData : [
                    {key : 'refresh', text : '刷新',iconCls : 'el-icon-refresh'},
                    {key : 'divider'},
                    {key : 'close', text : '关闭',iconCls : 'el-icon-close'},
                    {key : 'close-other', text : '关闭其他',iconCls : 'el-icon-circle-close'},
                    {key : 'close-all', text : '关闭所有',iconCls : 'el-icon-error'},
                    {key : 'close-l', text : '关闭左侧',iconCls : 'el-icon-d-arrow-left'},
                    {key : 'close-r', text : '关闭右侧',iconCls : 'el-icon-d-arrow-right'},
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .context-menu-wrapper{
        position: absolute;
        top:0;
        left:0;
        z-index: 999;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px;
        background-color: #fff;
        font-size: 12px;

        .menu-item:not(.divider){
            height: 30px;
            line-height: 30px;
            min-width: 150px;
            margin-top: 4px;
            padding: 0 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            transition: color .2s;
            i.menu-icon{
                margin-right: 15px;
            }
            &:not(:last-child){
                margin-bottom: 8px;
            }
            &:hover{
                color:rgb(64, 158, 255);
            }
        }
        .menu-item.divider{
            height: 1px;
            margin: 1px 0;
            overflow: hidden;
            padding: 0;
            line-height: 0;
            background-color: #e8e8e8;
        }
    }
</style>
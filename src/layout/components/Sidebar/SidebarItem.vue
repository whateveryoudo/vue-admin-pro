<template>
    <div v-if="!item.hidden">
        <!--   不包含子项 的项     -->
        <template v-if="showOneChildMenu">
            <AppLink v-if="onlyOneMenu && onlyOneMenu.meta" :to="resolvePath(onlyOneMenu.path)">
                <el-menu-item
                        :index="resolvePath(onlyOneMenu.path)"
                >
                    <svg-icon v-if="onlyOneMenu.meta.icon" :iconClass="onlyOneMenu.meta.icon"></svg-icon>
                    <i v-if="onlyOneMenu.meta.elemIcon" :class="onlyOneMenu.meta.elemIcon"></i>
                    <span>{{onlyOneMenu.meta.title}}</span>
                </el-menu-item>
            </AppLink>
        </template>
        <el-submenu :index="resolvePath(item.path)" v-else>
            <template slot="title">
                <svg-icon v-if="item.meta.icon" :iconClass="item.meta.icon"></svg-icon>
                <i v-if="item.meta.elemIcon" :class="item.meta.elemIcon"></i>
                <span v-if="item.meta">{{generateTitle(item.meta.title)}}</span>
            </template>
            <SidebarItem
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :base-path="resolvePath(child.path)"
            ></SidebarItem>
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import AppLink from './Link'
    import { isExternal } from '@/utils/validate'
    import {generateTitle} from '@/utils'
    export default {
        name: "SidebarItem",
        props : {
            item : {
                type : Object,
                require : true
            },
            basePath : {
                type : String,
                default : ''
            }
        },
        components : {
            AppLink
        },
        computed : {

            showOneChildMenu () {
                let children = this.item.children || [];
                // console.log(children.some(item => !item.hidden));
                return !children.some(item => !item.hidden);
            },
            onlyOneMenu(){
                let parent = this.item;
                let children = this.item.children || [];
                const showChildren = children.filter(item =>{
                    if(item.hidden){
                        return false
                    }else{
                        return true;
                    }
                });
                if(showChildren.length === 0){
                    return {...parent,path : ''};//这里加入'' 取得相对路径
                }else if(showChildren.length === 1){
                    return showChildren[0];
                }

                return null;
            }
        },
        methods : {

            resolvePath(routePath){
                if(isExternal(routePath)){
                    return routePath;
                }
                if(isExternal(this.basePath)){
                    return this.basePath;
                }
//                console.log(this.basePath,routePath);
                return path.resolve(this.basePath, routePath)//返回完整的路径 如：example  goodsList => /example goodsList
            },
            generateTitle
        }
    }
</script>

<style lang="scss" scoped>
    /*elem图标*/
    .el-icon-s-grid{
        font-size: 16px;
        margin-right: 8px;
    }
</style>
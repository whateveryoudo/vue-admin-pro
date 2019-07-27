<template>
    <div v-if="!item.hidden">
        <!--   不包含子项 的项     -->
        <template v-if="showOneChildMenu">
            <AppLink v-if="onlyOneMenu && onlyOneMenu.meta" :to="resolvePath(onlyOneMenu.path)">
                <el-menu-item
                        :index="resolvePath(onlyOneMenu.path)"
                >
                    <svg-icon :iconClass="onlyOneMenu.meta.icon"></svg-icon>
                    {{onlyOneMenu.meta.title}}
                </el-menu-item>
            </AppLink>
        </template>
        <el-submenu :index="resolvePath(item.path)" v-else>
            <template slot="title">
                <div v-if="item.meta">{{item.meta.title}}</div>
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
                console.log(children.some(item => !item.hidden));
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
            }
        }
    }
</script>

<style scoped>

</style>
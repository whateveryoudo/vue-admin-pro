<template>
    <div class="tab-menu-container">
        <el-tabs v-model="activeTab" type="card"  closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in tabs"
                    :key="item.path"
                    :label="item.title"
                    :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                activeTab : '2',
                tabs : [
                    {title : '菜单1',path : '/',name : '1'},
                    {title : '菜单2',path : '/main1',name : '2'}
                ]
            }
        },
        methods : {
            removeTab(){

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
    }
</style>
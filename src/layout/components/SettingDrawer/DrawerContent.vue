<template>
    <div class="drawer-body">
        <div class="setting-block">
            <h3>整体风格设置</h3>
            <ul class="block-list">
                <li class="block-list-item">
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg" alt="">
                </li>
                <li class="block-list-item">
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg" alt="">
                </li>
            </ul>
        </div>
        <el-divider></el-divider>
        <div class="setting-container">
            <ul class="setting-list">
                <li class="setting-list-item">
                    <span>主题色</span>
                    <ThemePicker/>
                </li>
                <li class="setting-list-item">
                    <span>固定左边菜单</span>
                    <el-switch v-model="value1"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>固定header</span>
                    <el-switch v-model="value2"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>下滑时隐藏header</span>
                    <el-switch v-model="value3"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>菜单项手风琴模式</span>
                    <el-switch v-model="value4"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>显示tabs导航</span>
                    <el-switch v-model="value5"></el-switch>
                </li>
            </ul>

        </div>
        <el-divider></el-divider>
        <el-button>拷贝配置</el-button>
    </div>
</template>

<script>
    import ThemePicker from '@/components/ThemePicker'
    export default {
        name: "DrawerContent",
        components : {
            ThemePicker
        },
        data(){
            return {
                value1 : false,
                value2 : false,
                value3 : false,
                value4 : false,
                value5 : false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .drawer-body{
        padding:24px;
        font-size: 14px;
        h3{
            font-weight: 400;

            margin-bottom: 12px;
        }
        .setting-block .block-list{
            display: flex;
            &>li.block-list-item{
                margin-right: 16px;
            }
        }
        .setting-container{
            .setting-list .setting-list-item{
                padding:12px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>
<template>
    <div class="drawer-body">
        <div class="setting-block">
            <h3>整体风格设置</h3>
            <ul class="block-list">
                <el-tooltip class="item" effect="dark" content="暗色菜单风格" placement="top">
                    <li class="block-list-item" @click="changeStyle('dark')">
                        <img src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg" alt="">
                        <i class="el-icon-check check-icon" v-if="menuStyle === 'dark'"></i>
                    </li>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="亮色菜单风格" placement="top">
                    <li class="block-list-item" @click="changeStyle('light')">
                        <img src="https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg" alt="">
                        <i class="el-icon-check check-icon" v-if="menuStyle === 'light'"></i>
                    </li>
                </el-tooltip>
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
                    <el-switch v-model="fixedSidebar"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>固定header</span>
                    <el-switch v-model="fixedHeader"></el-switch>
                </li>
<!--            功能暂未写-->
                <el-tooltip class="item"
                            effect="dark"
                            content="固定Header时可配置"
                            placement="left"
                            :disabled="fixedHeader"
                >
                    <li class="setting-list-item" :class="{disabled : !fixedHeader}">
                        <span>下滑时隐藏header</span>
                        <el-switch v-model="hideHeaderScrolling" :disabled="!fixedHeader"></el-switch>
                    </li>
                </el-tooltip>

                <li class="setting-list-item">
                    <span>菜单项手风琴模式</span>
                    <el-switch v-model="accordion"></el-switch>
                </li>
                <li class="setting-list-item">
                    <span>显示tabs导航</span>
                    <el-switch v-model="hideTabs"></el-switch>
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
            return {}
        },
        computed : {
            menuStyle(){
                return this.$store.state.settings.menuStyle;
            },

            fixedSidebar : {
                get(){
                    return this.$store.state.settings.fixedSidebar;
                },
                set(val){
                    this.$store.commit('settings/CHANGE_SETTING', {
                        key: 'fixedSidebar',
                        value: val
                    })
                }
            },
            fixedHeader : {
                get(){
                    return this.$store.state.settings.fixedHeader;
                },
                set(val){
                    this.$store.commit('settings/CHANGE_SETTING', {
                        key: 'fixedHeader',
                        value: val
                    })
                }
            },
            hideHeaderScrolling : {
                get(){
                    return this.$store.state.settings.hideHeaderScrolling;
                },
                set(val){
                    this.$store.commit('settings/CHANGE_SETTING', {
                        key: 'hideHeaderScrolling',
                        value: val
                    })
                }
            },
            accordion : {
                get(){
                    return this.$store.state.settings.accordion;
                },
                set(val){
                    this.$store.commit('settings/CHANGE_SETTING', {
                        key: 'accordion',
                        value: val
                    })
                }
            },
            hideTabs : {
                get(){
                    return this.$store.state.settings.hideTabs;
                },
                set(val){
                    this.$store.commit('settings/CHANGE_SETTING', {
                        key: 'hideTabs',
                        value: val
                    })
                }
            }
        },
        methods : {
            //风格改变 val - light,dark
            changeStyle(val){
                debugger;
                this.$store.commit('settings/CHANGE_SETTING', {
                    key: 'menuStyle',
                    value: val
                })
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
                position: relative;
                cursor: pointer;
                .check-icon{
                    position: absolute;
                    top: 17px;
                    right: 8px;
                    font-size: 18px;
                    color:#409EFF;
                }
            }
        }
        .setting-container{
            .setting-list .setting-list-item{
                padding:12px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &.disabled{
                    opacity: .5;
                }
            }
        }

    }
</style>
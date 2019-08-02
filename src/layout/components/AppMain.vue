<template>
    <div class="app-main-contaienr">
        <transition name="fade-page" mode="out-in">
            <keep-alive :include="cachedTabs">
                <router-view></router-view>
            </keep-alive>

        </transition>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'AppMain',
        data(){
            return {}
        },
        computed : {
            ...mapState('tabMenus',['cachedTabs'])
        }
    }
</script>
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
    import {mapGetters} from 'vuex'
    export default {
        name: 'AppMain',
        data(){
            return {}
        },
        computed : {
            ...mapGetters('tabMenus',['cachedTabs'])
        }
    }
</script>
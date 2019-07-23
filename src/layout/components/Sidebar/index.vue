<template>
    <div class="sidebar-container">
        <Logo :collapse="open"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Logo from './Logo.vue'
    export default {
        data(){
            return {

            }
        },
        components : {Logo},
        computed : {
            ...mapGetters([
                'open'
            ])
        }

    }
</script>

<style scoped>
    .sidebar-container{
        width:210px;

    }
</style>
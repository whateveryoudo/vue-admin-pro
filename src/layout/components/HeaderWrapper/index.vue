<template>
    <div class="page-header-wrapper">
        <!--        面包屑-->
        <Breadcrumb></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        name: "HeaderWrapper",
        components : {
            Breadcrumb
        }
    }
</script>

<style lang="scss" scoped>
    .page-header-wrapper{
        overflow: hidden;
    }
</style>
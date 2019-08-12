<template>
    <div class="page-basic-layout analysis-container">
        <IntroduceRow></IntroduceRow>

    </div>

</template>

<script>
    import IntroduceRow from './components/IntroduceRow'
    export default {
        name: "analysis",
        components : {
            IntroduceRow
        }
    }
</script>

<style lang="scss" scoped>
    .analysis-container{
        .card-title-icon{
            float: right;
            cursor: pointer;
        }
    }

</style>
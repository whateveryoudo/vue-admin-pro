<template>
    <el-card class="chart-card-container">
        <div slot="header" v-if="hasHeader" class="clearfix">
            <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="footer-wrapper">
            <slot name="footer"></slot>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "ChartCard",
        props : {
            hasHeader : {
                type : Boolean,
                default : false
            }
        }
    }
</script>
<!--scoped下 子组件无法影响 slot 样式-->
<style lang="scss">

</style>
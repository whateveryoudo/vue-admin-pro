<template>
    <div class="page-basic-layout analysis-container">
        <IntroduceRow></IntroduceRow>
        <ProportionSales></ProportionSales>

    </div>

</template>

<script>
import IntroduceRow from "./components/IntroduceRow"
import ProportionSales from "./components/ProportionSales"
export default {
  name: "analysis",
  data () {
    return {
    }
  },
  components: {
    IntroduceRow,
    ProportionSales
  },
  methods: {
    handleClick () {

    }
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

<template>
    <el-color-picker
            v-model="color1"
            :predefine="preColors"
    ></el-color-picker>
</template>

<script>
    export default {
        name: "ThemePicker",
        data(){
            return {
                color1 : '#409EFF',
                preColors : ['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']

            }
        }
    }
</script>

<style scoped>

</style>
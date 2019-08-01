<template>
    <div class="tabulation-header">  
        <el-row class="elrow elrow1">
          <el-col >{{title}}</el-col>
        </el-row>
        <el-row class="elrow2">
          <el-col>{{titlecontent}}</el-col>
        </el-row>
    </div>
</template>

<script>
   
    export default {
        props:['title','titlecontent'],
        name: "tabulationheade",
        components : {
            
        }
    }
</script>

<style lang="scss" scoped>
    .tabulation-header{
        height:70px;
        line-height: 35px;
        margin:6px auto 6px auto;
        /*border-bottom:1px solid #F00;
        border-top:1px solid #F00;*/
        background-color:#EEEEEE;
        
        .elrow{
            margin-top:10px;
            margin-left:30px;
        }
        .elrow1{
            font-size:20px;
        }
        .elrow2{
            font-size:6px;
            margin-left:32px;
        }
    }
</style>
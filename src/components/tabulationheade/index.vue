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
        /*border-bottom:1px solid #F00;
        border-top:1px solid #F00;*/
        background-color:#fff;
        
        .elrow{
            margin-left:30px;
        }
        .elrow1{
            color: rgba(0,0,0,.85);
            font-weight: 700;
            font-size: 16px;
        }
        .elrow2{
            margin-left:32px;
            font-size: 14px;
            color: rgba(0,0,0,.65);
        }
    }
</style>
<template>
    <div class="page-basic-list">
        <tabulationheade :title=titles :titlecontent=content></tabulationheade>
        <div class="basic-title">
        <el-row class="elrow" justify="center" >
          <el-col :span="6" :offset="2">进行中的任务</el-col>
          <el-col :span="6" :offset="2">剩余任务</el-col>
          <el-col :span="6" :offset="2">任务总耗时</el-col>
        </el-row>
        <el-row class="elrow elrow1">
          <el-col :span="6" :offset="2">10任务</el-col>
          <el-col :span="6" :offset="2"> 3个</el-col>
          <el-col :span="6" :offset="2">10小时</el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
  import tabulationheade from '@/components/tabulationheade'
    export default {
        name: "basiclist",
         data(){
            return{
             titles:'',
             content:'',
            }      
        },
        components : {
            tabulationheade
        },
        created(){
             this.initload();
        },
        methods: {
         initload(){
           const route = this.$route;
           this.titles=route.meta.title;//获取当前的路由
           this.content="这是一个基础的列表！熟悉练手用的";
         }
        }
    }
</script>

<style lang="scss" scoped>
    .page-basic-list{
        .basic-title{
        height:80px;
        line-height: 35px;
        margin:10px 10px 10px 10px;
        /*border-bottom:1px solid #F00;
        border-top:1px solid #F00;*/
        background-color:#EEEEEE;
            .elrow{
                margin-top:10px;
                text-align:center;
                font-size:6px;
            }
            .elrow1{
                 font-size:20px;
            }
        }
    }
</style>
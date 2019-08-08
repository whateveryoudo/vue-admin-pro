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
          <el-col :span="6" :offset="2">{{generaltask}}任务</el-col>
          <el-col :span="6" :offset="2"> {{remainingtasks}}个</el-col>
          <el-col :span="6" :offset="2">{{tasksTime}}小时</el-col>
        </el-row>
        </div>
        <div>
           <div class="search">
             <el-row >
                <el-col :span="4" :offset="18">
                <el-input  
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
                </el-col>
                </el-row>
               <el-row :offset="4"> </el-row>
               <el-button  class="addbutton" @click="dialogFormVisible = true">+ 添加</el-button>
               <el-dialog title="任务编辑" :visible.sync="dialogFormVisible">
                 <addTask></addTask>
               </el-dialog>
            </div>
        </div>
        <div>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :show-header="false"
            style="width: 100%">
            <el-table-column>
              <template  slot-scope="scope">
                <div class="colum-div-image"><span><img style="width:100%;height:100%;" :src=scope.row.img></span></div>
              </template>
            </el-table-column>
            <el-table-column>
              <template  slot-scope="scope">
                <div>
                  <div>
                    {{scope.row.taskname}}
                  </div>
                  <div>
                    {{scope.row.describe}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template  slot-scope="scope">
                <div>
                 <div>
                    负责人
                 </div>
                 <div>
                    {{scope.row.name}}
                 </div>
                </div>
                </template>
              </el-table-column>
            <el-table-column>
              <template  slot-scope="scope">
               <div>
                 <div>
                    开始时间
                 </div>
                 <div>
                    {{scope.row.startdate}}
                 </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template  slot-scope="scope">
                <div>
                 <el-progress :percentage=scope.row.percentage :color="customColorMethod(scope.row.percentage)"></el-progress>            
                </div>
              </template>
            </el-table-column>
            <el-table-column align="right">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
            </el-table-column>
          </el-table>
          <el-pagination style="float:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2,100, 200, 300, 400]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </div>
    </div>
</template>

<script>
  import tabulationheade from '@/components/tabulationheade'
  import addTask from './components/addTasks'
    export default {
        name: "basiclist",
         data(){
            return{
             currentPage:1,
             pagesize:2,
             total:1000,
             titles:'',
             content:'',
             generaltask:'30',
             remainingtasks:'12',
             tasksTime:'2',
             tableData: [{
                img:'https://dev-file.iviewui.com/p50TGdvvpXWVR06Vu2TAwkpRnpt8FURA/avatar',
                taskname:'element table',
                describe:'描述',
                startdate: '2016-05-20',
                name: '王小虎',
                percentage: 20,
                //address: '上海市普陀区金沙江路 1518 弄'
                }, {
                img :'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/avatar',
                taskname:'element嵌套div',
                describe:'table组件嵌套div',
                startdate: '2016-05-12',
                name: '王小虎',
                percentage: 60,
                //address: '上海市普陀区金沙江路 1518 弄'
                }, {
                img :'https://dev-file.iviewui.com/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU/avatar',
                taskname:'scope.roe ',
                describe:'可以获取当前列的所有数据',
                startdate: '2016-05-22',
                name: '王小虎',
                percentage: 30,
                //address: '上海市普陀区金沙江路 1519 弄'
                }, {
                img :'https://dev-file.iviewui.com/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6/avatar',
                taskname:'scope.$index',
                describe:'是当前列的索引',
                startdate: '2016-05-02',
                name: '王小虎',
                percentage: 80,
                //address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                img :'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/avatar',
                taskname:'solt header',
                describe:'自定义表头',
                startdate: '2016-05-23',
                name: '王小虎',
                percentage: 60,
                //address: '上海市普陀区金沙江路 1519 弄'
                }],
            search: '',
            dialogFormVisible: false
            }      
        },
        components : {
            tabulationheade,
            addTask
        },
        created(){
          this.total = this.tableData.length;
             this.initload();
        },
        methods: {
         initload(){
           const route = this.$route;
           this.titles=route.meta.title;//获取当前的路由
           this.content="这是一个基础的列表！熟悉练手用的";
         },
         customColorMethod(percentage) {//进度条的颜色设置
            if (percentage < 30) {
            return '#909399';
            } else if (percentage < 70) {
            return '#e6a23c';
            } else {
            return '#67c23a';
            }
        },
        handleSizeChange(val) {//设置每页条数
        this.pagesize=val;
        },
        handleCurrentChange(val) {//设置当前页
        this.currentPage=val;
        },
        addTask() {//添加任务
         alert("点击事件");
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
        .search{
          
          float:right;
          width: 100%;
          margin:10px 10px 10px 40px;
        }
        .addbutton{
           float:center;
           width: 85%;
           margin:10px 60px 10px 60px;
           //border-bottom:1px solid #F00; //下边框实线
          // border-top:1px solid #F00;//上边框实线
           border:1px dashed #000; //四边虚线
        }
        .colum-div-image{
         width: 40px;
         height: 40px;
         margin:2px 2px 2px 2px;
        }
    }
</style>
<template>
    <el-form :model="tasks" :rules="rules" ref="tasks" label-width="100px" calss="demo-ruleForm">
        <el-form-item label="任务名称" prop="taskname">
            <el-input v-model="tasks.taskname"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-col :span="11">
            <el-form-item prop="startdate">
              <el-date-picker type="date" placeholder="选择日期" v-model="tasks.startdate" style="width: 100%;"></el-date-picker>
           </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
            <el-input type="textarea" v-model="tasks.describe"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitFrom('tasks')">添加</el-button>
            <el-button  @click="resetForm('tasks')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: "addTasks",
  data () {
    return {
      tasks: {
        taskname: "",
        startdate: "",
        describe: ""
      },
      rules: {
        taskname: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 2, max: 10, message: "4到5个字符", trigger: "blur" }
        ],
        startdate: [
          { type: "date", required: true, message: "请选择日期", trigger: "change" }
        ],
        describe: [
          { required: true, message: "请输入描述一下任务内容大概", trigger: "blur" },
          { max: 100, message: "4到5个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submitFrom (tasks) {
      this.$refs[tasks].validate((valid) => {
        if (valid) {
          alert("添加任务成功");
        } else {
          alert("失败");
        }
      });
    },
    resetForm (tasks) {
      alert("重置");
      this.$refs[tasks].resetFields();
    }
  }
}
</script>
<style>

</style>

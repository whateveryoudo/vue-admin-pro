<template>
  <div>
    <el-card>
      <el-table
        ref="table"
        :data="dataSource"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
      >
        <el-table-column prop="sequence" label="序号">
          <template slot-scope="{ scope, $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="应用编码"></el-table-column>
        <el-table-column prop="title" label="应用名称"></el-table-column>
        <el-table-column prop="state" label="应用状态">
          <template slot-scope="scope">
            <span
              :style="{
                color: getTypeDesc(scope.row.status, 'APP_STATUS').color,
              }"
            >
              {{ getTypeDesc(scope.row.status, "APP_STATUS").text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <OperationRender
              :triggerEvent="(item) => handleClick(item, record)"
              :operationData="operationData"
              :record="scope.row"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination-wrapper">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="pageSizeOptions"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </el-card>
     <AppDetail
      v-if="appDetailVisible.destroy"
      :visible="appDetailVisible.visible"
      :menuId="record.id"
      @closeModal="toggleModal('appDetailVisible', false)"
    />
  </div>
</template>

<script>
import tableMixins from "@/mixins/tableMixins";
import { fetchList } from "@/api/appManage";
import { operationData } from "./tableDataConfig";
import AppDetail from "./components/AppDetail";
export default {
  name: "AppManage",
  mixins: [tableMixins],
  components: {
    AppDetail
  },
  data () {
    return {
      queryDataFunc: fetchList,
      // 详情查看
      appDetailVisible: {
        destroy: false,
        visible: false
      },
      record: {},
      vuexOptionsList: [
        { typeKey: "APP_STATUS", actionKey: "getParamsByType" }
      ], // 获取界面需获取的下拉数据字段集合(需在store中提供相关数据与方法)
      operationData
    };
  },
  created () {},
  methods: {
    // 弹框显示切换(采用两个变量控制过渡效果)
    toggleModal (modalKey, flag = true) {
      if (flag) {
        this[modalKey].destroy = flag;
        this.$nextTick(() => {
          this[modalKey].visible = flag;
        });
      } else {
        this[modalKey].visible = flag;
        setTimeout(() => {
          this[modalKey].destroy = flag;
        }, 200);
      }
    },
    handleDetail (record) {
      this.record = record;
      this.toggleModal("appDetailVisible");
    }
  }
};
</script>

<style scoped lang="scss">
</style>

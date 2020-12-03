<template>
  <div>
    <el-card>
      <SearchFilterForm
        :fieldsData="searchFormData"
        :filedValues="searchParams"
        @onChangeField="handleChangeField"
        @onSearch="queryData(true)"
        @onReset="handleReset"
      />
      <SearchOptRender
        :triggerEvent="handleClick"
        :operationData="searchOptData"
      />
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
              :triggerEvent="(item) => handleClick(item, scope.row)"
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
      :appId="record.id"
      @closeModal="toggleModal('appDetailVisible', false)"
    />
    <AppEdit
      v-if="appEditVisible.destroy"
      :visible="appEditVisible.visible"
      :isEdit="isEdit"
      :appId="record.id"
      @refreshTable="queryData(true)"
    />
  </div>
</template>

<script>
import tableMixins from "@/mixins/tableMixins";
import formatMixins from "@/mixins/formatMixins";
import { fetchList } from "@/api/appManage";
import { operationData, searchFormData, searchOptData } from "./tableDataConfig";
import { toggleModal } from "@/utils"
import AppDetail from "./components/AppDetail";
import AppEdit from "./components/AppEdit";
export default {
  name: "AppManage",
  mixins: [tableMixins, formatMixins],
  components: {
    AppDetail, AppEdit
  },
  data () {
    return {
      searchFormData,
      searchOptData,
      queryDataFunc: fetchList,
      // 详情查看
      appDetailVisible: {
        destroy: false,
        visible: false
      },
      // 新增 | 编辑处理
      appEditVisible: {
        destroy: true,
        visible: true
      },
      record: {},
      vuexOptionsList: [
        { typeKey: "APP_STATUS", actionKey: "getParamsByType" }
      ], // 获取界面需获取的下拉数据字段集合(需在store中提供相关数据与方法)
      operationData,
      isEdit: false // 操作弹框类型
    };
  },
  created () {},
  methods: {
    toggleModal,
    handleAdd () {
      this.isEdit = false;
      this.toggleModal("appEditVisible");
    },
    handleDetail (record) {
      this.record = record;
      this.toggleModal("appDetailVisible");
    },
    handleEdit (record) {
      this.record = record;
      this.isEdit = true;
      this.toggleModal("appEditVisible");
    }
  }
};
</script>

<style scoped lang="scss">
</style>

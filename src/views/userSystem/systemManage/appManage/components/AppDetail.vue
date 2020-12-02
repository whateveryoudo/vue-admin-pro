<template>
  <div>
    <el-dialog title="详情信息" :visible="visible" @close="handleClose">
      <DetailList v-loading="loading" col="2">
        <DetailListItem term="应用编码">{{
          detailInfo.code | nullText
        }}</DetailListItem>
        <DetailListItem term="应用名称">{{
          detailInfo.title | nullText
        }}</DetailListItem>
        <DetailListItem term="应用状态">
           <span
              :style="{
                color: getTypeDesc(detailInfo.status, 'APP_STATUS').color,
              }"
            >
              {{ getTypeDesc(detailInfo.status, "APP_STATUS").text }}
            </span>
        </DetailListItem>
        <DetailListItem term="应用图标"></DetailListItem>
        <DetailListItem term="应用描述" itemCol="1">{{
          detailInfo.desc | nullText
        }}</DetailListItem>
      </DetailList>
    </el-dialog>
  </div>
</template>

<script>
import DetailList from "@/components/DetailList/index.vue";
import formatMixins from "@/mixins/formatMixins";
import { fetchDetail } from "@/api/appManage";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appId: {
      type: String,
      default: ""
    }
  },
  mixins: [formatMixins],
  components: {
    DetailList,
    DetailListItem: DetailList.Item
  },
  data () {
    return {
      loading: false,
      detailInfo: {},
      vuexOptionsList: [
        { typeKey: "APP_STATUS", actionKey: "getParamsByType" }
      ]
    };
  },
  computed: {},
  created () {
    this.appId && this.getDetail();
  },
  mounted () {},
  methods: {
    async getDetail () {
      this.loading = true;
      const res = await fetchDetail(this.appId);
      this.loading = false;
      this.detailInfo = res.data;
    },
    handleClose () {
      this.$emit("closeModal");
    }
  }
};
</script>
<style scoped>
</style>

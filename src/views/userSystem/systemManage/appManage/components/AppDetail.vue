<template>
<div>
  <el-dialog title="详情信息" :visible="visible" @close="handleClose">
    <DetailList v-loading="loading">
      <DetailListItem term="上级菜单">{{detailInfo.parentMenuName | nullText}}</DetailListItem>
      <DetailListItem :term="menuName">{{detailInfo.title | nullText}}</DetailListItem>
      <DetailListItem :term="menuPathDesc">{{detailInfo.component | nullText}}</DetailListItem>
      <DetailListItem v-if="detailInfo.nodeType === 1" term="前端组件">{{detailInfo.component | nullText}}</DetailListItem>
      <DetailListItem term="排序">{{detailInfo.sort | nullText}}</DetailListItem>
    </DetailList>
  </el-dialog>
</div>
</template>

<script>
import DetailList from "@/components/DetailList/index.vue"
import { fetchDetail } from "@/api/appManage"
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    menuId: {
      type: String,
      default: ""
    }
  },
  components: {
    DetailList,
    DetailListItem: DetailList.Item
  },
  data () {
    return {
      loading: false,
      detailInfo: {}
    }
  },
  computed: {
    menuPathDesc () {
      return this.detailInfo.nodeType === 1 ? "菜单路径" : "操作标记"
    },
    menuName () {
      return this.detailInfo.nodeType === 1 ? "菜单名称" : "操作名称"
    }
  },
  created () {
    this.menuId && (this.getDetail());
  },
  mounted () {

  },
  methods: {
    async getDetail () {
      this.loading = true;
      const res = await fetchDetail(this.menuId);
      this.loading = false;
      this.detailInfo = res.data.menuInfo;
    },
    handleClose () {
      this.$emit("closeModal");
    }
  }
}
</script>
<style scoped>
</style>

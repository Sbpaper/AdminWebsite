<template>
  <div>
    <div class="ModuleBar">
      <div class="title">数据大观</div>
    </div>
    <el-row :gutter="20">
    <el-col :span="6">
      <ShowdataMagnet :title="'今日全站浏览量'" :data="module1.subject_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'今天新增文章数量'" :data="module1.subject_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'待审核文章'" :option='[{href:"subject", name:"前往审核"}]' :data="module1.subject_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'今日新增评论数量'" :data="module1.nowday_data_newadd_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'待处理举报统计'" :data="module1.gateway_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'已有TAG数量'" :data="module1.equipment_count" />
    </el-col>
    <el-col :span="6">
      <ShowdataMagnet :title="'全部文章数量'" :data="module1.opendata_usecount" />
    </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowdataMagnet from "@/components/Magnet/ShowdataMagnet.vue";
export default {
  name: "Index",
  data() {
    return {
      module1:{
        subject_count: 0,
        nowday_data_newadd_count: 0,
        gateway_count: 0,
        equipment_count: 0,
        opendata_usecount: 0
      }
    };
  },
  components: {
    ShowdataMagnet
  },
  methods: {
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>
</style>
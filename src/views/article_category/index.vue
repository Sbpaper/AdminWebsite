<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="分区名">
    </el-table-column>
  </el-table>

  <Pagination
    @pagination="getList()"
    :page.sync="currentPage"
    :pageCount.sync = totalPage
    :total.sync="total"
    v-if="total > 0"
  />

  </div>
</template>

<script>
// @ is an alias to /src
import { Querylist } from "@/api/category";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    Pagination
  },
  methods: {
    getList(){
      this.$http(
        Querylist({
          querypage: this.currentPage
        }),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.tableData = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 5 * 1000,
            });
          }
        }
      );
    }
  },
  created() {
    this.getList()
  }
};
</script>
<style lang="scss" scoped>
</style>
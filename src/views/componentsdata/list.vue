<template>
  <div>

    <el-row class="input">
      <div class="l">
        <div class="iname">组件</div>
        <el-radio-group v-model="form.category">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button
            v-for="(item, index) in opt_components"
            :label="item.key"
            :key="'form.category' + index"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </div>

      <div class="r"><el-button type="primary" @click="getList()">查询</el-button></div>

      <div class="r">
        <el-button type="primary" @click="drawer = true">新增数据</el-button>
      </div>
    </el-row>

    <el-row class="input">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="components"
        label="所属组件"
        align="center"
      ></el-table-column>

      <el-table-column label="类型" width="150" >
        <template slot-scope="scope">
          <span v-if="scope.row.totype == 1">站内文章</span>
          <span v-if="scope.row.totype == 2">站外链接</span>
        </template>
      </el-table-column>

      <el-table-column prop="head" label="封面">
        <template slot-scope="scope">
          <div style="height: 80px;">
            <img :src="scope.row.cover" style="height: 100%" />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="introduce"
        label="介绍"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="data"
        label="数据"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="sort"
        label="权重"
        width="100px"
        align="center"
      ></el-table-column>

      <el-table-column label="更多">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-row>
    <el-row class="input" v-if="total > 0" >
      <Pagination
        @pagination="getList()"
        :page.sync="currentPage"
        :pageCount.sync="totalPage"
        :total.sync="total"
        
      />
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import Pagination from "@/components/Pagination.vue";
import { Del, Query, Put } from "@/api/components"; // Put
import { upload } from "@/api/common";
export default {
  name: "componentsdata",
  data() {
    return {
      tableData: [],
      currentPage: null, // 当前页码
      total: null, // 总条目
      totalPage: null, // 总页数
      form: {
        category: 0,
        limit: 50,
      },
      drawer: false,
      putform: {
        components: 0,
        totype: 1,
        data: null,
        cover: null,
        title: null,
        introduce: null,
      },
      lodpath: null,
      opt_components: [{ name: "IndexMore", key: "indexmore" }],
    };
  },
  components: {
    // Pagination,
  },
  methods: {
    getList() {
      this.$http(
        Query({
          components: this.form.category,
          limit: this.form.limit,
        }),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            // this.total = res.data.total;
            // this.currentPage = res.data.currentPage;
            // this.totalPage = res.data.totalPages;
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
    },
    upLoad(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("uploadKey", "components");
      this.$http(upload(formData), (res) => {
        console.log(res);
        if (res.code == 200) {
          this.putform.cover = res.data.filename;
          this.lodpath = res.data.lodpath;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 5 * 1000,
          });
        }
      });
    },
    del(id) {
      this.$http(
        Del({
          id: id,
        }),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.getList();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 5 * 1000,
            });
          }
        }
      );
    },
    push() {
      let pdata = this.putform;
      this.$http(
        Put({
          components: pdata.components,
          totype: pdata.totype,
          data: pdata.data,
          cover: pdata.cover,
          title: pdata.title,
          introduce: pdata.introduce,
        }),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              duration: 5 * 1000,
            });
            this.getList();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 5 * 1000,
            });
          }
        }
      );
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
</style>
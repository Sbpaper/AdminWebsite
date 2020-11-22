<template>
  <div>

  <div class="input">

    <div class="l">
    <el-input placeholder="请输入内容" v-model="form.keyword">
      <template slot="prepend">搜索文章标题</template>
    </el-input></div>

    <div class="l">
    <el-select v-model="form.maincategory" placeholder="投稿类目">
      <el-option
        v-for="item in options.maincategory"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select></div>

    <div class="l">
    <el-select v-model="form.sourcetype" placeholder="投稿类型">
      <el-option
        v-for="item in options.sourcetype"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></div>

    <div class="l">
    <el-select v-model="form.verify" placeholder="审核状态">
      <el-option
        v-for="item in options.verify"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></div>

    <div class="l">
    <el-select v-model="form.is_delete" placeholder="删除状态">
      <el-option
        v-for="item in options.is_delete"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></div>

    <div class="l"><el-button @click="getList()">查询</el-button></div>

  </div>

  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column
      fixed
      prop="id"
      label="文章ID"
      width="100">
    </el-table-column>

    <el-table-column prop="head" label="封面" width="230px">
      <template slot-scope="scope">
        <el-image
          style="width: 100%; height: auto"
          :src="scope.row.cover"
        ></el-image>
      </template>
    </el-table-column>

    <el-table-column
      prop="title"
      label="文章标题"
      width="200px">
    </el-table-column>

    <el-table-column
      prop="introduce"
      label="文章介绍">
    </el-table-column>

    <el-table-column prop="sourcetype" label="投稿类型" width="100px">
      <template slot-scope="scope">
        {{doc.sourcetype[scope.row.sourcetype]}}
      </template>
    </el-table-column>

    <el-table-column prop="maincategory" label="投稿类型" width="100px">
      <template slot-scope="scope">
        {{showmaincategory(scope.row.maincategory)}}
      </template>
    </el-table-column>

    <el-table-column label="操作" fixed="right" width="200px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详细</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>

  </el-table>

  <Pagination
    @pagination="getList()"
    :page.sync="form.querypage"
    :pageCount.sync = totalPage
    :total.sync="total"
    v-if="total > 0"
  />

  </div>
</template>

<script>
// @ is an alias to /src
import { Admin_QueryArticleList } from "@/api/article.js";
import { Querylist } from "@/api/category";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "Home",
  data() {
    return {
      form:{
        maincategory: null,
        sourcetype: null,
        keyword: null,
        querypage: 1,
        perpage: 10,
        userid: null,
        verify: 1,
        is_delete: false
      },
      options: {
        sourcetype: [
          {
            value: 1,
            label: "站内原创",
          },
          {
            value: 2,
            label: "趣味论文分享",
          },
          {
            value: 3,
            label: "趣味网文分享",
          },
        ],
        maincategory: [],
        activity: [],
        verify: [
          {
            value: 0,
            label: "正常",
          },
          {
            value: 1,
            label: "未审核",
          },
          {
            value: 2,
            label: "被退回",
          }
        ],
        is_delete: [
          {
            value: false,
            label: "正常",
          },
          {
            value: true,
            label: "被删除",
          },
        ]
      },
      doc:{
        sourcetype: {
          1: "站内原创", 2:"趣味论文分享", 3: "趣味网文分享" 
        }
      },
      tableData: [],
      totalPage: 0, // 总页数
      total: 0,
    };
  },
  components: {
    Pagination
  },
  methods: {
    showmaincategory(id){
      for(let item of this.options.maincategory) {
        if(item.id == id){
          return item.name
        }
      }
    },
    getList(){
      this.$http(
        Admin_QueryArticleList(this.form),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.total = res.data.total;
            this.form.querypage = res.data.currentPage;
            this.totalPage = res.data.totalPages;
            this.tableData = res.data.result;
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
    this.getList();
    this.$http(
      Querylist({}),
      (res) => {
        if (res.code == 200) {
          this.options.maincategory = res.data;
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
};
</script>
<style lang="scss" scoped>
</style>
<template>
  <div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="add()">添加</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { Add } from "@/api/category";
export default {
  name: "Home",
  data() {
    return {
        input: null
    };
  },
  components: {
  },
  methods: {
    add(){
      this.$http(
        Add({
            name: this.input
        }),
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.$router.push({ name: "article_categoryIndex" });
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
  }
};
</script>
<style lang="scss" scoped>
</style>
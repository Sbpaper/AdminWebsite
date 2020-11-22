<template>
  <div>
    <div class="input">
      <div class="l">
        <el-select v-model="form.sets" placeholder="变更审核状态">
          <el-option
            v-for="item in options.sets"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <div class="l">
        <el-input
          placeholder="如需退回稿件请填写退回原因"
          v-model="form.keyword"
        >
          <template slot="prepend">退回原因</template>
        </el-input>
      </div>

      <div class="r">
        <el-button @click="push()">审核结果提交</el-button>
      </div>
    </div>

    <div class="lbody">
      <div class="itemname">文章标题</div>
      <el-row class="itemli" v-if="data.title">{{ data.title }} </el-row>

      <div class="itemname">介绍</div>
      <el-row class="itemli" v-if="data.introduce"
        >{{ data.introduce }}
      </el-row>

      <div class="itemname">稿件正文</div>
      <div class="itemli" v-html="data.content"></div>
    </div>
    <div class="rbody">
      <div class="itemname">封面</div>
      <el-row class="itemli">
        <img :src="data.cover" width="100%" />
      </el-row>

      <div class="itemname">上传者</div>
      <el-row class="itemli" v-if="data.uploaduser.username">
        {{ data.uploaduser.username }}
      </el-row>

      <div class="itemname">文章ID</div>
      <el-row class="itemli">
        {{ data.id }}
      </el-row>

      <div class="itemname">投稿类型</div>
      <el-row class="itemli">
        {{ doc.sourcetype[data.sourcetype] }}
      </el-row>

      <div class="itemname">主类目</div>
      <el-row class="itemli">
        {{ showmaincategory(options.maincategory, data.maincategory) }}
      </el-row>

      <div class="itemname">浏览量</div>
      <el-row class="itemli">
        {{ data.pageviews }}
      </el-row>

      <div class="itemname">评论数统计</div>
      <el-row class="itemli">
        {{ data.commentcount }}
      </el-row>

      <div class="itemname">删除状态</div>
      <el-row class="itemli">
        {{ showmaincategory(options.is_delete, data.is_delete) }}
      </el-row>
    </div>
  </div>
</template>

<script>
import { GetarticleItem, Admin_articleverify } from "@/api/article";
import { Querylist } from "@/api/category";
export default {
  name: "edit",
  data() {
    return {
      id: null,
      form: {
        sets: 100,
        verifytxt: "",
      },
      data: {
          uploaduser:{
              username:""
          }
      },
      options: {
        sets: [
          {
            id: 0,
            name: "通过",
          },
          {
            id: 1,
            name: "待审核",
          },
          {
            id: 3,
            name: "退回",
          },
          {
            id: 100,
            name: "请选择",
          },
        ],
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
          },
        ],
        is_delete: [
          {
            id: false,
            name: "正常",
          },
          {
            id: true,
            name: "被删除",
          },
        ],
      },
      doc: {
        sourcetype: {
          1: "站内原创",
          2: "趣味论文分享",
          3: "趣味网文分享",
        },
      },
    };
  },
  methods: {
    showmaincategory(data, id) {
      for (let item of data) {
        if (item.id == id) {
          return item.name;
        }
      }
    },
    GetItem(id) {
      this.id = id;
      this.$http(
        GetarticleItem({
          id: id,
        }),
        (res) => {
          if (res.code == 200) {
            this.data = res.data;
            this.form.sets = res.data.verify
            this.form.verifydate = res.data.verifydate
            console.log(res);
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
      this.$http(
        Admin_articleverify({
          articleid: this.id,
          sets: this.form.sets,
          verifytxt: this.form.verifytxt,
        }),
        (res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              duration: 5 * 1000,
            });
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
  components: {},
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.GetItem(id);
    } else {
      let id = this.$route.params.id;
      this.GetItem(id);
    }
    this.$http(Querylist({}), (res) => {
      if (res.code == 200) {
        this.options.maincategory = res.data;
      } else {
        this.$message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000,
        });
      }
    });
  },
};
</script>

<style>
.lbody {
  float: left;
  width: calc(100% - 330px);
}
.rbody {
  float: right;
  width: 300px;
}
.itemli {
  width: 100%;
  margin-bottom: 30px;
}
.itemname {
  font-size: 18px;
  width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
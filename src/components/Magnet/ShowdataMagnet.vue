
<!--
<ShowdataMagnet :title="'已接入主体数量'" :option='[{href:"subject", name:"管理主体"},{href:"subject", name:"管理主体"}]' :data="module1.subject_count" />
-->

<template>
      <div class="ShowdataMagnet">
        <div class="title">{{title}}</div>
        <div class="data">{{data}}</div>
        <div class="bar">
          <div v-for="(item, index) in option" :key="index + 'ShowdataMagnet' + item" class="button">
            <router-link :to="item.href">
              <el-button size="mini" round>{{item.name}}</el-button>
            </router-link>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ShowdataMagnet',
  data(){
    return{
    }
  },
  props: {
    title:{
      type: String,
      default:"数据名未设置"
    },
    data:{
      type: [Number, String],
      default:"获取数据失败"
    },
    option:{
      type: Array,
      default:function(){
          return [
          ]
      }
    }
  },
  methods: {
  }
}
</script>
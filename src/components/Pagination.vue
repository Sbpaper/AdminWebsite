<!--
      <Pagination
        @pagination="getList()"
        :page.sync="currentPage"
        :pageCount.sync = totalPage
        :total.sync="total"
        v-if="total > 0"
      />
    currentPage: 3, // 当前页码
    total: 1000, // 总条目
    totalPage: 100, // 总页数
    pageSize: 15 // 每页多少条
-->

<template>
  <div class="Components-Pagination">
    <div class="Pagination Content Common page-width">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :layout="layout"
        :page-count="pageCount"

        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
  </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      default: 20
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    }
  },
  created(){
  },
  methods: {
    handleSizeChange() {
      this.$emit('pagination')
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange() {
      this.$emit('pagination')
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
  .Components-Pagination{margin-top: 25px;}
  .Pagination.Content{margin: 0 auto !important;padding-right: 19px;}
</style>

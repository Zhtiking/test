<template>
  <div class="article-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              placeholder="请输入文章标题"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <!-- 表格本体 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleId"
        label="文章ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleTitle"
        label="文章标题"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="展示图">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            draggable="false"
            :preview-src-list="imageList"
            :src="row.articleImg"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleNeirong"
        label="文章内容"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleCategory"
        label="文章分类"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleStar"
        label="点赞数"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="articleComments"
        label="评论数"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="success" @click="handleAdd(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <add ref="add" @fetch-data="fetchData"></add>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/article.js'
  import Add from './component/articleEdit'
  export default {
    name: 'Article',
    components: { Add },
    data() {
      return {
        imgShow: true,
        imageList: [],
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          username: '',
        },
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {},
    methods: {
      handleAdd(row) {
        if (row.articleId) {
          this.$refs['add'].showAdd(row)
        } else {
          this.$refs['add'].showAdd()
        }
      },
      handleDelete(row) {
        if (row.articleId) {
          this.$baseConfirm('该操作不可撤销，确定删除吗？', null, async () => {
            // alert(row.brandId)
            const { msg } = await doDelete({ ids: row.articleId })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.articleId).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.articleImg)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>

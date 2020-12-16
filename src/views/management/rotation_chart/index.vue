<template>
  <div class="rotation_chart-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
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
        prop="rotationId"
        label="轮播图ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="rotationTitle"
        label="轮播图标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="rotationSedtitle"
        label="轮播图副标题"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="轮播图展示图">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            draggable="false"
            :preview-src-list="imageList"
            :src="row.rotationImg"
          >
            <div slot="error" class="image-slot" style="line-height: 50px">
              无图片
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="article.articleTitle"
        label="文章标题"
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
  import { getList, doDelete } from '@/api/rotation'
  import Add from './component/rotationchartEdit'
  export default {
    name: 'RotationChart',
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
        if (row.rotationId) {
          this.$refs['add'].showAdd(row)
        } else {
          this.$refs['add'].showAdd()
        }
      },
      handleDelete(row) {
        if (row.rotationId) {
          this.$baseConfirm('该操作不可撤销，确定删除吗？', null, async () => {
            const { msg } = await doDelete({ ids: row.rotationId })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.rotationId).join()
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
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.rotationImg)
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

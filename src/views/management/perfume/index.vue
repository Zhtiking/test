<template>
  <div class="perfume-container">
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
              placeholder="请输入用户名"
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
      style="width: 100%"
      border
      stripe
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeId"
        label="香水ID"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeName"
        label="香水名"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeEngname"
        label="香水英文名"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="brand.brandName"
        label="品牌"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumer.perfumerName"
        label="调香师"
        width="120"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumePublish"
        label="发行年份"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeAttribute"
        label="属性"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumePre"
        label="前调"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeMid"
        label="中调"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeFinal"
        label="尾调"
        width="150"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="展示图">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            draggable="false"
            :preview-src-list="imageList"
            :src="row.headImg"
          >
            <div slot="error" class="image-slot" style="line-height: 50px">
              无图片
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="介绍图">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            draggable="false"
            :preview-src-list="imageList2"
            :src="row.secondaryImg"
          >
            <div slot="error" class="image-slot" style="line-height: 50px">
              无图片
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeType"
        label="类型"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeSmell"
        label="气味"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeStyle"
        label="风格"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="perfumeIntro"
        label="简介"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="150"
        fixed="right"
      >
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
  import { getList, doDelete } from '@/api/perfume'
  import Add from './component/perfumeEdit'
  export default {
    name: 'Perfume',
    components: { Add },
    data() {
      return {
        imgShow: true,
        imageList: [],
        imageList2: [],
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
        if (row.perfumeId) {
          this.$refs['add'].showAdd(row)
        } else {
          this.$refs['add'].showAdd()
        }
      },
      handleDelete(row) {
        if (row.perfumeId) {
          this.$baseConfirm('该操作不可撤销，确定删除吗？', null, async () => {
            const { msg } = await doDelete({ ids: row.perfumeId })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.perfumeId).join()
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
        const imageList2 = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList2.push(item.img)
        })
        this.imageList2 = imageList2
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
        const imageList2 = []
        data.forEach((item, index) => {
          imageList.push(item.headImg)
          console.log('headImg' + item.headImg)
          console.log('secondaryImg' + item.secondaryImg)
          imageList2.push(item.secondaryImg)
        })
        this.imageList = imageList
        this.imageList2 = imageList2
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>

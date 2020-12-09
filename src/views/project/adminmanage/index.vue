<template>
  <div class="adminmanage-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
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
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="adminId"
        label="管理员ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="用户名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="adminLeixing"
        label="管理员类型"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="success" @click="handleEdit(row)">
            重置密码
          </el-button>
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
  import { adminList, doEdit, doDelete } from '@/api/adminManage'
  import Add from './component/AdminMangeEdit'
  export default {
    name: 'Adminmanage',
    components: { Add },
    data() {
      return {
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
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.adminLeixing == '超级管理员') {
          this.$baseMessage('您不能执行此操作', 'error')
        } else {
          this.$baseConfirm(
            '确定重置该管理员的密码吗？初始密码为123456',
            null,
            async () => {
              const { msg } = await doEdit({ adminId: row.adminId })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            }
          )
        }
      },
      handleAdd() {
        this.$refs['add'].showAdd()
      },
      handleDelete(row) {
        if (row.adminLeixing == '超级管理员') {
          this.$baseMessage('您不能执行此操作', 'error')
        } else {
          this.$baseConfirm('该操作不可撤销，确定删除吗？', null, async () => {
            const { msg } = await doDelete({ adminId: row.adminId })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        }
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
        const { data, totalCount } = await adminList(this.queryForm)
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>

<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="uname">
        <el-input
          v-model.trim="form.uname"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="uemail">
        <el-input
          v-model.trim="form.uemail"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="usex">
        <el-input
          v-model.trim="form.usex"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input
          v-model.trim="form.createTime"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="uhead">
        <el-image
          v-show="showImg"
          style="width: 200px; height: 200px"
          :src="form.uhead"
          draggable="false"
        ></el-image>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'UserEdit',
    components: {},
    data() {
      return {
        showImg: true,
        form: {
          uid: '',
          uname: '',
          uemail: '',
          uhead: '',
          createTime: '',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showAdd(row) {
        this.title = '查看'
        this.showImg = true
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.showImg = false
        this.clearUploadedImage()
      },
    },
  }
</script>

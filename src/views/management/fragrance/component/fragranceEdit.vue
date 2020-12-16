<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="香调名" prop="brandName">
        <el-input v-model.trim="form.fName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="fInto">
        <el-input
          v-model.trim="form.fInto"
          type="textarea"
          class="field-textarea"
          rows="5"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addFragrance } from '@/api/fragrance'
  export default {
    name: 'FragranceEdit',
    components: {},
    data() {
      return {
        showImg: false,
        form: {
          brandId: '',
          fName: '',
          fInto: '',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showAdd(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.showImg = true
          this.form = Object.assign({}, row)
        }
        console.log(1)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.showImg = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await addFragrance(this.form)
            this.$baseMessage(msg, 'success')
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
    },
  }
</script>

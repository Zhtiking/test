<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="perfumerName">
        <el-input
          v-model.trim="form.perfumerName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Base64" prop="perfumerBase" hidden>
        <el-input
          v-model.trim="form.perfumerBase"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="perfumerImg">
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          accept="image/jpeg,image/gif,image/png"
          :on-change="onUploadChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-image
            v-show="showImg"
            style="width: 130px; height: 180px"
            :src="form.perfumerImg"
            draggable="false"
          ></el-image>
          <el-button size="small" type="primary" style="display: block">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/jpeg文件，且不超过1MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介" prop="perfumerIntro">
        <el-input
          v-model.trim="form.perfumerIntro"
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
  import { addPerfumer } from '@/api/perfumer'
  export default {
    name: 'AdminMangeEdit',
    components: {},
    data() {
      return {
        showImg: false,
        form: {
          perfumerId: '',
          perfumerName: '',
          perfumerIntro: '',
          perfumerImg: '',
          perfumerBase: '',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      clearUploadedImage() {
        this.$refs.upload.clearFiles()
      },
      onUploadChange(file) {
        const that = this
        const isIMAGE = file.type === 'image/jpeg' || 'image/jpg'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
          return false
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
          return false
        }
        if (this.title == '添加') {
          this.showImg = true
        }
        this.form.perfumerImg = URL.createObjectURL(file.raw)
        //图片转化base64
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          // console.log(this.result)
          that.form.perfumerBase = this.result
        }
      },
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
        this.clearUploadedImage()
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await addPerfumer(this.form)
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

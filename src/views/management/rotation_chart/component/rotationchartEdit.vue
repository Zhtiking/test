<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="轮播图标题" prop="rotationTitle">
        <el-input
          v-model.trim="form.rotationTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="rotationSedtitle">
        <el-input
          v-model.trim="form.rotationSedtitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Base64" prop="baseImg" hidden>
        <el-input v-model.trim="form.baseImg" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="展示图" prop="rotationImg">
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
            style="width: 250px; height: 180px"
            :src="form.rotationImg"
            draggable="false"
          >
            <div slot="error" class="image-slot" style="line-height: 180px">
              <i class="el-icon-picture-outline">
                未添加图片
                <br />
                <br />
                <span style="color: blue">点击添加</span>
              </i>
            </div>
          </el-image>
          <el-button size="small" type="primary" style="display: block">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/jpeg文件，且不超过2MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="链接文章"
        prop="article.articleTitle"
        :rules="[
          { required: true, message: '请选择链接文章', trigger: 'change' },
        ]"
      >
        <el-select
          v-model="form.article.articleTitle"
          filterable
          placeholder="请输入文章标题"
          @change="selectChanged"
        >
          <el-option
            v-for="item in options"
            :key="item.articleId"
            :label="item.articleTitle"
            :value="item.articleId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addRotation } from '@/api/rotation'
  import { ArticleList } from '@/api/article.js'
  export default {
    name: 'RotationchartEdit',
    components: {},
    data() {
      return {
        showImg: false,
        form: {
          rotationId: '',
          articleId: '',
          rotationImg: '',
          rotationTitle: '',
          rotationSedtitle: '',
          articleTitle: '',
          baseImg: '',
          article: {
            articleId: '',
            articleTitle: '',
          },
        },
        title: '',
        dialogFormVisible: false,
        options: {
          article: {
            articleId: '',
            articleTitle: '',
          },
        },
      }
    },
    created() {},
    mounted() {},
    methods: {
      selectChanged(value) {
        this.form.articleId = value
        console.log(this.form.articleId)
      },
      clearUploadedImage() {
        this.$refs.upload.clearFiles()
      },
      onUploadChange(file) {
        const that = this
        const isIMAGE = file.type === 'image/jpeg' || 'image/jpg'
        const isLt1M = file.size / 2048 / 2048 < 1
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
        this.form.rotationImg = URL.createObjectURL(file.raw)
        //图片转化base64
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          // console.log(this.result)
          that.form.baseImg = this.result
        }
      },
      async showAdd(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.showImg = true
          this.form = Object.assign({}, row)
        }
        const { data } = await ArticleList()
        this.options = data
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
            const { msg } = await addRotation(this.form)
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

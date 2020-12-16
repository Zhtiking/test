<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1000px"
    @opened="show"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input
          v-model.trim="form.articleTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章展示图" prop="articleImg">
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
            style="width: 300px; height: 200px"
            :src="form.articleImg"
            draggable="false"
          ></el-image>
          <el-button size="small" type="primary" style="display: block">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/jpeg文件，且不超过2MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章分类" prop="articleCategory">
        <el-select v-model="form.articleCategory" placeholder="文章分类">
          <el-option label="专题" value="专题"></el-option>
          <el-option label="寻味" value="寻味"></el-option>
          <el-option label="知识" value="知识"></el-option>
        </el-select>
      </el-form-item>

      <!--富文本-->
      <el-form-item label="内容" prop="articleNeirong">
        <div id="demo1"></div>
        <textarea
          id=""
          v-model="form.articleNeirong"
          name=""
          cols="170"
          rows="20"
          hidden
        ></textarea>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addArticle } from '@/api/article'
  import wangEditor from 'wangeditor'
  export default {
    name: 'ArticleEdit',
    components: {},
    data() {
      return {
        isClear: false,
        detail: '',
        editor: null,
        editorData: '',
        showImg: false,
        form: {
          articleId: '',
          articleTitle: '',
          articleImg: '',
          articleNeirong: '',
          articleCategory: '',
          baseImg: '',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    mounted() {},
    methods: {
      show() {
        const editor = new wangEditor('#demo1')
        // 配置 onchange 回调函数，将数据同步到 vue 中
        editor.config.onchange = (newHtml) => {
          this.form.articleNeirong = newHtml
        }
        editor.config.colors = [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf',
          '#F56C6C',
        ]
        // 创建编辑器
        editor.create()
        editor.txt.html(this.form.articleNeirong)
        this.editor = editor
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
        this.form.articleImg = URL.createObjectURL(file.raw)
        //图片转化base64
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          // console.log(this.result)
          that.form.baseImg = this.result
        }
      },
      showAdd(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.showImg = true
          this.form = Object.assign({}, row)
          this.editorData = this.form.articleNeirong
        }
        console.log(1)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.showImg = false
        this.editor.destroy()
        this.editor = null
        this.clearUploadedImage()
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await addArticle(this.form)
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
<style lang="scss">
  .home {
    width: 500px;
    margin: auto;
    position: relative;
    .btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px 10px;
      cursor: pointer;
    }
    h3 {
      margin: 30px 0 15px;
    }
  }
</style>

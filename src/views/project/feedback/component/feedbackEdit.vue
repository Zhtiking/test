<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="token" prop="token" hidden>
        <el-input v-model="form.token" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户" prop="uname">
        <el-input
          v-model.trim="form.user.uname"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈时间" prop="feedbackTime">
        <el-input
          v-model.trim="form.feedbackTime"
          disabled
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="feedbackNeirong">
        <el-input
          v-model.trim="form.feedbackNeirong"
          disabled
          autocomplete="off"
          type="textarea"
          class="field-textarea"
          rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="回复" prop="feedback">
        <el-input
          id="huifu"
          v-model.trim="form.feedback"
          type="textarea"
          class="field-textarea"
          rows="5"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">回 复</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { feedBack } from '@/api/feedback'
  import { getAccessToken } from '@/utils/accessToken'
  export default {
    name: 'FeedBackEdit',
    components: {},
    data() {
      return {
        form: {
          fId: '',
          user: {
            uid: '',
            uname: '',
          },
          admin: {
            adminId: '',
            username: '',
          },
          uid: '',
          adminId: '',
          processing: '',
          feedback: '',
          feedbackNeirong: '',
          feedbackTime: '',
          token: '',
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showAdd(row) {
        this.title = '回复'
        this.form = Object.assign({}, row)
        this.form.token = getAccessToken()
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await feedBack(this.form)
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

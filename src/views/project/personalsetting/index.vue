<template>
  <div class="personalsetting-container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 500px"
    >
      <el-form-item label="token" prop="token" hidden>
        <el-input v-model="ruleForm.token" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="pass">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { isPassword } from '@/utils/validate'
  import { personInfo } from '@/api/personalsetting'
  import { getAccessToken } from '@/utils/accessToken'
  export default {
    name: 'Personalsetting',
    components: {},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'))
        } else if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else if (value == this.ruleForm.pass) {
          callback(new Error('两次输入密码一致!'))
        } else if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          token: getAccessToken(),
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        },
      }
    },
    created() {},
    mounted() {},
    methods: {
      // getToken() {
      //   that.ruleForm.token = getAccessToken()
      // },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { msg, code } = await personInfo(this.ruleForm)
            this.$emit('fetch-data')
            if (code === 200) {
              this.$baseMessage(msg, 'success')
            } else {
              this.$baseMessage(msg, 'error')
            }
            this.resetForm('ruleForm')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>

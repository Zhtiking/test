<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="780px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px" inline>
      <el-form-item
        label="香水名"
        prop="perfumeName"
        :rules="[
          { required: true, message: '香水名不能为空', trigger: 'blur' },
        ]"
      >
        <el-input v-model.trim="form.perfumeName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="perfumeEngname">
        <el-input
          v-model.trim="form.perfumeEngname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!--三个外键-->
      <el-form-item
        label="品牌"
        prop="brand.brandName"
        :rules="[
          { required: true, message: '品牌不能为空', trigger: 'change' },
        ]"
      >
        <el-select
          v-model="form.brand.brandName"
          placeholder="请选择品牌"
          style="width: 200px"
          filterable
          @change="changeBrand"
        >
          <el-option
            v-for="item in brands"
            :key="item.brandId"
            :label="item.brandName"
            :value="item.brandId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="调香师"
        prop="perfumer.perfumerName"
        :rules="[
          { required: true, message: '调香师不能为空', trigger: 'change' },
        ]"
      >
        <el-select
          v-model="form.perfumer.perfumerName"
          placeholder="请选择调香师"
          style="width: 200px"
          filterable
          @change="changePerfumer"
        >
          <el-option
            v-for="item in perfumers"
            :key="item.perfumerId"
            :label="item.perfumerName"
            :value="item.perfumerId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="香调"
        prop="fragrance.fName"
        :rules="[
          { required: true, message: '香调不能为空', trigger: 'change' },
        ]"
      >
        <el-select
          v-model="form.fragrance.fName"
          placeholder="请选择香调"
          style="width: 200px"
          filterable
          @change="changeFragrance"
        >
          <el-option
            v-for="item in fragrances"
            :key="item.fId"
            :label="item.fName"
            :value="item.fId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发行年份" prop="perfumePublish">
        <el-date-picker
          v-model="form.perfumePublish"
          style="width: 200px"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="属性" prop="perfumeAttribute">
        <el-select
          v-model="form.perfumeAttribute"
          placeholder="请选择属性"
          style="width: 200px"
        >
          <el-option
            v-for="item in Attribute"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前调" prop="perfumePre">
        <el-input v-model="form.perfumePre" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="中调" prop="perfumeMid">
        <el-input v-model="form.perfumeMid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="尾调" prop="perfumeFinal">
        <el-input v-model="form.perfumeFinal" autocomplete="off"></el-input>
      </el-form-item>
      <br />
      <!-- 图片 -->
      <el-form-item label="展示图" prop="headImg">
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          accept="image/jpeg,image/gif,image/png"
          :on-change="onUploadChange1"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-image
            v-show="showImg"
            style="width: 180px; height: 180px"
            :src="form.headImg"
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
      <el-form-item label="介绍图" prop="secondaryImg">
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          accept="image/jpeg,image/gif,image/png"
          :on-change="onUploadChange2"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-image
            v-show="showImg2"
            style="width: 180px; height: 180px"
            :src="form.secondaryImg"
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
      <!-- 分类 -->
      <el-form-item label="类型" prop="perfumeType">
        <el-select
          v-model="form.perfumeType"
          placeholder="请选择香水类型"
          filterable
        >
          <el-option
            v-for="item in Type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="气味" prop="perfumeSmell">
        <el-select
          v-model="form.perfumeSmell"
          placeholder="请选择香水气味"
          filterable
        >
          <el-option
            v-for="item in Smell"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风格" prop="perfumeStyle">
        <el-select
          v-model="form.perfumeStyle"
          placeholder="请选择香水风格"
          filterable
        >
          <el-option
            v-for="item in Style"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="简介" prop="perfumeIntro">
        <el-input
          v-model.trim="form.perfumeIntro"
          style="width: 600px"
          type="textarea"
          class="field-textarea"
          rows="6"
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
  import { addPerfume } from '@/api/perfume'
  import { brandList } from '@/api/brand'
  import { perfumerList } from '@/api/perfumer'
  import { fragranceList } from '@/api/fragrance'
  export default {
    name: 'PerfumerEdit',
    components: {},
    data() {
      return {
        showImg: false,
        showImg2: false,
        Attribute: [
          {
            value: '男香',
            label: '男香',
          },
          {
            value: '女香',
            label: '女香',
          },
          {
            value: '中性香',
            label: '中性香',
          },
          {
            value: '宝宝香',
            label: '宝宝香',
          },
        ],
        Type: [
          { value: '入门', label: '入门' },
          { value: '经典', label: '经典' },
          { value: '小众', label: '小众' },
          { value: '复古', label: '复古' },
          { value: '平价', label: '平价' },
          { value: '高端', label: '高端' },
          { value: '跨界', label: '跨界' },
          { value: '猎奇', label: '猎奇' },
        ],
        Style: [
          { value: '清新', label: '清新' },
          { value: '正式', label: '正式' },
          { value: '忧郁', label: '忧郁' },
          { value: '成熟', label: '成熟' },
          { value: '性感', label: '性感' },
          { value: '甜美', label: '甜美' },
          { value: '高冷', label: '高冷' },
          { value: '优雅', label: '优雅' },
        ],
        Smell: [
          { value: '木质', label: '木质' },
          { value: '水生', label: '水生' },
          { value: '柑橘', label: '柑橘' },
          { value: '皂感', label: '皂感' },
          { value: '焚香', label: '焚香' },
          { value: '美食', label: '美食' },
          { value: '皮革', label: '皮革' },
          { value: '绿叶', label: '绿叶' },
          { value: '东方', label: '东方' },
          { value: '茶香', label: '茶香' },
          { value: '药感', label: '药感' },
          { value: '檀香', label: '檀香' },
        ],
        brands: {
          brand: {
            brandId: '',
            brandName: '',
          },
        },
        perfumers: {
          perfumer: {
            perfumerId: '',
            perfumerName: '',
          },
        },
        fragrances: {
          fragrance: {
            fId: '',
            fName: '',
          },
        },
        form: {
          perfumeId: '',
          perfumerId: '',
          brandId: '',
          perfumeFragrance: '',
          perfumeName: '',
          perfumeEngname: '',
          perfumePublish: '',
          perfumeAttribute: '',
          perfumePre: '',
          perfumeMid: '',
          perfumeFinal: '',
          headImg: '',
          secondaryImg: '',
          perfumeType: '',
          perfumeSmell: '',
          perfumeStyle: '',
          perfumeIntro: '',
          perfumeClassification: '',
          //两张图片格式转换
          baseImg1: '',
          baseImg2: '',
          //三个外键
          brand: {
            brandId: '',
            brandName: '',
          },
          perfumer: {
            perfumerId: '',
            perfumerName: '',
          },
          fragrance: {
            fId: '',
            fName: '',
          },
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      changeBrand(value) {
        this.form.brandId = value
      },
      changePerfumer(value) {
        this.form.perfumerId = value
      },
      changeFragrance(value) {
        this.form.perfumeFragrance = value
      },
      clearUploadedImage() {
        this.$refs.upload.clearFiles()
      },
      onUploadChange1(file) {
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
        this.form.headImg = URL.createObjectURL(file.raw)
        //图片转化base64
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          // console.log(this.result)
          that.form.baseImg1 = this.result
        }
      },
      onUploadChange2(file) {
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
          this.showImg2 = true
        }
        this.form.secondaryImg = URL.createObjectURL(file.raw)
        //图片转化base64
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          // console.log(this.result)
          that.form.baseImg2 = this.result
        }
      },
      async showAdd(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.showImg = true
          this.showImg2 = true
          this.form = Object.assign({}, row)
        }
        var { data } = await brandList()
        this.brands = data
        var { data } = await perfumerList()
        this.perfumers = data
        var { data } = await fragranceList()
        this.fragrances = data
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.showImg = false
        this.showImg2 = false
        this.clearUploadedImage()
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await addPerfume(this.form)
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

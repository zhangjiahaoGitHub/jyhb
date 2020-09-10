<template>
  <div class="hundred adduserreal-layout">
    <h3>请上传身份证照片</h3>
    <div>
      <div>
        <el-upload
          class='upload-demo'
          action='#'
          ref='upload'
          :show-file-list='false'
          :multiple='true'
          accept='image/*'
          :on-change='handleChange'
          :on-exceed='handleChangeMax'
          :http-request='none'
          :file-list='fileList'
          :auto-upload='true'
          :limit='4'
          list-type='picture-card'>
          <img :src="url?url:require('../../assets/real/positive.png')" class=''/>
          <p>
            点击上传<span>人像面</span>
          </p>
        </el-upload>
      </div>
      <div>
        <el-upload
          class='upload-demo'
          action='#'
          ref='upload'
          :show-file-list='false'
          :multiple='true'
          accept='image/*'
          :on-change='handleTwo'
          :on-exceed='handleChangeMax'
          :http-request='none'
          :file-list='fileList'
          :auto-upload='true'
          :limit='4'
          list-type='picture-card'>
          <img :src="urlTwo?urlTwo:require('../../assets/real/negative.png')" class=''/>
          <p>
            点击上传<span>国徽面</span>
          </p>
        </el-upload>
      </div>
    </div>
    <h3>请上传手持照片</h3>
    <div>
      <div>
        <el-upload
          class='upload-demo'
          action='#'
          ref='upload'
          :show-file-list='false'
          :multiple='true'
          accept='image/*'
          :on-change='handleThree'
          :on-exceed='handleChangeMax'
          :http-request='none'
          :file-list='fileList'
          :auto-upload='true'
          :limit='4'
          list-type='picture-card'>
          <img :src="urlThree?urlThree:require('../../assets/real/card.png')" class=''/>
          <p>
            点击上传<span>储蓄卡正面</span>
          </p>
        </el-upload>
      </div>
      <div>
        <el-upload
          class='upload-demo'
          action='#'
          ref='upload'
          :show-file-list='false'
          :multiple='true'
          accept='image/*'
          :on-change='handleFour'
          :on-exceed='handleChangeMax'
          :http-request='none'
          :file-list='fileList'
          :auto-upload='true'
          :limit='4'
          list-type='picture-card'>
          <img :src="urlFour?urlFour:require('../../assets/real/sc.png')" class=''/>
          <p>
            点击上传<span>手持身份证</span>
          </p>
        </el-upload>
      </div>
    </div>
    <div class="btnDiv">
      <div @click='uploadImg()'>提交</div>
    </div>
    <!-- <div class='verifiedImage'>
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleChange'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileList'
            :auto-upload='true'
            :limit='4'
            list-type='picture-card'>
            <img :src="url?url:require('../../assets/real/positive.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        添加身份证正面照
    </div>
    <div class='verifiedImage'>
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleTwo'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileList'
            :auto-upload='true'
            :limit='4'
            list-type='picture-card'>
            <img :src="urlTwo?urlTwo:require('../../assets/real/negative.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        添加身份证背面照
    </div>
    <div class='verifiedImage'>
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleThree'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileList'
            :auto-upload='true'
            :limit='4'
            list-type='picture-card'>
            <img :src="urlThree?urlThree:require('../../assets/real/card.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        添加银行卡正面照
    </div>
    <div class='verifiedImage'>
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleFour'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileList'
            :auto-upload='true'
            :limit='4'
            list-type='picture-card'>
            <img :src="urlFour?urlFour:require('../../assets/real/sc.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        添加银行卡背面照
    </div>
    <div class='transferConfirm adduser-mar-top' @click='uploadImg()' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
        提交
    </div>
    <div class='bottomLong'></div> -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      fileTwo: [],
      fileThree: [],
      fileFour: [],
      imgUrlBase64: {},
      url: '',
      urlTwo: '',
      urlThree: '',
      urlFour: '',
      card: '',
      name: '',
      fullscreenLoading: false,
      phone: '',
      merchantId: '',
      token: '',
      tokenId: '',
      queryparmas: '',
      version: '',
      agentNo: '',
      merchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = this.$route.query.merchantNo
    this.merchantId = this.$route.query.merchantId
    console.log(this.merchantNo);
    console.log(this.merchantId);
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    async handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        await this.chageBase('10E', fileList[fileList.length - 1])
      }
      return false
    },
    async handleTwo (file, fileList) {
      if (fileList.length > 0) {
        this.fileTwo = fileList
        this.urlTwo = fileList[fileList.length - 1].url
        await this.chageBase('10F', fileList[fileList.length - 1])
      }
      return false
    },
    async handleThree (file, fileList) {
      if (fileList.length > 0) {
        this.fileThree = fileList
        this.urlThree = fileList[fileList.length - 1].url
        await this.chageBase('10K', fileList[fileList.length - 1])
      }
      return false
    },
    async handleFour (file, fileList) {
      if (fileList.length > 0) {
        this.fileFour = fileList
        this.urlFour = fileList[fileList.length - 1].url
        await this.chageBase('10M', fileList[fileList.length - 1])
      }
      return false
    },
    async handleChangeMax (file, fileList) {
      this.$message({
        message: '上传图片次数过多，请勿重复',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'success'
      })
    },
    none () {
      console.log(1)
    },
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190936',
        '21': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    chageBase (type, fileList) {
      let vm = this
      let file = fileList.raw
      console.log(file)
      // 将文件以Data URL形式读入页面
      let reader = new FileReader()
      this.imgUrlBase64 = reader.readAsDataURL(file)
      reader.onload = function () {
        let parmas = {
          '0': '0700',
          '3': '190948',
          '9': type,
          '42': vm.merchantNo,
          '43': vm.merchantId,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.fullscreenLoading = true
        var param = new FormData()
        param.append('10', file)
        const root = process.env.NODE_ENV === 'production' ? 'http://jyhbban.llyzf.cn/lly-posp-proxy/' : '/apis'
        axios.post(root + `/uploadImage.app${url}`, param)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$message({
                message: '上传成功',
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            } else {
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.log(err)
            vm.fullscreenLoading = false
          })
      }
    },
    uploadImg () {
      let vm = this
      if (this.fileList.length < 1) {
        this.$message({
          message: '请上传人像面(身份证正面)',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileTwo.length < 1) {
        this.$message({
          message: '请上传国徽面(身份证反面)',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileThree.length < 1) {
        this.$message({
          message: '请上传储蓄卡正面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileFour.length < 1) {
        this.$message({
          message: '请上传手持身份证',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      this.$router.push({name:'realname'})
      // let parmas = {
      //   '0': '0700', // 必须
      //   '1': vm.$route.query.phone, // 手机号
      //   '3': '390011', // 接口
      //   '8': vm.$route.query.idcard, // 身份证号
      //   '10': vm.$route.query.name, // 姓名
      //   '11': vm.$route.query.cardNum, // 银行卡号
      //   '12': vm.$route.query.bankName, // 银行名称
      //   '13': vm.$route.query.bankCode, // 银行code
      //   '42': JSON.parse(this.$stact.state.token)[0].merchantNo, // 商户编号
      //   '59': vm.version
      // }
      // let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      // vm.$http.get(`request.app${url}`)
      //   .then(res => {
      //     if (res.data[39] === '00') {
      //       this.merchantId = res.data[37]
      //       this.merchantNo = res.data[38]
      //     } else {
      //       vm.$message({
      //         message: res.data[39],
      //         center: true,
      //         offset: 30,
      //         duration: 2500,
      //         type: 'success'
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

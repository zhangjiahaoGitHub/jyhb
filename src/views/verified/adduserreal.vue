<template>
  <div class="hundred adduserreal-layout">
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
      <img :src="url?url:require('../../assets/real/z_auth_id_1.png')" class=''/>
      <p>身份证正面</p>
    </el-upload>
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
      <img :src="urlTwo?urlTwo:require('../../assets/real/z_auth_id_2.png')" class=''/>
      <p>身份证背面</p>
    </el-upload>
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
      <img :src="urlThree?urlThree:require('../../assets/real/z_auth_bank_1.png')" class=''/>
      <p>银行卡正面</p>
    </el-upload>
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
      <img :src="urlFour?urlFour:require('../../assets/real/z_auth_hand.png')" class=''/>
      <p>手持身份证拍照</p>
    </el-upload>
    <div class="btnDiv" @click="uploadImg">提交</div>
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
    console.log(this.merchantNo);
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
    compressImg(width, height, img) {
        var canvas = document.createElement('canvas'), c = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        c.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width, height);
        return canvas.toDataURL('image/png');
    },
    chageBase (type, fileList) {
      let vm = this
      let file = fileList.raw
      // 将文件以Data URL形式读入页面
      let reader = new FileReader()
      this.imgUrlBase64 = reader.readAsDataURL(file)
      reader.onload = function () {
        var img = new Image();
        img.src = reader.result;
        img.onload = function () {
          var w = this.width,
          h = this.height,
          scale = w / h;
          //压缩图片
          var b64 = vm.compressImg(300, 300 / scale, img);
          b64 = b64.split(',')[1]
          let parmas = {
            '0': '0700',
            '3': '190948',
            '9': type,
            '40': b64,
            '42': vm.merchantNo,
            '59': vm.version
          }
          parmas = vm.$mdata.mdGet(parmas)
          vm.fullscreenLoading = true
          const root = process.env.NODE_ENV === 'production' ? 'http://shuaishouzhanggui.llyzf.cn:6442/lly-posp-proxy/' : '/apis'
          vm.$http.post(`/uploadImage.app`, parmas)
            .then(res => {
              vm.fullscreenLoading = false
              this.fileList = []
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
      this.$router.back()
    }
  }
}
</script>

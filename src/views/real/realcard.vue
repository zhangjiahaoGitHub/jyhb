<template>
  <div>
    <div class='verifiedImage'>
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
            :limit='5'
            list-type='picture-card'>
            <img :src="url?url:require('../../assets/real/card.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        点击上传 <span class='blueColor'>储蓄卡</span>
    </div>
    <div class='realTitle'>请输入您的储蓄卡号</div>
    <div class='verifiedContent'>
        <div class='allFlex setInput'>
            <div class='setName'>储蓄卡</div>
            <input class='setEntryLong' type='text' v-model='card' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" placeholder='请输入您的储蓄卡号' />
        </div>
        <div class='allFlex setInput'>
            <div class='setName'>手机号码</div>
            <input class='setEntryLong' type='text'  v-model='phone' placeholder='请输入您的手机号码' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" />
        </div>
    </div>
    <div class='transferConfirm' @click='uploadImg()' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
        下一步
    </div>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      address: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imgUrlBase64: {},
      url: '',
      card: '',
      name: '',
      fullscreenLoading: false,
      phone: '',
      merchantId: '',
      token: '',
      tokenId: '',
      cardhead: {},
      version: '',
      agentNo: '',
      merchantNo: '',
      merchantId: ''
    }
  },
  watch: {
    card (n, o) {
      if (this.card.length >= 13 && this.card.length <= 19) {
        this.cardName()
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.merchantId = JSON.parse(this.$stact.state.token)[0].id
    // this.address = JSON.parse(this.$route.query.address)
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    async handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        await this.chageBase('10K', fileList[fileList.length - 1])
      }
      return false
    },
    async handleChangeMax (file, fileList) {
      vm.$message({
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
          var b64 = vm.compressImg(300, 210 / scale, img);
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
          const root = process.env.NODE_ENV === 'production' ? 'http://yunlingshenghuo.llyzf.cn:6442/lly-posp-proxy/' : '/apis'
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
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690013',
        '15': vm.card,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.cardhead = JSON.parse(res.data[16])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    uploadImg () {
      let vm = this
      if (this.fileList.length < 1) {
        this.$message({
          message: '必须上传一张储蓄卡',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.card.match(/^[ ]*$/)) {
        this.$message({
          message: '您的储蓄卡号必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!this.cardhead.bankCode) {
        this.$message({
          message: '请输入正确储蓄卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '2': vm.merchantId,
        '3': '190938',
        '5': vm.$route.query.name,
        '6': vm.$route.query.card,
        '7': vm.card,
        // '20': vm.address[2],
        // '21': vm.address[1],
        // '22': vm.address[0],
        '43': vm.cardhead.bankCode,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$message({
              message: '实名成功,需要一定时间审核。请您耐心等待',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.$stact.dispatch('SetReal', 'realSb')
            setTimeout(() => {
              vm.fullscreenLoading = false
              vm.$router.push({ name: 'my' })
            }, 3500)
          } else {
            vm.fullscreenLoading = false
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
          vm.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

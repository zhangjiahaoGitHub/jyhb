<template>
  <div class='hundred merchantSettled-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li>
        <p>姓名</p>
        <input v-model="name" type="text" name="" placeholder="请输入您的姓名" id="">
      </li>
      <li>
        <p>手机号</p>
        <input v-model="phone" type="number" name="" placeholder="请输入您的手机号" id="">
      </li>
      <li>
        <p>店名</p>
        <input v-model="storeName" type="text" name="" placeholder="请输入您的店名" id="">
      </li>
      <li>
        <p>店铺地址</p>
        <input v-model="address" type="text" name="" placeholder="请输入您的店铺地址" id="">
      </li>
    </ul>
    <el-upload
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
        <img :src="url?url:require('../../assets/mall/txm.png')"/>
    </el-upload>
    <el-upload
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
        :limit='5'
        list-type='picture-card'>
        <img :src="urlTwo?urlTwo:require('../../assets/mall/ghm.png')"/>
    </el-upload>
    <el-upload
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
        :limit='5'
        list-type='picture-card'>
        <img :src="urlThree?urlThree:require('../../assets/mall/hgz.png')"/>
    </el-upload>
    <el-upload
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
        :limit='5'
        list-type='picture-card'>
        <img :src="urlFour?urlFour:require('../../assets/mall/yyz.png')"/>
    </el-upload>
    <div @click="submit" class="btnDiv">提交</div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    let vm = this
    return {
      fileList: [],
      fileTwo: [],
      fileThree: [],
      fileFour: [],
      imgUrlBase64: {},
      url: '',
      urlTwo: '',
      urlThree: '',
      urlFour: '',
      name: '',
      phone:'',
      storeName: '',
      address: '',
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  methods: {
    submit () {
      let vm = this
      if (!this.name) {
        this.$message({
          message: '请输入姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!this.phone) {
        this.$message({
          message: '请输入手机号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号格式错误',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!this.storeName) {
        this.$message({
          message: '请输入店名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!this.address) {
        this.$message({
          message: '请输入店铺地址',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileList.length<1) {
        this.$message({
          message: '请上传身份证头像面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileTwo.length<1) {
        this.$message({
          message: '请上传身份证国徽面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileThree.length<1) {
        this.$message({
          message: '请上传合格证',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '792008',
        '10': vm.phone,
        '11': vm.name,
        '12': vm.storeName,
        '13': vm.address,
        '14': vm.url,
        '15': vm.urlTwo,
        '16': vm.urlFour,
        '17': vm.urlThree,
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$message({
              message: '提交成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            this.$router.back()
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
    },
    // jsktx(){
    //   let vm = this
    //   if (this.fileFour.length < 1) {
    //     this.$message({
    //       message: '请上传储蓄卡正面',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.card.match(/^[ ]*$/)) {
    //     this.$message({
    //       message: '请输入储蓄卡号',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (!this.cardhead.bankCode) {
    //     this.$message({
    //       message: '请输入正确储蓄卡号',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.phone.match(/^[ ]*$/)) {
    //     this.$message({
    //       message: '请输入预留电话',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
    //     this.$message({
    //       message: '手机号码有误，请重填',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.step++
    // },
    // sfzpz(){
    //   let vm = this
    //   if (this.fileList.length < 1) {
    //     this.$message({
    //       message: '请上传身份证头像面',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.fileTwo.length < 1) {
    //     this.$message({
    //       message: '请上传身份证国徽面',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.name.match(/^[ ]*$/)) {
    //     this.$message({
    //       message: '请输入姓名',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.idCard.match(/^[ ]*$/)) {
    //     this.$message({
    //       message: '请输入身份证号',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    //   if (!regIdNo.test(vm.idCard)) {
    //     this.$message({
    //       message: '您的身份证号填写有误',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.address.length < 3) {
    //     this.$message({
    //       message: '请选择地区',
    //       center: true,
    //       offset: 30,
    //       duration: 2000,
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.step++
    // },
    async handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        await this.chageBase('1', fileList[fileList.length - 1])
      }
      return false
    },
    async handleTwo (file, fileList) {
      if (fileList.length > 0) {
        this.fileTwo = fileList
        this.urlTwo = fileList[fileList.length - 1].url
        await this.chageBase('2', fileList[fileList.length - 1])
      }
      return false
    },
    async handleThree (file, fileList) {
      if (fileList.length > 0) {
        this.fileThree = fileList
        this.urlThree = fileList[fileList.length - 1].url
        await this.chageBase('3', fileList[fileList.length - 1])
      }
      return false
    },
    async handleFour (file, fileList) {
      if (fileList.length > 0) {
        this.fileFour = fileList
        this.urlFour = fileList[fileList.length - 1].url
        await this.chageBase('4', fileList[fileList.length - 1])
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
          var b64 = vm.compressImg(300, 300 / scale, img);
          b64 = b64.split(',')[1]
          let parmas = {
            '0': '0700',
            '3': '190948',
            '40': b64,
            '42': vm.merchantNo,
            '59': vm.version
          }
          parmas = vm.$mdata.mdGet(parmas)
          vm.fullscreenLoading = true
          const root = process.env.NODE_ENV === 'production' ? 'http://jyhbban.llyzf.cn/lly-posp-proxy/' : '/apis'
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
                switch (type) {
                  case '1':
                    vm.url = res.data[57]
                    break;
                  case '2':
                    vm.urlTwo = res.data[57]
                    break;
                  case '3':
                    vm.urlThree = res.data[57]
                    break;
                  case '4':
                    vm.urlFour = res.data[57]
                    break;
                }
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
  }
}
</script>

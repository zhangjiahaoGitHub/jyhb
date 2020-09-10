<template>
    <div class='hundred my-layout'>
      <div class="headBgDiv"><span @click="$router.push({name: 'setting'})">设置</span></div>
      <div class="contentDiv">
        <div class="headDiv">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action='#'
            :before-upload="beforeAvatarUpload"
            :http-request='none'
            :on-change='handleChange'
            :on-exceed='handleChangeMax'>
            <img :src="imageUrl ? imageUrl : require('../../assets/head.png')" class="avatar">
          </el-upload>
          <div class="rightDiv">
            <p>{{userName}}<span>{{levelObj[level]}}</span></p>
            <span v-if="freezeStatus=='10B'">{{phone.substring(0,3)}}****{{phone.substring(phone.length-4,phone.length)}}</span>
            <span v-else>{{phone}}</span>
          </div>
        </div>
        <ul>
          <li @click="()=>{this.$router.push({name:'transactionRecord'})}">
            <img src="../../assets/my/jymx.png" alt="">
            <p>交易明细 <i class="el-icon-arrow-right"></i></p>
          </li>
          <!-- <li @click="$router.push({name: 'integraldetails'})">
            <img src="../../assets/my/wdjf.png" alt="">
            <p>会员积分兑换 <i class="el-icon-arrow-right"></i></p>
          </li> -->
          <li @click="toReal">
            <img src="../../assets/my/smrz.png" alt="">
            <p>实名认证 <i class="el-icon-arrow-right"></i></p>
          </li>
          <li @click="()=>{this.$router.push({name:'cardlist'})}">
            <img src="../../assets/my/yhkgl.png" alt="">
            <p>银行卡管理 <i class="el-icon-arrow-right"></i></p>
          </li>
          <li @click="$router.push({name: 'team'})">
            <img src="../../assets/my/wdtd.png" alt="">
            <p>我的团队 <i class="el-icon-arrow-right"></i></p>
          </li>
          <li @click="$router.push({name: 'customer'})">
            <img src="../../assets/my/wdkf.png" alt="">
            <p>我的客服 <i class="el-icon-arrow-right"></i></p>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      isSign: false,
      version: '',
      agentNo: '',
      levelObj: {
        '1': '体验用户',
        '2': '白银用户',
        '3': '黄金用户',
        '4': '铂金用户',
        '5': '钻石用户',
        '6': '领航者',
      },
      level: '',
      list: [],
      merchantNo: '',
      parentPhone: '',
      merchantCnName: '',
      bankAccount: '',
      balance: '',
      coupon: '',
      userName: '',
      phone: '',
      directQuota: '',
      incomeYear: '',
      business: '',
      url: '',
      sumSwitch: 0,
      fullscreenLoading: false,
      real: 0,
      team: {},
      freezeStatus: '',
      imageUrl: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.real = this.$stact.state.real
    this.merchantCnName = JSON.parse(this.$stact.state.token)[0].merchantCnName
    this.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
    this.parentPhone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.userName = JSON.parse(this.$stact.state.token)[0].merchantEnName
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.message()
  },
  methods: {
    beforeAvatarUpload(file) {
      
    },
    async handleChange (file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fullscreenLoading = true
        this.fileList = fileList
        // this.imageUrl = fileList[fileList.length - 1].imageUrl
        console.log(fileList[fileList.length - 1])
        await this.chageBase(fileList[fileList.length - 1])
      }
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
    chageBase (fileList) {
      let vm = this
      let file = fileList.raw
      console.log(file)
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
          var b64 = vm.compressImg(200, 200 / scale, img);
          let b64Img = b64.split(',')[1]
          let parmas = {
            '0': '0700',
            '3': '190949',
            // '9': '10P',
            '40': b64Img,
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
                vm.imageUrl = res.data[57]
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
    toHtmlIframe () {
      this.$router.push({ name: 'htmlIframe', query: { html: this.htmlIframe, title: '用户协议' } })
    },
    toNewIframe(){
      this.$router.push({ name: 'imgIframe', query: { url: this.syms, title: '收益模式' } })
    },
    signIn () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190942',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.isSign = true
          if (res.data[39] == '00') {
            vm.$message({
              message: '签到成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    notYetOpen () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'success'
      })
    },
    async handleChange (file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fullscreenLoading = true
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        console.log(fileList[fileList.length - 1])
        await this.chageBase(fileList[fileList.length - 1])
      }
    },
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.level = JSON.parse(res.data[57])[0].level
            vm.fullscreenLoading = false
            console.log(res.data);
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            console.log(JSON.parse(res.data[57])[0]);
            this.userName = JSON.parse(res.data[57])[0].merchantCnName
            this.phone = JSON.parse(res.data[57])[0].phone
            vm.imageUrl = res.data[48]
            vm.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    toReal () {
      let vm = this
      if (vm.freezeStatus !== '10B') {
        vm.$router.push({ name: 'real' })
      } else {
        vm.$message({
          message: '已实名或者审核中',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
      }
    }
  }
}
</script>

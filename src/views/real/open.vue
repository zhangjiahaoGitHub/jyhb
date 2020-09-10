<template>
  <div class="hundred open-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <h3>请上传身份证照片</h3>
    <div class="uploadDiv">
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
            :limit='5'
            list-type='picture-card'>
            <img :src="url?url:require('../../assets/real/positive.png')" class='idCard'/>
            <p>点击上传<span>人像面</span></p>
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
            :file-list='fileTwo'
            :auto-upload='true'
            :limit='5'
            list-type='picture-card'>
            <img :src="urlTwo?urlTwo:require('../../assets/real/negative.png')" class='idCard'/>
            <p>点击上传<span>国徽面</span></p>
        </el-upload>
      </div>
    </div>
    <h3>请填写基本信息</h3>
    <div class="divUl">
      <ul>
        <li>
          <span>真实姓名</span>
          <input v-model="name" type="text" placeholder="请输入您的姓名">
        </li>
        <li>
          <span>手机号码</span>
          <input v-model="phone" type="text" placeholder="请输入11位手机号码">
        </li>
        <li>
          <span>还款总额</span>
          <input v-model="money" type="text" placeholder="请输入还款总额">
        </li>
      </ul>
    </div>
    <div class="btnDiv">
      <div @click="uploadImg">提交</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fileList: [],
      fileTwo: [],
      url: '',
      urlTwo: '',
      name: '',
      phone: '',
      money: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  methods: {
    async handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        await this.chageBase('10X', fileList[fileList.length - 1])
      }
      return false
    },
    async handleTwo (file, fileList) {
      if (fileList.length > 0) {
        this.fileTwo = fileList
        this.urlTwo = fileList[fileList.length - 1].url
        await this.chageBase('10Y', fileList[fileList.length - 1])
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
          '43': vm.id,
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
          message: '必须上传一张身份证人像面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileTwo.length < 1) {
        this.$message({
          message: '必须上传一张身份证国徽面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入姓名',
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
      if (this.money.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入还款总额',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '190943',
        '40': this.fileList[0],
        '41': this.fileTwo[0],
        '42': this.merchantNo,
        '43': this.name,
        '45': this.phone,
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
            vm.fullscreenLoading = false
            vm.$router.push({ name: 'home' })
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

<template>
  <div class='hundred editPhone-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <img src="../../assets/logo.png" alt="">
    <ul>
      <li>
        <img src="../../assets/my/setting/sj.png" alt="">
        <input v-model='phone' type="number" placeholder="请输入新的手机号">
      </li>
      <li>
        <img src="../../assets/my/setting/dx.png" alt="">
        <input v-model='code' type="text" placeholder="请输入验证码">
        <span @click="time <= 0 ? getCode() : ''">{{text}}</span>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click='forget'>确认修改</div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      time: 0,
      text: '获取验证码',
      version: '',
      agentNo: '',
      phone: '',
      code: '',
      oldpassword: '',
      password: '',
      confirmPassword: '',
      fullscreenLoading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    getCode () { // 获取验证码
      let vm = this
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '3': '190919',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '发送成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.sendMail()
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
    },
    sendMail () { // 倒计时
      this.time = 60
      this.timer()
    },
    timer () { // 倒计时中
      if (this.time > 0) {
        this.text = `${this.time--}S`
        setTimeout(this.timer, 1000)
      } else {
        this.text = '重新获取'
      }
    },
    forget () { // 注册
      let vm = this
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.code.match(/^[ ]*$/)) {
        this.$message({
          message: '验证码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.code.length !== 6) {
        this.$message({
          message: '验证码必须为六位',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '191930',
        '5': vm.phone,
        '6': vm.code,
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '修改成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.$router.back()
          } else {
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
          console.log(err)
          vm.fullscreenLoading = false
        })
    }
  }
}
</script>

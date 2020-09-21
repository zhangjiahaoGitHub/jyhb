<template>
  <div class='hundred changepaw-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li>
        <p>手机号</p>
        <input v-model='phone' type="number" placeholder="请输入手机号">
      </li>
      <li>
        <p>验证码</p>
        <input v-model="code" type="text" placeholder="请输入短信验证码" />
        <span @click="time <= 0 ? getCode() : ''">{{text}}</span>
      </li>
      <li>
        <p>旧密码</p>
        <input type="password" name="" id="" v-model="oldpassword" placeholder="请输入原始登录密码">
      </li>
      <li>
        <p>新密码</p>
        <input type="password" name="" id="" v-model="password" placeholder="请输入6至14位新密码">
      </li>
      <li>
        <p>新密码</p>
        <input type="password" name="" id="" v-model="confirmPassword" placeholder="请再次输入新密码">
      </li>
    </ul>
    <div class="btnDiv">
      <div @click='forget'>提交修改</div>
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
      if (this.oldpassword.match(/^[ ]*$/)) {
        this.$message({
          message: '旧密码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.password.length < 6 || vm.password.length > 14) {
        this.$message({
          message: '密码长度限制为6-14位',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.password.match(/^[ ]*$/)) {
        this.$message({
          message: '新密码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.password != this.confirmPassword) {
        this.$message({
          message: '确认密码错误',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': JSON.parse(this.$stact.state.token)[0].phone,
        '3': '190929',
        '6': vm.code,
        '8': vm.$md5(vm.oldpassword),
        '9': vm.$md5(vm.password),
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
            
            new Promise((resolve, reject) => {
              vm.$stact.dispatch('SetToken', '')
              resolve()
            })
              .then(result => {
                vm.$router.push({ name: 'login' })
              })
              .catch(error => console.log(error))
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

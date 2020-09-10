<template>
  <div class='hundred registered-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li>
        <input v-model='oldpassword' type="password" placeholder="请输入旧密码">
      </li>
      <li>
        <input v-model='password' type="password" placeholder="请输入新的8-16位数字+字母组合密码">
      </li>
      <li>
        <input v-model='confirmPassword' type="password" placeholder="请再次输入新密码">
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
        '5': '1',
        '44': vm.agentNo,
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
        this.text = `${this.time--}S后可重发`
        setTimeout(this.timer, 1000)
      } else {
        this.text = '重新获取'
      }
    },
    forget () { // 注册
      let vm = this
      if (this.password.length < 8 || vm.password.length > 16) {
        this.$message({
          message: '密码长度限制为8-16位,由数字+字母组成',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^(?![^a-zA-Z]+$)(?!\D+$)/).test(vm.password)) {
        this.$message({
          message: '密码需由数字+字母组成',
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
        '8': vm.$md5(vm.oldpassword),
        '9': vm.$md5(vm.password),
        '10': '1',
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

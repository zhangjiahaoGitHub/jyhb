<template>
  <div class='hundredW registered-layout'>
    <div class="pageTitle">
      注册
      <span @click="()=>{this.$router.push({name:'login'})}">登录</span>
    </div>
    <img src="../assets/loginLogo.png" alt srcset />
    <ul>
      <li>
        <img src="../assets/registerLogin/userIcon.png" alt />
        <input v-model='phone' type="number" placeholder="请输入您的手机号">
      </li>
      <li>
        <img src="../assets/registerLogin/codeIcon.png" alt />
        <input v-model="code" type="text" placeholder="请输入您的验证码" />
        <span @click="time <= 0 ? getCode() : ''">{{text}}</span>
      </li>
      <li>
        <img src="../assets/registerLogin/passwordIcon.png" alt />
        <input v-model='password' type="password" placeholder="请输入您的密码">
      </li>
      <li>
        <img src="../assets/registerLogin/passwordIcon.png" alt />
        <input v-model='newPassword' type="password" placeholder="请再次输入您的密码">
      </li>
      <li>
        <img src="../assets/registerLogin/phoneIcon.png" alt />
        <input v-model='invite' type="number" :placeholder='`请输入推荐人手机号(${xt==1 ? "必填":"选填"})`'>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="registered()">注册</div>
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
      password: '',
      newPassword: '',
      invite: '',
      xt: '',
      checkedOne: true,
      checkedTwo: true,
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    if (this.$route.query.invite) {
      this.invite = this.$route.query.invite
    } else {
      this.invite = ''
    }
    this.getData()
  },
  watch: {
    $route(to, from) {
       let vm = this;
      if(to.name !== 'ifarme' && from.name==='registered'){
        vm.phone =''
        vm.code = ''
        vm.password = ''
        vm.newPassword = ''
        vm.invite = ''
        vm.text = '获取验证码'
        vm.time = 0
      }
    }
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    getData(){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190917',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.xt = res.data[10]
          }
        })
        .catch(err => {
          console.log(err)
          vm.fullscreenLoading = false
        })
    },
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
        this.text = `${this.time--}S后可重发`
        setTimeout(this.timer, 1000)
      } else {
        this.text = '重新获取'
      }
    },
    toIframe () {
      this.$router.push({ name: 'ifarme', query: { url: 'http://yunlingshenghuo.llyzf.cn/register_protocol.html', title: '用户协议' } })
    },
    registered () { // 注册
      let vm = this
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
      console.log(this.code.length)
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
      if (this.password.match(/^[ ]*$/)) {
        this.$message({
          message: '密码必须填写',
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
      if (this.newPassword.match(/^[ ]*$/)) {
        this.$message({
          message: '确认新密码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.password !== this.newPassword) {
        this.$message({
          message: '新密码和确认密码不一致',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.xt==1) {
        if (!(/^1[1-9]\d{9}$/.test(this.invite))) {
          this.$message({
            message: '邀请人手机号码有误，请重填',
            center: true,
            offset: 30,
            duration: 2000,
            type: 'warning'
          })
          return
        }
      }
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '3': '190918',
        '8': vm.$md5(vm.password),
        '44': vm.agentNo,
        '45': vm.invite,
        '52': vm.code,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$message({
              message: '注册成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            vm.$router.push({ name: 'login' })
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
}
</script>

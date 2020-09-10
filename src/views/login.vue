<template>
  <div class='minHeight hundredW login-layout'>
    <div class="pageTitle">登录<span @click="()=>{this.$router.push({name:'registered'})}">注册</span></div>
    <img src="../assets/loginLogo.png" alt="" srcset="">
    <div class="contentDiv">
      <div class="navDiv">
        <p @click="loginType=1" :class="loginType==1 ? 'aP':''">密码登录</p>
        <p @click="loginType=2" :class="loginType==2 ? 'aP':''">短信登录</p>
      </div>
      <ul>
        <li>
          <img src="../assets/registerLogin/userIcon.png" alt="">
          <input v-model="phone" type="number" placeholder="请输入您的手机号码">
          <img @click="()=>{this.phone = '';this.password = ''}" src="../assets/registerLogin/del.png" alt="">
        </li>
        <li v-if="!checked && loginType==1">
          <img src="../assets/registerLogin/passwordIcon.png" alt="">
          <input v-model='password' type="password" placeholder="请输入您的密码">
          <img @click="()=>{this.checked = true}" src="../assets/registerLogin/hideEye.png" alt="">
        </li>
        <li v-if="checked && loginType==1">
          <img src="../assets/registerLogin/passwordIcon.png" alt="">
          <input v-model='password' type="text" placeholder="请输入您的密码">
          <img @click="()=>{this.checked = false}" src="../assets/registerLogin/openEye.png" alt="">
        </li>
        <li v-if="loginType==2">
          <img src="../assets/registerLogin/passwordIcon.png" alt="">
          <input v-model='password' type="text" placeholder="请输入您的验证码">
          <span @click="()=>{this.$router.push({name:'forget'})}">获取验证码</span>
        </li>
        <p @click="()=>{this.$router.push({name:'forget'})}">忘记密码？</p>
      </ul>
      <div class="btnDiv">登录</div>
    </div>
    <div class="footDiv">
      <p>登录即表示您已同意<span>《用户使用协议》</span></p>
      <p>如需帮助，请致电<span>4008546580</span>(服务时间9:00-18:00)</p>
    </div>
    <!-- <div class='headDiv'>
        <img src='../assets/loginLogo.png' />
        <img src="../assets//logoTitle.png" alt="" srcset="">
    </div>
    <ul>
      <li>
        <i class="el-icon-error" @click="()=>{this.phone = '';this.password = ''}"></i>
        <input v-model="phone" type="number" placeholder="请输入手机号码">
      </li>
      <li v-if="!checked">
        <input v-model='password' type="password" placeholder="请输入密码">
        <img @click="()=>{this.checked = true}" src="../assets/registerLogin/hideEye.png" alt="">
      </li>
      <li v-if="checked">
        <input v-model='password' type="text" placeholder="请输入密码">
        <img @click="()=>{this.checked = false}" src="../assets/registerLogin/openEye.png" alt="">
      </li>
    </ul>
    <div class="foundDiv">
      <span @click="()=>{this.$router.push({name:'forget'})}">忘记密码？</span>
    </div>
    <div class="btnDiv">
      <div @click="login()">登录</div>
    </div>
    <p @click="()=>{this.$router.push({name:'registered'})}">立即注册</p>
    <div class='bottomBlock'></div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: false,
      phone: '',
      version: '',
      password: '',
      agentNo: '',
      fullscreenLoading: false,
      openId: '',
      loginType: 1,
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
    login () {
      let vm = this
      if (vm.phone.match(/^[ ]*$/)) {
        vm.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(vm.phone))) {
        vm.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.password.match(/^[ ]*$/)) {
        vm.$message({
          message: '密码必须填写',
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
        '3': '190928',
        '8': vm.$md5(vm.password),
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00' || res.data[39] === 'W8') {
            vm.$message({
              message: '登录成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            localStorage.setItem('wx1',res.data[17].split('/')[0])
            localStorage.setItem('phone1',res.data[18].split('/')[0])
            localStorage.setItem('wx2',res.data[17].split('/')[1])
            localStorage.setItem('phone2',res.data[18].split('/')[1])
            localStorage.setItem('homePopImg',res.data[24])
            new Promise((resolve, reject) => {
              vm.$stact.dispatch('SetToken', res.data[42]) // 存token 进行登录退出判断
              vm.$stact.dispatch('setCardm', res.data[19])
              // vm.$stact.dispatch('setTeamm', res.data)
              
              // vm.$stact.dispatch('SetReal', '')
              resolve()
            }).then(r => {
              if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                vm.$router.push({ name: 'home' }) // ios 调路由第一次无法跳转存在问题 该问题是vue脚手架问题无法解决 侧面解决多运行一次
                setTimeout(() => {
                  vm.$router.push({ name: 'home' })
                }, 1000)
              } else {
                vm.$router.push({ name: 'home' })
              }
            })
              .catch(err => console.log(err))
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
    toIframe () {
      this.$router.push({ name: 'ifarme', query: { url: 'http://yihuan.llyzf.cn:5555/register_protocol.html', title: '用户协议' } })
    }
  }
}
</script>

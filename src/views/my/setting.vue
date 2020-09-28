<template>
  <div class='hundred setting-layout'>
    <div class="headDiv">
      <img src="../../assets/logo.png" alt="">
      <p>鲸鹰伙伴</p>
      <span>版本号：{{version.substring(7,version.length)}}</span>
    </div>
    <ul>
      <li @click="$router.push({name: 'editPhone'})">
        <span>修改手机号</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="notYetOpen">
        <span>收货地址</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="changepaw()">
        <span>修改密码</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
    <ol>
      <li @click="$router.push({name: 'zhgl'})">账号管理</li>
      <li @click="loginOut">退出登录</li>
    </ol>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: '',
      version: '',
      agentNo: '',
      merchant: {},
      value: true,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchant = JSON.parse(this.$stact.state.token).merchant
  },
  methods: {
    notYetOpen () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'warning'
      })
    },
    loginOut () { // 退出 清除token
      let vm = this
      this.$confirm('是否确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise((resolve, reject) => {
          vm.$stact.dispatch('SetToken', '')
          window.sessionStorage.clear()
          resolve()
        })
          .then(result => {
            vm.$router.push({ name: 'login' })
          })
          .catch(error => console.log(error))
      }).catch(() => {
      })
    },
    toNext (type) {
      let vm = this
      switch (type) {
        case 1:
          if (vm.passwd) {
            vm.$router.push({ name: 'modifyPass' })
          } else {
            vm.$router.push({ name: 'setPass' })
          }
          break
        case 2:
          vm.$router.push({ name: 'modifyPay' })
          break
        case 3:
          vm.$router.push({ name: 'modifyPhone' })
          break
        case 4:
          if (vm.nowStatus === '10D') {
            vm.$message({
              message: '待审核，请耐心等待',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'warning'
            })
          } else if (vm.nowStatus === '10B') {
            vm.$message({
              message: '审核已通过请勿重复操作',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'warning'
            })
          } else {
            vm.$router.push({ name: 'verified' })
          }
          break
        case 5:
          vm.$router.push({ name: 'forgetPay' })
          break
      }
      console.log(vm.nowStatus)
    },
    changepaw () {
      this.$router.push({ name: 'changepaw' })
    }
  }
}
</script>

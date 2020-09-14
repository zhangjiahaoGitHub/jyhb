<template>
  <div class='hundred setting-layout'>
    <div style='height:1px'></div>
    <div class="contentDiv">
      <img src="../../assets/my/setting/logo.png" alt="">
      <ul>
        <li @click="$router.push({name: 'server'})">
          <div>
            <img src="../../assets/my/setting/fk.png" alt="">
            我要反馈
          </div>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li @click="changepaw()">
          <div>
            <img src="../../assets/my/setting/edit.png" alt="">
            修改密码
          </div>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li @click="$router.push({name: 'editPhone'})">
          <div>
            <img src="../../assets/my/setting/edit.png" alt="">
            修改手机号
          </div>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li>
          <div>
            <img src="../../assets/my/setting/version.png" alt="">
            版本信息
          </div>
          <span>V {{version.substring(7,version.length)}}</span>
        </li>
      </ul>
    </div>
    <div class="btnDiv">
      <div @click='loginOut()'>安全退出</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: '',
      version: '',
      agentNo: '',
      merchant: {}
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchant = JSON.parse(this.$stact.state.token).merchant
  },
  methods: {
    loginOut () { // 退出 清除token
      let vm = this
      this.$confirm('是否确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise((resolve, reject) => {
          vm.$stact.dispatch('SetToken', '')
          // window.localStorage.clear()
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

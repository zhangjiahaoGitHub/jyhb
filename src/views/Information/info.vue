<template>
    <div class='hundred info-layout'>
        <ul>
            <li><span>储蓄卡号</span><input v-model="bankAccount" type="number" placeholder="请输入储蓄卡号"></li>
            <li><span>姓名</span><p>{{bankAccountName}}</p></li>
            <li><span>身份证号</span><p>{{idCardNumber}}</p></li>
            <li><span>银行预留手机号</span><input v-model="phone" type="number" placeholder="请输入银行预留手机号"></li>
        </ul>
        <div class="btnDiv">
            <div @click="confirmEdit">确认修改</div>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      version: '',
      agentNo: '',
      idCardNumber: '',
      bankAccountName: '',
      bankAccount: '',
      phone: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.bankAccountName = JSON.parse(this.$stact.state.token)[0].bankAccountName
    this.idCardNumber = JSON.parse(this.$stact.state.token)[0].idCardNumber
  },
  methods: {
    confirmEdit () {
      if (this.bankAccount.match(/^[ ]*$/)) {
        this.$message({
          message: '请填写储蓄卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/).test(this.phone)) {
        this.$message({
          message: '手机号码不正确',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390001',
        '5': this.bankAccount,
        '6': this.phone,
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
            vm.$router.go(-1)
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

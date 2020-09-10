<template>
  <div class='hundred retreat-layout'>
    <div class="headDiv">
      <span>{{bankDetail}}</span>
      <span>尾号{{bankAccount.substring(bankAccount.length-4,bankAccount.length)}}的储蓄卡</span>
      <span>[到账银行卡]</span>
    </div>
    <div class="contentDiv">
      <span>提现金额</span>
      <div>
        <input type="number" placeholder="请输入提现金额" v-model='money' @input='IsMoney()'>
        <span @click='allGet'>全部提现</span>
      </div>
      <p>当前余额：{{team[43]}}</p>
    </div>
    <div class="titleDiv">
      <ul>
        <li>提现手续费：3.00/笔</li>
        <li>提现金额：50元</li>
        <li>单笔额度：5000元</li>
        <li>提现时间：8:00-22:00</li>
      </ul>
    </div>
    <div class="btnDiv">
      <div @click='getMoney'>立即提现</div>
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
      merchantNo: '',
      money: '',
      bankDetail: '',
      bankAccount: '',
      bankCode: 0,
      banks: {
        313003: 'bj',
        303: 'gd',
        306: 'gf',
        105: 'js',
        301: 'jt',
        305: 'ms',
        103: 'ny',
        307: 'pa',
        309: 'xy',
        310: 'pf',
        403: 'yz',
        308: 'zs',
        102: 'gs',
        104: 'zg',
        302: 'zx',
        313062: 'sh',
        304: 'hx'
      },
      fullscreenLoading: false,
      team: {}
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    IsMoney () { // 限制
      let vm = this
      let value = vm.money
      value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤,此处控制的是如果没有小数点,首位不能为类似于 01、02的金额
        value = parseFloat(value)
      }
      vm.money = value.toString()
    },
    allGet () {
      this.money = this.team[43]
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
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.team = res.data
            this.bankDetail = JSON.parse(res.data[57])[0].bankDetail
            this.bankAccount = JSON.parse(res.data[57])[0].bankAccount
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMoney () {
      let vm = this
      if (vm.money.match(/^[ ]*$/)) {
        vm.$message({
          message: '金额必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (Number(vm.money) < 50) {
        vm.$message({
          message: '单笔提现金额需大于50元',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (Number(vm.money) > Number(vm.team[43])) {
        vm.$message({
          message: '提现金额超额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '190888',
        '5': vm.money,
        '8': '10B',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '提现成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.$router.push({ name: 'my' })
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
          vm.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

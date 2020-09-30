<template>
  <div class='hundred retreat-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="cardDiv">
      <p>结算卡<img :src="banks[bankCode] ? require(`../../assets/bank/${banks[bankCode]}.png`):require(`../../assets/bank/yl.png`)" alt="">{{bankDetail}}</p>
      <span>尾号{{bankAccount.substring(bankAccount.length-4,bankAccount.length)}}</span>
    </div>
    <div class="planDiv">
      <p>提现金额</p>
      <div>
        ￥<input type="number" placeholder="请输入金额" v-model='money' @input='IsMoney()'>
      </div>
      <p>账户余额：{{team[43]}}<span @click="money=team[43]">全部提现</span></p>
    </div>
    <p>提现手续费：{{team[25]}}元/笔，{{team[26]}}元起提</p>
    <div @click="getMoney" class="btnDiv">确认提现</div>
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
    this.bankDetail = JSON.parse(this.$stact.state.token)[0].bankDetail
    this.bankAccount = JSON.parse(this.$stact.state.token)[0].bankAccount
    this.bankCode = JSON.parse(this.$stact.state.token)[0].bankCode
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
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.team = res.data
            console.log(this.team);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
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
      let parmas = {
        '0': '0700',
        '3': '190888',
        '5': vm.money,
        '42': vm.merchantNo,
        '43': '10B',
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
            this.$router.back()
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'warning'
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

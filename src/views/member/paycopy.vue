<template>
  <div class='hundred'>
    <div class='peopleTitle'>
      <input type='text' class='peopleInput reatInput' v-model='money' @input='IsMoney()' placeholder='请输入收款金额' />
    </div>
    <div class='allFlex paySelect'>
        <img src='../../assets/member/zfb.png' >
        <div class='payName'>
            <p>支付宝</p>
            <p>安全快速支付</p>
        </div>
        <el-radio v-model="radio" label="z"></el-radio>
    </div>
     <div class='allFlex paySelect'>
        <img src='../../assets/member/wx.png' >
        <div class='payName'>
            <p>微信</p>
            <p>安全快速支付</p>
        </div>
        <el-radio v-model="radio" label="w"></el-radio>
    </div>
    <div class='loginTo longMargin'>
      <div class='blue' @click='pay()'>
        立即充值
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 'z',
      money: '',
      version: '',
      agentNo: '',
      merchantNo: ''
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
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
    pay () {
      let vm = this
      if (this.money.match(/^[ ]*$/)) {
        this.$message({
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
        '3': '190111',
        '5': this.money * 100,
        '8': vm.radio,
        '41': 'C',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'code', query: { code: res.data[57], money: vm.money, logo: vm.radio } })
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
        })
    }
  }
}
</script>

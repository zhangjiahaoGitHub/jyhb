<template>
  <div class='hundred'>
    <div class='payMoney'>
        <span>￥</span>{{money}}
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
      merchantNo: '',
      level: 0,
      isType: ''
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.money = this.$route.query.money
    this.level = this.$route.query.level
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.isType = this.$route.query.isType
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
  },
  methods: {
    pay () {
      let vm = this
      console.log(vm.radio)
      let parmas = {
        '0': '0700',
        '3': '190111',
        '5': this.money * 100,
        '8': vm.radio,
        '40': vm.isType === 'M' ? vm.level : '',
        '41': vm.isType,
        '42': vm.merchantNo,
        '43': vm.isType === 'S' ? vm.money / 2 : '',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'code', query: { code: res.data[57], logo: vm.radio, money: vm.money } })
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

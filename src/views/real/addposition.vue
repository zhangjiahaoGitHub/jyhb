<template>
  <div class="addpositionpay">
    <div class="pay-moneybox">
        <div class="paycount">
            <span>购买个数</span>
            <input type="text" placeholder="请输入购买个数" v-model="value" @input="getcount()">
        </div>
        <div class="paycount">
            <span>应付金额</span>
            <span>{{paymoney}}元</span>
        </div>
    </div>
    <div class="pay-moneybox">
        <div class="paycount">
            <div class="selsct-pay">
                <div class="pay-type">
                    <img src="../../assets/member/zfb.png" alt="">
                </div>
                <div class="pay-name">
                    <div class="pay-method">支付宝</div>
                    <div class="method_content">安全快速支付</div>
                </div>
            </div>
            <div class="select-type">
                <div :class="radio === '1'? 'select-imgd' : 'select-img' " @click="selectpaytype('1')"></div>
            </div>
        </div>
        <div class="paycount">
            <div class="selsct-pay">
                <div class="pay-type">
                    <img src="../../assets/member/wx.png" alt="">
                </div>
                <div class="pay-name">
                    <div class="pay-method">微信</div>
                    <div class="method_content">安全快速支付</div>
                </div>
            </div>
            <div class="select-type">
                <div :class="radio === '2'? 'select-imgd' : 'select-img' " @click="selectpaytype('2')"></div>
            </div>
        </div>
    </div>
    <div class="next-btn" @click="next()">
        下一步
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1', // 按钮选择
      value: '', // input输入的值
      paymoney: 0, // 付款的金额
      paytype: 'z', // 支付方式默认为z   w为微信
      version: '',
      agentNo: '',
      merchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.reallist()
  },
  methods: {
    selectpaytype (type) {
      // 选择付款方式的类型，自定义1为支付宝  2为微信
      let vm = this
      vm.radio = type
      if (type === '1') {
        vm.paytype = 'Z'
      } else if (type === '2') {
        vm.paytype = 'W'
      }
    },
    getcount () {
      let vm = this
      if (vm.value !== '') {
        vm.paymoney = vm.value * 10
      } else {
        vm.paymoney = 0
      }
    },
    next () {
      let vm = this
      if (vm.value === '') {
        this.$message({
          message: '请输入要买的个数',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '190111', // 增加卡位的支付接口
        '8': vm.paytype, // 支付方式 z支付宝   w微信
        '40': '', // 要升的等级，应该和卡位无关
        '5': vm.paymoney * 100, // 金额  传入的金额是“分”为单位
        '41': 'S',
        '42': vm.merchantNo,
        '43': vm.value, // 购买的数量
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          console.log(res)
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'code', query: { code: res.data[57], logo: vm.paytype, money: vm.paymoney } })
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
    }
  }
}
</script>

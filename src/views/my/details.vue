<template>
    <div class='hundred'>
        <ul class='borderMagin'>
            <li class='allFlex paddProfit'>
                <div class='half gary'>
                    交易类型
                </div>
                <div class='half blueColor textRight'>
                    {{transaction[content.tradeType]?transaction[content.tradeType]:'其他'}}
                </div>
            </li>
            <li class='allFlex paddProfit'>
                <div class='half gary'>
                    金额来源
                </div>
                <div class='half blueColor textRight'>
                    {{content.NAME.substr(0,1)}}**
                </div>
            </li>
            <li class='allFlex paddProfit'>
                <div class='half gary'>
                    交易金额
                </div>
                <div class='half blueColor textRight'>
                    {{content.trxAmt}}
                </div>
            </li>
            <li class='allFlex paddProfit'>
                <div class='half gary'>
                    收益金额
                </div>
                <div class='half blueColor textRight'>
                    {{content.moneyAmt}}
                </div>
            </li>
            <li class='allFlex paddProfit'>
                <div class='half gary'>
                    交易时间
                </div>
                <div class='half blueColor textRight'>
                    {{time}}
                </div>
            </li>
        </ul>
        <div class='bottomLong'></div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      content: '',
      version: '',
      agentNo: '',
      transaction: {
        'QYK': '全额消费',
        'WK': '银联快捷',
        'WXPAY': '微信',
        'YK': '代还消费',
        'ZFB': '支付宝',
        'BK': '申请信用卡',
        'DK': '贷款'
      },
      time: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.list()
  },
  methods: {
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790007',
        '10': this.$route.query.moneyType,
        '11': this.$route.query.order,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.content = JSON.parse(res.data[38])
            vm.time = vm.$moment(vm.content.craetaTime.time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

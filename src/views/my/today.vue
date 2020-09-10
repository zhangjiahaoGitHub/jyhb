<template>
    <div class='hundred'>
        <ul class='borderMagin' v-infinite-scroll='load' infinite-scroll-disabled='disabled' style="overflow:auto">
            <li class='allFlex paddProfit' v-for='item in moneyList' :key='item.ID' @click='toNext(item.order_no, item.moneyType)'>
                <div class='half'>
                    <div class='smallWeight'>{{transaction[item.trade_type]?transaction[item.trade_type]:'其他'}}</div>
                    <div class='gary todayTop'>{{$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')}}</div>
                </div>
                <div class='half'>
                    <div class='blueColor textRight'>{{item.money}}</div>
                    <div class='textRight todayTop'>
                        查看详情
                        <img src='../../assets/right.png' class='teamNext marginLeft'/>
                    </div>
                </div>
            </li>
        </ul>
        <p v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</p>
        <p v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</p>
        <div class='bottomLong'></div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      page: 0,
      count: 10,
      loading: false,
      version: '',
      agentNo: '',
      merchantNo: '',
      moneyList: [],
      transaction: {
        'QYK': '全额消费',
        'WK': '银联快捷',
        'WXPAY': '微信',
        'YK': '代还消费',
        'ZFB': '支付宝',
        'BK': '申请信用卡',
        'DK': '贷款'
      }
    }
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.type = this.$route.query.type
  },
  methods: {
    load () {
      let vm = this
      vm.loading = true
      setTimeout(async () => {
        vm.loading = false
        if (vm.count >= 10) {
          vm.page++
          await vm.list()
        }
      }, 1000)
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690036',
        '42': vm.merchantNo,
        '43': vm.page,
        '44': vm.type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.moneyList = vm.moneyList.concat(JSON.parse(res.data[57]))
            console.log(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    toNext (order, moneyType) {
      let vm = this
      vm.$router.push({ name: 'details', query: { order: order, moneyType: moneyType } })
    }
  }
}
</script>

<template>
    <div class='hundred'>
        <ul class='allFlex cumPadding'>
            <li>
                <div class='gary'>开始时间</div>
                <div @click='showTime(1)' class='textWeight'>{{searchTime}}</div>
            </li>
            <li>
                <div class='gary'>结束时间</div>
                <div @click='showTime(2)' class='textWeight'>{{endTime}}</div>
            </li>
        </ul>
        <div class='realTitle cumNopadd'>累积收益：{{sumMoney}}元</div>
        <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' style="overflow:auto">
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
        <div class='timeBack'  v-show='show'>
        <div @click='showTime(0)' class='stopBack'></div>
        <el-calendar v-model="timeValue" class='timeDack'>
            <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''" @click='getTime()'>
                {{ data.day.split('-').slice(2).join('-') }}
            </p>
            </template>
        </el-calendar>
        </div>
        <div class='bottomLong'></div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      show: 0,
      timeValue: new Date(),
      timeTwo: new Date(),
      searchTime: '点击选择年月日',
      endTime: '点击选择年月日',
      type: 0,
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
      },
      sumMoney: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  watch: {
    timeValue (n, o) {
      let vm = this
      switch (vm.type) {
        case 1:
          vm.searchTime = vm.$moment(n).format('YYYY-MM-DD')
          break
        case 2:
          vm.endTime = vm.$moment(n).format('YYYY-MM-DD')
          break
      }
      this.moneyList = []
      this.count = 10
      this.page = 0
      vm.load()
    }
  },
  methods: {
    showTime (type) {
      this.show = type
      this.type = type
    },
    getTime () {
      let vm = this
      vm.show = 0
    },
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
      if (Date.parse(vm.searchTime.replace(/-/g, '/')) > Date.parse(vm.endTime.replace(/-/g, '/'))) {
        vm.$message({
          message: '开始时间不能大于结束时间',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '690036',
        '42': vm.merchantNo,
        '37': vm.searchTime === '点击选择年月日' ? '' : vm.searchTime,
        '38': vm.endTime === '点击选择年月日' ? '' : vm.endTime,
        '43': vm.page,
        '44': vm.type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.moneyList = vm.moneyList.concat(JSON.parse(res.data[57]))
            vm.sumMoney = res.data[46]
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

<template>
    <div class='hundred'>
        <div v-infinite-scroll='load' infinite-scroll-disabled='disabled' infinite-scroll-delay='1500' style="overflow:auto;height:calc(100vh - 1.7rem)">
            <ul class='borderMagin'>
                <router-link tag="div" :to="{name:'listwith', query: {all : JSON.stringify(item)} }" class='allFlex paddProfit wrap' v-for='(item, index) in teamList' :key='index'>
                    <div class='half'>
                        {{$moment(item.CREATE_TIME.time).format('YYYY-MM-DD')}}
                    </div>
                    <div class='half'>
                        <img src='../../assets/my/divided.png' class='withLogo'/>{{item.TRX_AMT}}
                    </div>
                    <div class='half textRight allFlex relative'>
                        <div class='withPadding'>
                            <p class='gary'>{{status[item.MONEY_TYPE]}}</p>
                            <p>交易详情</p>
                        </div>
                        <img src='../../assets/right.png' class='withNext'/>
                    </div>
                </router-link>
                <li v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</li>
                <li v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</li>
                <li class='bottomLong'></li>
            </ul>
        </div>
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
      teamList: [],
      status: {
        '10A': '刷卡分润',
        '10C': '升级返佣',
        '10D': '信贷返佣',
        '10E': '积分返佣',
        '10H': '花呗收款'
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
      }, 1500)
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190125',
        '8': '10A',
        '32': vm.page,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.teamList = vm.teamList.concat(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<template>
  <div>
    <div class="realname">
        <div style='height:1px'></div>
        <div class='bankgroud' v-for='item in cardList' :key='item.ID'>
            <div>
                <img :src="banks[item.BANK_NAME]?require(`../../assets/bank/white/${banks[item.BANK_NAME]}.png`):require('../../assets/bank/white/yl.png')" class='bankLogo' />
                <span class='bankRight'>
                    {{item.short_cn_name}}
                </span>
            </div>
            <div class='allFlex choose'>
                <div class='garyChoose'>****</div>
                <div class='garyChoose'>****</div>
                <div class='garyChoose'>****</div>
                <div class='garyChoose whiteColor'>{{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4, item.BANK_ACCOUNT.length)}}</div>
            </div>
            <div class='allFlex choose border'>
                <div class='garyChoose smallFont'>
                    <p>{{item.BILL_DAY}}</p>
                    <p>账单日</p>
                </div>
                <div class='garyChoose smallFont'>
                    <p>{{item.REPAYMENT_DAY}}</p>
                    <p>还款日</p>
                </div>
                <div class='garyChoose smallFont'>
                    <p>{{item.LIMIT_MONEY}}</p>
                    <p>额度</p>
                </div>
                <router-link tag='div' :to="{name: 'aisle',query: { item: JSON.stringify(item), money: $route.query.money, aisle: 'YK', merchantNo: usermerchantNo, merchantNotwo: item.MERCHANT_NO  }}" class='garyChoose whiteColor smallFont'>
                    <img src='../../assets/repay/setcard.png'  class='immediately'/>
                </router-link>
            </div>
        </div>
        <div class='repayMax' v-show="false">
          <router-link tag="div" :to="{ name:'addcard' }">
            <img src='../../assets/repay/addcard.png'/>
          </router-link>
        </div>
    </div>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      input: '',
      agentNo: '',
      merchantNo: '',
      cardList: [],
      clearsettimeout: null,
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
      now: -1,
      usermerchantNo: '',
      type: '0' // 这是判断是不是中介用户登陆进来的,0 是根据账户查找卡片 1是根据中介查找全部卡片
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo = this.$route.query.merchantNo
    this.type = this.$route.query.type
    console.log(this.usermerchantNo)
    this.list()
  },
  methods: {
    list () {
      let vm = this
      if (this.usermerchantNo) {
        vm.merchantNo = vm.usermerchantNo
      }
      if (vm.type !== '0' && vm.type !== '1') {
        vm.type = '0'
      }
      // 43域 0 是根据账户查找卡片 1是根据中介查找全部卡片   44域是账单日搜索
      let parmas = {
        '0': '0700',
        '3': '190932',
        '42': vm.merchantNo,
        '43': vm.type,
        '44': vm.input,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.cardList = JSON.parse(res.data[57])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectchange () {
      let vm = this
      vm.list()
    },
    space () {
      let vm = this
      clearTimeout(vm.clearsettimeout)
      if (vm.input === '') {
        vm.clearsettimeout = setTimeout(() => {
          vm.list()
        }, 1500)
      }
    }
  }
}
</script>

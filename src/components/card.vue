<template>
  <div>
    <div style='height:1px'></div>
    <div>
        <div class='bankgroud' :style="{background: `url(${banks[card.bankCode]?img:noimg}) 0% 0% / 100% 100%`}">
            <div class='cardTop'>
              {{bankAccountName.substring(0, 1)}}{{bankAccountName.length == 2 ? '*' :'**'}}
            </div>
            <div class='allFlex choose'>
                <div class='garyChoose whiteColor'>{{bankAccount.substring(0, 4)}}</div>
                <div class='garyChoose whiteColor'>****</div>
                <div class='garyChoose whiteColor'>****</div>
                <div class='garyChoose whiteColor'>{{bankAccount.substring(bankAccount.length-4, bankAccount.length)}}</div>
            </div>
            <div class='allFlex choose border'>
                <div class='garyChoose smallFont'>
                </div>
                <div class='garyChoose smallFont'>
                </div>
                <div class='garyChoose smallFont'>
                </div>
                <router-link tag='div' :to="{name: 'change'}" class='garyChoose whiteColor smallFont'>
                    <div class='cardSelect'>更换储蓄卡</div>
                </router-link>
            </div>
        </div>
        <div class='centerSelect' style='margin-top: 1rem'>
          <router-link :to="{name: 'retreat'}" tag='div' class='allFlex'>
            <img src='../assets/bank/card/sg.png' class='myImage'/>
              收益提现
            <img src='../assets/right.png' class='rightNext'/>
          </router-link>
          <router-link :to="{name: 'allwith'}" tag='div' class='allFlex'>
            <img src='../assets/bank/card/ml.png' class='myImage'/>
              收益明细
            <img src='../assets/right.png' class='rightNext'/>
          </router-link>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      merchantNoquery: '', // 这个是不同用户根据不同merchantNo传过来获取卡片的
      cardList: [],
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
      card: {},
      bankAccount: '',
      bankAccountName: '',
      img: '',
      noimg: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
  },
  methods: {
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.fullscreenLoading = false
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.card = JSON.parse(res.data[57])[0]
            vm.bankAccount = vm.card.bankAccount
            vm.bankAccountName = vm.card.bankAccountName
            vm.img = require(`../assets/bank/card/${vm.banks[vm.card.bankCode]}.png`)
            vm.noimg = require('../assets/bank/card/yl.png')
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

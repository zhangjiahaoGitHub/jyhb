<template>
  <div class='hundred transactionInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <head>
      <p>交易总额(元)</p>
      <span>{{item.trxAmt}}</span>
    </head>
    <ol>
      <li>
        <span>商户名称：</span>
        <p>{{item.name}}</p>
      </li>
      <li>
        <span>交易类型：</span>
        <p>{{item.tradeTypeName}}</p>
      </li>
      <li>
        <span>交易费率：</span>
        <p>{{item.feeRate}}</p>
      </li>
      <li>
        <span>交易时间：</span>
        <p>{{item.completeTimeString}}</p>
      </li>
      <li>
        <span>交易卡号：</span>
        <p>{{item.cardNo}}</p>
      </li>
      <li>
        <span>交易编号：</span>
        <p>{{item.orderNo}}</p>
      </li>
      <li>
        <span>交易状态：</span>
        <p>{{item.statusName}}</p>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      version: '',
      agentNo: '',
      item: {},
      merchantNo: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.item = JSON.parse(this.$route.query.item)
    console.log(this.item);
    
  },
  methods: {
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190947',
        '12': '2',
        '42': vm.merchantNo,
        '45': vm.pageCount2,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

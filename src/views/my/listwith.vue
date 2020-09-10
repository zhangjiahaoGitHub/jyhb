<template>
    <div class='hundred listwith-layout'>
      <p>金<span>额</span>：{{all.money}}</p>
      <p>金额类型：{{dataObj[31]}}</p>
      <p>来源用户：{{dataObj[58]}}</p>
      <p>用户电话：{{dataObj[32]}}</p>
      <p>交易时间：{{$moment(all.time.time).format('YYYY-MM-DD HH:mm:ss')}}</p>
    </div>
</template>
<script>

export default {
  data () {
    return {
      dataObj: {}
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.all = JSON.parse(this.$route.query.item)
    this.list()
  },
  methods: {
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190151',
        '38': vm.all.orderId,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            console.log(res.data);
            this.dataObj = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<template>
    <div class='hundred wallet-layout'>
        <div class="headDiv">
          <div>
            <span>昨日收益</span>
            <p>{{zrsy}}</p>
          </div>
          <div>
            <span>今日收益</span>
            <p>{{jrsy}}</p>
          </div>
        </div>
        <div class="contentDiv">
          <div>
            <span>当前提现金额(元)</span>
            <p>{{ktx}}</p>
            <div @click="()=>{this.$router.push({name:'withdraw',query:{ktx:this.ktx}})}" class="btnDiv">
              提现
            </div>
          </div>
          <div>
            <span>累积总收益(元)：</span>
            <p>{{ljsy}}</p>
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
      zrsy: 0,
      jrsy: 0,
      ktx: 0,
      ljsy: 0,
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
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            console.log(res.data)
            this.zrsy = res.data[45]
            this.jrsy = res.data[44]
            this.ktx = res.data[43]
            this.ljsy = res.data[46]
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

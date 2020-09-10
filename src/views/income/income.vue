<template>
    <div class='hundred income-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div>
        <div>
          <p>可提现收益</p>
          <span>￥{{ktxsy}}</span>
        </div>
        <span @click="$router.push({name: 'withdraw',query: {ktx: ktxsy}})">立即提现</span>
      </div>
      <ol>
        <li>
          <span>{{jrsy}}</span>
          <p>今日收益</p>
        </li>
        <li>
          <span>{{bysy}}</span>
          <p>本月收益</p>
        </li>
        <li>
          <span>{{sysy}}</span>
          <p>上月收益</p>
        </li>
      </ol>
      <ul>
        <li @click="$router.push({name: 'incomeList',query:{ title: '全部类型', type: '1'}})">
          <img src="../../assets/income/qblx.png" alt="">
          <p>全部类型</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '养卡分润', type: '2'}})">
          <img src="../../assets/income/ykfr.png" alt="">
          <p>养卡分润</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '空卡分润', type: '3'}})">
          <img src="../../assets/income/kkfr.png" alt="">
          <p>空卡分润</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '刷卡分润', type: '4'}})">
          <img src="../../assets/income/skfr.png" alt="">
          <p>刷卡分润</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '花呗分润', type: '5'}})">
          <img src="../../assets/income/hbfr.png" alt="">
          <p>花呗分润</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '升级返佣', type: '6'}})">
          <img src="../../assets/income/sjfy.png" alt="">
          <p>升级返佣</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '网申返佣', type: '7'}})">
          <img src="../../assets/income/wsfy.png" alt="">
          <p>网申返佣</p>
        </li>
        <li @click="$router.push({name: 'incomeList',query:{ title: '激活奖', type: '8'}})">
          <img src="../../assets/income/jhj.png" alt="">
          <p>激活奖</p>
        </li>
      </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      fullscreenLoading: false,
      version: '',
      merchantNo: '',
      agentNo: '',
      ktxsy: '0.00',
      jrsy: '0.00',
      bysy: '0.00',
      sysy: '0.00',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getData()
  },
  methods: {
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792005',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.ktxsy = res.data[43]
            this.jrsy = res.data[44]
            this.bysy = res.data[33]
            this.sysy = res.data[34]
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>

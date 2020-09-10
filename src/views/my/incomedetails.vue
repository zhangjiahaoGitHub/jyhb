<template>
    <div class='hundred incomedetails-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
        <p>{{yymm}}</p>
        <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
          <li v-for="item in listArr" :key="item.id">
            <div>
              <p>{{item.payResMsg}}</p>
              <span>{{item.completeTimeString}}</span>
            </div>
            <span :class="item.payResMsg.indexOf('兑换')!=-1 ? '':'aSpan'">{{item.payResMsg.indexOf('兑换')!=-1 ? '-':'+'}}{{item.trxAmt}}</span>
          </li>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      yymm: '',
      count: 20,
      loading: true,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.yymm = this.$moment().format('YYYY-MM')
    this.list()
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792008',
        '42': vm.merchantNo,
        '45': vm.pageCount,
        '46': this.yymm,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.zSumContent = res.data[11]
            this.skContent = res.data[12]
            this.ykContent = res.data[14]
            this.fyContent = res.data[13]
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              if (item.payResMsg.indexOf('获得')>-1) {
                item.moneyState = '+'
              }else{
                item.moneyState = '-'
              }
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
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

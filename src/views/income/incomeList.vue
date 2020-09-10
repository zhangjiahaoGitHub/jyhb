<template>
    <div class='hundred incomeList-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div><span>总收益</span><span>￥{{zsy}}</span></div>
      <ul>
        <li v-for="(item,index) in listArr" :key="index">
          <div>
            <p>{{item.createTime}}</p>
            <span v-if="type!=5">{{item.merchantCnName}}</span>
          </div>
          <div>
            <p style="color:#333;">{{item.moneyType}}</p>
            <span v-if="type!=8 && item.money">交易金额:{{item.money}}</span>
          </div>
          <span>+{{item.trxAmt}}</span>
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
      fullscreenLoading: false,
      version: '',
      merchantNo: '',
      agentNo: '',
      count: 30,
      loading: false,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1,
      zsy: 0,
      type: 0,
    }
  },
  computed: {
    noMore () {
      return this.count < 20
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
    this.list()
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
        '3': '690036',
        '42': vm.merchantNo,
        '43': vm.pageCount,
        '45': vm.$route.query.type,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.zsy = res.data[44]
            vm.count = JSON.parse(res.data[57]).length
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              this.listArr.push(item)
            });
            console.log(this.listArr);
            this.pageCount++
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
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

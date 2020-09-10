<template>
    <div class='hundred deductionRecords-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="headDiv">
        <div><p>保障金金额：{{shBzj}}</p><span @click="czbzj">立即充值</span></div>
        
        <p>温馨提示:保证金小于1500元，风控系统将会暂停你名下所有空卡计划，充值后启动计划即可，计划完成，保证金可提现。</p>
      </div>
      <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
        <li v-for="item in listArr" :key="item.id">
          <div><span>{{item.sourceType}}</span><span>{{item.money}}</span></div>
          <div><span>{{item.source}}</span><span>{{item.formatTime}}</span></div>
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
      count: 20,
      // 无限滚动开关：true关
      loading: false,
      listArr: [],
      pageCount: 1,
      shBzj: 0,
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
    this.shBzj = this.$route.query.shBzj
  },
  methods: {
    czbzj () {
      this.$router.push({
        name:'marginDepositZj',
      })
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '700001',
        '6': '10B',
        '7': vm.pageCount,
        '42': vm.merchantNo,
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
            this.bzj = res.data[58]
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.formatTime=this.$moment(item.createTime.time).format('YYYY.MM.DD HH:mm')
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

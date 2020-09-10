<template>
  <div class="hundred lookPlan-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance='20'>
      <li v-for="item in listArr" :key="item.ID">
        <p>
          <span>{{item.BANK_ACCOUNT_NAME}}</span>
          <span>**** {{item.BANK_ACCOUNT ? item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length):''}}</span>
        </p>
        <p>
          <span>创建时间：{{item.formatTime}}</span>
          <em>{{status[item.STATUS]}}</em>
        </p>
        <p>
          <span>计划天数：{{item.dayCount}}</span>
        </p>
        <p>
          <span>计划还款：{{item.PLAN_AMT}}</span>
          <span>本期已还：{{item.payed}}</span>
        </p>
        <div>
          <el-progress :stroke-width="3" :percentage="item.jdt"></el-progress>
          <p @click="toPlanInfo(item)"><span>计划详情</span><i class="el-icon-arrow-right"></i></p>
        </div>
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
      status: {
        '10A':'未执行',
        '10B':'执行中',
        '10C':'暂停',
        '10D':'失败',
        '10E':'完成',
        '10F':'退款中',
        '10G':'已退款',
      },
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
    toPlanInfo (item) {
      this.$router.push({name: 'particular', query: { item: JSON.stringify(item) }})
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190212',
        '6': vm.pageCount,
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
            let getList = []
            if (res.data[57]) {
              vm.count = JSON.parse(res.data[57]).length
              getList = JSON.parse(res.data[57])
            }else{
              vm.count = 1
            }
            getList.forEach(item => {
              item.formatTime=this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')
              item.jdt = parseFloat(((item.payed/item.PLAN_AMT)*100).toFixed(2))
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }else{
            vm.count = 1
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          vm.count = 1
          console.log(err)
        })
    }
  }
}
</script>

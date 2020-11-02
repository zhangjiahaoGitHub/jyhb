<template>
  <div class='hundred viewPlan-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="navDiv">
      <p @click="changeNav(1)" :class="nav==1?'aP':''">进行中计划</p>
      <p @click="changeNav(2)" :class="nav==2?'aP':''">已失败计划</p>
      <p @click="changeNav(3)" :class="nav==3?'aP':''">已暂停计划</p>
      <p @click="changeNav(4)" :class="nav==4?'aP':''">已完成计划</p>
    </div>
    <div class="search">
      <i class="el-icon-search"></i>
      <input v-model="cardNo" placeholder="请输入银行卡号" type="number" name="" id="">
      <p @click="search">搜索</p>
    </div>
    <ul
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance='20'>
      <li @click="toInfo(item)" v-for="item in listArr" :key="item.ID">
        <div>
          <div>
            <span>{{item.short_cn_name}} 尾号：{{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length)}}</span>
            <span>{{item.MERCHANT_CN_NAME}}</span>
            <span>{{stateObj[item.STATUS]}}</span>
          </div>
          <div>
            <span>类型：{{item.TYPE=='10C'?'全额还':'预留还'}}</span>
            <span>订单编号：{{item.ID.substring(item.ID.length-15,item.ID.length)}}</span>
          </div>
          <div><span>还款周期：{{$moment(item.START_TIME.time).format('YYYY-MM-DD')}}-{{$moment(item.END_TIME.time).format('YYYY-MM-DD')}}</span></div>
          <p><span>账单日：{{item.BILL_DAY}}</span><span>还款日：{{item.REPAYMENT_DAY}}</span></p>
          <p><span>本期应还：{{item.PLAN_AMT}}</span><span>本期已还：{{item.RETURN_MONEY}}</span></p>
          <div>
            <span>通道名称：{{item.acqName}}</span>
            <span>结算费率：{{item.rate}}</span>
          </div>
        </div>
        <ol>
          <li>
            <p>卡内周转金</p>
            <span>{{item.CB_AMT}}</span>
          </li>
          <p></p>
          <li>
            <p>进度</p>
            <p>{{item.progress}}</p>
          </li>
          <p></p>
          <li>
            <p>预计手续费</p>
            <p>{{(item.PAY_FREE+item.SALE_FREE).toFixed(2)}}</p>
          </li>
          <p></p>
          <li>
            <p>已付手续费</p>
            <p>{{Number(item.fred).toFixed(2)}}</p>
          </li>
        </ol>
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
      version: '',
      agentNo: '',
      merchantNo: '',
      stateObj: {
        '10A': '未执行',
        '10B': '进行中',
        '10C': '已失败',
        '10D': '已暂停',
        '10E': '已完成',
        '10F': '已退款',
      },
      nav: 1,
      cardNo: '',
      fullscreenLoading: false,
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
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
    toInfo(item){
      this.$router.push({name: 'particular', query: { item: JSON.stringify(item), zj: true }})
    },
    changeNav(nav){
      this.nav = nav
      this.search()
    },
    search(){
      this.listArr = []
      this.count = 20
      this.pageCount = 1
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '468160',
        '42': vm.merchantNo,
        '43': vm.nav,
        // 页码
        '44': this.pageCount,
        '45': this.cardNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

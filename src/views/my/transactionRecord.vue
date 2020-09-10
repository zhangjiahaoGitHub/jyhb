<template>
  <div class='hundred transactionRecord-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <p>交易总额(元)</p>
      <span>{{jyze}}</span>
      <ol>
        <li>
          <p>七日交易总笔数(笔)</p>
          <span>{{qrbs}}</span>
        </li>
        <span></span>
        <li>
          <p>七日交易总额(元)</p>
          <span>{{qrze}}</span>
        </li>
      </ol>
    </div>
    <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="代还" name="first">
        <ul
        v-infinite-scroll="load1"
        infinite-scroll-disabled="disabled1"
        infinite-scroll-distance='20'>
          <li @click="toTransactionInfo(item)" v-for="item in listArr1" :key="item.id">
            <p>{{item.completeTimeString}}</p><span>{{item.tradeTypeName}}</span><p>{{item.statusName}}</p><span>{{item.trxAmt}}</span>
          </li>
          <p v-if="loading1">加载中...</p>
          <p v-if="noMore1">没有更多了</p>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="快捷" name="second">
        <ul
        v-infinite-scroll="load2"
        infinite-scroll-disabled="disabled2"
        infinite-scroll-distance='20'>
          <li @click="toTransactionInfo(item)" v-for="item in listArr2" :key="item.id">
            <div>{{item.completeTimeString}} <span>{{item.tradeTypeName}}</span> {{item.statusName}}</div>
            <span>{{item.trxAmt}}</span>
          </li>
          <p v-if="loading1">加载中...</p>
          <p v-if="noMore1">没有更多了</p>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人交易记录" name="first">
        <div class="headDiv">
          <p>个人总流水（元）</p>
          <div>
            <div>
              <em></em>
              <span>刷卡</span>
              <p>{{sk1}}</p>
            </div>
            <div>
              <span>养卡</span>
              <p>{{yk1}}</p>
            </div>
          </div>
        </div>
        <ul
        v-infinite-scroll="load1"
        infinite-scroll-disabled="disabled1"
        infinite-scroll-distance='20'>
          <li v-for="(item,index) in listArr1" :key="index">
            <div>
              <p>{{item.tradeTypeName}}</p>
              <span>{{item.completeTimeString}}</span>
            </div>
            <div>
              <p>{{item.trxAmt}}</p>
            </div>
          </li>
          <p v-if="loading1">加载中...</p>
          <p v-if="noMore1">没有更多了</p>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="团队交易记录" name="second" element-loading-background="rgba(0, 0, 0, 0.7)">
        <div class="headDiv">
          <p>团队总流水（元）</p>
          <div>
            <div>
              <em></em>
              <span>刷卡</span>
              <p>{{sk2}}</p>
            </div>
            <div>
              <span>养卡</span>
              <p>{{yk2}}</p>
            </div>
          </div>
        </div>
        <ul
        v-infinite-scroll="load2"
        infinite-scroll-disabled="disabled2"
        infinite-scroll-distance='20'>
          <li v-for="(item,index) in listArr2" :key="index">
            <div>
              <p>{{tradeTypeArr[item.trade_type]}}</p>
              <span>{{item.MOBILE.substring(0,3)}}****{{item.MOBILE.substring(item.MOBILE.length-4,item.MOBILE.length)}}</span>
            </div>
            <div>
              <p>{{item.TRX_AMT}}</p>
              <span>{{item.formatTime}}</span>
            </div>
          </li>
          <p v-if="loading2">加载中...</p>
          <p v-if="noMore2">没有更多了</p>
        </ul>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      jyze: '0.00',
      qrbs: 0,
      qrze: '0.00',
      activeName: 'first',
      version: '',
      agentNo: '',
      merchantNo: '',
      usermerchantNo: '',
      count1: 20,
      loading1: false,
      listArr1: [],
      pageCount1: 1,
      count2: 20,
      loading2: false,
      listArr2: [],
      pageCount2: 1
    }
  },
  computed: {
    noMore1 () {
      return this.count1 < 10
    },
    disabled1 () {
      return this.loading1 || this.noMore1
    },
    noMore2 () {
      return this.count2 < 10
    },
    disabled2 () {
      return this.loading2 || this.noMore2
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo = this.$route.query.merchantNo
    if (this.usermerchantNo) {
      this.merchantNo = this.usermerchantNo
    }
  },
  methods: {
    toTransactionInfo(item) {
      this.$router.push({
        name: 'transactionInfo',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'second') {
        this.count2 = 20
        this.listArr2 = []
        this.pageCount2 = 1
        this.load2()
      }else{
        this.count1 = 20
        this.listArr1 = []
        this.pageCount1 = 1
        this.load1()
      }
    },
    load1 () {
      this.loading1 = true
      this.personal()
    },
    load2 () {
      this.loading2 = true
      this.team()
    },
    personal () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190978',
        '8': 'YK',
        '42': vm.merchantNo,
        '45': vm.pageCount1,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading1=false
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.jyze = res.data[11]
            this.qrze = res.data[12]
            this.qrbs = res.data[13]
            vm.count1 = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              this.listArr1.push(item)
            });
            console.log(this.listArr1);
            
            this.pageCount1++
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    team () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190978',
        '8': 'WK',
        '42': vm.merchantNo,
        '45': vm.pageCount2,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          this.loading2=false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.jyze = res.data[11]
            this.qrze = res.data[12]
            this.qrbs = res.data[13]
            vm.count2 = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              this.listArr2.push(item)
            });
            console.log(this.listArr2);
            
            this.pageCount2++
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

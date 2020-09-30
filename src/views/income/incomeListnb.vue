<template>
    <div class='hundred incomeList-style' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div v-if="$route.meta.incomeList" class="pageTitle">
        <i @click="goTop" class="el-icon-arrow-left bs"></i>
        {{$route.query.title}}({{ryry}})
        <span class="rightCorner xuanzhuan" @click.stop="changery"><i class="el-icon-sort"></i></span>
      </div>
      <div v-if="$route.query.type == '1'">
        <div style="height:24.8rem;overflow:auto;">
          <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <div class="hezi-box-sy" v-for="(item,index) in profitone" :key="index">
              <div class="title-time">
                <div>{{item.moneyTime}}</div>
                <div class="price-r">{{item.trxAmt}}</div>
              </div>
              <div class="detail-box">
                <div class="title-top-bottom" @click.stop="openshow(index)">
                  <div>收益明细</div>
                  <i class="el-icon-arrow-down" v-show="openindex != index"></i>
                  <i class="el-icon-arrow-up" v-show="openindex == index"></i>
                </div>
                <div class="detail-list" v-show="openindex == index">
                  <div class="list-row" v-show="item['30A'] != '0.00'">
                    <div>余额代还</div>
                    <div>{{item['30A']}}</div>
                  </div>
                  <div class="list-row" v-show="item['40A'] != '0.00'">
                    <div>空卡代还</div>
                    <div>{{item['40A']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10A'] != '0.00'">
                    <div>一键收款</div>
                    <div>{{item['10A']}}</div>
                  </div>
                  <div class="list-row" v-show="item['50A'] != '0.00'">
                    <div>花呗收款</div>
                    <div>{{item['50A']}}</div>
                  </div>
                  <div class="list-row" v-show="item['20A'] != '0.00'">
                    <div>商城收益</div>
                    <div>{{item['20A']}}</div>
                  </div>
                  <div class="list-row" v-show="item['20D'] != '0.00'">
                    <div>办卡收益</div>
                    <div>{{item['20D']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10D'] != '0.00'">
                    <div>贷款收益</div>
                    <div>{{item['10D']}}</div>
                  </div>
                  <div class="list-row" v-show="item['20C'] != '0.00'">
                    <div>薪资收益</div>
                    <div>{{item['20C']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10E'] != '0.00'">
                    <div>积分兑换</div>
                    <div>{{item['10E']}}</div>
                  </div>
                  <div class="list-row" v-show="item['20B'] != '0.00'">
                    <div>平级收益</div>
                    <div>{{item['20B']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10F'] != '0.00'">
                    <div>实名收益</div>
                    <div>{{item['10F']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10G'] != '0.00'">
                    <div>激活收益</div>
                    <div>{{item['10G']}}</div>
                  </div>
                  <div class="list-row" v-show="item['10C'] != '0.00'">
                    <div>升级收益</div>
                    <div>{{item['10C']}}</div>
                  </div>
                  <div class="list-row" v-show="item['20E'] != '0.00'">
                    <div>管理收益</div>
                    <div>{{item['20E']}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="more-no" v-if="loading">加载中...</p>
          <p class="more-no" v-if="!loading">没有更多了</p>
        </div>
      </div>
      <div v-if="$route.query.type == '2' || $route.query.type == '4'">
        <div class="hezi-box-sy">
          <div class="title-time-two" v-if="$route.query.type == '2'">
            <div>日期</div>
            <div>总收益额(元)</div>
          </div>
          <div class="title-time-two" v-if="$route.query.type == '4'">
            <div>日期</div>
            <div>总返佣额(元)</div>
          </div>
          <div style="height:23.2rem;overflow:auto;">
            <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <div class="detail-box" v-for="(item,index) in profittwo" :key="index">
                <div class="title-top-bottom" @click.stop="openshow(index)">
                  <div class="two-flex-bet timte-two-two">
                    <div>{{item.moneyTime}}</div>
                    <div>{{item.trxAmt}}</div>
                  </div>
                  <i class="el-icon-arrow-down" v-show="openindex != index"></i>
                  <i class="el-icon-arrow-up" v-show="openindex == index"></i>
                </div>
                <div class="detail-list" v-show="openindex == index">
                  <div class="two-flex-bet title-two">
                    <div>关系</div>
                    <div>金额</div>
                  </div>
                  <div class="two-flex-bet">
                    <div>直推</div>
                    <div>{{item.trxAmt1}}</div>
                  </div>
                  <div class="two-flex-bet">
                    <div>间推</div>
                    <div>{{item.trxAmt0}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="more-no" v-if="loading">加载中...</p>
            <p class="more-no" v-if="!loading">没有更多了</p>
          </div>
        </div>
      </div>
      <div v-if="$route.query.type == '3' || $route.query.type == '5'">
        <div class="three-box" style="height:24rem;overflow:auto;">
          <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <div class="list-row" v-for="(item,index) in profitthree" :key="index">
              <div>{{item.activeTime}}</div>
              <div>{{item.acount}}人</div>
            </div>
          </div>
          <p class="more-no" v-if="loading">加载中...</p>
          <p class="more-no" v-if="!loading">没有更多了</p>
        </div>
      </div>
      <div v-if="$route.query.type == '6'">
        <div class="hezi-box-sy">
          <div class="title-time-two">
            <div>日期</div>
            <div>总交易额(元)</div>
          </div>
          <div style="height:23.2rem;overflow:auto;">
            <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <div class="detail-box" v-for="(item,index) in profitfour" :key="index">
                <div class="title-top-bottom" @click.stop="openshow(index)">
                  <div class="two-flex-bet timte-six-six">
                    <div>{{item.moneyTime}}</div>
                    <div>{{item.trxAmt}}</div>
                  </div>
                  <i class="el-icon-arrow-down" v-show="openindex != index"></i>
                  <i class="el-icon-arrow-up" v-show="openindex == index"></i>
                </div>
                <div class="detail-list-six" v-show="openindex == index">
                  <div class="left-six-box">
                    <div class="row-list">个人业绩：{{item.trxAmt0}}</div>
                    <div class="row-list">余额代还：{{item.yktrxAmt0}}</div>
                    <div class="row-list">空卡代还：{{item.qyktrxAmt0}}</div>
                    <div class="row-list">一键收款：{{item.wktrxAmt0}}</div>
                    <div class="row-list">花呗收款：{{item.HBtrxAmt0}}</div>
                  </div>
                  <div class="left-six-box">
                    <div class="row-list">团队业绩：{{item.trxAmt1}}</div>
                    <div class="row-list">余额代还：{{item.yktrxAmt1}}</div>
                    <div class="row-list">空卡代还：{{item.qyktrxAmt1}}</div>
                    <div class="row-list">一键收款：{{item.wktrxAmt1}}</div>
                    <div class="row-list">花呗收款：{{item.HBtrxAmt1}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="more-no" v-if="loading">加载中...</p>
            <p class="more-no" v-if="!loading">没有更多了</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      agentNo: '',
      fullscreenLoading: false,
      openindex: -1,
      cahngeflag: false,
      ryry: '',
      ryrynum: '0',
      page: 1,
      profitone: [],
      profittwo: [],
      profitthree: [],
      profitfour: [],
      profit: [],
      loading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.type = this.$route.query.type
    this.changery()
  },
  computed: {
    noMore () {
      return this.profit.length == 0
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      let vm = this
      this.loading = true
      if(this.type == '1') {
        vm.listone()
      }else if (this.type == '2' || this.type == '4') {
        vm.listtwo()
      }else if(this.type == '3' || this.type == '5') {
        vm.listthree()
      }else if(this.type == '6') {
        vm.listfour()
      }
    },
    goTop() {
      this.$router.go(-1)
    },
    openshow(index) {
      if(this.openindex == index) {
        this.openindex = -1
      }else {
        this.openindex = index
      }
    },
    changery() {
      let vm = this
      this.cahngeflag = !this.cahngeflag
      if(vm.$route.query.type) {
        if(vm.cahngeflag) {
          vm.ryry = '日'
          vm.ryrynum = '0'
        }else {
          vm.ryry = '月'
          vm.ryrynum = '1'
        }
      }
      vm.page = 1
      vm.profit = []
      vm.profitone = []
      vm.profittwo = []
      vm.profitthree = []
      vm.profitfour = []
      vm.load()
    },
    listone () {
      let vm = this
      vm.profit = []
      let parmas = {
        '0': '0700',
        '3': '690041',
        '42': vm.merchantNo,
        '43': vm.page,
        '45': vm.ryrynum,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.profit = JSON.parse(res.data[10])
            for(let i in vm.profit) {
              vm.profitone.push(vm.profit[i])
            }
            vm.page++
            vm.loading = false
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.loading = false
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          vm.loading = false
          console.log(err)
        })
    },
    listtwo () {
      let vm = this
      vm.profit = []
      let parmas = {
        '0': '0700',
        '3': '690039',
        '42': vm.merchantNo,
        '43': vm.page,
        '44': vm.type == '2' ? '0' : '1',//0 激活, 1 实名
        '45': vm.ryrynum,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.profit = JSON.parse(res.data[10])
            for(let i in vm.profit) {
              vm.profittwo.push(vm.profit[i])
            }
            vm.page++
            vm.loading = false
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.loading = false
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          vm.loading = false
          console.log(err)
        })
    },
    listthree () {
      let vm = this
      vm.profit = []
      let parmas = {
        '0': '0700',
        '3': '690038',
        '42': vm.merchantNo,
        '43': vm.page,
        '44': vm.type == '3' ? '0' : '1',//0 激活, 1 实名
        '45': vm.ryrynum,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.profit = JSON.parse(res.data[10])
            for(let i in vm.profit) {
              vm.profitthree.push(vm.profit[i])
            }
            vm.page++
            vm.loading = false
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.loading = false
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          vm.loading = false
          console.log(err)
        })
    },
    listfour () {
      let vm = this
      vm.profit = []
      let parmas = {
        '0': '0700',
        '3': '690040',
        '42': vm.merchantNo,
        '43': vm.page,
        '45': vm.ryrynum,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.profit = JSON.parse(res.data[10])
            for(let i in vm.profit) {
              vm.profitfour.push(vm.profit[i])
            }
            vm.page++
            vm.loading = false
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.loading = false
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          vm.loading = false
          console.log(err)
        })
    },
  }
}
</script>

<template>
  <div class='hundred cardManagement-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="search">
      <i class="el-icon-search"></i>
      <input v-model="billDay" placeholder="请输入账单日" type="number" name="" id="">
      <p @click="search">搜索</p>
    </div>
    <ul
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance='20'>
      <li @click.stop="ljhk(item)" v-for='item in cardList' :key='item.ID'>
        <div>
          <p><img :src="banks[item.BANK_NAME]?require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{item.short_cn_name}}({{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length)}})</p>
          <p>{{item.BANK_ACCOUNT_NAME.substring(0,1)}}<span v-for="(t,i) in item.BANK_ACCOUNT_NAME.substring(1,item.BANK_ACCOUNT_NAME.length)" :key="i">*</span></p>
        </div>
        <div>
          <span>{{item.day}}</span>
          <div>
            <p>天到期<span>{{item.plancount<1 ? '未制定计划':'已制定计划'}}</span></p>
            <span>{{item.repDate}}</span>
          </div>
        </div>
        <ol>
          <li>
            <span>{{item.LIMIT_MONEY}}</span>
            <p>额度</p>
          </li>
          <li>
            <span>{{item.PLAN_AMT}}</span>
            <p>账单金额</p>
          </li>
          <li>
            <span>{{item.SURPLUS_PAYMENT_MONEY}}</span>
            <p>剩余应还</p>
          </li>
        </ol>
        <div>
          <p @click.stop="delCard(item.BANK_ACCOUNT,index)">解绑</p>
          <p @click.stop="ljhk(item)">立即还款</p>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
    <div @click="planDiv=false" v-if="planDiv" class="planDiv">
      <div @click.stop="">
        <div class="titleDiv">智能还款方式<i @click.stop="planDiv=false" class="el-icon-close"></i></div>
        <ol>
          <li @click="radio='YK'">
            <div>
              <img src="../../assets/repay/yehk.png" alt="">
              <div>
                <span>余额还款</span>
                <p>卡内预留额度5%-10%本金即可全额还款</p>
              </div>
            </div>
            <el-radio v-model="radio" label="YK"></el-radio>
          </li>
          <li @click="radio='QYK'">
            <div>
              <img src="../../assets/repay/kkhk.png" alt="">
              <div>
                <span>空卡还款</span>
                <p>卡内预留额度1%左右手续费即可全额还款</p>
              </div>
            </div>
            <el-radio v-model="radio" label="QYK"></el-radio>
          </li>
        </ol>
        <div class="btnDiv">
          <p @click='jxhk'>继续还款</p>
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
      planDiv: false,
      fullscreenLoading: false,
      count: 20,
      loading: false,
      pageCount: 1,
      agentNo: '',
      merchantNo: '',
      merchantId: '',
      billDay: '',
      radio: 'YK',
      aisle: '',
      cardList: [],
      select: 1,
      banks: {
        313003: 'bj',
        303: 'gd',
        306: 'gf',
        105: 'js',
        301: 'jt',
        305: 'ms',
        103: 'ny',
        307: 'pa',
        309: 'xy',
        310: 'pf',
        403: 'yz',
        308: 'zs',
        102: 'gs',
        104: 'zg',
        302: 'zx',
        313062: 'sh',
        304: 'hx'
      },
      nowItem: {},
      id: '',
      type: '0' // 这是判断是不是中介用户登陆进来的,0 是根据账户查找卡片 1是根据中介查找全部卡片
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    if (this.$route.query.item) {
      this.merchantNo = JSON.parse(this.$route.query.item).MERCHANT_NO
      this.merchantId = JSON.parse(this.$route.query.item).ID
    }else{
      this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    }
    this.aisle = this.$route.query.aisle
    // this.list()
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
    search(){
      this.cardList=[]
      this.pageCount=1
      this.count=20
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    // 多通道查询，报备通道是否小于2条，小于跳转页面至通道报备页面
    dtdbb(){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390022',
        '42': vm.merchantNo,
        '45': this.nowItem.BANK_ACCOUNT,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
      .then(res => {
        if (res.data[39] === '00') {
          if (res.data[35]<2) {
            this.$router.push({name:'tdbb',query:{item:JSON.stringify(this.nowItem)}})
          }else{
            this.toMoreAisle()
          }
        }else{
          vm.$message({
            message: res.data[39],
            center: true,
            offset: 30,
            duration: 2000,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        vm.$message.error({
            message: '解绑失败',
            center: true,
            offset: 30,
            duration: 2000,
          })
      })
    },
    notYetOpen () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'warning'
      })
    },
    jxhk(){
      if (this.radio=='YK' || this.radio=='YJYK' || this.radio=='QYK') {
        this.selectype()
      }else if (this.radio=='DTD') {
        this.dtdbb()
      }else{
        this.toOneCardDh()
      }
    },
    delCard (BANK_ACCOUNT,index) {
      let vm = this
      this.$confirm('解绑信用卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '190520',
          '8': BANK_ACCOUNT,
          '42': vm.merchantNo,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              // this.list()
              this.cardList.splice(index,1)
              vm.$message({
                message: '解绑成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
            }else{
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2000,
                type: 'warning'
              })
            }
          })
          .catch(err => {
            console.log(err)
            vm.$message.error({
                message: '解绑失败',
                center: true,
                offset: 30,
                duration: 2000,
              })
          })
      }).catch(() => {
         
      });
    },
    ljhk(item){
      this.nowItem = item
      this.planDiv = true
      console.log(this.nowItem);
    },
    toExhaustive() {
      this.$router.push({
        name: 'exhaustive',
        query: {
          item: JSON.stringify(this.nowItem),
        }
      })
    },
    toMatter() {
      this.$router.push({
        name: 'matter',
        query: {
          item: JSON.stringify(this.nowItem)
        }
      })
    },
    // 一卡多还
    toOneCardDh () {
      let vm = this
      let item = this.nowItem
      vm.$router.push({ name: 'oneCardDh', query: { item: JSON.stringify(item) } })
    },
    // 多通道
    toMoreAisle () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '该卡片已有执行中计划，请在该计划暂停或完成后再创建新计划',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$router.push({ name: 'moreAisle', query: { item: JSON.stringify(item), aisle: 'YK' } })
    },
    selectype () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '您已有计划在执行!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$router.push({ name: 'aisle', query: { item: JSON.stringify(item), aisle: vm.radio,merchantNo: vm.merchantNo,merchantId: vm.merchantId } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '468159',
        '42': vm.merchantNo,
        '43': vm.billDay,
        '44': vm.pageCount,
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
              item.repDate = `${vm.$moment().format('MM')}-${item.REPAYMENT_DAY}`
              this.cardList.push(item)
            });
            console.log(this.cardList);
            
            this.pageCount++
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>

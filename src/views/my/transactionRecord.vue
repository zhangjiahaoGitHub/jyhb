<template>
  <div class='hundred transactionRecord-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="head"></div>
    <div class="content">
      <div class="planDiv">
        <ol>
          <li @click="search('WK')">
            <img :src="type == 'WK' ? require('../../assets/my/jyjl/skjla.png'):require('../../assets/my/jyjl/skjl.png')" alt="">
            <span :class="type == 'WK' ? 'aSpan':''">刷卡记录</span>
          </li>
          <li @click="search('YK')">
            <img :src="type == 'YK' ? require('../../assets/my/jyjl/ylhka.png'):require('../../assets/my/jyjl/ylhk.png')" alt="">
            <span :class="type == 'YK' ? 'aSpan':''">预留还款</span>
          </li>
          <li @click="search('QYK')">
            <img :src="type == 'QYK' ? require('../../assets/my/jyjl/kkhka.png'):require('../../assets/my/jyjl/kkhk.png')" alt="">
            <span :class="type == 'QYK' ? 'aSpan':''">空卡还款</span>
          </li>
        </ol>
        <div>
          <div>
            <div>
              <el-date-picker
                @change="search()"
                value-format="yyyy"
                format="yyyy年"
                size="mini"
                v-model="year"
                type="year"
                placeholder="">
              </el-date-picker>
              <el-select @change="search()" v-model="month" size="mini" placeholder="">
                <el-option
                  v-for="item in monthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <p>总金额：<span>{{dataObj.totalMoney}}</span></p>
          </div>
          <div>
            <p>总消费：<span>{{dataObj.totalConsumption}}</span></p>
            <p>总还款：<span>{{dataObj.totalRepayment}}</span></p>
          </div>
        </div>
      </div>
      <div v-if="type=='WK'" class="styleOne">
        <ol>
          <li>日期</li>
          <li>交易金额（元）</li>
          <li>交易状态</li>
        </ol>
        <ul
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance='20'>
          <li v-for="(item,index) in listArr" :key="index">
            <p>{{item.completeTime}}</p>
            <p>{{item.trxAmt}}</p>
            <span>{{item.status}}</span>
          </li>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </ul>
      </div>
      <ul 
        v-else
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
        <li v-for="(item,index) in listArr" :key="index">
          <img :src="banks[item.bankCode]?require(`../../assets/bank/${banks[item.bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">
          <div>
            <p>{{item.bankName}}(尾号{{item.bankTailNumber}})</p>
            <span :class="item.status=='还款' ? 'hk':'xf'">{{item.status}}</span>
          </div>
          <div>
            <p>{{item.completeTime}}</p>
            <p>金额：{{item.trxAmt}}</p>
          </div>
        </li>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      version: '',
      agentNo: '',
      merchantNo: '',
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
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
      monthOptions: [
        {
          label: '01月',
          value: '01',
        },
        {
          label: '02月',
          value: '02',
        },
        {
          label: '03月',
          value: '03',
        },
        {
          label: '04月',
          value: '04',
        },
        {
          label: '05月',
          value: '05',
        },
        {
          label: '06月',
          value: '06',
        },
        {
          label: '07月',
          value: '07',
        },
        {
          label: '08月',
          value: '08',
        },
        {
          label: '09月',
          value: '09',
        },
        {
          label: '10月',
          value: '10',
        },
        {
          label: '11月',
          value: '11',
        },
        {
          label: '12月',
          value: '12',
        },
      ],
      year: '',
      month: '01',
      type: 'WK',
      dataObj: {}
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
    this.year = this.$moment().format('YYYY')
    this.month = this.$moment().format('MM')
  },
  methods: {
    search(type){
      if (type) {
        this.type=type
      }
      this.pageCount=1
      this.listArr=[]
      this.count=20
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
        '3': '190978',
        '8': this.type,
        '42': vm.merchantNo,
        '43': '2',
        '44': `${this.year}-${this.month}`,
        // 页码
        '45': this.pageCount,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.dataObj = JSON.parse(res.data[57])
            console.log(this.dataObj);
            vm.count = this.dataObj.orderPaymentList.length
            let getList = this.dataObj.orderPaymentList
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

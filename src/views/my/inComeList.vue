<template>
    <div class='hundred inComeList-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <div class="headDiv">
        <div>
          <div>
            <ol>
              <li @click="search(1)">
                <img :src="type == 1 ? require('../../assets/my/aljsy/fysy.png'):require('../../assets/my/ljsy/fysy.png')" alt="">
                <p :class="type == 1 ? 'aP':''">返佣收益</p>
              </li>
              <li @click="search(2)">
                <img :src="type == 2 ? require('../../assets/my/aljsy/sksy.png'):require('../../assets/my/ljsy/sksy.png')" alt="">
                <p :class="type == 2 ? 'aP':''">刷卡收款</p>
              </li>
              <li @click="search(3)">
                <img :src="type == 3 ? require('../../assets/my/aljsy/hksy.png'):require('../../assets/my/ljsy/hksy.png')" alt="">
                <p :class="type == 3 ? 'aP':''">还款收益</p>
              </li>
              <li @click="search(4)">
                <img :src="type == 4 ? require('../../assets/my/aljsy/scsy.png'):require('../../assets/my/ljsy/scsy.png')" alt="">
                <p :class="type == 4 ? 'aP':''">商城收益</p>
              </li>
              <li @click="search(5)">
                <img :src="type == 5 ? require('../../assets/my/aljsy/hdsy.png'):require('../../assets/my/ljsy/hdsy.png')" alt="">
                <p :class="type == 5 ? 'aP':''">活动收益</p>
              </li>
            </ol>
            <div>
              <el-date-picker
                @change="search()"
                value-format="yyyy"
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
              <el-select @change="search()" v-model="day" size="mini" placeholder="">
                <el-option
                  v-for="item in dayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <p>总:<span>{{sumMoney}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='10'>
        <li v-for="(item,index) in listArr" :key="index">
          <div>
            <p>日期:{{item.createTime}}</p>
            <p>消费:{{item.money || '0.00'}}</p>
          </div>
          <div>
            <p>来源:{{item.merchantCnName}}</p>
            <p>{{moneyType[item.moneyType]}}:{{item.trxAmt}}</p>
          </div>
        </li>
        <p style="text-align:center;" v-if="loading">加载中...</p>
        <p style="text-align:center;" v-if="noMore">没有更多了</p>
      </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      merchantNo: '',
      sumMoney: '0.00',
      year: '',
      month: '',
      day: '0',
      type: 1,
      // 金额类型
      moneyType:{
        '10A': '快捷分润',
        '10B': '自主提现',
        '10C': '升级返佣',
        '10D': '贷款分润',
        '10E': '积分分润',
        '10F': '实名返佣',
        '10G': '激活返佣',
        '10L': '领主分润',
        '10T': '领主退款',
        '20A': '商城收益',
        '20B': '平级收益',
        '20C': '薪资收益',
        '20D': '办卡收益',
        '20E': '管理收益',
        '20F': '推广激活返佣',
        '30A': '代还收益',
        '40A': '空卡收益',
        '50A': '花呗收益',
      },
      monthOptions: [
        {
          label: '无',
          value: '0',
        },
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
      dayOptions: [
        {
          label: '无',
          value: '0',
        },
        {
          label: '1日',
          value: '01',
        },
        {
          label: '2日',
          value: '02',
        },
        {
          label: '3日',
          value: '03',
        },
        {
          label: '4日',
          value: '04',
        },
        {
          label: '5日',
          value: '05',
        },
        {
          label: '6日',
          value: '06',
        },
        {
          label: '7日',
          value: '07',
        },
        {
          label: '8日',
          value: '08',
        },
        {
          label: '9日',
          value: '09',
        },
        {
          label: '10日',
          value: '10',
        },
        {
          label: '11日',
          value: '11',
        },
        {
          label: '12日',
          value: '12',
        },
        {
          label: '13日',
          value: '13',
        },
        {
          label: '14日',
          value: '14',
        },
        {
          label: '15日',
          value: '15',
        },
        {
          label: '16日',
          value: '16',
        },
        {
          label: '17日',
          value: '17',
        },
        {
          label: '18日',
          value: '18',
        },
        {
          label: '19日',
          value: '19',
        },
        {
          label: '20日',
          value: '20',
        },
        {
          label: '21日',
          value: '21',
        },
        {
          label: '22日',
          value: '22',
        },
        {
          label: '23日',
          value: '23',
        },
        {
          label: '24日',
          value: '24',
        },
        {
          label: '25日',
          value: '25',
        },
        {
          label: '26日',
          value: '26',
        },
        {
          label: '27日',
          value: '27',
        },
        {
          label: '28日',
          value: '28',
        },
        {
          label: '29日',
          value: '29',
        },
        {
          label: '30日',
          value: '30',
        },
        {
          label: '31日',
          value: '31',
        },
      ],
      // 总条数,用来判断没有更多
      count: 20,
      // 页数
      pageCount: 1,
      listArr: [],
      loading: false,
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.year = this.$moment().format('YYYY')
    this.month = this.$moment().format('MM')
    this.day = this.$moment().format('DD')
  },
  computed: {
    noMore () {
      return this.count < 20
    },
    disabled () {
      return this.loading || this.noMore
    }
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
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690036',
        '42': vm.merchantNo,
        '43': this.pageCount,
        '44': 1,
        '45': this.type,
        '46': `${this.year}`,
        '59': vm.version
      }
      if (this.month!='0') {
        parmas[44]=2
        parmas[46]=`${this.year}-${this.month}`
        if (this.day!='0') {
          parmas[44]=3
          parmas[46]=`${this.year}-${this.month}-${this.day}`
        }
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            
            this.pageCount++
            if (res.data[57]!='null') {
              let dataArr = JSON.parse(res.data[57]).detailMoneyVOList
              this.sumMoney = JSON.parse(res.data[57]).totalMoney
              this.count = dataArr.length
              dataArr.forEach(item => {
                this.listArr.push(item)
              })
              console.log(this.listArr)
            }else{
              this.count=0
            }
            this.loading = false
          } else {
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
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    load () {
      this.loading = true
      this.getData()
    },
  }
}
</script>

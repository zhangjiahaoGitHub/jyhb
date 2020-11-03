<template>
  <div class='hundred exhaustive-layout'>
    <div class="headDiv">
      <div>
        <p><img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardList.short_cn_name}}</p>
        <span>{{cardList.BANK_ACCOUNT.substring(0, 4)}} **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4, cardList.BANK_ACCOUNT.length)}}</span>
      </div>
      <ol>
        <li>
          <span>额度</span>
          <p>{{cardList.LIMIT_MONEY}}</p>
        </li>
        <li>
          <span>账单日</span>
          <p>{{cardList.BILL_DAY}}</p>
        </li>
        <li>
          <span>还款日</span>
          <p>{{cardList.REPAYMENT_DAY}}</p>
        </li>
      </ol>
    </div>
    <ul>
      <li @click="toInfo(item)" v-for='item in listMore' :key='item.ID'>
        <ol>
          <li>
            <p>创建时间：{{$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')}}</p>
            <span>进度：{{item.progress}}</span>
          </li>
          <li>
            <p>通道名称：{{item.ACQ_NAME}}</p>
          </li>
          <li>
            <p>计划周期：{{$moment(item.START_TIME.time).format('YYYY-MM-DD')}}至{{$moment(item.END_TIME.time).format('YYYY-MM-DD')}}</p>
          </li>
          <li>
            <p>本期应还：￥{{item.PLAN_AMT}}</p>
          </li>
          <li>
            <p>本期已还：￥{{item.payed}}</p>
          </li>
          <li>
            <p>订单状态：<span :style="!(item.STATUS=='10C' || item.STATUS=='10D' || item.STATUS=='10F') ? 'color: #333;':''">{{status[item.STATUS]}}</span></p>
          </li>
          <div>计划详情</div>
        </ol>
      </li>
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
      cardList: [],
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
      status: {
        '10A': '未执行',
        '10B': '执行中',
        '10C': '失败',
        '10D': '已暂停',
        '10E': '已完成',
        '10F': '已退款',
      },
      now: -1,
      listMore: [],
      usermerchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.cardList = JSON.parse(this.$route.query.item)
    this.usermerchantNo = this.$route.query.merchantNo
    this.list()
  },
  methods: {
    toInfo(item){
      this.$router.push({name: 'particular', query: { item: JSON.stringify(item), cardList: JSON.stringify(this.cardList) }})
    },
    list () {
      let vm = this
      if (vm.usermerchantNo) {
        vm.merchantNo = vm.usermerchantNo
      }
      let parmas = {
        '0': '0700',
        '3': '190212',
        '42': vm.merchantNo,
        '43': vm.cardList.BANK_ACCOUNT,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if (res.data[57]) {
              this.listMore = JSON.parse(res.data[57])
              console.log(this.listMore);
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

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
            <p>订单状态：<span>{{status[item.STATUS]}}</span></p>
          </li>
          <div>计划详情</div>
        </ol>
      </li>
    </ul>
    <!-- <div class='blueBack tbexha'>
      <div class='bankgroud cardground noPadding raduisBottom' style='margin-top: 0'>
          <div class='allFlex planBack whiteBimo'>
                  <div>
                      <img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" class='bankLogo' />
                      <span class='bankRight'>
                          {{cardList.short_cn_name}}
                      </span>
                  </div>
                  <div class='textRight'>
                      <div>
                        <span class='exhuaPadd repayFont'>{{cardList.BANK_ACCOUNT.substring(0, 4)}} **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4, cardList.BANK_ACCOUNT.length)}}</span>
                      </div>
                  </div>
            </div>
            <div class='allFlex choose border planBackx relative' style='margin-bottom:0'>
                  <div class='garyChoose smallFont half textCenter'>
                      <p class='garyImp'>额度</p>
                      <p>{{cardList.LIMIT_MONEY}}</p>
                  </div>
                  <div class='garyChoose smallFont half textCenter'>
                      <p class='garyImp'>账单日</p>
                      <p>{{cardList.BILL_DAY}}</p>
                  </div>
                  <div class='garyChoose smallFont half textCenter'>
                      <p class='garyImp'>还款日</p>
                      <p>{{cardList.REPAYMENT_DAY}}</p>
                  </div>
            </div>
      </div>
    </div>
    <div style='height: 18.9rem;overflow: auto;'>
      <ul style="margin-left:0;margin-right:0;width:100%;box-sizing:border-box;" @click="toInfo(item)" class='planContent exhaustiveContent' v-for='item in listMore' :key='item.ID'>
          <li class='allFlex justifyBetween flexPadding'>
              <div>
              <span class='gary'>
                  创建时间：
              </span>
              {{$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm:ss')}}
              </div>
              <div>
              <span :class="item.STATUS === '10D' ? 'redColor': ''">{{status[item.STATUS]}}</span>
              </div>
          </li>
          <li class='allFlex justifyBetween flexPadding'>
              <div>
              <span class='gary'>
                  计划周期：
              </span>
              {{$moment(item.START_TIME.time).format('YYYY-MM-DD')}}至{{$moment(item.END_TIME.time).format('YYYY-MM-DD')}}
              </div>
          </li>
          <li class='allFlex justifyBetween flexPadding'>
              <div>
              <span class='gary'>
                  本期应还：
              </span>
              ￥{{item.PLAN_AMT}}
              </div>
              <div>
              <span class='gary'>
                  本期已还：
              </span>
              ￥{{item.payed}}
              </div>
          </li>
          <li class='allFlex justifyBetween flexPadding'>
              <div class='allFlex'>
                  <el-progress class='prssMax' color='#2161E7' :show-text='false' :text-inside="true" :stroke-width="12" :percentage="parseInt((item.payed/item.PLAN_AMT)*100)>100? 100 : parseInt((item.payed/item.PLAN_AMT)*100)"></el-progress>
                  <span>{{parseInt((item.payed/item.PLAN_AMT)*100)>100? 100 : parseInt((item.payed/item.PLAN_AMT)*100)}}%</span>
              </div>
              <div>
                  <span  class='examine'>计划详情</span>
              </div>
          </li>
      </ul>
    </div> -->
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
        '37': this.$route.query.type,
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

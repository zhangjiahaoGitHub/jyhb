<template>
  <div class='hundred submit-layout'>
    <div class="aisle-layout">
      <div class="cardDiv">
        <div>
          <div>
            <p><img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardList.short_cn_name}}</p>
            <span>{{cardList.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4,cardList.BANK_ACCOUNT.length)}}</span>
          </div>
          <ul>
            <li>
              <p>额度</p>
              <span>{{cardList.LIMIT_MONEY}}</span>
            </li>
            <li>
              <p>账单日</p>
              <span>{{cardList.BILL_DAY}}</span>
            </li>
            <li>
              <p>还款日</p>
              <span>{{cardList.REPAYMENT_DAY}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="contentDiv">
      <li v-if="acqcodeArr.length<1"><span>通道名称：</span><p>{{acqcodeObj.channelName}}</p></li>
      <li v-else><span>通道名称：</span><p>{{tdName.join(',')}}</p></li>
      <li><span>还款金额：</span><p>{{money}}</p></li>
      <li><span>还款周期：</span><p>{{searchTime}}至{{endTime}}</p></li>
      <li v-if="tong=='YK' || tong=='JYK'"><span>日还款笔数：</span><p>{{hkbs}}笔</p></li>
      <li v-if="tong=='YK' || tong=='JYK'"><span>周转金：</span><p>{{calcList[40]}}</p></li>
      <li><span>还款手续费：</span><p>{{calcList[9]}}</p></li>
      <li><span>还款笔数费：</span><p>{{calcList[7]}}</p></li>
      <li v-if="tong=='YK' || tong=='JYK'"><span>周转金总额：</span><p>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</p></li>
      <li v-if="tong=='QYK'"><span>手续费小计：</span><p>{{calcList[41]}}</p></li>
      <li><span>消费地区：</span><p>{{area}}</p></li>
      <div>
        <p @click="$router.push({name: 'preview', query: { acqcodeObj: $route.query.acqcodeObj,acqcodeArr: $route.query.acqcodeArr, children: $route.query.children, money: money, searchTime: searchTime, endTime: endTime, hkbs: hkbs, tong: tong, area: $route.query.area,merchantNo: $route.query.merchantNo }})">预览计划</p>
        <p @click="$router.back()">修改计划</p>
      </div>
    </ul>
    <div class="btnDiv">
      <div @click="zhqr=true">提交计划</div>
    </div>
    <div @click="zhqr=false" v-if="zhqr" class="zhqr">
      <div>
        <div>温馨提示</div>
        <p>我已经确保卡内可用余额大于</p>
        <span>{{tong=='QYK' ? calcList[17]:(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
        <div>
          <p @click.stop="$router.back()">修改计划</p>
          <p @click.stop="(tong == 'YK' || tong=='JYK') ? toYK():toQYK()">提交计划</p>
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
      agentNo: '',
      merchantNo: '',
      cardList: [],
      acqcodeObj: {},
      acqcodeArr: [],
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
      now: -1,
      calcList: [],
      searchTime: '',
      endTime: '',
      hkbs: '',
      xhms: '',
      money: 0,
      planItem: '',
      fullscreenLoading: false,
      zhqr: false,
      area: '',
      zhou: 0,
      shou: 0,
      tdName: [],
      tdCode: [],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    if (this.$route.query.merchantNo) {
      this.merchantNo = this.$route.query.merchantNo
    }else{
      this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    }
    this.searchTime = this.$route.query.searchTime
    this.endTime = this.$route.query.endTime
    this.calcList = this.$stact.state.allSb.calcList
    console.log(this.calcList);
    this.zhou = Math.floor(Number(this.calcList[40]) * 100 + Number(this.calcList[9]) * 100 + Number(this.calcList[7]) * 100) / 100
    this.shou = Math.floor(Number(this.calcList[9]) * 100 + Number(this.calcList[7]) * 100) / 100
    this.hkbs = this.$route.query.hkbs
    this.xhms = this.$route.query.xhms
    this.money = this.$route.query.money
    this.planItem = this.$stact.state.planItem
    this.cardList = this.$stact.state.allSb.cardList
    this.area = this.$route.query.area
    this.tong = this.$route.query.tong
    this.children = this.$route.query.children
    // arr为多通道YK
    if (this.$route.query.acqcodeObj) {
      this.acqcodeObj = JSON.parse(this.$route.query.acqcodeObj)
      this.merchantList()
    }else{
      this.acqcodeArr = JSON.parse(this.$route.query.acqcodeArr)
      this.acqcodeArr.forEach(item => {
        this.tdName.push(item.channelName)
        this.tdCode.push(item.acqcode)
      });
    }
  },
  methods: {
    merchantList () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.cardList.ID,
        '31': vm.children[0],
        '32': vm.children[1],
        '33': vm.$route.query.acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            // JSON.parse(res.data[38])[Math.floor(Math.random() * JSON.parse(res.data[38]).length)].acqMerchantName
            let cityCray = {}
            vm.planItem.map((x, i) => {
              cityCray = JSON.parse(res.data[38])[Math.floor(Math.random() * JSON.parse(res.data[38]).length)]
              x.cityindustryName = cityCray.acqMerchantName
              x.cityindustry = cityCray.acqMerchantNo
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    toYK () {
      let planArr = []
      this.planItem.forEach(item => {
        planArr.push(`{planTime=${item.planTime}, fromCard='${item.fromCard}', toCard='${item.toCard}', fromBindId='${item.fromBindId}', toBindId='${item.toBindId}', fromMoney=${item.fromMoney}, toMoney=${item.toMoney}, payFee=${item.payFee}, status='${item.status}', type='${item.type}', groupNum='${item.groupNum}', customizecity='${item.customizecity}', cityindustry='${item.cityindustry}', cityindustryName='${item.cityindustryName}', acqCode='${item.acqCode}'}`)
      });
      let vm = this
      let parmas = {}
      if (this.acqcodeArr.length<1) {
        parmas = {
          '0': '0700',
          '3': '190210',
          '8': vm.money,
          '9': vm.calcList[40],
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '14': vm.hkbs,
          '16': '2',
          '37': '10A',
          '42': vm.merchantNo,
          '43': vm.acqcodeObj.acqcode,
          '44': vm.acqcodeObj.channelName,
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
        if (this.tong=='JYK') {
          parmas[29] = 'JYK'
          parmas[37] = '10C'
        }
      }else{
        parmas = {
          '0': '0700',
          '3': '190210',
          '8': vm.money,
          '9': vm.calcList[40],
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '14': vm.hkbs,
          '16': '2',
          '37': '10A',
          '42': vm.merchantNo,
          '43': this.tdCode.join(','),
          '44': this.tdName.join(','),
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.fullscreenLoading = true
      vm.$http.post('request.app', url)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '提交成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            if (this.$route.query.merchantNo!=JSON.parse(this.$stact.state.token)[0].merchantNo) {
              this.$router.push({name: 'viewPlan'})
            }else{
              vm.$router.push({ name: 'selectcard',query:{aisle: 'YK'} })
            }
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
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    toQYK () {
      let vm = this
      // vm.$confirm('我公司接入人民银行征信系统，网络小额贷款黑名单，支付宝黑名单等多种风控体系。公司将定期将不守信的用户上送各大征信平台。', '提示', {
      //   confirmButtonText: '我会守信',
      //   cancelButtonText: '我不会守信',
      //   type: 'warning'
      // }).then(() => {
        let planArr = []
        this.planItem.forEach(item => {
          planArr.push(`{planTime=${item.planTime}, fromCard='${item.fromCard}', toCard='${item.toCard}', fromBindId='${item.fromBindId}', toBindId='${item.toBindId}', fromMoney=${item.fromMoney}, toMoney=${item.toMoney}, payFee=${item.payFee}, status='${item.status}', type='${item.type}', groupNum='${item.groupNum}', customizecity='${item.customizecity}', cityindustry='${item.cityindustry}', cityindustryName='${item.cityindustryName}', acqCode='${item.acqCode}'}`)
        });
        let parmas = {
          '0': '0700',
          '3': '390049',
          '8': vm.money,
          '9': '0',
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '37': '10B',
          '42': vm.merchantNo,
          '43': vm.acqcodeObj.acqcode,
          '44': vm.acqcodeObj.channelName,
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
        vm.$route.query.couponId ? parmas : delete parmas['15']
        let url = vm.$mdata.mdGet(parmas)
        vm.fullscreenLoading = true
        vm.$http.post('request.app', url)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$message({
                message: '提交成功',
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
              if (this.$route.query.merchantNo!=JSON.parse(this.$stact.state.token)[0].merchantNo) {
                this.$router.push({name: 'viewPlan'})
              }else{
                vm.$router.push({ name: 'selectcard',query: {aisle: 'QYK'} })
              }
            } else {
              vm.$message({
                message: res.data.msg,
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            }
          })
          .catch(err => {
            vm.fullscreenLoading = false
            console.log(err)
          })
      // }).catch(() => {
      // })
    }
  }
}
</script>

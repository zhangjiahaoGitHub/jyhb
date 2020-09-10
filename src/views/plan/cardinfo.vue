<template>
  <div class="hundred cardinfo-layout">
    <ul>
      <li>
        <span>银行名称：</span>
        <p>{{bankName}}</p>
      </li>
      <li>
        <span>银行卡号：</span>
        <p>{{cardNum}}</p>
      </li>
      <li>
        <span>开户姓名：</span>
        <p>{{name}}</p>
      </li>
      <li>
        <span>预留手机：</span>
        <p>{{phone}}</p>
      </li>
      <li>
        <span>身份证号：</span>
        <p>{{idCard}}</p>
      </li>
      <li>
        <span>信用额度：</span>
        <p>{{money}}</p>
      </li>
      <li>
        <span>账单日期：</span>
        <p>{{billDay}}</p>
      </li>
      <li>
        <span>还款日期：</span>
        <p>{{repDay}}</p>
      </li>
      <li>
        <span>卡有效期：</span>
        <p>{{expiration}}</p>
      </li>
      <li>
        <span>cvv2码：</span>
        <p>{{cvn}}</p>
      </li>
    </ul>
    <ol>
      <li>
        <span>信用额度：</span>
        <input type="number" v-model="xyed">
      </li>
      <li>
        <span>账单日期：</span>
        <input type="number" v-model="zdrq">
      </li>
      <li>
        <span>还款日期：</span>
        <input type="number" v-model="hkrq">
      </li>
    </ol>
    <div class="btnDiv">
      <div @click="confirm">确认修改</div>
    </div>
    <!-- <p><img :src="banks[bankCode]?require(`../../assets/bank/${banks[bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">{{bankName}} （{{cardNum.substring(0,3)}}****{{cardNum.substring(cardNum.length-4,cardNum.length)}}）</p>
    <ul>
      <li>
        <span>持卡人姓名</span>
        <input type="text" disabled placeholder="个人信息将严格保密" v-model="name">
      </li>
      <li>
        <span>证件类型</span>
        <input type="text" placeholder="身份证" disabled>
      </li>
      <li>
        <span>证件号</span>
        <input type="text" disabled v-model="idCard">
      </li>
    </ul>
    <ul>
      <li>
        <span>CVN</span>
        <input type="text" disabled placeholder="卡背面后3位" v-model="cvn">
      </li>
      <li>
        <span>卡片额度</span>
        <input type="number" placeholder="输入信用卡额度" v-model="money">
      </li>
      <li>
        <span>账单日</span>
        <input type="number" placeholder="输入账单日(如：5)" v-model="billDay">
      </li>
      <li>
        <span>还款日</span>
        <input type="number" placeholder="输入还款日(如：20)" v-model="repDay">
      </li>
      <li>
        <span>有效期</span>
        <input type="text" disabled placeholder="MM/YY输入MMYY" v-model="expiration">
      </li>
      <li>
        <span>预留手机</span>
        <input type="text" disabled placeholder="请输入银行预留手机号" v-model="phone">
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="confirm">确认修改</div>
    </div>
    <span>温馨提示：信息已加密，仅用于银行验证</span> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      name: '',
      cardNum: '',
      bankId: '',
      bankCode: '',
      bankName: '',
      idCard: '',
      cvn: '',
      money: '',
      billDay: '',
      repDay: '',
      expiration: '',
      phone: '',
    }
  },
  created () {
    console.log(JSON.parse(this.$route.query.item));
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.name = JSON.parse(this.$route.query.item).BANK_ACCOUNT_NAME
    this.cardNum = JSON.parse(this.$route.query.item).BANK_ACCOUNT
    this.bankId = JSON.parse(this.$route.query.item).ID
    this.bankCode = JSON.parse(this.$route.query.item).BANK_NAME
    this.bankName = JSON.parse(this.$route.query.item).short_cn_name
    this.money = JSON.parse(this.$route.query.item).LIMIT_MONEY
    this.xyed = JSON.parse(this.$route.query.item).LIMIT_MONEY
    this.billDay = JSON.parse(this.$route.query.item).BILL_DAY
    this.zdrq = JSON.parse(this.$route.query.item).BILL_DAY
    this.repDay = JSON.parse(this.$route.query.item).REPAYMENT_DAY
    this.hkrq = JSON.parse(this.$route.query.item).REPAYMENT_DAY
    this.idCard = JSON.parse(this.$route.query.item).ID_CARD_NUMBER
    this.cvn = JSON.parse(this.$route.query.item).cvn
    this.expiration = JSON.parse(this.$route.query.item).expdate
    this.phone = JSON.parse(this.$route.query.item).BANK_PHONE
  },
  methods: {
    confirm () {
      let vm = this
      if (this.xyed.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入信用卡额度',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.zdrq.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入账单日期',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (Number(this.zdrq) < 1|| Number(this.zdrq) > 31) {
        this.$message({
          message: '账单日期1~31号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.hkrq.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入还款日期',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (Number(this.hkrq) < 1 || Number(this.hkrq) > 31) {
        this.$message({
          message: '还款日期1~31号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '690101',
        '41': vm.xyed,
        '42': JSON.parse(this.$route.query.item).ID,
        '43': vm.zdrq,
        '44': vm.hkrq,
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$router.go(-2)
            vm.$message({
              message: '修改成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          vm.fullscreenLoading = false
        })
    },
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690013',
        '15': vm.cardNum,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.bankName = JSON.parse(res.data[16]).shortCnName
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<template>
  <div class="hundred addcard-layout">
    <ul>
      <li>
        <span>姓名</span>
        <p>{{name}}</p>
      </li>
      <li>
        <span>卡号</span>
        <input type="number" placeholder="请输入本人信用卡卡号" v-model="cardNum">
      </li>
      <li>
        <span>所属银行</span>
        <input type="text" placeholder="根据银行卡号自动识别" readonly v-model="bankName">
      </li>
      <li>
        <span>额度</span>
        <input type="number" placeholder="请输入信用卡额度" v-model="money">
      </li>
    </ul>
    <p><span></span>附加信息</p>
    <ul>
      <li>
        <span>账单日</span>
        <input type="number" placeholder="请输入账单日" v-model="billDay">
      </li>
      <li>
        <span>还款日</span>
        <input type="number" placeholder="请输入还款日" v-model="repDay">
      </li>
      <li style="padding:0.2rem 0;">
        <span>有效期<i @click="type='yxq'" class="el-icon-warning-outline"></i></span>
        <el-date-picker
          v-model="expiration"
          format='MM/yy'
          value-format='MMyy'
          size="mini"
          type="month"
          placeholder="请选择有效期">
        </el-date-picker>
      </li>
      <li>
        <span>CVV2码<i @click="type='cvv'" class="el-icon-warning-outline"></i></span>
        <input type="text" placeholder="卡片背面末尾三位数" v-model="cvn">
      </li>
      <li>
        <span>手机号</span>
        <input type="number" placeholder="请输入银行预留手机号" v-model="phone">
      </li>
    </ul>
    <div v-if="promptShow" class="promptDiv">
      <div>
        <h3>信用卡认证注意事项</h3>
        <div class="contentDiv">
          <p>一.以下卡种暂不支持代还</p>
          <p>1.外汇卡，双币卡</p>
          <p>2.二合一卡(二合一卡指的是同时拥有储蓄，以及信用卡功能的卡)如中信二合一卡，这类卡不支持代还</p>
          <p>3.特殊卡种：指稀有卡，不在市面上大范围流通的卡种，如奋斗卡；</p>
          <p>4.部分区域性地方银行暂不支持。请确认该信用卡为支持卡种，再予以认证，否则会导致信用卡认证失败</p>
        </div>
        <div class="contentDiv">
          <p>二.请务必准确填写认证信用卡相关信息，所填手机号为该信用卡在银行预留手机号！</p>
        </div>
        <div class="promptBtnDiv">
          <div @click="$router.back()">取消</div>
          <div @click="promptShow=false">确定</div>
        </div>
      </div>
    </div>
    <div class="btnDiv">
      <div @click="confirm">确定</div>
    </div>
    <div @click="type=''" v-if="type=='yxq' || type=='cvv'" class="popDiv">
      <img v-if="type=='yxq'" src="../../assets/yxq.png" alt="">
      <img v-else src="../../assets/cvv.png" alt="">
    </div>
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
      promptShow: true,
      type: '',
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
    this.name = JSON.parse(this.$stact.state.token)[0].bankAccountName
    // this.cardNum = this.$route.query.cardNum
    // this.bankId = this.$route.query.bankId
    // this.bankCode = this.$route.query.bankCode
    // this.bankName = this.$route.query.shortCnName
    // this.idCard = JSON.parse(this.$stact.state.token)[0].idCardNumber
  },
  watch: {
    cardNum (n, o) {
      if (this.cardNum.length >= 13 && this.cardNum.length <= 19) {
        this.cardName()
      }
    }
  },
  methods: {
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690013',
        '15': vm.cardNum,
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            console.log(JSON.parse(res.data[16]));
            this.bankId = JSON.parse(res.data[16]).bankId
            this.bankCode = JSON.parse(res.data[16]).bankCode
            this.bankName = JSON.parse(res.data[16]).shortCnName
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirm () {
      let vm = this
      console.log(Number(this.billDay) < 0 || Number(this.billDay) > 31)
      if (this.cardNum.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入信用卡卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.bankName.match(/^[ ]*$/)) {
        this.$message({
          message: '银行名称必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.money.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入信用卡额度',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.billDay.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入账单日期',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (Number(this.billDay) < 1|| Number(this.billDay) > 31) {
        this.$message({
          message: '账单日期1~31号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.repDay.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入还款日期',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (Number(this.repDay) < 1 || Number(this.repDay) > 31) {
        this.$message({
          message: '还款日期1~31号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.expiration.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入有效期',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.cvn.match(/^[ ]*$/)) {
        this.$message({
          message: '输入CVV2码',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.cvn.length!=3) {
        this.$message({
          message: 'CVV2码应为3位',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '490008',
        '5': vm.money,
        '6': Number(vm.billDay),
        '7': Number(vm.repDay),
        '37': 0,
        '42': JSON.parse(this.$stact.state.token)[0].idCardNumber,
        '43': JSON.parse(this.$stact.state.token)[0].id,
        '45': vm.cardNum,
        '46': vm.phone,
        '47': vm.expiration,
        '48': vm.cvn.trim(),
        '49': 'A',
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$router.back()
            vm.$message({
              message: '绑定成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            // vm.$router.push({ name: 'ifarme', query: { url: res.data[38], title: '通道绑卡' } })
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            if (res.data[39] === '签约成功,重复签约') {
              vm.$router.go(-1)
            }
          }
        })
        .catch(err => {
          console.log(err)
          vm.fullscreenLoading = false
        })
    }
  }
}
</script>

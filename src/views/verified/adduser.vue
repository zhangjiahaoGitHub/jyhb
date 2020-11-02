<template>
  <div class="hundred adduser-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li>
        <span>姓名</span>
        <input type="text" placeholder="请输入客户姓名" v-model="name">
      </li>
      <li>
        <span>身份证号</span>
        <input type="text" placeholder="请输入身份证号码" v-model="idcard">
      </li>
      <li>
        <span>手机号</span>
        <input type="number" placeholder="请输入银行预留手机号" v-model="phone">
      </li>
      <li>
        <span>卡号</span>
        <input type="number" placeholder="请输入储蓄卡号" v-model="cardNum">
      </li>
      <li>
        <span>银行名称</span>
        <input type="text" placeholder="输入卡号自动识别" readonly v-model="bankName">
      </li>
      <li>
        <span>预留还款小额费率</span>
        <input type="number" placeholder="请输入0.75-1的数值" v-model="ylMin">
      </li>
      <li>
        <span>预留还款大额费率</span>
        <input type="number" placeholder="请输入0.85-1的数值" v-model="ylMax">
      </li>
      <li>
        <span>全额还款小额费率</span>
        <input type="number" placeholder="请输入1.15-2的数值" v-model="qeMin">
      </li>
      <li>
        <span>全额还款大额费率</span>
        <input type="number" placeholder="请输入1.15-2的数值" v-model="qeMax">
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="confirm">下一步</div>
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
      cardNum: '', // 银行卡卡号
      item: {},
      type: '',
      name: '', // 姓名
      identity: '',
      phone: '', // 手机号
      fullscreenLoading: false,
      card: [],
      idcard: '', // 身份证号
      merchantId: '',
      bankName: '', // 银行名称
      bankmessage: '',
      bankCode: '', // 银行code
      ylMin: '',
      ylMax: '',
      qeMin: '',
      qeMax: '',
    }
  },
  watch: {
    cardNum (n, o) {
      console.log(n)
      console.log(o)
      if (this.cardNum.length >= 13 && this.cardNum.length <= 19) {
        this.cardName()
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.identity = JSON.parse(this.$stact.state.token)[0].idCardNumber
    if (this.$route.query.item) {
      this.item = JSON.parse(this.$route.query.item)
      this.name = this.item.MERCHANT_CN_NAME
      this.idcard = this.item.ID_CARD_NUMBER
      this.cardNum = this.item.BANK_ACCOUNT
      this.phone = this.item.PHONE
      this.ylMin = this.item.YK_SMALL_RATE
      this.ylMax = this.item.YK_BIG_RATE
      this.qeMin = this.item.QYK_SMALL_RATE
      this.qeMax = this.item.QYK_BIG_RATE
      console.log(this.item);
    }
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    confirm () {
      let vm = this
      // 姓名
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '姓名必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // 身份证号
      if (this.idcard.match(/^[ ]*$/)) {
        this.$message({
          message: '您的身份证号必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regIdNo.test(vm.idcard)) {
        this.$message({
          message: '您的身份证号填写有误',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // 手机号码
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
      // 银行卡卡号
      if (this.cardNum.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入银行卡卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // 银行名称
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
      if (this.ylMin<0.75 || this.ylMin>1) {
        this.$message({
          message: '预留还款小额费率限制范围0.75-1',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.ylMax<0.85 || this.ylMax>1) {
        this.$message({
          message: '预留还款大额费率限制范围0.85-1',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.qeMin<1.15 || this.qeMin>2) {
        this.$message({
          message: '全额还款小额费率限制范围1.15-2',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.qeMax<1.15 || this.qeMax>2) {
        this.$message({
          message: '全额还款小额费率限制范围1.15-2',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700', // 必须
        '1': vm.phone, // 手机号
        '3': '190939', // 接口
        '8': vm.idcard, // 身份证号
        '10': vm.name, // 姓名
        '11': vm.cardNum, // 银行卡号
        '12': vm.bankName, // 银行名称
        '13': vm.bankCode, // 银行code
        '14': vm.ylMin,
        '15': vm.qeMin,
        '16': vm.ylMax,
        '17': vm.qeMax,
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo, // 商户编号
        '59': vm.version
      }
      if (this.$route.query.item) {
        parmas[43] = this.item.MERCHANT_NO
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$router.replace({
              name: 'adduserreal',
              query: {
                merchantNo: res.data[38],
              }
            })
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
            vm.bankmessage = res.data
            vm.bankName = JSON.parse(res.data[16]).shortCnName
            vm.bankCode = JSON.parse(res.data[16]).bankCode
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

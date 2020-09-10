<template>
  <div class="hundred adduser-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <h6>请填写基本信息</h6>
    <ul>
      <li>
        <span>真实姓名</span>
        <input type="text" placeholder="请输入客户姓名" v-model="name">
      </li>
      <li>
        <span>身份证号</span>
        <input type="text" placeholder="请输入客户身份证号码" v-model="idcard">
      </li>
    </ul>
    <ul>
      <li>
        <span>银行卡号</span>
        <input type="number" placeholder="请输入储蓄卡号" v-model="cardNum">
      </li>
      <li>
        <span>所属银行</span>
        <input type="text" placeholder="所属银行自动获取" v-model="bankName">
      </li>
      <li>
        <span>预留手机</span>
        <input type="number" placeholder="请输入银行预留手机号" v-model="phone">
      </li>
    </ul>
    <p>*注：已在本平台注册的用户，无法使用中介还款</p>
    <div class="btnDiv" @click='confirm()'>
        下一步
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
      name: '', // 姓名
      identity: '',
      cvn: '',
      expiration: '',
      phone: '', // 手机号
      fullscreenLoading: false,
      card: [],
      idcard: '', // 身份证号
      time: 0,
      aisle: 0,
      category: 0,
      merchantId: '',
      money: '',
      billDay: '',
      repDay: '',
      cardhead: '',
      bankName: '', // 银行名称
      bankmessage: '',
      bankCode: '' // 银行code
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
    console.log(JSON.parse(this.$stact.state.token)[0]);
    
    this.version = this.$stact.state.version
    // this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.merchantId = JSON.parse(this.$stact.state.token)[0].id
    this.identity = JSON.parse(this.$stact.state.token)[0].idCardNumber
    // this.name = JSON.parse(this.$stact.state.token)[0].merchantCnName
    // this.phone = JSON.parse(this.$stact.state.token)[0].phone
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
      let parmas = {
        '0': '0700', // 必须
        '1': vm.phone, // 手机号
        '3': '390011', // 接口
        '8': vm.idcard, // 身份证号
        '10': vm.name, // 姓名
        '11': vm.cardNum, // 银行卡号
        '12': vm.bankName, // 银行名称
        '13': vm.bankCode, // 银行code
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo, // 商户编号
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.$router.push({
              name: 'adduserreal',
              query: {
                merchantId: res.data[37],
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

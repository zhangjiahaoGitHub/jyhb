<template>
  <div class='hundred tiedcard-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li>
        <input type="number" placeholder="请输入本人信用卡卡号" v-model='cardNum'>
      </li>
      <li>
        <input type="text" placeholder='姓名' v-model='name'>
      </li>
      <li>
        <input type="text" v-model='identity'>
      </li>
      <li>
        <input type="number" placeholder='有效期(如:0523)' v-model='expiration'><i @click="()=>{this.popShow = true;this.titleImg = 'yxq'}" class="el-icon-info"></i>
      </li>
      <li>
        <input type="number" placeholder='输入CVV2码（卡背后最后三位数）' v-model='cvn'><i @click="()=>{this.popShow = true;this.titleImg = 'cvv'}" class="el-icon-info"></i>
      </li>
      <li>
        <input type="number" placeholder='请输入预留手机号' v-model='phone'>
      </li>
    </ul>
    <div class="btnDiv" @click='confirm()'>
      确定
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <img :src="require(`../../assets/${titleImg}.png`)" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      popShow: false,
      titleImg: 'yxq',
      version: '',
      agentNo: '',
      merchantNo: '',
      cardNum: '',
      name: '',
      identity: '',
      cvn: '',
      expiration: '',
      phone: '',
      fullscreenLoading: false,
      card: [],
      text: '获取验证码',
      code: '',
      time: 0,
      acqcode: 0,
      merchantId: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.merchantId = JSON.parse(this.$stact.state.token)[0].id
    this.card = JSON.parse(this.$route.query.item)
    this.cardNum = this.card.BANK_ACCOUNT
    this.name = this.card.BANK_ACCOUNT_NAME
    this.identity = this.card.ID_CARD_NUMBER.toString()
    console.log(this.card)
    this.cvn = this.card.cvn
    this.expiration = this.card.expdate
    this.phone = this.card.BANK_PHONE
    this.acqcode = this.$route.query.acqcode
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    getCode () { // 获取验证码
      let vm = this
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '3': '190919',
        '5': '1',
        '44': vm.agentNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '发送成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.sendMail()
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
          vm.fullscreenLoading = false
        })
    },
    sendMail () { // 倒计时
      this.time = 60
      this.timer()
    },
    timer () { // 倒计时中
      if (this.time > 0) {
        this.text = `${this.time--}S后可重发`
        setTimeout(this.timer, 1000)
      } else {
        this.text = '重新获取'
      }
    },
    confirm () {
      let vm = this
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
      console.log(vm.card)
      let parmas = {
        '0': '0700',
        '3': '490008',
        '5': vm.card.LIMIT_MONEY,
        '6': vm.card.BILL_DAY,
        '7': vm.card.REPAYMENT_DAY,
        // '31': 0,
        '37': vm.card.ID,
        '42': vm.identity,
        '43': vm.merchantId,
        '45': vm.cardNum,
        '46': vm.phone,
        '47': vm.expiration,
        '48': vm.cvn,
        '49': vm.acqcode,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            if (res.data[38] === '00') {
              vm.$message({
                message: '绑卡成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
              sessionStorage.setItem('tdkt',true)
              vm.$router.go(-1)
            }else{
              vm.$message({
                message: '绑卡',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
              vm.$router.replace({ name: 'ifarme', query: { url: res.data[38], title: '通道绑卡' } })
            }
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'warning'
            })
            if (res.data[39] === '签约成功,重复签约') {
              sessionStorage.setItem('tdkt',true)
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

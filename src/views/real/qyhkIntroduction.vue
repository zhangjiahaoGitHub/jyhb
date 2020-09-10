<template>
  <div class="hundred qyhkIntroduction-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <img src="../../assets/qyBg.png" alt="">
    <h3>企业还款介绍</h3>
    <p>企业或者个人可以申请企业还款，企业还款功能开通后，可绑定他人信用卡，为他人制定还款计划，还款计划制定后，他人卡片按普通用户费率收取，其中会与企业本人身份所得到的费率产生一定的差额，差额将以利润的方式发放到企业本人账户中，不同企业等级的费率也有所不同，如需开通企业还款功能，请进行申请。</p>
    <div class="btnDiv">
      <div @click="()=>{this.$router.push({name:'open'})}">
        立即申请
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
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>

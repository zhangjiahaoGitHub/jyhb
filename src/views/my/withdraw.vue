<template>
  <div class='hundred withdraw-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <p class="titleP"><span></span>提现到银行卡</p>
    <div class="cardDiv">
        <img :src="banks[bankCode]?require(`../../assets/bank/${banks[bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">
        <div>
          <p>{{bankName}}</p>
          <p>尾号{{bankCard.substring(bankCard.length-4,bankCard.length)}}储蓄卡</p>
        </div>
    </div>
    <div class="iptDiv">
      <span>提现金额</span>
      <div>
        ￥<input type="number" placeholder="请输入提现金额" v-model="money">
      </div>
    </div>
    <div class="makeDiv">
      <p>账户余额：{{ktx}}元</p>
      <span @click="money = ktx">全部提现</span>
    </div>
    <p class="zhu">注：100元起提，最高5万，单笔2元</p>
    <div class="btnDiv">
      <div @click="getMoney">立即提现</div>
    </div>
    <!-- <div class="cardDiv">
      <div>
        <img :src="banks[bankCode]?require(`../../assets/bank/${banks[bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">
        {{bankName}}({{bankCard.substring(0,3)}}****{{bankCard.substring(bankCard.length-4,bankCard.length)}})
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="makeDiv">
      <p>收款金额</p>
      <p>3元/笔</p>
      <div class="iptDiv">
        ￥<input type="number" 请输入金额 v-model="money">
      </div>
      <div class="titleDiv">
        <div>
          <span>账户余额：{{ktx}}</span>
          <span>工作日9点-17点秒到。非工作日：T+1到账</span>
        </div>
        <span @click="money = ktx">全部提现</span>
      </div>
      <div @click="getMoney" class="btnDiv">
        提现到余额
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      ktx: 0,
      phone: '',
      version: '',
      agentNo: '',
      merchantNo: '',
      money: '',
      bankName: '',
      bankCard: '',
      bankCode: 0,
      statusArr:{
        '10A':'提现受理失败',
        '10B':'提现中',
        '10C':'提现成功',
        '10D':'提现失败',
      },
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
      // true关闭，false开启
      loading: true,
      listArr: [],
      fullscreenLoading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.ktx = this.$route.query.ktx
    this.message()
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.bankName = JSON.parse(this.$stact.state.token)[0].bankDetail
            vm.bankCard = JSON.parse(this.$stact.state.token)[0].bankAccount
            vm.bankCode = JSON.parse(this.$stact.state.token)[0].bankCode
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMoney () {
      if((parseInt(this.money)||0)<100){
        this.$message({
          message: '提现金额少于100',
          type: 'warning'
        });
        return
      }
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190888',
        '5': vm.money,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '提现成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.$router.push({ name: 'income' })
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
    }
  }
}
</script>

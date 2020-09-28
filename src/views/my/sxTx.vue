<template>
  <div class='hundred sxTx-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="信用分充值" name="first">
        <div class="btDiv"></div>
        <div class="content">
          <p>充值金额</p>
          <div>
            ￥<input v-model="czMoney" type="number" name="" id="" placeholder="请输入金额">
          </div>
          <p>账户余额：{{balance}}</p>
        </div>
        <div class="btnDiv" @click="popShow=true">信用分充值</div>
      </el-tab-pane>
      <el-tab-pane label="信用分提现" name="second">
        <div class="btDiv"></div>
        <div class="cardDiv">
          <p>结算卡<img :src="banks[bankCode] ? require(`../../assets/bank/${banks[bankCode]}.png`):require(`../../assets/bank/yl.png`)" alt="">{{bankDetail}}</p>
          <span>尾号{{bankAccount.substring(bankAccount.length-4,bankAccount.length)}}</span>
        </div>
        <div class="planDiv">
          <p>提现金额</p>
          <div>
            ￥<input v-model="txMoney" type="number" name="" id="" placeholder="请输入金额">
          </div>
          <p>账户余额：{{balance}}<span @click="txMoney=balance">全部提现</span></p>
        </div>
        <p>提现手续费：{{team[25]}}元/笔，{{team[26]}}元起提</p>
        <div @click="getMoney" class="btnDiv">信用分提现</div>
      </el-tab-pane>
    </el-tabs>
    <div @click="popShow=false" v-if="popShow" class="czPopDiv">
      <ul @click.stop="">
        <li @click="pay('z')">
          <img src="../../assets/member/zfb.png" alt="">
          支付宝支付
        </li>
        <li @click="pay('w')">
          <img src="../../assets/member/wx.png" alt="">
          微信支付
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      popShow: false,
      balance: 0,
      phone: '',
      version: '',
      agentNo: '',
      merchantNo: '',
      czMoney: '',
      txMoney: '',
      bankDetail: '',
      bankAccount: '',
      bankCode: 0,
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
      fullscreenLoading: false,
      team: {}
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.balance = this.$route.query.balance
    this.message()
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    // 支付
    pay (type) {
      if (type=='w') {
        this.$message({
          message: '暂未开放',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190111',
        '5': this.czMoney*100,
        '8': type,
        '41': 'Q',
        '42': vm.merchantNo,
        // '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$router.push({
              name: 'code',
              query: {
                radio: type,
                money: this.czMoney,
                code: res.data[57],
              }
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    IsMoney () { // 限制
      let vm = this
      let value = vm.money
      value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤,此处控制的是如果没有小数点,首位不能为类似于 01、02的金额
        value = parseFloat(value)
      }
      vm.money = value.toString()
    },
    allGet () {
      this.money = this.team[43]
    },
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
            vm.team = res.data
            console.log(this.team);
            this.bankDetail = JSON.parse(res.data[57])[0].bankDetail
            this.bankAccount = JSON.parse(res.data[57])[0].bankAccount
            this.bankCode = JSON.parse(res.data[57])[0].bankCode
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMoney () {
      let vm = this
      if (vm.txMoney.match(/^[ ]*$/)) {
        vm.$message({
          message: '金额必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '190888',
        '5': vm.txMoney,
        '42': vm.merchantNo,
        '43': '10L',
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
            this.$router.back()
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

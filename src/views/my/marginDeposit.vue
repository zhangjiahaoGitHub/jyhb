<template>
    <div class='hundred marginDeposit-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="choseDiv">
          <p>温馨提示:计划完成后，保证金可提现，工作日秒到，非工作日T+1到账。</p>
          <span>请选择充值金额</span>
          <ul>
            <li @click="choseMoney=index" :class="choseMoney==index ? 'bgBlue':'bgWhite'" v-for="(item,index) in moneyArr" :key="index">
              <em v-if='tj==index'>推荐</em>
              <p>{{item}}元</p>
              <span>空卡单笔限额{{item}}</span>
            </li>
          </ul>
        </div>
        <ol>
          <p>选择付款方式</p>
          <li @click="payType='w'">
            <div>
              <img src="../../assets/my/margin/wx.png" alt="">
              <div>
                <p>微信支付</p>
                <span>安全快捷支付</span>
              </div>
            </div>
            <img :src="payType=='w' ? require('../../assets/my/margin/chose.png'):require('../../assets/my/margin/unChose.png')" alt="">
          </li>
          <li @click="payType='z'">
            <div>
              <img src="../../assets/my/margin/zfb.png" alt="">
              <div>
                <p>支付宝支付</p>
                <span>安全快捷支付</span>
              </div>
            </div>
            <img :src="payType=='z' ? require('../../assets/my/margin/chose.png'):require('../../assets/my/margin/unChose.png')" alt="">
          </li>
        </ol>
        <div class="footDiv">
          <p>合计：￥{{moneyArr[choseMoney]}}.00元</p>
          <div @click="cz">立即付款</div>
        </div>
        <div @click="wxShow=false" v-show="wxShow" class="wxPayDiv">
          <div @click.stop="">
            <div id="qrcodewx"></div>
          </div>
        </div>
    </div>
</template>
<script>
import QRcode from 'qrcodejs2'
export default {
  data () {
    return {
      payType: 'z',
      moneyArr: [300,500,1000,1500,2000,3000,5000],
      choseMoney: 0,
      tj: 1,
      fullscreenLoading: false,
      wxShow: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  methods: {
    qrcode (code) {
      let vm = this
      let qrcode = new QRcode('qrcodewx', {
        width: 200,
        height: 200, // 高度
        text: code // 二维码内容
      })
    },
    cz () {
      if (this.payType=='w') {
        this.$message({
          message: '暂不支持',
          type: 'success'
        });
        return
      }
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190111',
        '5': vm.moneyArr[vm.choseMoney]*100,
        '8': vm.payType,
        '22': `p${vm.choseMoney+1}`,
        '41': 'p',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            // if (this.payType=='w') {
            //   document.querySelector('#qrcodewx').innerHTML=''
            //   this.wxShow=true
            //   this.qrcode(res.data[42])
            // }
            this.$router.push({
              name: 'payForm',
              query: {
                form: res.data[42]
              }
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

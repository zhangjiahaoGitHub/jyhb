<template>
  <div class='hundred payInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <p v-if="djs>0">支付剩余时间：<span v-if="mm>0">{{mm}}分</span><span>{{ss}}秒</span></p>
      <p v-else>订单关闭</p>
    </div>
    <div class="infoDiv">
      <div>{{item.goodsName}}</div>
      <p>
        <span v-if="item.goodsPrice>0">{{item.goodsPrice*item.goodsCount}}元</span>
        <span v-if="item.goodsPrice>0 && item.goodsPoint>0">+</span>
        <span v-if="item.goodsPoint>0">{{item.goodsPoint*item.goodsCount}}积分</span>
      </p>
      <p>订单编号：{{item.goodsId?item.goodsId.substring(0,16):item.id.substring(0,16)}}</p>
    </div>
    <p>选择支付方式:</p>
    <ul>
      <li v-if="item.goodsPrice>0" @click="type='wxpay'">
        <p><img src="../../assets/mall/wx.png" alt="">微信支付</p>
        <img :src="type=='wxpay'?require('../../assets/mall/check.png'):require('../../assets/mall/nocheck.png')" alt="">
      </li>
      <li v-if="item.goodsPrice>0" @click="type='alipay'">
        <p><img src="../../assets/mall/zfb.png" alt="">支付宝支付</p>
        <img :src="type=='alipay'?require('../../assets/mall/check.png'):require('../../assets/mall/nocheck.png')" alt="">
      </li>
      <li v-if="item.goodsPrice>0" @click="type='ye'">
        <p><img src="../../assets/mall/ye.png" alt="">余额支付</p>
        <img :src="type=='ye'?require('../../assets/mall/check.png'):require('../../assets/mall/nocheck.png')" alt="">
      </li>
      <li v-else @click="type='ye'">
        <p><img src="../../assets/mall/ye.png" alt="">积分支付</p>
        <img :src="type=='ye'?require('../../assets/mall/check.png'):require('../../assets/mall/nocheck.png')" alt="">
      </li>
    </ul>
    <div @click="list" class="btnDiv">立即支付</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fullscreenLoading: false,
      listArr: [],
      item: {},
      djs: 0,
      mm: 0,
      ss: 0,
      type: 'ye'
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.item = JSON.parse(this.$route.query.item)
    this.djs = 900-(this.$moment(new Date()).diff(this.$moment(this.item.createTime.time),'seconds'))
    var dsq = setInterval(() => {
      this.mm = Math.floor(this.djs/60)
      this.ss = this.djs%60
      this.djs--
      if (this.djs<1) {
        clearInterval(dsq)
      }
    }, 1000);
    console.log(this.djs);
    console.log(this.item);
  },
  methods: {
    list () {
      let vm = this
      if (this.type=='wxpay' || this.type=='alipay') {
        this.$message({
          message: 'H5暂未开放微信及支付宝支付',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '790104',
        '21': this.item.id,
        '22': JSON.parse(this.$stact.state.token)[0].id,
        '23': this.type,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '支付成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.item.status='10B'
            this.$router.push({
              name: 'orderInfo',
              query:{
                item: JSON.stringify(this.item)
              }
            })
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'warning'
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>

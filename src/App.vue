<template>
  <div id="app">
      <div v-if="$route.meta.bgLeft" class="pageTitle">
        <i @click="goTop" class="el-icon-arrow-left bs"></i>
        {{$route.meta.title}}
        <span @click="$router.push({name:'czjl'})" class="rightCorner" v-if="$route.meta.sxTx">充值记录</span>
        <span @click="$router.push({name:'withdrawRecord'})" class="rightCorner" v-if="$route.meta.retreat">提现记录</span>
        <span @click="$router.push({name:'home'})" class="rightCorner" v-if="$route.query.wkzf">首页</span>
        <span @click="$router.push({name:'adduser'})" class="rightCorner" v-if="$route.meta.userManagement">添加用户</span>
        <span @click="$router.go(-2)" class="rightCorner" v-if="$route.query.title=='通道绑卡'">返回卡包</span>
      </div>
      <div v-else-if="$route.meta.left" class="pageTitle">
        <i @click="goTop" class="el-icon-arrow-left hs"></i>
        {{$route.meta.title}}
      </div>
      <div v-else-if="$route.meta.bgTitle" class="pageTitle">
        {{$route.meta.title}}
      </div>
      <div v-else-if="$route.meta.title" :class="$route.meta.income ?'tranpant pageTitle' : 'pageTitle hs'">
        {{$route.meta.title}}
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- 这里不会被keepalive -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <ul class="allFlex homeBanner" v-if="$route.meta.navShow">
      <router-link tag="li" :to="{name:'home'}">
        <img class="appLogo" :src="routeData=='home'?require('./assets/label/ch.png'):require('./assets/label/h.png')" />
        <p :class="routeData=='home'?'checkColor':''">首页</p>
      </router-link>
      <router-link tag="li" :to="{name:'income'}">
        <img class="appLogo" :src="routeData=='income'?require('./assets/label/chk.png'):require('./assets/label/hk.png')" />
        <p :class="routeData=='income'?'checkColor':''">收益</p>
      </router-link>
      <router-link tag="li" :to="{name:'shareimg'}">
        <img class="appLogo" :src="routeData=='shareimg'?require('./assets/label/csk.png'):require('./assets/label/sk.png')" />
        <p :class="routeData=='shareimg'?'checkColor':''">分享</p>
      </router-link>
      <router-link tag="li" :to="{name:'partnerpage'}">
        <img class="appLogo" :src="routeData=='partnerpage'?require('./assets/label/chb.png'):require('./assets/label/hb.png')" />
        <p :class="routeData=='partnerpage'?'checkColor':''">伙伴</p>
      </router-link>
      <router-link tag="li" :to="{name:'my'}">
        <img class="appLogo" :src="routeData=='my'?require('./assets/label/cmy.png'):require('./assets/label/my.png')" />
        <p :class="routeData=='my'?'checkColor':''">我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

let wx = require('weixin-js-sdk')

export default Vue.extend({
  data () {
    return {
      routeData: '',
      merchantNo: '',
      version: '',
      agentNo: '',
      phone: '',
      freezeStatus: ''
    }
  },
  watch: {
    '$route' (to, from) {
      let vm = (this as any)
      vm.routeData = to.name
      vm.merchantNo = ''
      vm.real = vm.$stact.state.real
      if (to.name === 'ifarme' || to.name === 'htmlIframe') {
        to.meta.title = vm.$route.query.title
        document.title = vm.$route.query.title
        document.body.title = vm.$route.query.title
      }
      if (to.name === 'myshopdetail' || to.name === 'incomeList' || to.name==='imgIframe' || to.name=='cardManagement') {
        to.meta.title = vm.$route.query.title
        document.title = vm.$route.query.title
        document.body.title = vm.$route.query.title
      }
      if (to.name == 'selectcard') {
        if (vm.$route.query.aisle=='QYK') {
          to.meta.title = '空卡还款'
          document.title = '空卡还款'
          document.body.title = '空卡还款'
        }else if(vm.$route.query.aisle=='YK'){
          to.meta.title = '智能还款'
          document.title = '智能还款'
          document.body.title = '智能还款'
        }
      }
      if (to.name == 'collection') {
        if (to.query.aisle=='HB') {
          to.meta.title = '花呗收款'
          document.title = '花呗收款'
          document.body.title = '花呗收款'
        }else{
          to.meta.title = '收款'
          document.title = '收款'
          document.body.title = '收款'
        }
      }
      if (to.name == 'addAddress') {
        if (to.query.type=='edit') {
          to.meta.title = '修改地址'
          document.title = '修改地址'
          document.body.title = '修改地址'
        }else{
          to.meta.title = '新增地址'
          document.title = '新增地址'
          document.body.title = '新增地址'
        }
      }
      if (to.name == 'store') {
          to.meta.title = JSON.parse(vm.$route.query.item).brandBusinessName
          document.title = JSON.parse(vm.$route.query.item).brandBusinessName
          document.body.title = JSON.parse(vm.$route.query.item).brandBusinessName
      }
      if (to.name == 'teamItem') {
          to.meta.title = vm.$route.query.title
          document.title = vm.$route.query.title
          document.body.title = vm.$route.query.title
      }
      if (to.name == 'partnerpage') {
          to.meta.title = ''
          document.title = ''
          document.body.title = ''
      }
      if (to.name == 'helpCenterInfo') {
          to.meta.title = vm.$route.query.title
          document.title = vm.$route.query.title
          document.body.title = vm.$route.query.title
      }
      if (to.name == 'billinquirydetail') {
          to.meta.title = vm.$route.query.title
          document.title = vm.$route.query.title
          document.body.title = vm.$route.query.title
      }
      new Promise((resolve, reject) => { // 判断是否登录 用登录后的token里merchantNo做唯一标示
        vm.$stact.state.token.length !== 0 ? vm.merchantNo = JSON.parse(vm.$stact.state.token)[0].merchantNo : console.log('无')
        resolve()
      }).then(r => {
        if (vm.merchantNo) { // 有无merchantNo的情况下 判断是否在登录页 忘记密码页 还有注册页
          if (vm.routeData === 'login' || vm.routeData === 'forget' || vm.routeData === 'registered') {
            vm.$router.push({ name: 'home' })
          } else {
            vm.freezeStatus = JSON.parse(vm.$stact.state.token)[0].freezeStatus
            if (vm.routeData !== 'real' && vm.routeData !== 'realcard') {
              if (vm.freezeStatus !== '10B') {
                if (vm.real !== 'realSb') {
                  vm.$confirm('尚未实名请先实名？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    vm.$router.push({ name: 'real' })
                  }).catch(() => {
                  })
                }
              }
            }
          }
        } else {
          if (vm.routeData === 'login' || vm.routeData === 'forget' || vm.routeData === 'registered' || vm.routeData === 'ifarme') {
          } else {
            vm.$router.push({ name: 'login' })
          }
        }
      })
        .catch(error => console.log(error))

      // 一卡多还
      if (to.name=='addPlan') {
        if (from.name=='choseCard' || from.name=='choseChannel') {
        }else{
          this.$store.commit('setCardOne', {})
          this.$store.commit('setCardTwo', {})
          this.$store.commit('setCardThree', {})
          this.$store.commit('setPlanOne', {})
          this.$store.commit('setPlanTwo', {})
          this.$store.commit('setPlanThree', {})
        }
      }
    }
  },
  created () {
    let vm = (this as any)
    vm.version = vm.$stact.state.version
    vm.agentNo = vm.$stact.state.agentNo
    // let shurl: string = ''
    // if (vm.$stact.state.token.length !== 0) {
    //   vm.phone = JSON.parse(vm.$stact.state.token)[0].phone
    //   shurl = 'http://yihuan.llyzf.cn/lly-posp-proxy/return/return.html#/registered?invite=' + vm.phone
    // } else {
    //   shurl = 'http://yihuan.llyzf.cn/lly-posp-proxy/return/return.html#/registered'
    // }
    // vm.wxShare(shurl)
  },
  mounted () {
  },
  methods: {
    goTop () {
      if (this.$route.name === 'myorder') {
        this.$router.push({ name: 'onlineshop' })
        return
      }
      if (this.$route.name === 'onlineshop') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'repayment') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'collection') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'emptyrepayment') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.meta.title === '无卡支付' && this.$route.name === 'ifarme') {
        if (this.$route.query.aisle=='HB') {
          this.$router.go(-2)
        }else{
          this.$router.go(-3)
        }
        return
      }
      if (this.$route.name === 'notice') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'opportunityRelease') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'uploadPost') {
        this.$router.push({ name: 'opportunityRelease' })
        return
      }
      if (this.$route.name === 'myRiadelease') {
        this.$router.push({ name: 'uploadPost' })
        return
      }
      if (this.$route.name === 'charitableRelease') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'uploadPostCharitable') {
        this.$router.push({ name: 'charitableRelease' })
        return
      }
      if (this.$route.name === 'myRiadeleaseCharitable') {
        this.$router.push({ name: 'uploadPostCharitable' })
        return
      }
      if (this.$route.name === 'selectcard' && !this.$route.query.khId) {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.name === 'realname') {
        this.$router.push({ name: 'home' })
        return
      }
      if (this.$route.query.title === '操作手册') {
        this.$router.push({ name: 'invite' })
        return
      }
      this.$router.go(-1)
    },
    wxShare (shurl: string) { // 微信分享
      let vm: any = this
      let url = location.href.split('#')[0]
      let parmas = {
        'agentNo': vm.agentNo,
        'url': url,
        'version': vm.version
      }
      let config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
      const root = process.env.NODE_ENV === 'production' ? 'http://yihuan.llyzf.cn/lly-posp-proxy/' : '/apis'
      axios.post(`${root}app/getWxJs.app`, parmas, config)
        .then((res: any) => {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          try {
            wx.ready(function () {
              wx.onMenuShareAppMessage({
                title: '一还', // 分享标题
                desc: '一还', // 分享描述
                link: shurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://yihuan.llyzf.cn/lly-posp-proxy/one.png' // 分享图标
              }, function (res: any) {
              })
              wx.onMenuShareTimeline({
                title: '一还', // 分享标题
                link: shurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://yihuan.llyzf.cn/lly-posp-proxy/one.png', // 分享图标
                success: function (res: any) {
                }
              })
              wx.onMenuShareQQ({
                title: '一还', // 分享标题
                desc: '一还', // 分享描述
                link: shurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://yihuan.llyzf.cn/lly-posp-proxy/one.png' // 分享图标
              }, function (res: any) {
              })
            })
          } catch (e) {
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }
})
</script>
<style lang="scss">
</style>

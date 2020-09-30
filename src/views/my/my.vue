<template>
  <div class='hundred my-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="txDiv">
      <img @click="$router.push({name:'personalInfo'})" :src="imageUrl ? imageUrl : require('../../assets/head.png')" alt="">
      <div>
        <p>{{userName}}</p>
        <p>{{phone.substring(0,3)}}****{{phone.substring(phone.length-4,phone.length)}}</p>
      </div>
    </div>
    <ol>
      <li>
        <span>{{zhye}}</span>
        <p>账户余额（元）</p>
      </li>
      <div></div>
      <li>
        <span>{{xyf}}</span>
        <p>我的信用分</p>
      </li>
    </ol>
    <div class="planDiv">
      <div class="hyDiv">
        <div>
          <div>
            <span>我的权益</span>
            <p>{{levelObj[level]}}</p>
          </div>
          <p @click="$router.push({name:'upgrade',query:{level:level}})">立即升级</p>
        </div>
      </div>
      <div class="itemDiv">
        <p>鲸鹰专区</p>
        <ul>
          <li @click="toReal"><img src="../../assets/my/smrz.png" alt=""><p>实名认证</p></li>
          <li @click="toWdkb"><img src="../../assets/my/wdkb.png" alt=""><p>我的卡包</p></li>
          <li @click="toXyf"><img src="../../assets/my/wdxyf.png" alt=""><p>我的信用分</p></li>
          <li @click="$router.push({name:'hkjh'})"><img src="../../assets/my/hkjh.png" alt=""><p>还款计划</p></li>
          <li @click="$router.push({name:'transactionRecord'})"><img src="../../assets/my/jyjl.png" alt=""><p>交易记录</p></li>
          <li @click="toSqs"><img src="../../assets/my/sqs.png" alt=""><p>授权书</p></li>
          <li @click="$router.push({name:'inComeList'})"><img src="../../assets/my/syjl.png" alt=""><p>收益记录</p></li>
          <li @click="toWdqb"><img src="../../assets/my/wdqb.png" alt=""><p>我的钱包</p></li>
        </ul>
      </div>
      <div class="itemDiv">
        <p>社交专区</p>
        <ul>
          <li @click="toCool"><img src="../../assets/my/pyq.png" alt=""><p>朋友圈</p></li>
          <li @click="$router.push({name: 'team'})"><img src="../../assets/my/wdtd.png" alt=""><p>我的团队</p></li>
          <li @click="$router.push({name: 'customer'})"><img src="../../assets/my/wdkf.png" alt=""><p>我的客服</p></li>
          <li @click="$router.push({name: 'czsp'})"><img src="../../assets/my/czsp.png" alt=""><p>操作视频</p></li>
        </ul>
      </div>
      <div class="itemDiv">
        <p>商城专区</p>
        <ul>
          <li @click="notYetOpen"><img src="../../assets/my/scdd.png" alt=""><p>商城订单</p></li>
          <li @click="notYetOpen"><img src="../../assets/my/shdz.png" alt=""><p>收货地址</p></li>
          <li @click="notYetOpen"><img src="../../assets/my/spsc.png" alt=""><p>商品收藏</p></li>
          <li @click="notYetOpen"><img src="../../assets/my/spjf.png" alt=""><p>商品积分</p></li>
        </ul>
      </div>
      <div class="itemDiv">
        <p>功能专区</p>
        <ul>
          <li @click="$router.push({name: 'helpCenter'})"><img src="../../assets/my/bzzx.png" alt=""><p>帮助中心</p></li>
          <li @click="$router.push({name: 'setting'})"><img src="../../assets/my/szzx.png" alt=""><p>设置中心</p></li>
          <li @click="$router.push({name:'message'})"><img src="../../assets/my/xxzx.png" alt=""><p>消息中心</p></li>
          <li @click="$router.push({name: 'aboutUs', query:{yhxi,gsjj}})"><img src="../../assets/my/gywm.png" alt=""><p>关于我们</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      isSign: false,
      version: '',
      agentNo: '',
      levelObj: {
        '1': '普通会员',
        '2': '经纪人',
        '3': '城市服务商',
        '4': '城市运营商',
        '5': '高级合伙人',
        '6': '达标团队长',
        '7': '一星团队长',
        '8': '二星团队长',
        '9': '三星团队长',
      },
      level: '',
      list: [],
      merchantNo: '',
      merchantCnName: '',
      userName: '',
      phone: '',
      url: '',
      yhxi: '',
      gsjj: '',
      zhye: 0,
      xyf: 0,
      fullscreenLoading: false,
      freezeStatus: '',
      imageUrl: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantCnName = JSON.parse(this.$stact.state.token)[0].merchantCnName
    this.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.userName = JSON.parse(this.$stact.state.token)[0].merchantEnName
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.message()
  },
  methods: {
    toSqs(){
      if (this.freezeStatus!='10B') {
        this.$message({
          message: '需先通过实名认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name:'sqs'})
    },
    toWdqb(){
      if (this.freezeStatus!='10B') {
        this.$message({
          message: '需先通过实名认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name:'retreat'})
    },
    toXyf(){
      if (this.freezeStatus!='10B') {
        this.$message({
          message: '需先通过实名认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name:'emptyCardCredit'})
    },
    toWdkb(){
      if (this.freezeStatus!='10B') {
        this.$message({
          message: '需先通过实名认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name:'cardlist'})
    },
    toCool () {
      this.$router.push({
        name: 'cool',
        query: {
          tx: this.imageUrl
        }
      })
    },
    toHtmlIframe () {
      this.$router.push({ name: 'htmlIframe', query: { html: this.htmlIframe, title: '用户协议' } })
    },
    toNewIframe(){
      this.$router.push({ name: 'imgIframe', query: { url: this.syms, title: '收益模式' } })
    },
    notYetOpen () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'warning'
      })
    },
    async handleChange (file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fullscreenLoading = true
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        console.log(fileList[fileList.length - 1])
        await this.chageBase(fileList[fileList.length - 1])
      }
    },
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
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
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.level = JSON.parse(res.data[57])[0].level
            console.log(res.data);
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            console.log(JSON.parse(res.data[57])[0]);
            this.userName = JSON.parse(res.data[57])[0].merchantCnName
            this.phone = JSON.parse(res.data[57])[0].phone
            vm.imageUrl = res.data[48]
            vm.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
            this.zhye = res.data[43]
            this.xyf = res.data[6]
            this.yhxi = res.data[44]
            this.gsjj = res.data[45]
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    toReal () {
      let vm = this
      let bankAccount = JSON.parse(this.$stact.state.token)[0].bankAccount
      let idCardNumber = JSON.parse(this.$stact.state.token)[0].idCardNumber
      if (vm.freezeStatus == '10B') {
        vm.$message({
          message: '已实名',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      if (vm.freezeStatus == '10F') {
        vm.$message({
          message: '实名审核中',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      if (vm.freezeStatus == '10A' && bankAccount.length>0 && idCardNumber.length>0) {
        vm.$message({
          message: '实名审核中',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      vm.$router.push({ name: 'real' })
    }
  }
}
</script>

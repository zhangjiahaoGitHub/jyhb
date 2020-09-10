<template>
    <div class='hundred integraldetails-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="jfDiv">
          <p>可用积分<span>{{kyjf}}</span></p>
          <p>总积分：{{zjf}}</p>
        </div>
        <div class="iptDIv">
          <input v-model="texta" type="number" placeholder="请输入升级用户的手机号"><span @click="getData(texta,2)" class="aSpan">升级白银</span>
        </div>
        <p class="noteP">注：本次升级将消耗30000积分</p>
        <p class="titleP">钻石用户专用</p>
        <div class="iptDIv">
          <input v-model="textb" type="number" placeholder="请输入升级用户的手机号"><span @click="level>4 ? getData(textb,2):''" :class="level>4 ? 'aSpan':''">升级白银</span>
        </div>
        <p class="titleP">领航者专用</p>
        <div class="iptDIv">
          <input v-model="textc" type="number" placeholder="请输入升级用户的手机号"><span @click="level>5 ? getData(textc,2):''" :class="level>5 ? 'aSpan':''">升级白银</span>
        </div>
        <div class="iptDIv">
          <input v-model="textd" type="number" placeholder="请输入升级用户的手机号"><span @click="level>5 ? getData(textd,3):''" :class="level>5 ? 'aSpan':''">升级黄金</span>
        </div>
        <pre>
规则说明
1.智能还款和空卡还款，每消费1元得1积分
2.每连续签到7天得50积分
3.付费升级黄金用户送30万积分
4.付费升级铂金用户送60万积分
5.每兑换一次白银消耗30000积分
6.钻石用户可免费帮用户升级白银
7.领航者可免费帮用户升级白银/黄金
        </pre>
    </div>
</template>
<script>

export default {
  data () {
    return {
      fullscreenLoading: false,
      kyjf: 0,
      zjf: 0,
      level: '',
      texta: '',
      textb: '',
      textc: '',
      textd: '',
      levelObj: {
        '1': '体验用户',
        '2': '白银用户',
        '3': '黄金用户',
        '4': '铂金用户',
        '5': '钻石用户',
        '6': '领航者',
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.kyjf = JSON.parse(this.$stact.state.token)[0].integral
    this.zjf = JSON.parse(this.$stact.state.token)[0].integralAll
    // this.getData()
  },
  methods: {
    getData (val,sjlevel) {
      let vm = this
      if (this.val=='') {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(val))) {
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
        '3': '792003',
        '40': val,
        '42': vm.merchantNo,
        '43': sjlevel,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '升级成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }else{
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

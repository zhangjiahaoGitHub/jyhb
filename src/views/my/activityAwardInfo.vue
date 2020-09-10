<template>
    <div class='hundred activityAwardInfo-layout'>
        <div class="headDiv">
          <img :src="listArr" alt="">
          <p>倒计时：61天</p>
        </div>
        <p v-html="infoArr.rewardDescription"></p>
        <div class="footDiv">
          <img src="../../assets/logo.png" alt="">
          誠方印全国运营中心
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      listArr: '',
      infoArr: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.listArr = this.$route.query.listArr
    this.infoArr = JSON.parse(this.$route.query.infoArr)
    this.infoArr.rewardDescription=this.infoArr.rewardDescription.replace(/\n/g, "<br>")
  },
  methods: {
    
  }
}
</script>

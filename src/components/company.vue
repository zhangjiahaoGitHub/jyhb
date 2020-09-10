<template>
  <div>
    <ul class='allFlex justifyBetween companyPadd'>
      <router-link :to="{name: 'adduser'}" tag='li' :class="check === 1 && 'panyCheck'">
        中介实名
      </router-link>
      <router-link :to="{name: 'realname'}" tag='li' :class="check === 2 && 'panyCheck'">
        中介卡包
      </router-link>
      <router-link :to="{name: 'checkplan'}" tag='li' :class="check === 3 && 'panyCheck'">
        中介计划
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  inject: [
    'check'
  ],
  methods: {
  }
}
</script>

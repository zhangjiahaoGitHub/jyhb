<template>
  <div>
    <div class='allFlex'>
        <div class='half textCenter cardSche'>
          <router-link :to="{name: 'repayment'}" tag="span">信用卡</router-link>
        </div>
        <div class='half textCenter cardSche'>
          <router-link class='checkCard' :to="{name: 'agent'}" tag="span">中介卡包</router-link>
        </div>
    </div>
    <div class='loginTo'>
      <div class='blue' @click='isAgent(1)'>
        中介实名
      </div>
    </div>
    <div class='loginTo'>
      <p>* 为用户进行实名认证</p>
    </div>
    <div class='loginTo' @click='isAgent(2)'>
      <div class='blue'>
        中介卡包
      </div>
    </div>
    <div class='loginTo'>
      <p>* 用户卡包</p>
    </div>
    <div class='loginTo'  @click='isAgent(3)'>
      <div class='blue'>
        中介计划
      </div>
    </div>
    <div class='loginTo'>
      <p>* 中介用户的计划</p>
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
      fullscreenLoading: false,
      isIntermediary: 0
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
  },
  methods: {
    isAgent (type) {
      let vm = this
      if (Number(this.isIntermediary) === 0) {
        vm.$router.push({ name: 'open' })
        return
      }
      switch (type) {
        case 1:
          vm.$router.push({ name: 'adduser' })
          break
        case 2:
          vm.$router.push({ name: 'realname' })
          break
        case 3:
          vm.$router.push({ name: 'checkplan' })
          break
      }
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
          if (res.data[39] === '00') {
            vm.fullscreenLoading = false
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.isIntermediary = JSON.parse(this.$stact.state.token)[0].isIntermediary
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

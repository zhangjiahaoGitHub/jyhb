<template>
  <div class="hundred adduser-layout" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li>
        <span>预留还款小额费率</span>
        <input type="number" placeholder="请输入0.75-1的数值" v-model="ylMin">
      </li>
      <li>
        <span>预留还款大额费率</span>
        <input type="number" placeholder="请输入0.85-1的数值" v-model="ylMax">
      </li>
      <li>
        <span>空卡还款小额费率</span>
        <input type="number" placeholder="请输入1.15-2的数值" v-model="qeMin">
      </li>
      <li>
        <span>空卡还款大额费率</span>
        <input type="number" placeholder="请输入1.15-2的数值" v-model="qeMax">
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="confirm">下一步</div>
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
      item: {},
      fullscreenLoading: false,
      ylMin: '',
      ylMax: '',
      qeMin: '',
      qeMax: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
      this.item = JSON.parse(this.$route.query.item)
      this.ylMin = this.item.YK_SMALL_RATE
      this.ylMax = this.item.YK_BIG_RATE
      this.qeMin = this.item.QYK_SMALL_RATE
      this.qeMax = this.item.QYK_BIG_RATE
      console.log(this.item);
  },
  methods: {
    confirm () {
      let vm = this
      if (this.ylMin<0.75 || this.ylMin>1) {
        this.$message({
          message: '预留还款小额费率限制范围0.75-1',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.ylMax<0.85 || this.ylMax>1) {
        this.$message({
          message: '预留还款大额费率限制范围0.85-1',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.qeMin<1.15 || this.qeMin>2) {
        this.$message({
          message: '空卡还款小额费率限制范围1.15-2',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.qeMax<1.15 || this.qeMax>2) {
        this.$message({
          message: '空卡还款小额费率限制范围1.15-2',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700', // 必须
        '3': '468158', // 接口
        '10': vm.ylMin,
        '11': vm.ylMax,
        '12': vm.qeMin,
        '13': vm.qeMax,
        '14': this.item.ID,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '修改成功',
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
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690013',
        '15': vm.cardNum,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.bankmessage = res.data
            vm.bankName = JSON.parse(res.data[16]).shortCnName
            vm.bankCode = JSON.parse(res.data[16]).bankCode
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

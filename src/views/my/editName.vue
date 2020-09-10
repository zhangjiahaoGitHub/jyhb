<template>
  <div class='hundred editName-layout'>
    <span @click="confirm">保存</span>
    <input type="text" placeholder="请输入昵称" v-model="nc">
  </div>
</template>
<script>

export default {
  data () {
    return {
      nc: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
  },
  methods: {
    confirm () {
      let vm = this
      if (this.nc=='') {
        vm.$message({
          message: '请填写新的昵称',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '520127',
        '21': vm.merchantNo,
        '22': vm.nc,
        '59': vm.version
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.fullscreenLoading = true
      vm.$http.post(`request.app`, url)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '修改成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            this.$router.back()
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

<template>
  <div class='hundred helpCenterInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="content">
      <p>{{listArr[0].title}}</p>
      <div v-html="listArr[0].content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      fullscreenLoading: false,
      listArr: [
        {}
      ],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getData()
  },
  methods: {
    getData () {
      this.fullscreenLoading = true
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792002',
        '21': this.$route.query.id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'listArr',JSON.parse(res.data[57]))
            console.log(this.listArr);
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.count=0
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

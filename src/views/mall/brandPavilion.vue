<template>
  <div class='hundred brandPavilion-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <img @click="toStore(item)" v-for="item in listArr" :key="item.id" :src="item.bannerUrl" alt="">
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
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.list()
  },
  methods: {
    toStore(item){
      this.$router.push({
        name: 'store',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792010',
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.listArr = JSON.parse(res.data[57])
            console.log(this.listArr);
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
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

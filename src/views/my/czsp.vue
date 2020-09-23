<template>
  <div class='hundred czsp-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="headDiv">
      <img :src="cardUrl" alt="">
    </div>
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' :infinite-scroll-delay='1000'>
      <li @click="problem(item.skipUrl,item.title)" v-for='item in bannerList' :key='item.id'>
        <p>{{item.title}}</p>
        <img :src="item.image" alt="">
      </li>
      <p v-if="loading" style='text-align: center'>加载中...</p>
      <p v-if="noMore && !loading" class='gary' style='text-align: center'>没有更多了</p>
    </ul>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      nowImg: '',
      bannerList: [],
      cardUrl: '',
      phone: '',
      tx: '',
      page: 1,
      count: 10,
      loading: false,
      popShow: false,
      fullscreenLoading: false,
    }
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.tx = this.$route.query.tx
    this.getImg()
    this.list()
  },
  mounted () {
  },
  methods: {
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    load () { // 拉下加载
      let vm = this
      vm.loading = true
      vm.fullscreenLoading = true
      // setTimeout(() => {
        vm.loading = false
        vm.page++
        vm.list()
      // }, 1000)
    },
    getImg () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': this.merchantNo,
        '43': '40A',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.cardUrl = JSON.parse(res.data[57])[0]
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
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '999001',
        '44': vm.page,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data)
            vm.count = JSON.parse(res.data[57]).length
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              this.bannerList.push(item)
            });
            // vm.bannerList = vm.bannerList.concat(JSON.parse(res.data[57]))
            console.log(vm.bannerList)
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

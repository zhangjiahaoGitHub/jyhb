<template>
  <div class='hundred czjls-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
      <li v-for="item in listArr" :key="item.ID">
        <div><span>充值金额：</span><p>￥{{item.TRX_AMT}}</p></div>
        <div><span>充值时间：</span><p>{{item.CREATE_TIME}}</p></div>
        <div><span>充值状态：</span><p v-if="item.STATUS=='10B'" class="cgP">充值成功</p><p v-else class="sbP">充值失败</p></div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
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
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
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
  },
  methods: {
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390093',
        '42': vm.merchantNo,
        // 页码
        '44': this.pageCount,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[40]).length
            let getList = JSON.parse(res.data[40])
            getList.forEach(item => {
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

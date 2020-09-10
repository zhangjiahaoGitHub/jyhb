<template>
    <div class='hundred deductionRecords-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="headDiv">
        <p>保障金金额：<span>{{bzj}}</span></p>
        <p>温馨提示计划完成后，保证金可提现，工作日秒到，非工作日T+1到账。</p>
        <div><span @click="czbzj">立即充值</span><span @click="tx">我要提现</span></div>
      </div>
      <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
        <li v-for="item in listArr" :key="item.id">
          <div><span>{{item.sourceType}}</span><span>{{item.money}}</span></div>
          <div><span>{{item.source}}</span><span>{{item.formatTime}}</span></div>
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
      bzj: '0.00',
      fullscreenLoading: false,
      count: 20,
      // 无限滚动开关：true关
      loading: false,
      listArr: [],
      pageCount: 1
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
    this.message()
  },
  methods: {
    czbzj () {
      this.$router.push({
        name:'marginDeposit',
        query: {
          type: 'gr'
        }
      })
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '700001',
        '6': '10A',
        '7': vm.pageCount,
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.bzj = res.data[58]
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.formatTime=this.$moment(item.createTime.time).format('YYYY.MM.DD HH:mm')
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    tx(){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '700000',
        '5': vm.bzj,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '提现成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            console.log(res.data);
            this.message()
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
          console.log(err)
          vm.fullscreenLoading = false
        })
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
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            this.bzj = res.data[26]
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

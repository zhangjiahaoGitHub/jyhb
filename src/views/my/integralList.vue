<template>
    <div class='hundred integralList-layout ' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
        <li v-for="(item,index) in listArr" :key="index">
          <div>
            <p>{{typeMj[item.integralType]}}</p>
            <span>{{item.formatTime}}</span>
          </div>
          <p>{{item.amount}}</p>
        </li>
        <!-- <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p> -->
      </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      fullscreenLoading: false,
      count: 20,
      // 无限滚动开关：true关
      loading: true,
      listArr: [],
      pageCount: 1,
      typeMj: {
        '1':'注册',
        '2':'分享注册',
        '3':'无卡空卡养卡交易',
        '4':'首次消费',
        '5':'实名通过',
        '6':'签到',
      }
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
    this.getData()
  },
  methods: {
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190969',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.listArr = JSON.parse(res.data[40])
            this.listArr.forEach(item => {
              item.formatTime = this.$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')
            });
            console.log(this.listArr);
            
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    load () {
      // this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690036',
        '37': this.startTime,
        '38': this.endTime,
        '42': vm.merchantNo,
        '43': vm.pageCount,
        '44': '10A',
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
            this.zSumContent = res.data[11]
            this.skContent = res.data[12]
            this.ykContent = res.data[14]
            this.fyContent = res.data[13]
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.formatTime=this.$moment(item.time.time).format('YYYY-MM-DD HH:mm')
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
    }
  }
}
</script>

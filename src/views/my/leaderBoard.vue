<template>
    <div class='hundred leaderBoard-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="headDiv">
          <ul>
            <li class="noTwo">
              <div>
                <img src="../../assets/my/phb/no2.png" alt="">
              </div>
              <p>李**</p>
              <span class="phoneSpan">138****5786</span>
              <span>累计收益(元)</span>
              <p>1286896.11</p>
            </li>
            <li class="noOne">
              <div>
                <img src="../../assets/my/phb/no1.png" alt="">
              </div>
              <p>李**</p>
              <span class="phoneSpan">138****5786</span>
              <span>累计收益(元)</span>
              <p>1286896.11</p>
            </li>
            <li class="noThree">
              <div>
                <img src="../../assets/my/phb/no3.png" alt="">
              </div>
              <p>李**</p>
              <span class="phoneSpan">138****5786</span>
              <span>累计收益(元)</span>
              <p>1286896.11</p>
            </li>
          </ul>
        </div>
        <!-- <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
          <li v-for="item in listArr" :key="item.ID">
            <div>
              <span>{{mj[item.MONEY_TYPE]}}</span><span>+{{item.TRX_AMT}}</span>
            </div>
            <div>
              <span v-if="item.MOBILE">{{item.MOBILE.substring(0,3)}}****{{item.MOBILE.substring(item.MOBILE.length-4,item.MOBILE.length)}}</span>
              <span v-else>*** **** ****</span>
              <span>{{item.formatTime}}</span>
            </div>
          </li>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </ul> -->
    </div>
</template>
<script>

export default {
  data () {
    return {
      count: 20,
      loading: true,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getData()
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    choseClick(item){
      this.choseStr = item.val
      this.drawer = false
      this.getData()
    },
    toListwith (item) {
      this.$router.push({
        name: 'listwith',
        query:{
          item:JSON.stringify(item)
        }
      })
    },
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190950',
        '8': vm.choseStr,
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$mdata.mdGet(parmas)
      vm.$http.post(`request.app`, url)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.listArr=JSON.parse(res.data[57])
            this.listArr.forEach(item => {
              item.formatTime = this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm:ss')
            });
            this.zsy = res.data[58]
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    timeChange () {
      this.loading=true
      this.pageCount=1
      this.listArr=[]
      this.list()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190950',
        '8': '',
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

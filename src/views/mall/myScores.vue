<template>
  <div class='hundred myScores-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="head">
      <span>{{zjf || '0'}}</span>
      <p>可用积分</p>
      <div @click="$router.push({name: 'mall'})">立即兑换</div>
    </div>
    <div class="content">
      <ol>
        <li @click="nav='sm'">
          <img :src="nav=='sm'?require('../../assets/mall/nav_ajfsm.png'):require('../../assets/mall/nav_jfsm.png')" alt="">
          <p>积分说明</p>
        </li>
        <li @click="jfmx">
          <img :src="nav=='mx'?require('../../assets/mall/nav_ajfmx.png'):require('../../assets/mall/nav_jfmx.png')" alt="">
          <p>积分明细</p>
        </li>
      </ol>
      <div v-if="nav=='sm'">
        当你每在平台支付1元手续费都将自动获取一个积分
      </div>
      <ul 
        v-else
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
        <li v-for="item in listArr" :key="item.id">
          <div>
            <p>{{item.source}}</p>
            <span>{{item.createTime}}</span>
          </div>
          <span :class="item.type=='10A'?'ls':'hs'">{{item.type=='10A'?'+':"-"}}{{item.point}}</span>
        </li>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul>
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
      nav: 'sm',
      fullscreenLoading: false,
      count: 20,
      zjf: 0,
      loading: false,
      listArr: [],
      pageCount: 1,
    }
  },
  computed: {
    noMore () {
      return this.count < 20
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
    jfmx(){
      this.nav='mx'
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792017',
        '42': this.merchantNo,
        '44': this.pageCount,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.zjf = Number(res.data[10])
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
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

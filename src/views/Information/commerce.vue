<template>
  <div class='hundred commerce-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <img src="../../assets/business_bg.png" alt="">
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled'>
      <li @click="toIframe(item.skipUrl,item.title)" v-for='item in bannerList' :key='item.id'>
        <img :src="item.image" alt="">
        <div>
          <span>{{item.title}}</span>
          <p><span>{{item.formatTime}}</span><span>查看详情</span></p>
        </div>
      </li>
      <p v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</p>
      <p v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</p>
    </ul>
    <!-- <div v-if="bannerimg" :style='`font-size:0;height:4.2rem;background: url(${bannerimg}) center center no-repeat;background-size: 100% !important;`'>
    </div>
    <div  v-infinite-scroll='load' infinite-scroll-disabled='disabled' style="overflow:auto;height:20.7rem;">
      <div @click="toIframe(item.shareurl,item.title)" class='homeTutorial' v-for='item in bannerList' :key='item.id'>
        <div>
           <div class='tutorial'>
            {{item.title}}
          </div>
          <div :style='`height:2.6rem;background: url(${item.imageurl}) no-repeat center center;background-size: 100% !important;margin:0.4rem auto;width:80%;`'>
          </div>
        </div>
      </div>
      <p v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</p>
      <p v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</p>
    </div> -->
  </div>
</template>
<script>

export default {
  data () {
    return {
      bannerimg: '',
      agentNo: '',
      version: '',
      merchantNo: '',
      bannerList: [],
      cardUrl: '',
      page: 0,
      count: 10,
      fullscreenLoading: false,
      loading: false,
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
  mounted () {
  },
  methods: {
    toIframe (url,name) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: name } })
    },
    load () { // 拉下加载
      let vm = this
      vm.loading = true
      vm.fullscreenLoading = true
      setTimeout(() => {
        vm.loading = false
        vm.page++
        vm.list()
      }, 1000)
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '999001',
        '44': vm.page,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            // vm.bannerList = vm.bannerList.concat(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.formatTime = this.$moment(item.createTime.time).format('YYYY.MM.DD')
              this.bannerList.push(item)
            });
            console.log(vm.bannerList);
            
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
    }
  }
}
</script>

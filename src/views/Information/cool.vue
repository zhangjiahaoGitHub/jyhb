<template>
  <div class='hundred cool-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' :infinite-scroll-delay='1000'>
      <li v-for='item in bannerList' :key='item.id'>
        <p>{{item.formatTime}}</p>
        <h6>{{item.context}}</h6>
        <ol>
          <li v-for="(itemSon,indexSon) in item.imgUrlArr" :key="indexSon">
            <div>
              <img @click="lookPic(itemSon)" :src="itemSon" alt="">
            </div>
          </li>
        </ol>
        <div><span class="btn" :data-clipboard-text="item.context" @click='copyText()'>复制文案</span></div>
      </li>
      <p v-if="loading" style='text-align: center'>加载中...</p>
      <p v-if="noMore && !loading" class='gary' style='text-align: center'>没有更多了</p>
    </ul>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <img :src="nowImg" alt="" srcset="">
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'

export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      nowImg: '',
      bannerList: [],
      cardUrl: '',
      page: 0,
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
  },
  mounted () {
  },
  methods: {
    lookPic(itemSon){
      this.nowImg = itemSon
      this.popShow = true
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
    copyText () {
      let vm = this
      let clipboard = new Clipboard('.btn')
      clipboard.on('success', (e) => {
        console.log(1)
        vm.$message({
          message: '复制成功',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        vm.$message({
          message: '复制失败',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        clipboard.destroy()
      })
    },
    toLook (imgArr) {
      this.$router.push({
        name: 'lookImg',
        query: {
          imgArr: imgArr
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690032',
        '43': vm.page,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.imgUrlArr = item.picPaths.split(',')
              item.formatTime = this.$moment(item.createTime.time).format('YYYY-MM-DD HH:mm')
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
    }
  }
}
</script>

<template>
  <div class='hundred mall-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <div>
        <img :src="headUrl ? headUrl:require('../../assets/head.png')" alt="">
        <div>
          <p>{{merchantCnName}}</p>
          <i class="el-icon-location-outline">{{dq.substring(dq.indexOf('省')+1,dq.length)}}</i>
        </div>
      </div>
      <i @click="$router.push({name: 'search'})" class="el-icon-search">搜索</i>
    </div>
    <div class="bannerDiv">
      <img :src="bannerUrl" alt="">
    </div>
    <ul>
      <li @click="$router.push({name:'brandPavilion'})">
        <img src="../../assets/mall/ppg.png" alt="">
        <p>品牌馆</p>
      </li>
      <li @click="$router.push({name:'myOrder'})">
        <img src="../../assets/mall/ddgl.png" alt="">
        <p>订单管理</p>
      </li>
      <li @click="$router.push({name: 'myAddress'})">
        <img src="../../assets/mall/dzgl.png" alt="">
        <p>地址管理</p>
      </li>
      <li @click="$router.push({name: 'merchantSettled'})">
        <img src="../../assets/mall/sjrz.png" alt="">
        <p>商家入驻</p>
      </li>
    </ul>
    <div class="newDiv">
      <img src="../../assets/gonggao-laba.png" alt="">
      <swiper v-if="newsList.length>0" class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in newsList" :key="item.id">{{item.content}}</swiper-slide>
      </swiper>
    </div>
    <div class="contentDiv">
      <div @click="$router.push({name:'brandPavilion'})" class="titleDiv"><p>鲸鹰优选</p><span>查看更多</span></div>
      <div v-for="item in listArr" :key="item.id" class="storeDiv">
        <p @click="toStore(item)">{{item.brandBusinessName}}<i class="el-icon-arrow-right"></i></p>
        <div @click="toStore(item)" class="imgDiv">
          <img :src="item.logoUrl" alt="">
          <img :src="item.bannerUrl" alt="">
        </div>
        <ol>
          <li @click="toInfo(itemSon)" v-for="itemSon in item.goodsVOList" :key="itemSon.id">
            <img :src="itemSon.url" alt="">
            <p>{{itemSon.goodsName}}</p>
            <p><span v-if="itemSon.price>0">￥{{itemSon.price}}</span><span v-if="itemSon.price>0&&itemSon.point>0">+</span><span v-if="itemSon.point>0">{{itemSon.point}}积分</span></p>
          </li>
        </ol>
      </div>
    </div>
    <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
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
      bannerUrl: '',
      dq: '',
      newsList: [],
      headUrl: '',
      merchantCnName: '',
      listArr: [],
      swiperOption:{
        direction: 'vertical',
        autoplay: {
          stopOnLastSlide:false, // 这是让轮播图自动轮播
　　　　　 /* 触摸滑动后是否继续轮播 */
　　　　　 disableOnInteraction: false
        },
        loop: true, // 就是决定是不是无缝轮播 true是无缝轮播 false不是
      },
    }
  },
  components: {
    'remote-js': {
      render(createElement) {
      return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
      src: { type: String, required: true },
      },
    },
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.headUrl = JSON.parse(this.$stact.state.token)[0].headUrl
    this.merchantCnName = JSON.parse(this.$stact.state.token)[0].merchantCnName
    this.list()
    this.getData()
    this.getImg()
  },
  mounted () {
    setTimeout(() => {
      this.dq = window.returnCitySN.cname
    }, 500);
  },
  methods: {
    toInfo(itemSon){
      this.$router.push({
        name: 'productDetails',
        query: {
          item: JSON.stringify(itemSon)
        }
      })
    },
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
        '3': '792007',
        '42': this.merchantNo,
        '43': '10A',
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.newsList = JSON.parse(res.data[60])
            console.log(this.newsList);
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
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792009',
        '42': this.merchantNo,
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
    getImg () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': this.merchantNo,
        '43': '10G',
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.bannerUrl = JSON.parse(res.data[57])[0]
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

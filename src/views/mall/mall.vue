<template>
  <div class='hundred mall-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <div>
        <img :src="headUrl ? headUrl:require('../../assets/head.png')" alt="">
        <div>
          <p>{{merchantCnName}}</p>
          <i class="el-icon-location-outline">{{nowcity}}</i>
          <!-- <i class="el-icon-location-outline">{{dq.substring(dq.indexOf('省')+1,dq.length)}}</i> -->
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
      <li @click="toShrz">
        <img src="../../assets/mall/sjrz.png" alt="">
        <p>商家入驻</p>
      </li>
    </ul>
    <div class="newDiv">
      <img src="../../assets/gonggao-laba.png" alt="">
      <swiper v-if="newsList.length>0" class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in newsList" :key="item.id">{{item.content}}</swiper-slide>
      </swiper>
      <p style="margin-left:0.4rem" v-else>暂无公告</p>
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
    <!-- <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js> -->
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
      nowcity: '定位中...',
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
  // components: {
  //   'remote-js': {
  //     render(createElement) {
  //     return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
  //     },
  //     props: {
  //     src: { type: String, required: true },
  //     },
  //   },
  // },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.headUrl = JSON.parse(this.$stact.state.token)[0].headUrl
    this.merchantCnName = JSON.parse(this.$stact.state.token)[0].merchantCnName
    this.list()
    this.getData()
    this.getImg()
    this.getLocation()
  },
  mounted () {
    // setTimeout(() => {
    //   this.dq = window.returnCitySN.cname
    //   console.log(this.dq);
    // }, 500);
  },
  methods: {
    // 获取当前位置
    getLocation () {
      let vm = this
      const self = this;
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })
 
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
 
        function onComplete (data) {
          // data是具体的定位信息
          console.log('定位成功信息：', data.addressComponent.city)
          self.city = data.addressComponent.city
          vm.nowcity = data.addressComponent.city
        }
 
        function onError (data) {
          // 定位出错
          console.log('定位失败错误：', data)
          // 调用IP定位
          self.getLngLatLocation();
        }
      });
    },
    // 通过IP获取当前位置
    getLngLatLocation () {
      let vm = this
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result);
            vm.nowcity = result.city ? result.city : '定位失败'
            // 逆向地理编码
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });
 
              var lnglat = result.rectangle.split(';')[0].split(',');
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }else {
            //判断是否微信登陆
            function isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }
            if (isWeiXin()) {
                // alert(" 是来自微信内置浏览器")
                vm.nowcity = '杭州市'
            } else {
                // alert("不是来自微信内置浏览器")
                vm.nowcity = '定位失败'
            }
            
          }
        });
      });
    },
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
    toShrz () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792012',
        '42': this.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$router.push({name: 'merchantSettled'})
          }else if (res.data[39] === '01') {
            vm.$message({
              message: '审核拒绝，请重新提交',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.$router.push({name: 'merchantSettled'})
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

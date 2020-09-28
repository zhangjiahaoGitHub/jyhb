<template>
  <div class='hundred cool-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="head">
      <img :src="cardUrl" alt="">
      <img :src="tx ? tx:require('../../assets/head.png')" alt="">
    </div>
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' :infinite-scroll-delay='1000'>
      <li v-for='item in bannerList' :key='item.id'>
        <div>
          <img :src="item.url ? item.url:require('../../assets/head.png')" alt="">
          <div>
            <p>{{item.title || '鲸鹰伙伴'}}</p>
            <span :class="item.hide ? 'hideP':''" v-html="item.context.replace(/(\r\n)|(\n)/g,'<br>')"></span>
            <span @click="item.hide = !item.hide">{{item.hide ? '更多':'收起'}}</span>
          </div>
        </div>
        <ol v-if="item.imgUrlArr[0]">
          <li @click="lookPic(itemSon)" v-for="(itemSon,indexSon) in item.imgUrlArr" :key="indexSon">
            <img :src="itemSon" alt="">
          </li>
        </ol>
        <p><span class="btn" :data-clipboard-text="item.context" @click='copyText()'>复制文案</span></p>
      </li>
      <p v-if="loading" style='text-align: center'>加载中...</p>
      <p v-if="noMore && !loading" class='gary' style='text-align: center'>没有更多了</p>
    </ul>
    <div @click="popShow=false" v-show="popShow" class="imgPopDiv">
      <div>
        <img :src="nowImg" alt="" srcset="">
        <div ref="qrCodeUrl"></div>
      </div>
    </div>
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
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.tx = this.$route.query.tx
    this.getImg()
  },
  mounted () {
    let vm = this
    let item = this.$refs.qrCodeUrl
    var qrcode = new QRCode(item, {
      text: `http://jyhbban.llyzf.cn:6442/lly-posp-proxy/toAPPRegister.app?phone=${vm.phone}&product=JYHB`,
      width: 60,
      height: 60,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.L
    })
    let newImgDom = this.convertCanvasToImage(item.childNodes[0])
    console.log(newImgDom);
    
    item.append(newImgDom)
    item.removeChild(item.childNodes[0])
    if (item.childNodes.length==2) {
      item.removeChild(item.childNodes[0])
    }
  },
  methods: {
    convertCanvasToImage(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
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
    getImg () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': this.merchantNo,
        '43': '30A',
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
        '3': '690032',
        '43': vm.page,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data)
            vm.count = JSON.parse(res.data[57]).length
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.imgUrlArr = item.picPaths.split(',')
              item.formatTime = this.$moment(item.createTime.time).format('YYYY-MM-DD HH:mm')
              item.hide = true
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

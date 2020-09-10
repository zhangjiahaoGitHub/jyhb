<template>
  <div class='hundred shareimg-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li @click="showImg(item)" v-for="(item,index) in img" :key="index">
        <img :src="item" alt="">
      </li>
    </ul>
    <div v-show="popShow" class="popDiv">
      <div class="imgDiv">
        <img :src="newImg" alt="">
        <div ref="qrCodeUrl"></div>
      </div>
      <p>请截图分享</p>
      <div class="btnDiv" @click="popShow=false">关闭</div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      img: [],
      newImg: '',
      popShow: false,
      fullscreenLoading: false,
    }
  },
  created () {
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.message()
  },
  mounted () {
    this.creatQrCode()
  },
  updated () {
    // this.creatQrCode()
  },
  methods: {
    showImg(item){
      this.newImg = item
      this.popShow = true
    },
    creatQrCode() {
      let vm = this
      // this.$refs.qrCodeUrl.forEach((item,index) => {
        let item = this.$refs.qrCodeUrl
        var qrcode = new QRCode(item, {
          text: `http://yunlingshenghuo.llyzf.cn:6442/lly-posp-proxy/toAPPRegister.app?phone=${vm.phone}&product=YLSH`,
          width: 84,
          height: 84,
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
      // });
      // document.querySelector('#qrcode').src=document.querySelector('.qrcode img').src
    },
    convertCanvasToImage(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '43': '10E',
        '59': this.$stact.state.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.img = JSON.parse(res.data[57])
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

<style scoped>
</style>

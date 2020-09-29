<template>
  <div class='hundred shareimg-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <swiper :options="swiperOption" ref="mySwiper" v-if="img.length" >
      <swiper-slide v-for="(item,index) in img" :key="index" class="swiper-slide">
        <img class="bgImg" :src="item"/>
        <img @click="showImg(item)" class="fd" src="../../assets/fd.png" alt="">
      </swiper-slide>
      <!-- 这是之后下方的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div id="codeDiv" ref="qrCodeUrl"></div>
    <img @click="popShow=false" v-if="popShow" class="popImg" :src="newImg" alt="">
    <!-- <ul>
      <li @click="showImg(item)" v-for="(item,index) in img" :key="index">
        <img :src="item" alt="">
      </li>
    </ul>
    <div v-show="popShow" class="popDiv">
      <div class="imgDiv">
        <img :src="newImg" alt="">
        <div ref="qrCodeUrl"></div>
      </div>
      <p>请截图或长按二维码分享</p>
      <div class="btnDiv" @click="popShow=false">关闭</div>
    </div> -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      img: [],
      newImg: '',
      newImgDom: '',
      popShow: false,
      fullscreenLoading: false,
      swiperOption:{
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el : '.swiper-pagination',
          clickable: true
        },
//         autoplay: {
//           stopOnLastSlide:false, // 这是让轮播图自动轮播
// 　　　　　 /* 触摸滑动后是否继续轮播 */
// 　　　　　 disableOnInteraction: false
//         },
        // loop: false, // 就是决定是不是无缝轮播 true是无缝轮播 false不是
      },
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
      let item = this.$refs.qrCodeUrl
      var qrcode = new QRCode(item, {
        text: `http://jyhbban.llyzf.cn:6442/lly-posp-proxy/toAPPRegister.app?phone=${vm.phone}&product=JYHB`,
        width: 84,
        height: 84,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      })
      let newImgDom = this.convertCanvasToImage(item.childNodes[0])
      this.newImgDom = newImgDom
      console.log(newImgDom);
      
      item.append(newImgDom)
      item.removeChild(item.childNodes[0])
      if (item.childNodes.length==2) {
        item.removeChild(item.childNodes[0])
      }
    },
    convertCanvasToImage(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    drawAndShareImage(imgOneSrc,imgTwoSrc){
      var canvas = document.createElement("canvas");
      canvas.width = 192;
      canvas.height = 340;
      var context = canvas.getContext("2d");

      context.rect(0 , 0 , canvas.width , canvas.height);
      context.fillStyle = "#fff";
      context.fill();

      var myImage = new Image();
      myImage.src = imgOneSrc;    //背景图片  你自己本地的图片或者在线图片
      myImage.crossOrigin = 'Anonymous';

      myImage.onload = function(){
        // context.drawImage(myImage , 0 , 0 , 700 , 700);

        // context.font = "60px Courier New";
        // context.fillText("我是文字",350,450);

        var myImage2 = new Image();
        myImage2.src = imgTwoSrc;   //你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous';
        
        myImage2.onload = function(){
            context.drawImage(myImage2 , 54 , 250 , 84 , 84);
            var base64 = canvas.toDataURL("image/png");  //"image/png" 这里注意一下
            var img = document.getElementById('avatar');

            // document.getElementById('avatar').src = base64;
            img.setAttribute('src' , base64);
            console.log(img);
        }
      }
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '43': '10C',
        '59': this.$stact.state.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            
            this.img = JSON.parse(res.data[57])
            // this.drawAndShareImage(this.img[0],this.newImgDom.src)
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

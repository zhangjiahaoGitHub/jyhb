<template>
  <div class='hundred code-layout'>
    <div class="topDiv"><img :src="radio=='z' ? require('../assets/member/pay_zhifubao.png'):require('../assets/member/pay_weixin.png')" alt=""></div>
    <div class="contentDiv">
      <p>￥{{money}}</p>
      <div ref="qrCodeUrl">
        
      </div>
    </div>
    <div class="bottomDiv">
      <p>请在十分钟内扫码支付</p>
      <p>支付后请重新登录</p>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      radio: '',
      money: '',
      code: ''
    }
  },
  created () {
    this.code = this.$route.query.code
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.money = this.$route.query.money
    this.radio = this.$route.query.radio
  },
  mounted () {
    this.qrcode()
  },
  methods: {
    qrcode () {
      let vm = this
      let item = this.$refs.qrCodeUrl
      let qrcode = new QRCode(item, {
        width: 180,
        height: 180, // 高度
        text: `http://jyhbban.llyzf.cn/lly-posp-proxy/payView.app?m=${this.code}`, // 二维码内容
        correctLevel: QRCode.CorrectLevel.Q
      })
      
      let newImgDom = this.convertCanvasToImage(item.childNodes[0])
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
  }
}
</script>

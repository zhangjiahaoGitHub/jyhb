<template>
  <div class='hundred'>
    <div class='relative widthMax'>
      <img :src='$route.query.url' @click.prevent="()=>{}"/>
      <img src='' class='codeAbst'/>
      <div id='qrcode'></div>
    </div>
  </div>
</template>
<script>
import QRcode from 'qrcodejs2'

export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      imgList: [],
      phone: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
  },
  mounted () {
    this.qrcode()
  },
  methods: {
    qrcode () {
      let vm = this
      let qrcode = new QRcode('qrcode', {
        width: 200,
        height: 200, // 高度
        text: `http://jyhbban.llyzf.cn/lly-posp-proxy/toRegisterPage.app?phone=${vm.phone}&product=CFY`, // 二维码内容
        correctLevel: QRcode.CorrectLevel.L
      })
      vm.$nextTick(() => {
        document.querySelector('.codeAbst').src = document.querySelector('#qrcode canvas').toDataURL('image/png')
      })
    }
  }
}
</script>

<template>
  <div class='hundred sqs-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <img style="display:none" src="../../assets/my/shouquanshu.png" alt="" srcset="">
    <div class="contentDiv">
      <canvas>

      </canvas>
    </div>
    <p>请长按保存图片</p>
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
      createTime: '',
      merchantCnName: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.merchantCnName = JSON.parse(this.$stact.state.token)[0].merchantCnName
    this.createTime = this.$moment(JSON.parse(this.$stact.state.token)[0].createTime.time).format('YYYY年MM月DD日')
  },
  mounted () {
    this.$nextTick(()=>{
      let me = this
      let canvas = document.querySelector("canvas");
      let img = document.querySelector('img')
      
      img.onload = ()=>{
        canvas.width = 290;
        canvas.height = 435;
        let context = canvas.getContext('2d')
        context.drawImage(img,0,0,290,435)
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("兹授权", 30, 210)
    
        context.font = '15px "微软雅黑"'
        context.fillStyle = "#45CA7C"
        context.fillText(me.merchantCnName, 70, 210)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("为“鲸鹰伙伴”产品渠道", 120, 210)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("合，作伙伴具体授权内容应以合作协议为准", 30, 230)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("。本授权书有效期同被授权人的鲸鹰伙伴", 30, 250)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("APP账户使用期限，特此授权！", 30, 270)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText("贵州首融信息科技有限公司", 100, 310)
    
        context.font = '12px "微软雅黑"'
        context.fillStyle = "#3b3b3b"
        context.fillText(me.createTime, 130, 330)
        console.log(canvas);

        let newImgDom = this.convertCanvasToImage(canvas)

        let contentDiv = document.querySelector('.contentDiv')
        contentDiv.removeChild(contentDiv.childNodes[0])
        contentDiv.append(newImgDom)
        if (contentDiv.childNodes.length==2) {
          contentDiv.removeChild(contentDiv.childNodes[0])
        }
        console.log(newImgDom);
      }
    })

  },
  methods: {
    convertCanvasToImage(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
  }
}
</script>

<template>
  <div class='hundred customer-layout'>
    <div class="one">
      <img src='../../assets/my/kf1.png' alt="">
      <p>处理软件操作、还款相关问题</p>
      <div @click="call(phone1)">立即咨询</div>
    </div>
    <div class="two">
      <img style="margin-bottom: 0.3rem" src="../../assets/my/kf2.png" alt="">
      <span>电话客服</span>
      <p>联系电话：{{phone1}} <img @click="call(phone1)" src="../../assets/my/kf2.png" alt=""></p>
      <p style="margin-bottom: 0.3rem">联系电话：{{phone2}} <img @click="call(phone2)" src="../../assets/my/kf2.png" alt=""></p>
      <span>工作时间：09:00-1800</span>
      <span>(非国家法定假日)</span>
    </div>
    <div class="three">
      <img src="../../assets/my/kf3.png" alt="">
      <span>微信客服</span>
      <p>官方微信号：{{wx1}} <span @click="copyText(wx1)">复制</span></p>
      <p>官方微信号：{{wx2}} <span @click="copyText(wx2)">复制</span></p>
    </div>
    <!-- <div class="cardDiv">
      <h6><span></span>客服电话</h6>
      <div>
        <p>{{data.customerPhone1}}<span @click="call(data.customerPhone1)">立即拨打</span></p>
        <p>{{data.customerPhone2}}<span @click="call(data.customerPhone2)">立即拨打</span></p>
      </div>
      <p>{{data.customerPhoneMSG}}</p>
    </div>
    <div class="cardDiv">
      <h6><span></span>微信客服</h6>
      <div>
        <p>{{data.customerWX1}}<span @click="copyText(data.customerWX1)">复制</span></p>
        <p>{{data.customerWX2}}<span @click="copyText(data.customerWX1)">复制</span></p>
      </div>
      <p>{{data.customerWXMSG}}</p>
    </div>
    <p>在线客服<span>温馨提示：在线客服24小时为您服务</span></p>
    <p @click="()=>{this.$router.push({name:'server'})}">意见反馈<span>遇到问题或者优化意见可以反馈给我们</span></p> -->
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import copy from 'copy-to-clipboard'
export default {
  data () {
    return {
      wx1: '',
      wx2: '',
      phone1: '',
      phone2: '',
    }
  },
  created () {
    this.wx1 = localStorage.getItem('wx1')
    this.wx2 = localStorage.getItem('wx2')
    this.phone1 = localStorage.getItem('phone1')
    this.phone2 = localStorage.getItem('phone2')
  },
  methods: {
    call(phone){
      window.location.href = `tel://${phone}`
    },
    copyText (text) {
      if (text) {
        copy(text, {
          debug: true,
          message: '复制成功'
        })
        this.$message({
          message: '复制成功',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
      }
    },
    toIframe (url) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: '在线客服' } })
    }
  }
}
</script>

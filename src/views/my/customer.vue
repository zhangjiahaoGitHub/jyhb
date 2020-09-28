<template>
  <div class='hundred customer-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <img @click="problem('http://jyhbban.llyzf.cn/lly-posp-proxy/kf/', '在线客服')" src="../../assets/my/kf_zx.png" alt="">
    <img @click="type=1" src="../../assets/my/kf_rx.png" alt="">
    <img @click="type=2" src="../../assets/my/kf_wx.png" alt="">
    <img @click="type=3" src="../../assets/my/kf_wxgzh.png" alt="">
    <div @click="type=''" v-if="type" class="infoPop">
      <ul>
        <div v-if="type==1">
          <li @click="callService(dataObj[10])">
            <img src="../../assets/my/kfdh.png" alt="" srcset="">{{dataObj[10]}}
          </li>
        </div>
        <div v-if="type==2">
          <li @click="copyText(item)" v-for="(item,index) in dataObj[11].split(',')" :key="index">
            <img :src="require(`../../assets/my/wx${index+1}.png`)" alt="">
            {{item}}
          </li>
        </div>
        <div @click="copyText(item)" v-if="type==3">
          <li v-for="(item,index) in dataObj[13].split(',')" :key="index">
            <img :src="require(`../../assets/my/wx${index+1}.png`)" alt="">
            {{item}}
          </li>
        </div>
      </ul>
      <div @click="type=''" class="btnDiv">取消</div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import copy from 'copy-to-clipboard'
export default {
  data () {
    return {
      fullscreenLoading: false,
      infoPop: false,
      type: '',
      dataObj: {},
      listArr: []
    }
  },
  created () {
      this.message()
  },
  methods: {
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    callService(phone){
      const h = this.$createElement;
      this.$msgbox({
          // title: '提示',
          message: h('p', null, [
            h('p', { style: 'text-align: center' },'拨打电话'),
            h('p', { style: 'text-align: center' }, phone)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'callPhone',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              window.location.href= 'tel:'+localStorage.phone
            } else {
              done();
            }
          }
        }).then(action => {
          
        });
    },
    message () {
      this.fullscreenLoading = true
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190123',
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.dataObj = res.data
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
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

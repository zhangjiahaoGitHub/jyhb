<template>
    <div class='hundred coupon-layout'>
        <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
          <li @click="createCode(item)" v-for="(item,index) in listArr" :key="index">
            <p>{{item.rate*100}}%</p>
            <div>
              <h5 v-if="item.type=='WK'">刷卡代金券</h5>
              <h5 v-else>养卡代金券</h5>
              <p>{{item.type=='WK' ? '刷卡手续费':'养卡笔数费'}}优惠 <span>满{{item.amountLimit}}元可用</span></p>
              <span>有效期：{{item.startTime}}至{{item.endTime}}</span>
            </div>
          </li>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </ul>
        <div @click="popClose" v-show="popShow" class="popDiv">
          <div @click.stop="" class="contentDiv">
            <i @click="popClose" class="el-icon-close"></i>
            <div class="headDiv">
              <div>
                <p>{{nowObj.rate*100}}%</p>
                <div>
                  <p v-if="nowObj.type=='WK'">刷卡代金券</p>
                  <p v-else>养卡代金券</p>
                  <span>{{nowObj.type=='WK' ? '刷卡手续费':'养卡笔数费'}}优惠</span>
                </div>
              </div>
              <span>有效期：{{nowObj.startTime}}至{{nowObj.endTime}}</span>
            </div>
            <div class="codeDiv">
              <p>扫码免费领取代金券</p>
              <div id="couponQrCode">
                
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    let me = this
    return {
      count: 20,
      loading: false,
      popShow: false,
      nowObj: {},
      listArr: [],
      pageCount: 1
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
  },
  methods: {
    popClose () {
      this.popShow = false
      let mbDiv = document.querySelector('#couponQrCode')
      mbDiv.childNodes.forEach(item => {
        mbDiv.removeChild(item)
      });
    },
    createCode (item) {
      this.nowObj = item
      let vm = this
      this.popShow = true
      let mbDiv = document.querySelector('#couponQrCode')
      var qrcode = new QRCode(mbDiv, {
        text: `http://jyhbban.llyzf.cn/lly-posp-proxy/toRegisterPage.app?phone=${JSON.parse(this.$stact.state.token)[0].phone}&product=CFY&couponsId=${item.id}`,
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      })
      
      let newImgDom = this.convertCanvasToImage(mbDiv.childNodes[0])
      mbDiv.append(newImgDom)
      mbDiv.removeChild(mbDiv.childNodes[0])
      if (mbDiv.childNodes.length==2) {
        mbDiv.removeChild(mbDiv.childNodes[0])
      }
    },
    convertCanvasToImage(canvas){
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '990001',
        '5': vm.pageCount,
        '6': 10,
        '7': 'All',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          if (res.data[39] === '00') {
          console.log(JSON.parse(res.data[57]));
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.startTime=this.$moment(item.effectTime.time).format('YYYY-MM-DD')
              item.endTime=this.$moment(item.failureTime.time).format('YYYY-MM-DD')
              this.listArr.push(item)
            });
            this.pageCount++
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

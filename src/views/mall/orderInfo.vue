<template>
  <div class='hundred orderInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <span v-if="item.status=='10J'||item.status=='10A'">待支付</span>
      <span v-if="item.status=='10B'">待发货</span>
      <span v-if="item.status=='10C'">已发货</span>
      <span v-if="item.status=='10D'">已收货</span>
      <span v-if="item.status=='10F'">已取消</span>
      <span v-if="item.status=='70A'">支付失败</span>
      <img v-if="item.status=='10F' || item.status=='70A'" src="../../assets/mall/cha.png" alt="">
      <img v-if="item.status=='10C' || item.status=='10D'" src="../../assets/mall/gou.png" alt="">
      <img v-if="item.status=='10B' || item.status=='10J'||item.status=='10A'" src="../../assets/mall/shijian.png" alt="">
    </div>
    <div class="contentDiv">
      <div class="addressDiv">
        <i class="el-icon-map-location"></i>
        <div>
          <p>{{name}}  {{phone}}</p>
          <p>{{address}}</p>
        </div>
      </div>
      <div class="spDiv">
        <div class="sp">
          <img :src="item.goodsImage" alt="" srcset="">
          <div>
            <p>{{maxObj.goodsName}}</p>
            <span>已选规格：{{maxObj.goodsType}}</span>
            <div>
              <p>
                <span v-if="maxObj.pay>0">￥{{maxObj.goodsPrice}}</span>
                <span v-if="maxObj.pay>0 && maxObj.goodsPoint>0">+</span>
                <span v-if="maxObj.goodsPoint>0">{{maxObj.goodsPoint}}积分</span>
              </p>
              <span>×{{maxObj.goodsCount}}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <p>商品总价</p>
          <p>
            <span v-if="maxObj.pay>0">￥{{maxObj.goodsPrice*maxObj.goodsCount}}</span>
            <span v-if="maxObj.pay>0 && maxObj.goodsPoint>0">+</span>
            <span v-if="maxObj.goodsPoint>0">{{maxObj.goodsPoint*maxObj.goodsCount}}积分</span>
          </p>
        </div>
        <div class="item">
          <span>需支付</span>
          <p>
            <span v-if="maxObj.pay>0">￥{{maxObj.goodsPrice*maxObj.goodsCount}}</span>
            <span v-if="maxObj.pay>0 && maxObj.goodsPoint>0">+</span>
            <span v-if="maxObj.goodsPoint>0">{{maxObj.goodsPoint*maxObj.goodsCount}}积分</span>
          </p>
        </div>
      </div>
      <div v-if="maxObj.id" class="ordercj">
        <p><span>订单编号</span><span>{{maxObj.id.substring(0,16)}}</span></p>
        <p><span>下单时间</span><span>{{$moment(maxObj.createTime.time).format('YYYY-MM-DD HH:mm:ss')}}</span></p>
        <p v-if="item.status=='10C' || item.status=='10D'"><span>物流单号</span><span>{{maxObj.postNumber}}</span></p>
        <p v-if="item.status=='10C' || item.status=='10D'"><span>物流公司</span><span>{{maxObj.postName}}</span></p>
      </div>
    </div>
    <div v-if="item.status=='10J'||item.status=='10A'" class="btnDiv">
      <p>
        合计：
        <span v-if="maxObj.price>0">￥{{maxObj.goodsPrice*maxObj.goodsCount}}</span>
        <span v-if="maxObj.price>0 && maxObj.goodsPoint>0">+</span>
        <span v-if="maxObj.goodsPoint>0">{{maxObj.goodsPoint*maxObj.goodsCount}}积分</span>
      </p>
      <div @click="pay">立即支付</div>
    </div>
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
      item: {},
      maxObj: {},
      name: '',
      phone: '',
      address: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.item = JSON.parse(this.$route.query.item)
    console.log(this.item);
    this.list()
  },
  methods: {
    pay () {
      this.$router.push({
        name: 'payInfo',
        query: {
          item: JSON.stringify(this.maxObj)
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790107',
        '35': this.item.id,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.name = res.data[31]
            this.phone = res.data[32]
            this.address = res.data[30]
            this.maxObj = JSON.parse(res.data[57])
            console.log(this.maxObj);
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

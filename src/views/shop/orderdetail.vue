<template>
  <div style="padding-top:0;" class="hundred yh-oreder yh-shopdetail yh-paydetail yh-orderdetail">
    <div class="bg-color">
      <div class="fanish">
        <div>
          <div v-show="list.status == '10A' || list.status == '10J'" class="huangse">待支付</div>
          <div v-show="list.status == '70A'" class="huangse">支付失败</div>
          <div v-show="list.status == '10C'" class="huangse">待发货</div>
          <div v-show="list.status == '10B'" class="huangse">支付中</div>
          <div v-show="list.status == '10D'" class="huangse">待签收</div>
          <div v-show="list.status == '10E'" class="huangse">已签收</div>
          <div v-show="list.status == '10F'" class="huangse">已取消</div>
          <!-- <div>等待买家支付</div> -->
        </div>
        <img v-show="list.status == '10A' || list.status == '10J' || list.status == '10C' || list.status == '10B' || list.status == '10D'" src="../../assets/shop/daizf.png" alt="">
        <img v-show="list.status == '10E' || list.status == '70A' || list.status == '10F'" src="../../assets/shop/fanish.png" alt="">
      </div>
      <div class="adress-detail">
        <i class="el-icon-location-information"></i>
        <div>
          <p>{{renname}} {{phone}}</p>
          <p class="clo-font">{{area}}</p>
        </div>
      </div>
    </div>
    <div class="order-detail orderdetail">
      <div class="top-shopdetail">
        <div class="img-left">
          <img :src="list.goodsImage" alt="">
        </div>
        <div class="detail-con">
          <p class="shennue">{{list.goodsName}}</p>
          <p class="num">规格：{{list.goodsSpecification}}</p>
          <p class="price-num">
            <span>{{list.goodsPrice}}  {{list.point ? list.point+'积分': ''}}</span>
            <span><span class="xiao">&#10006;</span> {{list.goodsCount}}</span>
          </p>
        </div>
      </div>
      <div class="shop-all-flex font-huise">
        <span>商品总价</span>
        <span>&yen;{{list.pay}}</span>
      </div>
      <div class="shop-all-flex font-huise">
        <span>运费</span>
        <span>&yen;{{list.freight? list.freight : 0}}</span>
      </div>
      <div class="shop-all-flex">
        <span>需支付</span>
        <span>&yen;{{list.pay}}</span>
      </div>
    </div>
    <div class="xiadan-message">
      <div class="mes-row">
        <span>订单编号</span>
        <span>{{ddbh}}</span>
      </div>
      <div class="mes-row">
        <span>下单时间</span>
        <span v-if="list.createTime != null">{{$moment(list.createTime.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
      </div>
      <div v-if="list.postNumber" class="mes-row">
        <span>物流单号</span>
        <span>{{list.postNumber}}</span>
      </div>
    </div>
    <div v-show="list.status == '10A' || list.status == '10J'" class="goumai">
      <div class="payprice color-font">合计：<span>{{list.pay}}元</span></div>
      <div class="paubtn" @click="paydetail(list)">立即支付</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      list: {},
      renname: '',
      phone: '',
      area: '',
      ddbh:'',
      time: ''
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.parentphone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.id = this.$route.query.id
    this.message()
  },
  mounted () {
  },
  methods: {
    paydetail(item) {
      this.$router.push({name: 'paydetail',query:{item: JSON.stringify(item),type:'2'}})
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790107',
        '35': vm.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.list = JSON.parse(res.data[57])
            console.log(vm.list)
            vm.renname = res.data[31]
            vm.phone = res.data[32]
            vm.area = res.data[30]
            vm.ddbh = vm.list.id.substring(0,16)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

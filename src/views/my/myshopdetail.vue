<template>
  <div class="hundred xykb-shopdetail yh-oreder">
    <div class="top-head-top"></div>
    <ul class='allFlex peopleFlex'>
      <li>
         <span :class="type === 1 ? 'peopleCheck': ''" @click='setType(1)'>
          全部
        </span>
      </li>
      <li>
        <span :class="type === 0 ? 'peopleCheck': ''" @click='setType(0)'>
            已付款
        </span>
      </li>
      <li>
        <span :class="type === 2 ? 'peopleCheck': ''" @click='setType(2)'>
            已发货
        </span>
      </li>
      <li>
        <span :class="type === 3 ? 'peopleCheck': ''" @click='setType(3)'>
            已收货
        </span>
      </li>
    </ul>
    <div class="shezhigaodu">
      <div class="order-detail" v-for="(item,index) in danlist" :key="index">
        <div class="time-status">
          <span>盈管家商城</span>
          <span>{{status[item.status]}}</span>
        </div>
        <div class="top-shopdetail">
          <div class="img-left">
            <img :src="item.image_url" alt="">
          </div>
          <div class="detail-con">
            <div class="price-num">
              <div>
                <div>{{item.goods_name}}</div>
                <div class='redColor fontSmall'>￥{{item.price}}{{item.integral ? ` + ${item.integral}积分` : ''}}</div>
              </div>
              <div class="t-yue">x {{item.count}}</div>
            </div>
          </div>
        </div>
        <div class="shop-num-price"><span>合计:{{item.price}}</span><div class="heji">
          <router-link :to="{name: 'server'}" v-if='!$route.query.shop' tag="div" class="bbtnx">联系客服</router-link>
          <div class='allFlex'>
            <div v-if='$route.query.shop' class="bbtnx" @click='info(item)'>订单信息</div>
            <div v-if='$route.query.shop && item.status == 0' @click='toOrder(item)' class="bbtnx bbMarign">立即发货</div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="13rem"
       title="订单信息"
      :show-close='false'
      :before-close='rewardShow'
      class='shopDia'
      center>
      <div class='shopBack'>
        <div class='popupContent allFlex'>
          <div class='widthShop'>商品名称</div>
          <div class='gary'>{{all.goods_name}}</div>
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>订购数量</div>
          <div class='gary'>{{all.count}}</div>
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>收货人</div>
          <div class='gary'>{{all.name}}</div>
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>联系人</div>
          <div class='gary'>{{all.phone}}</div>
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>收货地址</div>
          <div class='gary'>{{all.address}}</div>
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>订单状态</div>
          <div class='gary'>{{status[all.status]}}</div>
        </div>
      </div>
      <div class='popupContent allFlex justifyBetween'>
          <div class='widthShop'>结算金额</div>
          <div>{{all.price}}</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="13rem"
       title="订单信息"
      :show-close='false'
      :before-close='rewardShow'
      class='shopDia'
      center>
      <div class='shopBack whiteShop'>
        <div class='popupContent allFlex'>
          <div class='widthShop'>快递公司</div>
          <input v-model="company" type="text" class='inputShop' placeholder="">
        </div>
        <div class='popupContent allFlex'>
          <div class='widthShop'>物流单号</div>
          <input v-model="order" type="text" class='inputShop' placeholder="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer allFlex justifyBetween">
        <el-button class='org' type="primary" @click="rewardShow()">取消</el-button>
        <el-button class='org' type="primary" @click="getOrder()">立即发货</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import router from '../../router'
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      shapflag: false,
      company: '',
      order: '',
      danlist: [],
      paytype: {
        '10A': '支付宝支付',
        '10B': '微信支付',
        '10C': '余额支付'
      },
      status: {
        0: '已付款',
        2: '已发货',
        3: '已收货'
      },
      callphone: '',
      type: 1,
      centerDialogVisible: false,
      dialogVisible: false,
      all: {}
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
    this.merchantid = JSON.parse(this.$stact.state.token)[0].id
    this.message()
    this.merchantmessage()
  },
  methods: {
    rewardShow () {
      this.centerDialogVisible = false
      this.dialogVisible = false
    },
    info (item) {
      this.centerDialogVisible = true
      this.all = item
      console.log(this.all)
    },
    toOrder (item) {
      this.dialogVisible = true
      this.all = item
    },
    setType (type) {
      this.type = type
      this.message()
    },
    openphone () {
      this.shapflag = true
    },
    closephone () {
      this.shapflag = false
    },
    sureorder (id) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790027',
        '41': id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.$message({
              message: '收货成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            this.message()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': vm.$route.query.shop ? '520122': '520123',
        '42': vm.$route.query.shop ? vm.merchantNo : vm.merchantid,
        '43': vm.type === 1 ? '' : vm.type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if (res.data[45]) {
              vm.danlist = JSON.parse(res.data[45])
            }
          } else {
            if (vm.$route.query.shop) {
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOrder () {
      let vm = this
      if (vm.company.match(/^[ ]*$/)) {
        vm.$message({
          message: '快递公司必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.order.match(/^[ ]*$/)) {
        vm.$message({
          message: '物流单号必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '520125',
        '42': vm.merchantNo,
        '43': vm.all.id,
        '44': vm.company,
        '45': vm.order,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.dialogVisible = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    merchantmessage () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.callphone = res.data[10]
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

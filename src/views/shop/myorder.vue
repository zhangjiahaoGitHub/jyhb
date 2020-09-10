<template>
  <div class="hundred yh-shopdetail yh-oreder">
    <div v-infinite-scroll="load" infinite-scroll-disabled="disabled" class="shezhigaodu">
      <div class="order-detail" v-for="(item,index) in alllist" :key="index"  @click.stop="topay(item.id)">
        <div class="time-status">
          <span>{{$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span v-show="item.status == '10A' || item.status == '10J'" class="huangse">待支付</span>
          <span v-show="item.status == '70A'" class="huangse">支付失败</span>
          <span v-show="item.status == '10C'" class="huangse">待发货</span>
          <span v-show="item.status == '10B'" class="huangse">支付中</span>
          <span v-show="item.status == '10D'" class="huangse">待签收</span>
          <span v-show="item.status == '10E'" class="huangse">已签收</span>
          <span v-show="item.status == '10F'" class="huangse">已取消</span>
          <!-- <span v-show="item.status == '70A'" class="lv">已完成</span> -->
        </div>
        <div class="top-shopdetail">
          <div class="img-left">
            <img :src="item.goodsImage" alt="">
          </div>
          <div class="detail-con">
            <p class="shennue">{{item.goodsName}}</p>
            <p class="num">规格：{{item.goodsSpecification}}</p>
            <p class="price-num">
              <span>{{item.goodsPrice}}  {{item.point ? item.point+'积分': ''}}</span>
              <span><span class="xiao">&#10006;</span> {{item.goodsCount}}</span>
            </p>
          </div>
        </div>
        <div class="shop-num-price">共{{item.goodsCount}}件商品<span style="margin-left:1rem;">小计: <span>&yen;{{item.pay}}  {{item.point ? item.point+'积分': ''}}</span></span> </div>
        <div class="btn-lianxi">
          <div v-show="item.status == '10A' || item.status == '10J'" class="yanse" @click.stop="paydetail(item)">付款</div>
          <div v-show="item.status == '10D'" class="yanse" @click.stop="confirmSh(item,index)">确认收货</div>
          <div v-show="false" class="yanse">查看物流</div>
          <div @click.stop="tocustomer">联系客服</div>
        </div>
      </div>
      <p class="more-b" v-if="loading">加载中...</p>
      <p class="more-b" v-if="!loading">没有更多了</p>
    </div>
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
      drawer: true,
      danlist: [],
      alllist: [],
      loading: false,
      page: 0
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
    this.load()
  },
  computed: {
    noMore () {
      return this.danlist.length == 0
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    confirmSh(item,index){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590019',
        '9': item.id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.alllist[index].status = '10E'
            this.$message({
              message: '签收成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    paydetail(item) {
      this.$router.push({name: 'paydetail',query: {item: JSON.stringify(item),type:'2'}})
    },
    tocustomer () {
      this.$router.push({name: 'customer'})
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.message()
      }, 500)
    },
    topay(id) {
      this.$router.push({name:'orderdetail',query:{id: id}})
    },
    message () {
      let vm = this
      vm.page++
      let parmas = {
        '0': '0700',
        '3': '790105',
        '21': vm.merchantid,
        '22': vm.page,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.danlist = JSON.parse(res.data[40])
            for (let i in vm.danlist) {
              vm.alllist.push(vm.danlist[i])
              console.log(this.alllist);
            }
            this.loading = false
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>

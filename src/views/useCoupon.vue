<template>
    <div class='hundred coupon-layout'>
        <span class="titleRight" @click="toAisle">跳过</span>
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
    toAisle () {
      let vm = this
      if (this.$route.query.aisle == 'YK') {
        vm.$router.replace({ name: 'aisle', query: { item: vm.$route.query.item, money: vm.$route.query.money, aisle: 'YK' } })
      } else if(this.$route.query.aisle == 'WK') {
        vm.$router.replace({ name: 'aisle', query: { item: vm.$route.query.item, money: vm.$route.query.money, aisle: 'WK' } })
      }
    },
    createCode (item) {
      let vm = this
      if (this.$route.query.aisle == 'YK') {
        vm.$router.push({
          name: 'aisle',
          query: {
            item: vm.$route.query.item,
            money: vm.$route.query.money,
            aisle: 'YK',
            couponId: item.id,
            couponMoney: item.amountLimit
          }
        })
      } else if(this.$route.query.aisle == 'WK'){
        vm.$router.push({
          name: 'aisle',
          query: {
            item: vm.$route.query.item,
            money: vm.$route.query.money,
            aisle: 'WK',
            couponId: item.id,
            couponMoney: item.amountLimit
          }
        })
      }
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
        '7': this.$route.query.aisle,
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

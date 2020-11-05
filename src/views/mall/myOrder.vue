<template>
  <div class='hundred myOrder-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
      <li v-for="item in listArr" :key="item.id">
        <p @click="toOrderInfo(item)">{{item.formatTime}}
          <span v-if="item.status=='10J'||item.status=='10A'">待支付</span>
          <span v-if="item.status=='10B'">待发货</span>
          <span v-if="item.status=='10C'">待签收</span>
          <span v-if="item.status=='10D'">已完成</span>
          <span v-if="item.status=='10F'">已取消</span>
          <span v-if="item.status=='70A'">支付失败</span>
        </p>
        <div @click="toOrderInfo(item)" class="spDiv">
          <img :src="item.goodsImage" alt="">
          <div>
            <p>{{item.goodsName}}</p>
            <span>规格：{{item.goodsSpecification}}</span>
            <div>
              <p>
                <span v-if="item.pay>0">￥{{item.goodsPrice}}</span>
                <span v-if="item.pay>0 && item.goodsPoint>0">+</span>
                <span v-if="item.goodsPoint>0">{{item.goodsPoint}}积分</span>
              </p>
              <span>×{{item.goodsCount}}</span>
            </div>
          </div>
        </div>
        <div class="hjDiv">
          共{{item.goodsCount}}件商品
          <p>
            合计:<span v-if="item.pay>0">￥{{item.pay}}</span>
            <span v-if="item.pay>0 && item.goodsPoint>0">+</span>
            <span v-if="item.goodsPoint>0">{{item.goodsPoint*item.goodsCount}}积分</span>
          </p>
        </div>
        <div @click.stop="" class="btnDiv">
          <p @click="$router.push({name: 'customer'})">联系客服</p>
          <p @click="pay(item)" v-if="item.status=='10J'||item.status=='10A'" class="aP">付款</p>
          <p @click="lookWl(item)" v-if="item.status=='10C'" class="aP">查看物流</p>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
    <router-view></router-view>
    <div v-if="wlDiv" class="wlDiv">
      <div>
        <p>查看物流</p>
        <ol>
          <li>物流名称：{{nowItem.postName}}</li>
          <li>物流单号：{{nowItem.postNumber}}</li>
        </ol>
        <div @click="wlDiv=false">取消</div>
      </div>
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
      scroll: '',
      fullscreenLoading: false,
      wlDiv: false,
      nowItem: {},
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
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
    toOrderInfo(item){
      this.$router.push({
        name: 'orderInfo',
        query:{
          item: JSON.stringify(item)
        }
      })
    },
    pay(item){
      this.$router.push({
        name: 'payInfo',
        query: {
          item: JSON.stringify(item),
        }
      })
    },
    lookWl(item){
      this.nowItem = item
      this.wlDiv = true
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790105',
        '21': JSON.parse(this.$stact.state.token)[0].id,
        '22': this.pageCount,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[40]).length
            let getList = JSON.parse(res.data[40])
            getList.forEach(item => {
              item.formatTime = this.$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
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

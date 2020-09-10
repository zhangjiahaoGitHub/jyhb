<template>
  <div class="hundred yh-onlineshop">
    <div class="title-img">
      <img src="../../assets/shop/banner.png" alt="">
    </div>
    <div class="icon-flex">
      <router-link tag="div" :to="{name: 'myorder'}" class="flex-box">
        <div class="img-icon">
          <img src="../../assets/shop/dingdanicon.png" alt="">
        </div>
        <div>我的订单</div>
      </router-link>
      <router-link tag="div" :to="{name: 'mydetail'}" class="flex-box">
        <div class="img-icon">
          <img src="../../assets/shop/adressicon.png" alt="">
        </div>
        <div>我的地址</div>
      </router-link>
    </div>
    <div class="allshop-title">全部商品</div>
    <div v-infinite-scroll="load" infinite-scroll-disabled="disabled" class="yangshi">
      <div class="shop-list">
        <div class="list-box" @click="toshopdetail(item.id)" v-for="(item,index) in alllist" :key="index">
          <div class="img-top">
            <img :src="item.image" alt="">
          </div>
          <div class="shop-name">{{item.name}}</div>
          <div class="price-clo">&yen;{{item.price}}{{item.point ? ' + '+item.point + '积分' : ''}}</div>
        </div>
      </div>
      <p class="more-b" v-if="loading">加载中...</p>
      <p class="more-b" v-if="!loading">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      page: 0,
      count: 10,
      loading: false,
      alllist: [],
      danlist: []
    }
  },
  computed: {
    noMore () {
      return this.danlist.length == 0
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.parentphone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.load()
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.message()
      }, 1000)
    },
    toshopdetail(id) {
      this.$router.push({name:'shopdetail',query:{id: id}})
    },
    message () {
      let vm = this
      vm.page++
      let parmas = {
        '0': '0700',
        '3': '790101',
        '22': vm.page,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.danlist = JSON.parse(res.data[41])
            for (let i in vm.danlist) {
              vm.alllist.push(vm.danlist[i])
            }
            vm.loading = false
          }
        })
        .catch(err => {
          vm.loading = false
          console.log(err)
        })
    }
  }
}
</script>

<template>
  <div class='hundred store-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul v-if="listArr.length>0">
      <li v-for="item in listArr" :key="item.id">
        <img :src="item.bannerUrl" alt="">
        <ol>
          <li @click="toInfo(itemSon)" v-for="itemSon in item.goodsVOList" :key="itemSon.id">
            <img :src="itemSon.url" alt="">
            <p>{{itemSon.goodsName}}</p>
            <p>
              <span v-if="itemSon.price>0">￥{{itemSon.price}}</span>
              <span v-if="itemSon.price>0 && itemSon.point>0">+</span>
              <span v-if="itemSon.point>0">{{itemSon.point}}积分</span>
            </p>
          </li>
        </ol>
      </li>
    </ul>
    <div v-else>
      <img src="../../assets/empty.png" alt="">
      <p>暂无数据</p>
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
      listArr: [],
      item: {},
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.item = JSON.parse(this.$route.query.item)
    this.list()
  },
  methods: {
    toInfo(itemSon){
      this.$router.push({
        name: 'productDetails',
        query: {
          item: JSON.stringify(itemSon)
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792011',
        '10': this.item.id,
        '42': this.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.listArr = JSON.parse(res.data[57])
            console.log(this.listArr);
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

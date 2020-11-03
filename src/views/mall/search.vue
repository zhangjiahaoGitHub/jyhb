<template>
  <div class='hundred search-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <input type="text" v-model="name" name="" id="">
    <img @click="search" src="../../assets/mall/search.png" alt="">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance='20'>
      <li @click="toInfo(item)" v-for="item in listArr" :key="item.id">
        <img :src="item.url" alt="">
        <p>{{item.goodsName}}</p>
        <div>
          <span v-if="item.price>0">￥{{item.price}}</span>
          <span v-if="item.price>0 && item.point>0">+</span>
          <span v-if="item.point>0">{{item.point}}积分</span>
        </div>
      </li>
    </ul>
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
      name: '',
      count: 20,
      loading: true,
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
  watch: {
    '$route' (to, from) {
      if (!(to.name=='productDetails' || to.name=='search' || to.name=='orderFilling' || to.name=='payInfo')) {
        this.$set(this,'count',20)
        this.$set(this,'listArr',[])
        this.$set(this,'pageCount',1)
        this.$set(this,'name','')
      }
    }
  },
  methods: {
    toInfo(item){
      this.$router.push({
        name: 'productDetails',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    search(){
      this.count =20
      this.listArr=[]
      this.pageCount=1
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792018',
        '10': this.name,
        '22': this.pageCount,
        '42': this.merchantNo,
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
            vm.count = JSON.parse(res.data[41]).length
            let getList = JSON.parse(res.data[41])
            getList.forEach(item => {
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

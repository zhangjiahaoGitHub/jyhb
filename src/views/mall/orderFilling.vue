<template>
  <div class='hundred orderFilling-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <p v-if="!addressObj.id" class="dzP" @click="$router.push({name: 'addAddress'})"><i class="el-icon-plus">新建地址</i></p>
    <div @click="$router.push({name:'myAddress',query: {type: 'chose'}})" class="dzDiv" v-else>
      <div>
        <i class="el-icon-map-location"></i>
        <div>
          <p>{{addressObj.name}}<span>{{addressObj.phone}}</span></p>
          <p>{{addressObj.address}}</p>
        </div>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="spDiv">
      <div class="infoDiv">
        <img :src="item.url" alt="">
        <div>
          <p>{{item.goodsName}}</p>
          <span>规格：{{gg}}</span>
          <div>
            <p>
              <span v-if="item.price>0">￥{{item.price}}</span>
              <span v-if="item.price>0 && item.point>0">+</span>
              <span v-if="item.point>0">{{item.point}}积分</span>
            </p>
            <span>×{{num}}</span>
          </div>
        </div>
      </div>
      <p><span>备注</span><input v-model="bz" type="text" placeholder="选填：可填写商品相关的备注信息"></p>
      <div class="numDiv">
        共{{num}}件商品
        <p>
          合计：
          <span v-if="item.price>0">{{item.price*num}}元</span>
          <span v-if="item.price>0 && item.point>0">+</span>
          <span v-if="item.point>0">{{item.point*num}}积分</span>
        </p>
      </div>
    </div>
    <div class="btnDiv">
      <p>
        合计：
        <span v-if="item.price>0">{{item.price*num}}元</span>
        <span v-if="item.price>0 && item.point>0">+</span>
        <span v-if="item.point>0">{{item.point*num}}积分</span>
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
      gg: '',
      num: '',
      bz: '',
      fullscreenLoading: false,
      addressObj: {},
      item: {},
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.item = JSON.parse(this.$route.query.item)
    this.gg = this.$route.query.gg
    this.num = this.$route.query.num
    console.log(this.item);
    if (window.sessionStorage.getItem('addressObj')!='null') {
      this.addressObj = JSON.parse(window.sessionStorage.getItem('addressObj'))
      window.sessionStorage.setItem('addressObj',null)
    }else{
      this.list()
    }
  },
  methods: {
    pay () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790103',
        '6': JSON.parse(this.$stact.state.token)[0].id,
        '7': this.item.id,
        '9': this.addressObj.id,
        '10': this.gg,
        '11': this.num,
        '12': this.bz,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$router.push({
              name: 'payInfo',
              query: {
                item: res.data[57]
              }
            })
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
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590012',
        '9': JSON.parse(this.$stact.state.token)[0].id,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            JSON.parse(res.data[40]).forEach(item => {
              if (item.status==1) {
                this.addressObj = item
              }
            });
            console.log(this.addressObj);
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

<template>
  <div class='hundred productDetails-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <img :src="dataObj.image" alt="">
      <p>
        <span v-if="dataObj.price>0">￥{{dataObj.price}}</span>
        <span v-if="dataObj.price>0 && dataObj.point>0">+</span>
        <span v-if="dataObj.point>0">{{dataObj.point}}积分</span>
      </p>
      <span>{{dataObj.name}}</span>
      <div>
        <span>请选:规格</span>
        <span>邮费：{{dataObj.freight}}元</span>
      </div>
    </div>
    <div class="infoDiv">
      <p>商品介绍</p>
      <img :src="dataObj.detailImage" alt="">
    </div>
    <div class="bottomDiv">
      <p>
        <span v-if="dataObj.price>0">{{dataObj.price}}元</span>
        <span v-if="dataObj.price>0 && dataObj.point>0">+</span>
        <span v-if="dataObj.point>0">{{dataObj.point}}积分</span>
      </p>
      <div @click="popDiv=true">立即购买</div>
    </div>
    <div v-if="popDiv" class="popDiv">
      <div>
        <i @click="popDiv=false" class="el-icon-circle-close"></i>
        <div class="spDiv">
          <img :src="dataObj.image" alt="">
          <div>
            <p>
              <span v-if="dataObj.price>0">￥{{dataObj.price}}</span>
              <span v-if="dataObj.price>0 && dataObj.point>0">+</span>
              <span v-if="dataObj.point>0">{{dataObj.point}}积分</span>
            </p>
            <span>库存：{{dataObj.inventory}}件</span>
            <div v-if="gg">已选：“{{gg}}”</div>
            <div v-else>请选择：规格</div>
          </div>
        </div>
        <p>规格</p>
        <ul>
          <li :class="gg==item?'aLi':''" @click="gg=item" v-for="(item,index) in (dataObj.specification.split(','))" :key="index">{{item}}</li>
        </ul>
        <div class="numDiv">
          <span>购买数量</span>
          <el-input-number size="mini" v-model="num" :min="1" :max="dataObj.inventory"></el-input-number>
        </div>
        <div class="btnDiv">
          <p @click="toOrderFilling">立即购买</p>
        </div>
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
      num: '',
      fullscreenLoading: false,
      popDiv: false,
      item: {},
      dataObj: {},
      gg: '',
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
    toOrderFilling(){
      if (!this.gg) {
        this.$message({
          message: '请选择规格',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({
        name: 'orderFilling',
        query: {
          item: this.$route.query.item,
          num: this.num,
          gg: this.gg
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790102',
        '22': this.item.id,
        '42': this.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.dataObj = JSON.parse(res.data[40])
            console.log(this.dataObj);
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

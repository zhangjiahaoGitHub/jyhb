<template>
  <div class="hundred yh-shopdetail">
    <div class="img-detail">
      <img :src="list.image" alt="">
    </div>
    <div class="shop-name">
      <div class="price">&yen;{{Number(list.price).toFixed(2)}}{{list.point ? ' + '+Number(list.point).toFixed(2) + '积分' : ''}}</div>
      <div class="content">{{list.name}}</div>
      <div class="guige">
        <span>请选:规格</span>
        <span>邮费：{{list.freight}}元</span>
      </div>
    </div>
    <div class="jieshao">
      <p>商品介绍</p>
      <div>
        <img :src="list.detailImage" alt="">
      </div>
    </div>
    <div class="goumai">
      <div class="payprice">&yen;{{Number(list.price).toFixed(2)}}{{list.point ? ' + '+Number(list.point).toFixed(2) + '积分' : ''}}</div>
      <div class="paubtn" @click="chooseshop">立即购买</div>
    </div>
    <el-drawer
      title=""
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :with-header="false"
      show-close
      size= "auto"
      >
      <div class="close">
        <i class="el-icon-circle-close" @click.stop="closedrawer"></i>
      </div>
      <div class="top-shopdetail">
        <div class="img-left">
          <img src="../../assets/shop/12.png" alt="">
        </div>
        <div class="detail-con">
          <p class="clo">&yen;{{Number(list.price).toFixed(2)}}{{list.point ? ' + '+Number(list.point).toFixed(2) + '积分' : ''}}</p>
          <p class="num">库存：{{list.inventory}}件</p>
          <p>请选择 规格</p>
        </div>
      </div>
      <div class="guige-title">规格</div>
      <div class="guige-list">
        <div v-for="(item,index) in guigelist" :key="index" :class="index+1 === selectindex ? 'guige-row-s' : 'guige-row'" @click.stop="select(index+1)">{{item}}</div>
      </div>
      <div class="select-num">
        <div>购买数量</div>
        <div class="input-sep">
          <!-- <el-input-number v-model="num" focus='false' :readonly="true" @change="handleChange" :min="1" size="small" label="描述文字"></el-input-number> -->
          <div class="step">
            <div class="jian" @click.stop="jian">-</div>
            <input class="shuliang" type="text" readonly v-model="num">
            <div class="jia" @click.stop="jia">+</div>
          </div>
        </div>
      </div>
      <div class="nowpay" @click="toorder()">立即购买</div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      drawer: false,
      direction: 'btt',
      num: 1,
      id: '',
      list: [],
      guigelist: [],
      selectindex: 0,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.parentphone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.id = this.$route.query.id
    this.message()
  },
  methods: {
    chooseshop() {
      if (Number(this.list.inventory) > 0) {
        this.drawer = true
      }else if(Number(this.list.inventory) == 0){
        this.$message({
          message: '库存为0，请选择其他商品',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
      }
      
    },
    closedrawer() {
      this.drawer = false
    },
    // handleChange(value) {
    //   console.log(value)
    //   this.num = value
    // },
    jian() {
      if (this.num <= 1) {
        return
      }
      this.num--
    },
    jia() {
      this.num++
    },
    handleClose(done) {
      done()
    },
    select (index) {
      console.log(index);
      this.selectindex = index
    },
    toorder() {
      if (this.selectindex == 0) {
        this.$message({
          message: '请先选规格',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }else {
        this.$router.push({name:'order',query:{item: JSON.stringify(this.list),index: this.selectindex,num: this.num}})
      }
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790102',
        '42': vm.merchantNo,
        '22': vm.id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.list = JSON.parse(res.data[40])
            this.$set(this,'guigelist',vm.list.specifications)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

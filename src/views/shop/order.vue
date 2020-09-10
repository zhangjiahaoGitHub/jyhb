<template>
  <div class="hundred yh-shopdetail yh-oreder">
    <div v-if="adress" class="select-adress" @click="romyadress">
      <div class="adress-detail">
        <i class="el-icon-location-information"></i>
        <div>
          <p>{{adress.name}} {{adress.phone}}</p>
          <p class="clo-font">{{adress.address}}</p>
        </div>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="order-detail">
      <div class="top-shopdetail">
        <div class="img-left">
          <img src="../../assets/shop/12.png" alt="">
        </div>
        <div class="detail-con">
          <p class="shennue">{{list.name}}</p>
          <p class="num">已选：{{guige[guigeindex-1]}}</p>
          <p class="price-num">
            <span>&yen;{{Number(list.price).toFixed(2)}}{{list.point ? ' + '+Number(list.point).toFixed(2) + '积分' : ''}}</span>
            <span><span class="xiao">&#10006;</span> {{num}}</span>
          </p>
        </div>
      </div>
      <div class="beizhu">
        <span>备注</span>
        <input type="text" v-model="remarks" placeholder="选填：可填写商品相关的备注信息">
      </div>
      <div class="shop-num-price">共{{num}}件商品    <span class="mar-lefg">合计: <span>&yen;{{Number(list.price).toFixed(2) * num}}{{list.point ? ' + '+Number(list.point).toFixed(2)*num + '积分' : ''}}</span></span> </div>
    </div>
    <router-link tag="div" :to="{name: 'addadress'}" v-if="!adress" class="addadress">
      + 新建地址
    </router-link>
    <div class="goumai">
      <div class="payprice">&yen;{{Number(list.price).toFixed(2) * num}}{{list.point ? ' + '+Number(list.point).toFixed(2)*num + '积分' : ''}}</div>
      <div :class="true ? 'paubtn': 'huise'" @click="topaydetail(list)">立即付款</div>
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
      drawer: true,
      direction: 'btt',
      num: '1',
      id: '',
      list: [],
      guigeindex: '',
      guige: [],
      num: '',
      adress: '',
      remarks: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.parentphone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.id = JSON.parse(this.$stact.state.token)[0].id
    this.list = JSON.parse(this.$route.query.item)
    this.guigeindex = this.$route.query.index
    this.guige = this.list.specifications
    this.num = this.$route.query.num
    this.message()
  },
  methods: {
    topaydetail(item) {
      if(this.adress.length == 0) {
        this.$message({
          message: '暂无地址信息，请添加',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name: 'paydetail',query:{item: JSON.stringify(item),guige: this.guige[this.guigeindex-1],num: this.num,textarea: this.remarks,adressid: this.adress.id}})
    },
    romyadress() {
      this.$router.push({name: 'mydetail',query: {chooseadress: true}})
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590012',
        '9': vm.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            let adresslist = JSON.parse(res.data[40])
            let index = sessionStorage.getItem('choooseindex')
            if (index) {
              vm.adress = adresslist[index]
            }else {
              for (let i in adresslist) {
                if (adresslist[i].status == 1) {
                  vm.adress = adresslist[i]
                }else {
                  vm.adress = adresslist[0]
                }
              }
            }
            sessionStorage.removeItem('choooseindex')
          }else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

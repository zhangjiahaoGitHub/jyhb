<template>
  <div class="hundred yh-paydetail">
    <div class="bg-color">
      <div class="daojishi" v-if="shenyutime >= 0">支付剩余时间: {{fen}}分{{miao}}秒</div>
      <div class="daojishi" v-if="shenyutime < 0">订单关闭</div>
      <div class="pay-order">
        <p class="font-one">{{name}} {{guige}}*{{num}}</p>
        <p class="red-clo">&yen;{{Number(price).toFixed(2) * num}}</p>
        <p class="bianhao">订单编号： {{ddbh}}</p>
      </div>
    </div>
    <div class="select-paystyle">选择支付方式</div>
    <div class="paytype-box">
      <div @click="paytype('1')" class="paytype-row">
        <div>
          <img class="pay-icon" src="../../assets/shop/wx.png" alt="">
          微信支付
        </div>
        <img class="select-btn" :src="typenum == '1' ? require('../../assets/shop/selected.png') : require('../../assets/shop/weiselece.png')" alt="">
      </div>
      <div @click="paytype('2')" class="paytype-row">
        <div>
          <img class="pay-icon" src="../../assets/shop/zfb.png" alt="">
          支付宝支付
        </div>
        <img class="select-btn" :src="typenum == '2' ? require('../../assets/shop/selected.png') : require('../../assets/shop/weiselece.png')" alt="">
      </div>
      <div @click="paytype('3')" class="paytype-row">
        <div>
          <img class="pay-icon" src="../../assets/shop/ye.png" alt="">
          余额支付
        </div>
        <img class="select-btn" :src="typenum == '3' ? require('../../assets/shop/selected.png') : require('../../assets/shop/weiselece.png')" alt="">
      </div>
    </div>
    <div class="pay-btn" @click="toorderdetail">立即支付</div>
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
      num: '',
      item: [],
      guige:'',
      merchantid: '',
      shopid: '',
      adressid: '',
      textarea: '',
      id:'',
      ddbh: '',
      shenyutime: 0,
      fen: 15,
      miao: 0,
      settimeone: null,
      paytypenum: 'wxpay',
      typenum: '1',
      pagetype: '',
      name: '',
      price: ''
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
    this.type= this.$route.query.type
    this.item = JSON.parse(this.$route.query.item)
    if (this.type == '2') {
      this.guige = this.item.goodsSpecification
      this.num = this.item.goodsCount
      this.name = this.item.goodsName
      this.price = this.item.pay
      this.ddbh = this.item.id.substring(0,16)
      this.id = this.item.id
      this.shenyutime = 900000 - (new Date().getTime() - Number(this.item.createTime.time))
    }else {
      this.guige = this.$route.query.guige
      this.shopid = this.item.id
      this.num = this.$route.query.num
      this.adressid = this.$route.query.adressid 
      this.textarea = this.$route.query.textarea
      this.name = this.item.name
      this.price = this.item.price
      this.id = this.item.id
      this.shenyutime = 900000
      this.message()
    }
    
    this.sehnyusettime()
  },
  mounted () {
  },
  methods: {
    paytype(num) {
      if(num=='1') {
        this.paytypenum = 'wxpay'
        this.typenum = '1'
      }else if (num=='2') {
        this.paytypenum = 'alipay'
        this.typenum = '2'
      }else if (num=='3') {
        this.paytypenum = 'ye'
        this.typenum = '3'
      }
    },
    sehnyusettime() {
      let vm = this
      vm.settimeone=setInterval(() => {
        vm.shenyutime = vm.shenyutime - 1000
        vm.fen = parseInt(vm.shenyutime / 1000 / 60)
        vm.miao = parseInt((vm.shenyutime / 1000) - parseInt(vm.fen * 60))
        if (vm.shenyutime < 0) {
          vm.shenyutime == 0
        }
      }, 1000)
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '790103',
        '6': vm.merchantid,
        '7': vm.shopid,
        '9': vm.adressid,
        '10': vm.guige,
        '11': vm.num,
        '12': vm.textarea,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.id = JSON.parse(res.data[57]).id
            vm.ddbh = vm.id.substring(0,16)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    toorderdetail () {
      let vm = this
      if (vm.paytypenum == 'wxpay'){
        this.$message({
          message: '暂未开放',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '790104',
        '21': vm.id,
        '22': vm.merchantid,
        '23': vm.paytypenum,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if(vm.paytypenum == 'alipay') {
              console.log(res.data);
              this.$router.replace({
                name: 'payForm',
                query: {
                  form: res.data[41]
                }
              })
            }else if (vm.paytypenum == 'wxpay') {
              vm.$router.push({ name: 'code', query: { code: res.data[57], logo: 'w' } })
            }else {
              this.$message({
                message: '支付成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'warning'
              })
              this.$router.push({name: 'myorder'})
            }
          }else {
            this.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'warning'
            })
            // this.$router.push({name: 'orderdetail'})
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  destroyed() {
    clearInterval(this.settimeone);
  },
}
</script>

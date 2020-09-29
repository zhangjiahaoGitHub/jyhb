<template>
  <div class='hundred collection-collection'>
    <div class="bank-title">
      <div>到账银行</div>
      <div class="bank-mes">
        <img :src="banks[bankCode] ? require(`../assets/bank/${banks[bankCode]}.png`):require(`../assets/bank/yl.png`)" alt="">
        <span>{{bankDetail}}</span>
        <span>尾号{{bankAccount.substring(bankAccount.length-4,bankAccount.length)}}</span>
      </div>
    </div>
    <div class="collection-inp-box">
      <p>收款金额</p>
      <div class="collection-inp">
        <span class="yen">&yen;</span>
        <span class="inp">{{price+ '.' +pricefloor}}</span>
      </div>
    </div>
    <div v-if="currentValue" class="keyboard">
      <ul class="border_top">
        <li>
          <span @click="chooseNum('7')">
            7
          </span>
          <span @click="chooseNum('8')">
            8
          </span>
          <span @click="chooseNum('9')">
            9
          </span>
        </li>
        <li>
          <span @click="chooseNum('4')">
            4
          </span>
          <span @click="chooseNum('5')">
            5
          </span>
          <span @click="chooseNum('6')">
            6
          </span>
        </li>
        <li>
          <span @click="chooseNum('1')">
            1
          </span>
          <span @click="chooseNum('2')">
            2
          </span>
          <span @click="chooseNum('3')">
            3
          </span>
        </li>
        <li>
          <span @click="chooseNum('0')">
            0
          </span>
          <span @click="chooseNum('.')">
            .
          </span>
          <span @click="chooseNum('delete')">
            <img src="../assets/del.png" alt="">
          </span>
        </li>
      </ul>
    </div>
    <div class="btn-style" @click="aisle=='WK' ? tocollection():toHb()">
      <img src="../assets/bank/white/yl.png" alt="">
      快捷支付
    </div>
    <!-- <div v-if="popShow" class="popDiv">
      <div>
        <p>请选择收款方式</p>
        <p @click="tocollection()">信用卡</p>
        <p @click="toHb">花呗</p>
        <div @click="popShow=false">取消</div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "keyboard",
  props: {
    currentValue: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      price: '0',
      pricefloor: '00',
      floorflag: true,
      drawer: false,
      popShow: false,
      priceall: '',
      version: "",
      merchantNo: "",
      banks: {
        313003: 'bj',
        303: 'gd',
        306: 'gf',
        105: 'js',
        301: 'jt',
        305: 'ms',
        103: 'ny',
        307: 'pa',
        309: 'xy',
        310: 'pf',
        403: 'yz',
        308: 'zs',
        102: 'gs',
        104: 'zg',
        302: 'zx',
        313062: 'sh',
        304: 'hx'
      },
      hblist: [],
      bankDetail: '',
      bankCode: '',
      bankAccount: '',
      aisle: '',
    };
  },
  created() {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    console.log(JSON.parse(this.$stact.state.token)[0]);
    this.bankDetail = JSON.parse(this.$stact.state.token)[0].bankDetail
    this.bankCode = JSON.parse(this.$stact.state.token)[0].bankCode
    this.bankAccount = JSON.parse(this.$stact.state.token)[0].bankAccount
    this.aisle = this.$route.query.aisle
  },
  methods: {
    toShow(){
      if (this.priceall == '' || this.priceall == '0.00') {
        this.$message({
          message: '金额不能为空',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.popShow = true
    },
    tocollection() {
      if (this.priceall == '' || this.priceall == '0.00') {
        this.$message({
          message: '金额不能为空',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name: 'select', query: {money: parseInt(this.priceall)}})
    },
    toHb() {
      this.$router.push({name: 'selectChannel', query: {money: parseInt(this.priceall), aisle: 'HB'}})
    },
    chooseNum(num) {
      if (num != "delete" && num != '.' && this.floorflag) {
        if (this.price == '0') {
          if (num == '0' || num == '00') {
            return
          }else {
            this.price=''
          }
        }
        if(this.price.length == 6) {
          return
        }
        this.price = this.price + num
      } else{
        if (num == '.') {
          if (this.price == '0') {
            return
          }else {
            this.floorflag = false
            return
          }
        }
        if (this.floorflag === false && num != 'delete') {
          if (this.pricefloor == '00') {
            this.pricefloor = num + '0'
          }else if (this.pricefloor.substring(1,2) == '0') {
            this.pricefloor = this.pricefloor.substring(0,1) + num
          }
        }
      }
      if (num == 'delete') {
        if (this.floorflag === false) {
          if (this.pricefloor.substring(1,2) != '0') {
            this.pricefloor = this.pricefloor.substring(0, this.pricefloor.length - 1)+'0'
            console.log(this.pricefloor.substring(1,2));
          }else if (this.pricefloor.substring(1,2) == '0'){
            this.pricefloor = '00'
            this.floorflag = true
            return
          }
        }else {
          this.price = this.price.substring(0, this.price.length - 1)
          if (this.price == '') {
            this.price='0'
          }
        }
      }
      this.priceall = this.price+'.'+this.pricefloor
    }
  }
};
</script>

<template>
  <div class='hundred aisle-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div style="padding:0;" class="tdDiv">
      <ul>
        <li @click="judSel(item.acqcode,index)" v-for="(item,index) in aisleList" :key="index">
          <div class="headDiv">
            <p><img src="../../assets/bank/yl.png" alt="">{{item.channelName}}</p>
            <span @click.stop="toiframimg (item)">限额说明</span>
          </div>
          <div class="contentDiv">
            <div>
              <span>{{item.rate}}</span>
              <div>
                <p>单笔限额：{{item.limit}}</p>
                <p>交易时间：{{item.T0date}}，{{item.remark}}</p>
              </div>
            </div>
            <img :src="nowIndex!==index ? require('../../assets/wxz.png'):require('../../assets/xz.png')" alt="">
          </div>
        </li>
      </ul>
      <div class="btnDiv"><div @click="next">下一步</div></div>
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
      aisleList: [],
      fullscreenLoading: false,
      aisle: '',
      nowIndex: '',
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     if (to.name=='choseChannel' && from.name!='submit') {
  //       if (from.name=='tiedcard' && sessionStorage.getItem('tdkt')=='true') {
  //         sessionStorage.removeItem('tdkt')
  //         this.$set(this.nowAisleObj,'status','开通')
  //         this.$set(this.keepSaveAisleObj,'status','开通')
  //         this.list()
  //       }else{
  //         this.$set(this,'dates',[])
  //         this.$set(this,'children',[])
  //         this.$set(this,'planItem',[])
  //         this.$set(this,'tradeList',[])
  //         this.$set(this,'bank',{})
  //         this.$set(this,'calcList',{40:0,9:0,7:0,41:0})
  //         this.$set(this,'aisle','')
  //         this.$set(this,'hkmoney','')
  //         this.$set(this,'ylmoney','')
  //         this.$set(this,'popShow',false)
  //         this.$set(this,'dataPopShow',false)
  //         this.bank = JSON.parse(this.$route.query.item)
  //         this.aisle = this.$route.query.aisle
  //         this.list()
  //       }
  //     }
  //   }
  // },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.aisle = this.$route.query.aisle
    this.list()
  },
  methods: {
    judSel(acqcode,index){
      let vm = this
      let cardArr = []
      if (this.$store.state.cardOne.ID) {
        cardArr.push(this.$store.state.cardOne.BANK_ACCOUNT)
      }
      if (this.$store.state.cardTwo.ID) {
        cardArr.push(this.$store.state.cardTwo.BANK_ACCOUNT)
      }
      if (this.$store.state.cardThree.ID) {
        cardArr.push(this.$store.state.cardThree.BANK_ACCOUNT)
      }
      let parmas = {
        '0': '0700',
        '3': '393021',
        '35': cardArr.join(','),
        '36': acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.nowIndex = index
          }else{
            this.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    next(){
      if (this.nowIndex==='') {
        this.$message({
          message: '请选择通道',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let planOne = this.$store.state.planOne
      let planTwo = this.$store.state.planTwo
      let planThree = this.$store.state.planThree
      let cardOne = this.$store.state.cardOne
      let cardTwo = this.$store.state.cardTwo
      let cardThree = this.$store.state.cardThree
      let itemArr = []
      if (cardOne.ID) {
        planOne.bindCard = {
          bANK_NAME: cardOne.BANK_NAME,
          bANK_ACCOUNT: cardOne.BANK_ACCOUNT,
          lIMIT_MONEY: cardOne.LIMIT_MONEY,
          cARD_BIT_CODE: cardOne.CARD_BIT_CODE,
          bILL_DAY: cardOne.BILL_DAY,
          day: cardOne.day,
          planCount: cardOne.plancount,
          acqCode: '',
          bANK_ACCOUNT_NAME: cardOne.BANK_ACCOUNT_NAME,
          short_cn_name: cardOne.short_cn_name,
          iD: cardOne.ID,
          bANK_PHONE: cardOne.BANK_PHONE,
          rEPAYMENT_DAY: cardOne.REPAYMENT_DAY,
          iD_CARD_NUMBER: cardOne.ID_CARD_NUMBER,
          is_active: '',
          expdate: cardOne.expdate,
          expand: false,
          type: cardOne.TYPE,
          iNCREASE_LIMIT_STATUS: cardOne.INCREASE_LIMIT_STATUS,
          cvn: cardOne.cvn,
        }
        itemArr.push(planOne)
      }
      if (cardTwo.ID) {
        planTwo.bindCard = {
          bANK_NAME: cardTwo.BANK_NAME,
          bANK_ACCOUNT: cardTwo.BANK_ACCOUNT,
          lIMIT_MONEY: cardTwo.LIMIT_MONEY,
          cARD_BIT_CODE: cardTwo.CARD_BIT_CODE,
          bILL_DAY: cardTwo.BILL_DAY,
          day: cardTwo.day,
          planCount: cardTwo.plancount,
          acqCode: '',
          bANK_ACCOUNT_NAME: cardTwo.BANK_ACCOUNT_NAME,
          short_cn_name: cardTwo.short_cn_name,
          iD: cardTwo.ID,
          bANK_PHONE: cardTwo.BANK_PHONE,
          rEPAYMENT_DAY: cardTwo.REPAYMENT_DAY,
          iD_CARD_NUMBER: cardTwo.ID_CARD_NUMBER,
          is_active: '',
          expdate: cardTwo.expdate,
          expand: false,
          type: cardTwo.TYPE,
          iNCREASE_LIMIT_STATUS: cardTwo.INCREASE_LIMIT_STATUS,
          cvn: cardTwo.cvn,
        }
        itemArr.push(planTwo)
      }
      if (cardThree.ID) {
        planThree.bindCard = {
          bANK_NAME: cardThree.BANK_NAME,
          bANK_ACCOUNT: cardThree.BANK_ACCOUNT,
          lIMIT_MONEY: cardThree.LIMIT_MONEY,
          cARD_BIT_CODE: cardThree.CARD_BIT_CODE,
          bILL_DAY: cardThree.BILL_DAY,
          day: cardThree.day,
          planCount: cardThree.plancount,
          acqCode: '',
          bANK_ACCOUNT_NAME: cardThree.BANK_ACCOUNT_NAME,
          short_cn_name: cardThree.short_cn_name,
          iD: cardThree.ID,
          bANK_PHONE: cardThree.BANK_PHONE,
          rEPAYMENT_DAY: cardThree.REPAYMENT_DAY,
          iD_CARD_NUMBER: cardThree.ID_CARD_NUMBER,
          is_active: '',
          expdate: cardThree.expdate,
          expand: false,
          type: cardThree.TYPE,
          iNCREASE_LIMIT_STATUS: cardThree.INCREASE_LIMIT_STATUS,
          cvn: cardThree.cvn,
        }
        itemArr.push(planThree)
      }
      console.log(itemArr);
      
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '393043',
        '5': 0,
        '35': this.$store.state.planOne.provinceCity,
        '40': JSON.stringify(itemArr),
        '41': this.$store.state.planOne.cityId,
        '42': vm.merchantNo,
        '43': this.aisleList[this.nowIndex].acqcode,
        '59': vm.version
      }
      // 是否返回原卡，回1，不回0
      if (this.$store.state.planOne.backOldCard) {
        parmas[5] = 1
      }
      this.fullscreenLoading = true
      let url = vm.$mdata.mdGet(parmas)
      vm.$http.post(`request.app`,url)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$store.commit('setFinaArr', res.data[57])
            this.$router.push({
              name: 'oneMoreLookPlan',
              query: {
                aisleName: this.aisleList[this.nowIndex].channelName,
                acqcode: this.aisleList[this.nowIndex].acqcode,
                startTime: res.data[14],
                endTime: res.data[15],
                yljze: res.data[11],
                sxfxj: res.data[41],
                sxf: res.data[41],
                bsf: res.data[7],
                planMoney: res.data[13],
                costMoney: res.data[11],
              }
            })
          }else{
            vm.$message({
              type: 'success',
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    toNewIframe(item){
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390013',
        '41': '10B',
        '42': vm.merchantNo,
        '43': 'YK',
        '44': vm.$store.state.cardOne.ID,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'aisleList',JSON.parse(res.data[57]).acqData)
            console.log(this.aisleList);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    bindCard(item){
      this.$router.push({ name: 'tiedcard', query: { item: this.$route.query.item, acqcode: item.acqcode } })
    },
    toiframimg (item) {
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
  }
}
</script>

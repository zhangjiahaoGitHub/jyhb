<template>
  <div class='hundred addPlan-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <p>*请选择预留金最大的主卡设置计划</p>
    <div class="choseXycard-layout">
      <ul>
        <div v-if="!cardOne.ID" class="airCard">
          <p>主卡</p>
          <div @click="$router.push({name:'choseCard',query:{type:'one'}})">
            <img src="../../assets/repay/addcard.png" alt="">
            <p>点击添加卡片</p>
          </div>
        </div>
        <li @click="$router.push({name:'choseCard',query:{type:'one'}})" v-else>
          <div class="headDiv">
              <p><img :src="banks[cardOne.BANK_NAME]?require(`../../assets/bank/${banks[cardOne.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardOne.short_cn_name}}</p>
              <span>解绑</span>
          </div>
          <p>{{cardOne.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardOne.BANK_ACCOUNT.substring(cardOne.BANK_ACCOUNT.length-4, cardOne.BANK_ACCOUNT.length)}}</p>
          <ol>
            <li>
              <p>额度</p>
              <p>{{cardOne.LIMIT_MONEY}}</p>
            </li>
            <li>
              <p>账单</p>
              <p>{{cardOne.BILL_DAY}}</p>
            </li>
            <li>
              <p>还款日</p>
              <p>{{cardOne.REPAYMENT_DAY}}</p>
            </li>
            <span @click.stop="popOne=true">{{planOne.debtMoney ? '修改计划':'制定计划'}}</span>
          </ol>
        </li>

        <div v-if="!cardTwo.ID" @click="$router.push({name:'choseCard',query:{type:'two'}})" class="airCard">
          <p>副卡</p>
          <div>
            <img src="../../assets/repay/addcard.png" alt="">
            <p>点击添加卡片</p>
          </div>
        </div>
        <li v-else @click="$router.push({name:'choseCard',query:{type:'two'}})">
          <div class="headDiv">
              <p><img :src="banks[cardTwo.BANK_NAME]?require(`../../assets/bank/${banks[cardTwo.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardTwo.short_cn_name}}</p>
              <span>解绑</span>
          </div>
          <p>{{cardTwo.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardTwo.BANK_ACCOUNT.substring(cardTwo.BANK_ACCOUNT.length-4, cardTwo.BANK_ACCOUNT.length)}}</p>
          <ol>
            <li>
              <p>额度</p>
              <p>{{cardTwo.LIMIT_MONEY}}</p>
            </li>
            <li>
              <p>账单</p>
              <p>{{cardTwo.BILL_DAY}}</p>
            </li>
            <li>
              <p>还款日</p>
              <p>{{cardTwo.REPAYMENT_DAY}}</p>
            </li>
            <span @click.stop="popTwo=true">{{planTwo.debtMoney ? '修改计划':'制定计划'}}</span>
          </ol>
        </li>

        <div v-if="!cardThree.ID" @click="$router.push({name:'choseCard',query:{type:'three'}})" class="airCard">
          <p>副卡</p>
          <div>
            <img src="../../assets/repay/addcard.png" alt="">
            <p>点击添加卡片</p>
          </div>
        </div>
        <li v-else @click="$router.push({name:'choseCard',query:{type:'three'}})">
          <div class="headDiv">
              <p><img :src="banks[cardThree.BANK_NAME]?require(`../../assets/bank/${banks[cardThree.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardThree.short_cn_name}}</p>
              <span>解绑</span>
          </div>
          <p>{{cardThree.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardThree.BANK_ACCOUNT.substring(cardThree.BANK_ACCOUNT.length-4, cardThree.BANK_ACCOUNT.length)}}</p>
          <ol>
            <li>
              <p>额度</p>
              <p>{{cardThree.LIMIT_MONEY}}</p>
            </li>
            <li>
              <p>账单</p>
              <p>{{cardThree.BILL_DAY}}</p>
            </li>
            <li>
              <p>还款日</p>
              <p>{{cardThree.REPAYMENT_DAY}}</p>
            </li>
            <span @click.stop="popThree=true">{{planThree.debtMoney ? '修改计划':'制定计划'}}</span>
          </ol>
        </li>
      </ul>
    </div>
    <div @click="nextep" class="btnDiv">下一步</div>
    <div @click="popOne=false" v-if="popOne" class="popDiv">
      <div @click.stop="">
        <p>制定卡片计划信息</p>
        <ul>
          <li>
            <span>还款金额</span>
            <input v-model="hkjeOne" type="number">
          </li>
          <li>
            <span>城市地区</span>
            <el-cascader
              size="mini"
              separator=" - "
              v-model="children"
              :options="cityList"
              @expand-change="handleChange">
            </el-cascader>
          </li>
          <li>
            <span>还款日期</span>
            <p>{{planOne.endDate}}</p>
          </li>
          <li>
            <span>卡内预留金额</span>
            <input v-model="knylje" type="number">
          </li>
        </ul>
        <div class="backDiv">
          <span>返还原卡</span>
          <el-switch
            v-model="backCard">
          </el-switch>
        </div>
        <div class="popBtn">
          <div @click="oneConfirmAdd">
            确认添加
          </div>
        </div>
      </div>
      <i @click="popOne=false" class="el-icon-circle-close"></i>
    </div>
    <div @click="popTwo=false" v-if="popTwo" class="popDiv">
      <div @click.stop="">
        <p>制定卡片计划信息</p>
        <ul>
          <li>
            <span>还款金额</span>
            <input v-model="hkjeTwo" type="number">
          </li>
          <li>
            <span>还款日期</span>
            <p>{{planTwo.endDate}}</p>
          </li>
        </ul>
        <div class="popBtn">
          <div @click="twoConfirmAdd">
            确认添加
          </div>
        </div>
      </div>
      <i @click="popTwo=false" class="el-icon-circle-close"></i>
    </div>
    <div @click="popThree=false" v-if="popThree" class="popDiv">
      <div @click.stop="">
        <p>制定卡片计划信息</p>
        <ul>
          <li>
            <span>还款金额</span>
            <input v-model="hkjeThree" type="number">
          </li>
          <li>
            <span>还款日期</span>
            <p>{{planThree.endDate}}</p>
          </li>
        </ul>
        <div class="popBtn">
          <div @click="threeConfirmAdd">
            确认添加
          </div>
        </div>
      </div>
      <i @click="popThree=false" class="el-icon-circle-close"></i>
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
      popOne: false,
      popTwo: false,
      popThree: false,
      backCard: false,
      hkjeOne: '',
      hkjeTwo: '',
      hkjeThree: '',
      knylje: '',
      children: [],
      cityList: [],
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
      planOne: {
        // // "provinceCity":"广东省-江门市",
        // provinceCity: '',
        // cityId: '',
        // bankId: '',
        // bankAccount: '',
        // backOldCard: false,
        // // 卡内预留金额
        // balanecMoney: '',
        // // 还款金额
        // debtMoney: '',
        // add: true,
        // // 卡的还款日前3天
        // endDate:"08-10",
      },
      cardOne: {},
      planTwo: {},
      cardTwo: {},
      planThree: {},
      cardThree: {},
    }
  },
  // watch: {
  //   $route(to,from){
  //     debugger
  //     console.log(to.path);
  //   }
  // },
  created () {
    // 一卡多还存在vuex中的数据，在APP.vue中清除

    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.$set(this,'cardOne',this.$store.state.cardOne)
    this.$set(this,'planOne',this.$store.state.planOne)
    if (this.cardOne.ID) {
      this.computeHkr(1)
    }
    this.$set(this,'cardTwo',this.$store.state.cardTwo)
    this.$set(this,'planTwo',this.$store.state.planTwo)
    if (this.cardTwo.ID) {
      this.computeHkr(2)
    }
    this.$set(this,'cardThree',this.$store.state.cardThree)
    this.$set(this,'planThree',this.$store.state.planThree)
    if (this.cardThree.ID) {
      this.computeHkr(3)
    }
    this.city(0)
    console.log(this.cardOne);
  },
  methods: {
    nextep(){
      // 选择卡片数量至少2张，并有主卡
      let cardNum = 0
      // 所选卡是否全部制定计划
      let makeOk = true
      if (this.cardOne.ID) {
        cardNum++
        if (!this.planOne.debtMoney) {
          makeOk = false
        }
      }else{
        this.$message({
          message: '请选择主卡',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.cardTwo.ID) {
        cardNum++
        if (!this.planTwo.debtMoney) {
          makeOk = false
        }
      }
      if (this.cardThree.ID) {
        cardNum++
        if (!this.planThree.debtMoney) {
          makeOk = false
        }
      }
      if (cardNum<2) {
        this.$message({
          message: '至少选择2张卡片',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!makeOk) {
        this.$message({
          message: '请制定计划',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({name: 'choseChannel'})
    },
    // 卡一确定制定计划
    oneConfirmAdd(){
      if (parseFloat(this.hkjeOne)<=0 || this.hkjeOne=='') {
        this.hkjeOne = 0
        this.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.children.length<2) {
        this.$message({
          message: '请选择城市地区',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (parseFloat(this.knylje)<=0 || this.knylje=='') {
        this.knylje = 0
        this.$message({
          message: '请输入卡内预留金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.planOne.debtMoney = this.hkjeOne
      this.planOne.backOldCard = this.backCard
      this.planOne.provinceCity = document.querySelector('.el-input__inner').value
      this.planOne.balanecMoney = this.knylje
      this.planOne.cityId = this.children[1]
      this.planOne.bankId = this.cardOne.ID
      this.planOne.bankAccount = this.cardOne.BANK_ACCOUNT
      this.planOne.add = true
      this.$store.commit('setPlanOne', this.planOne)
      console.log(this.$store.state.planOne);
      this.popOne = false
    },
    twoConfirmAdd(){
      if (parseFloat(this.hkjeTwo)<=0 || this.hkjeTwo=='') {
        this.hkjeTwo = 0
        this.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.planTwo.debtMoney = this.hkjeTwo
      this.planTwo.backOldCard = false
      this.planTwo.provinceCity = ''
      this.planTwo.balanecMoney = ''
      this.planTwo.cityId = ''
      this.planTwo.bankId = this.cardTwo.ID
      this.planTwo.bankAccount = this.cardTwo.BANK_ACCOUNT
      this.planTwo.add = true
      this.$store.commit('setPlanTwo', this.planTwo)
      console.log(this.$store.state.planTwo);
      this.popTwo = false
    },
    threeConfirmAdd(){
      if (parseFloat(this.hkjeThree)<=0 || this.hkjeThree=='') {
        this.hkjeThree = 0
        this.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.planThree.debtMoney = this.hkjeThree
      this.planThree.backOldCard = false
      this.planThree.provinceCity = ''
      this.planThree.balanecMoney = ''
      this.planThree.cityId = ''
      this.planThree.bankId = this.cardThree.ID
      this.planThree.bankAccount = this.cardThree.BANK_ACCOUNT
      this.planThree.add = true
      this.$store.commit('setPlanThree', this.planThree)
      console.log(this.$store.state.planThree);
      this.popThree = false
    },
    computeHkr(num){
      let yue = this.$moment().format('MM')
      let today = parseInt(this.$moment().format('DD'))
      let cardHkDay = 0
      switch (num) {
        case 1:
          cardHkDay = parseInt(this.cardOne.REPAYMENT_DAY)
          break;
      
        case 2:
          cardHkDay = parseInt(this.cardTwo.REPAYMENT_DAY)
          break;
      
        default:
          cardHkDay = parseInt(this.cardThree.REPAYMENT_DAY)
          break;
      }
      let endDate = ''
      if ((cardHkDay-3)>=today) {
        yue = this.$moment().format('MM')
        endDate = `${yue}-${cardHkDay-3}`
      }else{
        yue = this.$moment().subtract(-1, 'month').format('MM')
        endDate = `${yue}-${cardHkDay-3}`
      }
      // 当卡的还款日小于4，即1,2,3时
      if (cardHkDay<4) {
        yue = this.$moment().subtract(-2, 'month').format('MM')
        endDate = this.$moment(`${yue}-${cardHkDay}`).subtract(3, 'days').format("MM-DD")
      }
      switch (num) {
        case 1:
          this.planOne.endDate = endDate
          break;
      
        case 2:
          this.planTwo.endDate = endDate
          break;
      
        default:
          this.planThree.endDate = endDate
          break;
      }
    },
    handleChange (value, label) {
      this.planItem=[]
      this.city(value[0])
    },
    city (type) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490004',
        '41': type,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if (type === 0) {
              JSON.parse(res.data[38]).map((x, i) => {
                vm.cityList.push({
                  value: x.id,
                  label: x.divisionName,
                  children: []
                })
              })
            } else {
              vm.cityList.map((c, z) => {
                if (c.value === type) {
                  c.children = []
                  JSON.parse(res.data[38]).map((y, w) => {
                    c.children.push({
                      value: y.id,
                      label: y.divisionName
                    })
                  })
                }
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toNewIframe(item){
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '393045',
        '41': vm.$route.query.id,
        '43': vm.activeName,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.formatTime = this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm:ss')
            })
            this.$set(this,'listArr',dataArr)
            console.log(this.listArr);
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

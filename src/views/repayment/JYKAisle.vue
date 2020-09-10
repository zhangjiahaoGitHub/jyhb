<template>
  <div class='hundred JYKAisle-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="aisle-layout">
      <div class="cardDiv">
        <div>
          <div>
            <p><img :src="banks[bank.BANK_NAME]?require(`../../assets/bank/${banks[bank.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{bank.short_cn_name}}</p>
            <span>{{bank.BANK_ACCOUNT.substring(0,4)}} **** **** {{bank.BANK_ACCOUNT.substring(bank.BANK_ACCOUNT.length-4,bank.BANK_ACCOUNT.length)}}</span>
          </div>
          <ul>
            <li>
              <p>额度</p>
              <span>{{bank.LIMIT_MONEY}}</span>
            </li>
            <li>
              <p>账单日</p>
              <span>{{bank.BILL_DAY}}</span>
            </li>
            <li>
              <p>还款日</p>
              <span>{{bank.REPAYMENT_DAY}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="tdDiv">
      <p>选择通道</p>
      <ul>
        <li v-for="(item,index) in aisleList" :key="index">
          <div class="headDiv">
            <p><img src="../../assets/bank/yl.png" alt="">{{item.channelName}}</p>
            <span @click="toiframimg (item)">限额说明</span>
          </div>
          <div class="contentDiv">
            <div>
              <span>{{item.rate}}</span>
              <div>
                <p>单笔限额：{{item.limit}}</p>
                <p>交易时间：{{item.T0date}}，{{item.remark}}</p>
              </div>
            </div>
            <span @click="bindCard(item)" v-if="item.status!='开通'">立即报备</span>
            <img v-else @click="nowIndex=index" :src="nowIndex!==index ? require('../../assets/wxz.png'):require('../../assets/xz.png')" alt="">
          </div>
        </li>
      </ul>
      <div class="btnDiv"><div @click="finishChoseAisle">提交计划预览</div></div>
    </div> -->
    <ul>
      <li>
        <span>还款金额</span>
        <input @change="planItem=[]" v-model='hkmoney' type="number" placeholder="请输入还款金额">
      </li>
      <li>
        <span>预留金额</span>
        <input @change="planItem=[]" v-model='ylmoney' type="number" placeholder="请输入预留金额">
      </li>
      <li>
        <span>还款日期</span>
        <!-- <el-date-picker
          @change="planItem=[]"
          type="dates"
          v-model="dates"
          size="mini"
          value-format='yyyy-MM-dd'
          :picker-options="pickerOptions"
          placeholder="请选择日期">
        </el-date-picker> -->
        <div class="bothDiv">
          <el-date-picker
            v-model="value1"
            align="right"
            type="date"
            value-format='yyyy-MM-dd'
            size="mini"
            placeholder="开始日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
          -
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            value-format='yyyy-MM-dd'
            size="mini"
            placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
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
        <span>周转金总额</span>
        <div class="iptDiv"><span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span><i v-if="planItem.length>0" @click="dataPopShow=true" class="el-icon-warning-outline"></i><p @click="planJYk">计算周转金</p></div>
      </li>
    </ul>

    <div class="bottomDiv">
      <div class="btnDiv">
        <p @click="lrtj">懒人推荐</p>
        <p @click="nextStep()">下一步</p>
      </div>
      <p>温馨提示<br/>为了让您的信用卡账单更加完美健康，本还款将采取资金过渡的方式进行，消费出来的金额由第二天再还款进去，资金由保险公司提供安全保障，请放心制定。</p>
    </div>
    <div class="aisle-layout aislePop" v-if="aislePop">
      <div class="titleDiv">
        <img @click="aisleBack" src="../../assets/leftArrow.png" alt="">
        <span>选择通道</span>
        <span></span>
      </div>
      <div class="tdDiv">
        <p>选择通道</p>
        <ul>
          <li v-for="(item,index) in aisleList" :key="index">
            <div class="headDiv">
              <p><img src="../../assets/bank/yl.png" alt="">{{item.channelName}}</p>
              <span @click="toiframimg (item)">限额说明</span>
            </div>
            <div class="contentDiv">
              <div>
                <span>{{item.rate}}</span>
                <div>
                  <p>单笔限额：{{item.limit}}</p>
                  <p>交易时间：{{item.T0date}}，{{item.remark}}</p>
                </div>
              </div>
              <span @click="bindCard(item)" v-if="item.status!='开通'">立即报备</span>
              <img v-else @click="nowIndex=index" :src="nowIndex!==index ? require('../../assets/wxz.png'):require('../../assets/xz.png')" alt="">
            </div>
          </li>
        </ul>
        <div @click="aisleConfirm" class="btnDiv">确定</div>
      </div>
    </div>
    <div class="aisle-layout">
      <div v-if="dataPopShow" class="dataPopDiv">
        <ul>
          <li>
            <span>周转金</span>
            <span>{{calcList[40]}}</span>
          </li>
          <li>
            <span>还款手续费</span>
            <span>{{calcList[9]}}</span>
          </li>
          <li>
            <span>还款笔数费</span>
            <span>{{calcList[7]}}</span>
          </li>
          <li>
            <span>周转金总额</span>
            <span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
          </li>
        </ul>
        <i @click="dataPopShow=false" class="el-icon-circle-close"></i>
      </div>
    </div>

    <div @click="aislePopShow=false" v-if="aislePopShow" class="JYKpopDiv">
      <div @click.stop="">
        <div class="popHead">
          <div>
            <img src="../../assets/bank/yl.png" alt="">
            <p>{{keepSaveAisleObj.channelName}}</p>
          </div>
          <span>{{keepSaveAisleObj.remark}}</span>
        </div>
        <div class="popContent">
          <span>{{keepSaveAisleObj.rate}}%</span>
          <div>
            <p>单笔限额：{{keepSaveAisleObj.limit}}</p>
            <p>交易时间：{{keepSaveAisleObj.T0date}}</p>
          </div>
        </div>
        <div class="popBtn">
          <p @click="changeAisle">更换通道</p>
          <p @click="changeAisleConfirm">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    let me = this
    return {
      pickerOptions1: {
        disabledDate(time) {
          let a = time.getTime() < Date.now()
          if (me.value2) {
            let b = time.getTime() >= me.$moment(me.value2).valueOf()
            return (a || b)
          }else{
            return a
          }
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          let a = ''
          if (me.value1) {
            a = time.getTime() <= me.$moment(me.value1).valueOf()
          }else{
            a = time.getTime() < Date.now()
          }
          return a
        }
      },
      dates: [],
      value1: '',
      value2: '',
      children: [],
      cityList: [],
      dateList: [],
      searchTime: '',
      endTime: '',
      version: '',
      agentNo: '',
      merchantNo: '',
      aisleList: [],
      // 创建计划后生成的数值
      planItem: [],
      // 查询市，填补planItem
      tradeList: [],
      bank: {},
      aislePop: false,
      popShow: false,
      aislePopShow: false,
      dataPopShow: false,
      fullscreenLoading: false,
      hkmoney: '',
      ylmoney: '',
      aisle: '',
      nowAisleObj: {},
      keepSaveAisleObj: {},
      nowIndex: '',
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
      // 智能还款
      calcList:{
        40: 0,
        41: 0,
        9: 0,
        7: 0,
      },
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name=='JYKAisle' && from.name!='submit') {
        if (from.name=='tiedcard' && sessionStorage.getItem('tdkt')=='true') {
          sessionStorage.removeItem('tdkt')
          this.$set(this.nowAisleObj,'status','开通')
          this.$set(this.keepSaveAisleObj,'status','开通')
          this.list()
        }else{
          // this.$set(this,'dates',[])
          this.$set(this,'value1','')
          this.$set(this,'value2','')
          this.$set(this,'children',[])
          this.$set(this,'planItem',[])
          this.$set(this,'tradeList',[])
          this.$set(this,'bank',{})
          this.$set(this,'calcList',{40:0,9:0,7:0,41:0})
          this.$set(this,'aisle','')
          this.$set(this,'hkmoney','')
          this.$set(this,'ylmoney','')
          this.$set(this,'popShow',false)
          this.$set(this,'dataPopShow',false)
          this.bank = JSON.parse(this.$route.query.item)
          this.aisle = this.$route.query.aisle
          this.list()
        }
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.bank = JSON.parse(this.$route.query.item)
    console.log(this.bank);
    this.aisle = this.$route.query.aisle
    this.list()
    this.city(0)
  },
  methods: {
    aisleBack(){
      this.nowIndex = ''
      this.aislePop = false
      this.aislePopShow = false
    },
    aisleConfirm(){
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
      this.$set(this,'nowAisleObj',JSON.parse(JSON.stringify(this.aisleList[this.nowIndex])))
      this.aislePop = false
      this.aislePopShow = false
    },
    changeAisleConfirm () {
      // this.$set(this,'nowAisleObj',JSON.parse(JSON.stringify(this.keepSaveAisleObj)))
      this.aislePopShow = false
    },
    changeAisle () {
      // this.$set(this,'keepSaveAisleObj',this.aisleList[Math.floor(Math.random()*this.aisleList.length)])
      this.aislePop = true
    },
    lrtj () {
      this.$set(this,'keepSaveAisleObj',JSON.parse(JSON.stringify(this.nowAisleObj)))
      this.aislePopShow = true
    },
    nextStep(){
      let vm = this
      if (vm.calcList[40]==0) {
        vm.$message({
          message: '请先计算周转金',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.planItem.length<1) {
        vm.$message({
          message: '请重新计算周转金',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.planItem.forEach(item => {
        item.planTime = this.$moment(item.time).valueOf()
        item.fromCard = item.cardNo
        item.toCard = item.cardNo
        item.fromBindId = item.bindID
        item.toBindId = item.bindID
        item.fromMoney = item.money
        item.toMoney = item.money
        item.payFee = null
        item.customizecity = document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, '')
        item.cityindustry = vm.tradeList[0].acqMerchantNo
        item.cityindustryName = vm.tradeList[0].acqMerchantName
      });
      console.log(this.planItem);
      vm.$stact.commit('SET_PLAN', vm.planItem)
      vm.$stact.commit('SET_SB', { calcList: vm.calcList, cardList: vm.bank })
      vm.$router.push({ name: 'submit', query: { children: vm.children, hkbs: 1, acqcodeObj: JSON.stringify(this.nowAisleObj), area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), searchTime: vm.searchTime, endTime: vm.endTime, money: vm.hkmoney, tong: vm.aisle } })
    },
    // 查询填补planItem数据
    selectCity(){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.bank.ID,
        '32': vm.children[1],
        '33': vm.nowAisleObj.acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.tradeList = JSON.parse(res.data[38])
            console.log('tradelist',this.tradeList);
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 精养卡
    planJYk(){
      if (this.nowAisleObj.status=='未开通') {
        this.bindCard(this.nowAisleObj)
        return
      }
      let vm = this
      if (vm.hkmoney.match(/^[ ]*$/)) {
        vm.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.ylmoney.match(/^[ ]*$/)) {
        vm.$message({
          message: '请输入预留金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!vm.value1) {
        vm.$message({
          message: '请选择还款开始日期',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!vm.value2) {
        vm.$message({
          message: '请选择还款结束日期',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.children.length<1) {
        vm.$message({
          message: '请选择城市地区',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      // 查询市，填补planItem作用
      this.selectCity()
      // 每次计算周转金，把planItem清空
      this.planItem=[]
      let count = parseInt(vm.$moment(vm.value2).format('DD'))-parseInt(vm.$moment(vm.value1).format('DD'))+1
      for (let index = 0; index < count; index++) {
        let dayStart = parseInt(vm.$moment(vm.value1).format('DD'))+index
        this.dateList.push(`${vm.value1.substring(0,vm.value1.length-2)}${(dayStart.toString()).length<2 ? '0'+dayStart.toString():dayStart.toString()}`)
      }
      // this.dateList = vm.bSort(vm.dates)
      // 还款开始时间
      vm.searchTime = vm.value1
      // vm.searchTime = vm.dateList[0]
      // 还款结束时间
      vm.endTime = vm.value2
      // vm.endTime = vm.dateList[vm.dates.length - 1]
      let parmas = {
        '0': '0700',
        '3': '193000',
        '7': '1',
        '8': vm.hkmoney,
        '9': '1',
        '10': vm.dateList.join(','),
        '11': vm.bank.BANK_ACCOUNT,
        '12': vm.bank.ID,
        '29': 'JYK',
        '35': vm.children[1],
        '36': vm.children[0],
        '42': vm.merchantNo,
        '43': vm.nowAisleObj.acqcode,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.calcList = res.data
            console.log(this.calcList);
            
            vm.planItem = JSON.parse(vm.calcList[57])
            console.log(this.planItem);
            
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    bSort (arr) {
      let len = arr.length
      for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          console.log(Date.parse(arr[j].replace(/-/g, '/')))
          console.log(Date.parse(arr[j + 1].replace(/-/g, '/')))
          if (Date.parse(arr[j].replace(/-/g, '/')) > Date.parse(arr[j + 1].replace(/-/g, '/'))) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      return arr
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
    toNewIframe(item){
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390016',
        '42': vm.merchantNo,
        '43': 'YK',
        '44': vm.bank.ID,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.$set(this,'aisleList',JSON.parse(res.data[57]).acqData)
            this.$set(this,'nowAisleObj',vm.aisleList[Math.floor(Math.random()*vm.aisleList.length)])
            console.log(this.aisleList);
          }
        })
        .catch(err => {
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

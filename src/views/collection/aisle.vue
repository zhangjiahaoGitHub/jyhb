<template>
  <div class='hundred aisle-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
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
    <div class="tdDiv">
      <p>选择通道</p>
      <ul>
        <li v-for="(item,index) in aisleList" :key="index">
          <div class="headDiv">
            <p><img src="../../assets/bank/yl.png" alt=""><span>{{item.channelName}}({{item.acqcode}})</span></p>
            <span @click="toiframimg (item)">限额说明</span>
          </div>
          <div class="contentDiv">
            <div>
              <span>{{item.rate}}</span>
              <div>
                <p>单笔限额：{{item.limit}}</p>
                <p>交易时间：{{item.T0date}}</p>
              </div>
            </div>
            <span @click="bindCard(item)" v-if="item.status!='开通'">立即报备</span>
            <img v-else @click="nowIndex=index" :src="nowIndex!==index ? require('../../assets/wxz.png'):require('../../assets/xz.png')" alt="">
          </div>
        </li>
      </ul>
      <div class="btnDiv"><div @click="finishChoseAisle">提交计划预览</div></div>
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <div @click.stop="">
        <p>计划概览</p>
        <ul>
          <li>
            <span>还款金额</span>
            <input @change="planItem=[]" v-model='money' type="number" placeholder="请输入还款金额">
          </li>
          <li>
            <span>还款日期</span>
            <el-date-picker
              @change="planItem=[]"
              type="dates"
              v-model="dates"
              size="mini"
              value-format='yyyy-MM-dd'
              :picker-options="pickerOptions"
              placeholder="请选择日期">
            </el-date-picker>
          </li>
          <li v-if="aisle=='YK'">
            <span>消还模式</span>
            <el-select @change="planItem=[]" size="mini" v-model="xhms" placeholder="请选择消还模式">
              <el-option
                  v-for="item in xhmsoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li v-if="aisle=='YK'">
            <span>还款笔数</span>
            <el-select v-if="jxType=='YJYK'" @change="planItem=[]" size="mini" v-model="hkbs" placeholder="请选择还款笔数">
              <el-option
                  v-for="item in YJYK"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-select v-else @change="planItem=[]" size="mini" v-model="hkbs" placeholder="请选择还款笔数">
              <el-option
                  v-for="item in hkbsoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
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
          <li v-if="aisle=='YK'">
            <span>周转金总额</span>
            <div class="iptDiv"><span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span><i v-if="planItem.length>0" @click="dataPopShow=true" class="el-icon-warning-outline"></i><p @click="planYk">计算周转金</p></div>
          </li>
          <li v-if="aisle=='QYK'">
            <span>手续费小计</span>
            <div class="iptDiv"><span>{{calcList[41]}}</span><i v-if="planItem.length>0" @click="dataPopShow=true" class="el-icon-warning-outline"></i><p @click="planQYK">计算手续费</p></div>
          </li>
        </ul>
        <div class="btnDiv">
          <div @click="nextStep">下一步</div>
        </div>
      </div>
    </div>
    <div v-if="dataPopShow" class="dataPopDiv">
      <ul>
        <li v-if="aisle=='YK'">
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
        <li v-if="aisle=='YK'">
          <span>周转金总额</span>
          <span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
        </li>
        <li v-if="aisle=='QYK'">
          <span>手续费小计</span>
          <span>{{calcList[41]}}</span>
        </li>
      </ul>
      <i @click="dataPopShow=false" class="el-icon-circle-close"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    let me = this
    return {
      pickerOptions: {
        disabledDate(time) {
          let a = time.getTime() < (Date.now() - 86400000)
          return a
          // if (parseInt(me.bank.BILL_DAY)<parseInt(me.bank.REPAYMENT_DAY)) {
          //   let b = parseInt(me.$moment(time).format('DD'))<parseInt(me.bank.BILL_DAY) || parseInt(me.$moment(time).format('DD'))>(parseInt(me.bank.REPAYMENT_DAY)+3)
          //   return (a || b);
          // }else if(parseInt(me.bank.BILL_DAY)>parseInt(me.bank.REPAYMENT_DAY)){
          //   let c = parseInt(me.$moment(time).format('DD'))<parseInt(me.bank.BILL_DAY) && parseInt(me.$moment(time).format('DD'))>(parseInt(me.bank.REPAYMENT_DAY)+3)
          //   return (a || c);
          // }
        }
      },
      dates: [],
      xhms: '1',
      xhmsoptions: [
        {
          value: '1',
          label: '消一还一'
        },
        {
          value: '2',
          label: '消二还一'
        },
      ],
      hkbs: '1',
      hkbsoptions: [
        {
          value: '1',
          label: '1次/日'
        },
        {
          value: '2',
          label: '2次/日'
        },
        {
          value: '3',
          label: '3次/日'
        },
      ],
      YJYK: [
        {
          value: '1',
          label: '1次/日'
        },
        {
          value: '2',
          label: '2次/日'
        },
        {
          value: '3',
          label: '3次/日'
        },
        {
          value: '4',
          label: '4次/日'
        },
        {
          value: '5',
          label: '5次/日'
        },
        {
          value: '6',
          label: '6次/日'
        },
        {
          value: '7',
          label: '7次/日'
        },
        {
          value: '8',
          label: '8次/日'
        },
        {
          value: '9',
          label: '9次/日'
        },
        {
          value: '10',
          label: '10次/日'
        },
      ],
      children: [],
      cityList: [],
      dateList: [],
      searchTime: '',
      endTime: '',
      version: '',
      agentNo: '',
      merchantNo: '',
      merchantId: '',
      aisleList: [],
      // 创建计划后生成的数值
      planItem: [],
      // 查询市，填补planItem
      tradeList: [],
      bank: {},
      popShow: false,
      dataPopShow: false,
      fullscreenLoading: false,
      money: '',
      aisle: '',
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
      // 精细类型区分
      jxType: '',
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name=='aisle' && !(from.name=='submit' || from.name=='preview')) {
        if (this.$route.query.merchantNo) {
          this.merchantNo = this.$route.query.merchantNo
          this.merchantId = this.$route.query.merchantId
        }else{
          this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
          this.merchantId = JSON.parse(this.$stact.state.token)[0].id
        }
        this.$set(this,'dates',[])
        this.$set(this,'xhms','1')
        this.$set(this,'hkbs','1')
        this.$set(this,'children',[])
        this.$set(this,'planItem',[])
        this.$set(this,'tradeList',[])
        this.$set(this,'bank',{})
        this.$set(this,'calcList',{40:0,9:0,7:0,41:0})
        this.$set(this,'nowIndex','')
        this.$set(this,'aisle','')
        this.$set(this,'money','')
        this.$set(this,'popShow',false)
        this.$set(this,'dataPopShow',false)
        this.bank = JSON.parse(this.$route.query.item)
        this.jxType = this.$route.query.aisle
        this.aisle = this.$route.query.aisle
        if (this.aisle=='YJYK') {
          this.aisle = 'YK'
        }
        this.list()
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    if (this.$route.query.merchantNo) {
      this.merchantNo = this.$route.query.merchantNo
      this.merchantId = this.$route.query.merchantId
    }else{
      this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
      this.merchantId = JSON.parse(this.$stact.state.token)[0].id
    }
    this.bank = JSON.parse(this.$route.query.item)
    console.log(this.bank);

    this.jxType = this.$route.query.aisle
    

    this.aisle = this.$route.query.aisle
    if (this.aisle=='YJYK') {
      this.aisle = 'YK'
    }
    this.list()
    this.city(0)
  },
  methods: {
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
      if (this.aisle=='YK' || this.aisle=='QYK') {
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
        vm.$router.push({ name: 'submit', query: { children: vm.children, hkbs: vm.hkbs, xhms: vm.xhms, acqcodeObj: JSON.stringify(this.aisleList[this.nowIndex]), area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, tong: vm.aisle,merchantNo: vm.merchantNo,merchantId: vm.merchantId } })
      }
    },
    // 查询填补planItem数据
    selectCity(){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.bank.ID,
        '32': vm.children[1],
        '33': vm.aisleList[vm.nowIndex].acqcode,
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
    // 智能还款
    planYk(){
      let vm = this
      if (vm.money.match(/^[ ]*$/)) {
        vm.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.dates.length<1) {
        vm.$message({
          message: '请选择还款日期',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      
      if (this.$route.query.aisle=='YJYK') {
        if (vm.dates.length<2) {
          vm.$message({
            message: '应急还款最少选择2个日期',
            center: true,
            offset: 30,
            duration: 2500,
            type: 'warning'
          })
          return
        }
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
      this.dateList = vm.bSort(vm.dates)
      // 还款开始时间
      vm.searchTime = vm.dateList[0]
      // 还款结束时间
      vm.endTime = vm.dateList[vm.dates.length - 1]
      let parmas = {
        '0': '0700',
        '3': '193000',
        '7': vm.hkbs,
        '8': vm.money,
        '9': vm.xhms,
        '10': vm.dateList.join(','),
        '11': vm.bank.BANK_ACCOUNT,
        '12': vm.bank.ID,
        '35': vm.children[1],
        '36': vm.children[0],
        '42': vm.merchantNo,
        '43': vm.aisleList[vm.nowIndex].acqcode,
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
              type: 'warning'
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    // 空卡还款
    planQYK(){
      let vm = this
      if (vm.money.match(/^[ ]*$/)) {
        vm.$message({
          message: '请输入还款金额',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.dates.length<1) {
        vm.$message({
          message: '请选择还款日期',
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
      this.dateList = vm.bSort(vm.dates)
      // 还款开始时间
      vm.searchTime = vm.dateList[0]
      // 还款结束时间
      vm.endTime = vm.dateList[vm.dates.length - 1]
      let parmas = {
        '0': '0700',
        '3': '390048',
        '7': '1',
        '8': vm.money,
        '10': vm.dateList.join(','),
        '11': vm.bank.BANK_ACCOUNT,
        '12': vm.bank.ID,
        '42': vm.merchantNo,
        '43': vm.aisleList[vm.nowIndex].acqcode,
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
              type: 'warning'
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
    finishChoseAisle(){
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
      this.popShow = true
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
        '3': '390013',
        '42': vm.merchantNo,
        '43': vm.aisle,
        '44': vm.bank.ID,
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
      this.$router.push({ name: 'tiedcard', query: { item: this.$route.query.item, acqcode: item.acqcode,merchantNo: this.merchantNo,merchantId: this.merchantId} })
    },
    toiframimg (item) {
      this.$router.push({ name: 'imgIframe', query: { url: `http://120.78.81.147/icon/icon_channel_${item.acqcode}.png`, title: item.channelName } })
    },
  }
}
</script>

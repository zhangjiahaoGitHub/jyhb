<template>
  <div class='hundred make-layout'>
    <div class="cardDiv">
      <div>
        <img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">
        <div>
          <p>{{cardList.short_cn_name}}<img src="../../assets/my/bankCard/xykLogo.png" alt=""></p>
          <span>**** **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4, cardList.BANK_ACCOUNT.length)}}</span>
        </div>
      </div>
      <ul>
        <li>
          <span>{{cardList.BILL_DAY}}</span>
          <p>账单日</p>
        </li>
        <li>
          <span>{{cardList.REPAYMENT_DAY}}</span>
          <p>还款日</p>
        </li>
        <li>
          <span>{{cardList.LIMIT_MONEY}}</span>
          <p>额度</p>
        </li>
      </ul>
    </div>
    <div class="formDiv">
      <div class="moneyDiv">
        <span>还款金额</span>
        <input type="number" v-model='money' placeholder="请输入还款金额">
      </div>
      <div class="moneyDiv">
        <span>选择商户</span>
        <el-cascader
          size="mini"
          separator=" - "
          v-model="children"
          :options="cityList"
          @expand-change="handleChange">
        </el-cascader>
      </div>
      <h6 style="background:#EEF2FC;">还款时间</h6>
      <el-date-picker
        type="dates"
        v-model="dates"
        size="mini"
        value-format='yyyy-MM-dd'
        :picker-options="pickerOptions"
        placeholder="请选择日期">
      </el-date-picker>
      <span>
        注：计划还款周期不能超过25日
      </span>
      <h6>每日还款笔数</h6>
      <el-select size="mini" v-if="tong != 'QYK'" v-model="value" placeholder="请选择每天笔数">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select size="mini" v-else-if="tong == 'QYK'" v-model="value" placeholder="请选择每天笔数">
        <el-option
            v-for="item in optionx"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="btnDiv" @click="tong != 'QYK'?calculation():calcSmall()">
      计算周转金
    </div>
    <ol>
      <li>
        <span>计算周转金</span>
        <p @click="tong != 'QYK'?calculation():calcSmall()"><i class="el-icon-refresh"></i> 重新计算</p>
      </li>
      <li v-if="tong != 'QYK'">
        <span>周转金</span><span v-if="calcList[40]">{{calcList[40]}}</span><span v-else>{{'0.00'}}</span>
      </li>
      <li>
        <span>手续费</span><span v-if="calcList[9]">{{calcList[9]}}</span><span v-else>{{'0.00'}}</span>
      <li>
        <span>笔数费</span><span v-if="calcList[7]">{{calcList[7]}}</span><span v-else>{{'0.00'}}</span>
      </li>
      <li>
        <span>{{tong != 'QYK' ? '周转金总额' : '手续费总额'}}</span><span v-if="calcList[40]">￥{{tong != 'QYK' ? Math.floor(Number(calcList[40])*100+Number(calcList[9])*100+Number(calcList[7])*100)/100 : Math.floor(Number(calcList[9])*100+Number(calcList[7])*100)/100}}</span><span v-else>{{calcList[41]}}</span>
      </li>
    </ol>
    <div class="btnDiv" :class="refer||'garyMake'" @click="refer?sumbitRefer():''">
      下一步
    </div>
    <!-- <div>
        <div class='bankgroud noPadding'>
            <div class='allFlex planBack'>
                <div>
                    <img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/white/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/white/yl.png')" class='bankLogo' />
                    <span class='bankRight'>
                        {{cardList.short_cn_name}}
                    </span>
                </div>
                <div class='textRight'>
                    <div>
                      <span class='repayPadding garyChoose whiteColor repayFont'>尾号{{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4, cardList.BANK_ACCOUNT.length)}}</span>
                    </div>
                </div>
            </div>
            <div class='allFlex choose border planBackx relative'>
                <div class='garyChoose smallFont half textCenter'>
                    <p>{{cardList.LIMIT_MONEY}}</p>
                    <p>额度</p>
                </div>
                <div class='garyChoose smallFont half textCenter'>
                    <p>{{cardList.BILL_DAY}}</p>
                    <p class='leftRight'>账单日</p>
                </div>
                <div class='garyChoose smallFont half textCenter'>
                    <p>{{cardList.REPAYMENT_DAY}}</p>
                    <p>还款日</p>
                </div>
                <div class='leftRaduis'></div>
                <div class='rightRaduis'></div>
            </div>
        </div>
        <div class='planContent'>
          <div class='loginInput regInput noMargin' style='width:100%'>
            <input type="text" class='border' placeholder='请输入金额' v-model='money' @input='IsMoney()'/>
          </div>
          <div class='makePadding'>
            注：还款金额不能低于500，不能超过200000
          </div>
          <el-date-picker
            type="dates"
            v-model="dates"
            value-format='yyyy-MM-dd'
            :picker-options="pickerOptions"
            class="dateInput"
            placeholder="请选择日期">
          </el-date-picker>
          <div class='makePadding'>
            注：计划还款周期不能超过25日
          </div>
          <el-select class='selectEle makeSelect' v-if="tong != 'QYK'" v-model="value" placeholder="请选择每天笔数">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div class='makePadding' v-if="tong != 'QYK'">
            注：想要减少或增加周转金，请拉长还款时间或增加每日还款笔数或减少还款金额。周转金不低于200，不高于10000
          </div>
          <div>
            <div class="block allFlex">
            <div class='makeWidth'>请选择商户： </div>
            <el-cascader class='makeMax'
              separator=" - "
              v-model="children"
              :options="cityList"
              @expand-change="handleChange">
            </el-cascader>
            </div>
          </div>
          <div class='loginTo makeTo'>
            <div class='blue' @click="tong != 'QYK'?calculation():calcSmall()">
              计算周转金
            </div>
          </div>
          <ul v-if='showCalc'>
            <li class='allFlex justifyBetween flexPadding' v-if="tong != 'QYK'">
              <div class='gary'>周转金</div>
              <div>{{calcList[40]}}</div>
            </li>
            <li class='allFlex justifyBetween flexPadding'>
              <div class='gary'>还款手续费</div>
              <div>{{calcList[9]}}</div>
            </li>
            <li class='allFlex justifyBetween flexPadding borderMake'>
              <div class='gary'>还款笔数费</div>
              <div>{{calcList[7]}}</div>
            </li>
            <li class='allFlex justifyBetween flexPadding'>
              <div class='gary'>{{tong != 'QYK' ? '周转金总额' : '手续费总额'}}</div>
              <div>{{tong != 'QYK' ? Math.floor(Number(calcList[40])*100+Number(calcList[9])*100+Number(calcList[7])*100)/100 : Math.floor(Number(calcList[9])*100+Number(calcList[7])*100)/100 }}</div>
            </li>
          </ul>
          <div class='gary makePadding' v-if='!showCalc'>
            注: 点击计算周转金
          </div>
          <div class='loginTo makeTo'>
            <div class='blue' :class="refer||'garyMake'" @click="refer?sumbitRefer():''" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
              下一步
            </div>
          </div>
      </div>
    </div> -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      :show-close='false'
      class='popup'
      center>
      <div>
        <div class='popupTitle'>升级提示</div>
        <div class='popupContent'>升级后，手续费将减少{{calcList[44]}}元,一年将剩下{{calcList[45]}}元，是否前往升级</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="next(1)">下一步</el-button>
        <el-button type="primary" @click="next(2)">前往升级</el-button>
      </span>
    </el-dialog>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  data () {
    let me = this
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      usermerchantNo: '',
      cardList: [],
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
      now: -1,
      money: '',
      timeValue: new Date(),
      timeTwo: new Date(),
      searchTime: '点击选择年月日',
      endTime: '点击选择年月日',
      show: 0,
      type: 0,
      showCalc: 0,
      value: '',
      options: [{
        value: '1',
        label: '每日还款1笔'
      },
      {
        value: '2',
        label: '每日还款2笔'
      },
      {
        value: '3',
        label: '每日还款3笔'
      }],
      valuex: '',
      optionx: [
        {
          value: '3',
          label: '3笔'
        },
        {
          value: '4',
          label: '4笔'
        },
        {
          value: '5',
          label: '5笔'
        },
      ],
      children: [],
      cityList: [],
      calcList: [],
      dateList: [],
      fullscreenLoading: false,
      future: '',
      centerDialogVisible: false,
      refer: 0,
      planItem: [],
      tradeList: [],
      changeNum: 0,
      planTure: 1,
      tong: '',
      pickerOptions: {
        disabledDate(time) {
          let a = time.getTime() < Date.now()
          let endTime = me.$moment().startOf('month').subtract('month', -1).format(`YYYY-MM-DD`) //下个月初
          if (parseInt(me.cardList.BILL_DAY)<parseInt(me.cardList.REPAYMENT_DAY)) {
            let b = parseInt(me.$moment(time).format('DD'))<parseInt(me.cardList.BILL_DAY) || parseInt(me.$moment(time).format('DD'))>parseInt(me.cardList.REPAYMENT_DAY)
            let d = time.getTime() > me.$moment(endTime)
            return (a || b || d);
          }else if(parseInt(me.cardList.BILL_DAY)>parseInt(me.cardList.REPAYMENT_DAY)){
            let c = parseInt(me.$moment(time).format('DD'))<parseInt(me.cardList.BILL_DAY) && parseInt(me.$moment(time).format('DD'))>parseInt(me.cardList.REPAYMENT_DAY)
            endTime = `${endTime.substring(0,endTime.length-2)}${me.cardList.REPAYMENT_DAY}`
            let d = time.getTime() > me.$moment(endTime)
            return (a || c || d);
          }else if (parseInt(me.cardList.BILL_DAY)==parseInt(me.cardList.REPAYMENT_DAY)) {
            let zgy = me.$moment().format('YYYY-MM')+'-'+me.cardList.BILL_DAY
            let xgy = endTime.substring(0,8)+me.cardList.REPAYMENT_DAY
            let b = me.$moment(time).format('YYY-MM-DD')<zgy && me.$moment(time).format('YYY-MM-DD')>xgy
            endTime = `${endTime.substring(0,endTime.length-2)}${me.cardList.REPAYMENT_DAY}`
            let d = time.getTime() > me.$moment(endTime)
            return (a || b || d);
          }
        }
      },
      dates: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.tong = this.$route.query.tong
      if (this.$route.query.item) {
        this.cardList = JSON.parse(this.$route.query.item)
      }
      this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
      this.usermerchantNo=''
      this.usermerchantNo = this.$route.query.merchantNo
      if (this.usermerchantNo) {
        this.merchantNo = this.usermerchantNo
      }
      this.planTure = 1
      if (from.name === 'make') {
      } else if (from.name === 'preview') {} else {
        if (Number(this.$route.query.keep) !== 1) {
          this.money = ''
          // this.searchTime = '点击选择年月日'
          // this.endTime = '点击选择年月日'
          this.dates = []
          this.value = ''
          this.valuex = ''
          this.children = []
          this.showCalc = 0
          this.refer = 0
          this.calcList=[]
        }
      }
    },
    money (n, o) {
      if (Number(this.$route.query.keep) === 1) { // 重新计算周转金 changeNum和 refer 重复了 但我就不改 任性
        this.changeNum = 1
      }
      this.refer = 0
    },
    dates (n, o) {
      if (Number(this.$route.query.keep) === 1) {
        this.changeNum = 1
      }
      this.refer = 0
    },
    // searchTime (n, o) {
    //   if (Number(this.$route.query.keep) === 1) {
    //     this.changeNum = 1
    //   }
    //   this.refer = 0
    // },
    // endTime (n, o) {
    //   if (Number(this.$route.query.keep) === 1) {
    //     this.changeNum = 1
    //   }
    //   this.refer = 0
    // },
    value (n, o) {
      if (Number(this.$route.query.keep) === 1) {
        this.changeNum = 1
      }
      this.refer = 0
    },
    valuex (n, o) {
      if (Number(this.$route.query.keep) === 1) {
        this.changeNum = 1
      }
      this.refer = 0
    },
    children (n, o) {
      if (Number(this.$route.query.keep) === 1) {
        this.changeNum = 1
      }
      this.refer = 0
    }
    // timeValue (n, o) {
    //   let vm = this
    //   let today = vm.$moment().add(1, 'days').format('YYYY-MM-DD')
    //   switch (vm.type) {
    //     case 1:
    //       vm.searchTime = vm.$moment(n).format('YYYY-MM-DD')
    //       vm.future = vm.$moment(n).add(25, 'days').format('YYYY-MM-DD')
    //       break
    //     case 2:
    //       vm.endTime = vm.$moment(n).format('YYYY-MM-DD')
    //       break
    //   }
    //   if (Date.parse(vm.searchTime.replace(/-/g, '/')) > Date.parse(vm.endTime.replace(/-/g, '/'))) {
    //     vm.$message({
    //       message: '开始时间不能大于结束时间',
    //       center: true,
    //       offset: 30,
    //       duration: 2500,
    //       type: 'warning'
    //     })
    //     vm.endTime = '点击选择年月日'
    //   }
    //   if (Date.parse(vm.searchTime.replace(/-/g, '/')) < Date.parse(today.replace(/-/g, '/'))) {
    //     vm.$message({
    //       message: '开始时间不能是过去(包括今天)',
    //       center: true,
    //       offset: 30,
    //       duration: 2500,
    //       type: 'warning'
    //     })
    //     vm.searchTime = today
    //   }
    //   if (Date.parse(vm.endTime.replace(/-/g, '/')) < Date.parse(today.replace(/-/g, '/'))) {
    //     vm.$message({
    //       message: '结束时间不能是过去(包括今天)',
    //       center: true,
    //       offset: 30,
    //       duration: 2500,
    //       type: 'warning'
    //     })
    //     vm.endTime = today
    //   }
    //   if (Date.parse(vm.endTime.replace(/-/g, '/')) > Date.parse(vm.future.replace(/-/g, '/'))) {
    //     vm.$message({
    //       message: '计划还款周期不能超过25日',
    //       center: true,
    //       offset: 30,
    //       duration: 2500,
    //       type: 'warning'
    //     })
    //     vm.endTime = vm.future
    //   }
    //   this.refer = 0
    // }
  },
  created () {
    let me = this
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.cardList = JSON.parse(this.$route.query.item)
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo=''
    this.usermerchantNo = this.$route.query.merchantNo
    if (this.usermerchantNo) {
      this.merchantNo = this.usermerchantNo
    }
    // 默认选中时间
    // let endTime = this.$moment().startOf('month').subtract('month', -1).format(`YYYY-MM-DD`) //下个月初
    
    // endTime = `${endTime.substring(0,endTime.length-2)}${this.cardList.REPAYMENT_DAY}`
    // if (parseInt(me.$moment().format('DD'))<parseInt(me.cardList.BILL_DAY)) {
    //   console.log(me.$moment().daysInMonth())
    //   let by = me.$moment().daysInMonth()
    //   for (let i = parseInt(me.cardList.BILL_DAY); i < by; i++) {
    //     const element = array[i];
        
    //   }
    // }
    // console.log(endTime);
    this.tong = this.$route.query.tong
    this.city(0)
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    IsMoney () { // 限制
      let vm = this
      let value = vm.money
      value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤,此处控制的是如果没有小数点,首位不能为类似于 01、02的金额
        value = parseFloat(value)
      }
      vm.money = value.toString()
    },
    showTime (type) {
      this.show = type
      this.type = type
    },
    getTime () {
      let vm = this
      vm.show = 0
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
    merchantList (type) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.cardList.ID,
        '31': vm.children[0],
        '32': type,
        '33': vm.$route.query.acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.tradeList = JSON.parse(res.data[38])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async todo (begin, end) { // 日期范围之内
      let vm = this
      var arr = []
      var ab = begin.split('-')
      var ae = end.split('-')
      var db = new Date()
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
      var de = new Date()
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000
      for (var k = unixDb; k <= unixDe;) {
        console.log(k)
        console.log(unixDe)
        k = k + 24 * 60 * 60 * 1000
        arr.push(vm.$moment(new Date(parseInt(k))).format('YYYY-MM-DD'))
      }
      vm.dateList = arr
    },
    async calculation () {
      let vm = this
      if (vm.money.match(/^[ ]*$/)) {
        vm.$message({
          message: '金额必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(Number(vm.money) <= 200000 && Number(vm.money) >= 500)) {
        vm.$message({
          message: '还款金额不能低于500,不能超过2000000',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.dates.length < 1) {
        vm.$message({
          message: '必须选择日期',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      // if (vm.searchTime === '点击选择年月日') {
      //   vm.$message({
      //     message: '必须选择日期',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (vm.endTime === '点击选择年月日') {
      //   vm.$message({
      //     message: '必须选择日期',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
      if (vm.value.match(/^[ ]*$/)) {
        vm.$message({
          message: '必须选择每天笔数',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      // if (vm.valuex.match(/^[ ]*$/)) {
      //   vm.$message({
      //     message: '必须选择还款方式',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
      if (vm.children.length === 0) {
        vm.$message({
          message: '必须选择商户地区',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.money < vm.$route.query.couponMoney) {
        vm.$message({
          message: '消费金额未达到该优惠金额限制',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      vm.changeNum = 0
      await vm.merchantList(vm.children[1])
      // await vm.todo(vm.searchTime, vm.endTime)
      // await vm.todo(vm.searchTime, vm.endTime)
      vm.dateList = []
      vm.dateList = await vm.bSort(vm.dates)
      vm.searchTime = vm.dateList[0]
      vm.endTime = vm.dateList[vm.dates.length - 1]
      vm.fullscreenLoading = true
      console.log(vm.merchantNo)
      let parmas = {
        '0': '0700',
        '3': '193000',
        '7': vm.value,
        '8': vm.money,
        '9': 1,
        '10': vm.dateList.toString(),
        '11': vm.cardList.BANK_ACCOUNT,
        '12': vm.cardList.ID,
        '42': vm.merchantNo,
        '43': vm.$route.query.acqcode,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.showCalc = 1
            vm.refer = 1
            vm.planTure = 1
            vm.calcList = res.data
            this.$set(this,'calcList',res.data)
            console.log(this.calcList);
            
            vm.planItem = JSON.parse(vm.calcList[57])
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
          console.log(err)
        })
    },
    async sumbitRefer () {
      let vm = this
      if (vm.changeNum === 1 && Number(vm.$route.query.keep) === 1) {
        vm.$message({
          message: '请重新计算周转金',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.planTure === 1) {
        vm.planItem.map((x, i) => {
          if (x.bindID) {
            x.toCard = x.cardNo
            x.toBindId = x.bindID
            x.toMoney = x.money
            x.customizecity = x.bindID
            x.payFee = null
            x.planTime = Date.parse(x.time.replace(/-/g, '/'))
            x.customizecity = document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, '')
            x.cityindustry = vm.tradeList[0].acqMerchantNo
            x.cityindustryName = vm.tradeList[0].acqMerchantName
            if (i === vm.planItem.length - 1) {
              vm.planItem = JSON.parse(JSON.stringify(vm.planItem).replace(/bindID/g, 'fromBindId').replace(/money/g, 'fromMoney').replace(/cardNo/g, 'fromCard'))
              vm.planTure = 2
              vm.$stact.commit('SET_PLAN', vm.planItem)
              vm.$stact.commit('SET_SB', { calcList: vm.calcList, children: vm.children, cardList: vm.cardList, value: vm.value, valuex: vm.valuex, acqcode: vm.$route.query.acqcode, rate: vm.$route.query.rate, planItem: vm.planItem, searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), tong: vm.tong, merchantNo: vm.usermerchantNo })
              vm.$router.push({ name: 'submit', query: { children: vm.children, value: vm.value, valuex: vm.valuex, acqcode: vm.$route.query.acqcode, rate: vm.$route.query.rate, searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), tong: vm.tong, merchantNo: vm.usermerchantNo } })
            }
          } else {
            vm.planTure = 2
            vm.$stact.commit('SET_PLAN', vm.planItem)
            vm.$stact.commit('SET_SB', { calcList: vm.calcList, children: vm.children, cardList: vm.cardList, value: vm.value, valuex: vm.valuex, acqcode: vm.$route.query.acqcode, rate: vm.$route.query.rate, planItem: vm.planItem, searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), tong: vm.tong, merchantNo: vm.usermerchantNo })
            vm.$router.push({ name: 'submit', query: { children: vm.children, value: vm.value, valuex: vm.valuex, acqcode: vm.$route.query.acqcode, rate: vm.$route.query.rate, searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), tong: vm.tong, merchantNo: vm.usermerchantNo } })
          }
        })
      }
      vm.centerDialogVisible = false
    },
    async calcSmall () {
      let vm = this
      if (vm.money.match(/^[ ]*$/)) {
        vm.$message({
          message: '金额必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(Number(vm.money) <= 200000 && Number(vm.money) >= 500)) {
        vm.$message({
          message: '还款金额不能低于500,不能超过2000000',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.dates.length < 1) {
        vm.$message({
          message: '必须选择日期',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      // if (vm.searchTime === '点击选择年月日') {
      //   vm.$message({
      //     message: '必须选择日期',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (vm.endTime === '点击选择年月日') {
      //   vm.$message({
      //     message: '必须选择日期',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
      if (vm.children.length === 0) {
        vm.$message({
          message: '必须选择商户地区',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.value.match(/^[ ]*$/)) {
        vm.$message({
          message: '请选择还款笔数',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (vm.money < vm.$route.query.couponMoney) {
        vm.$message({
          message: '消费金额未达到该优惠金额限制',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      vm.changeNum = 0
      await vm.merchantList(vm.children[1])
      // await vm.todo(vm.searchTime, vm.endTime)
      vm.dateList = []
      vm.dateList = await vm.bSort(vm.dates)
      vm.searchTime = vm.dateList[0]
      vm.endTime = vm.dateList[vm.dates.length - 1]
      vm.fullscreenLoading = true
      if (vm.usermerchantNo) {
        vm.merchantNo = vm.usermerchantNo
      }
      let parmas = {
        '0': '0700',
        '3': '390048',
        '7': vm.value,
        '8': vm.money,
        '10': vm.dateList.toString(),
        '11': vm.cardList.BANK_ACCOUNT,
        '12': vm.cardList.ID,
        '23': 2,
        '42': vm.merchantNo,
        '43': vm.$route.query.acqcode,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.showCalc = 1
            vm.refer = 1
            vm.planTure = 1
            vm.calcList = res.data
            vm.planItem = JSON.parse(vm.calcList[57])
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
          console.log(err)
        })
    },
    handleChange (value, label) {
      this.city(value[0])
    },
    next (type) {
      let vm = this
      vm.centerDialogVisible = false
      switch (type) {
        case 1:
          // vm.showCalc = 1
          // vm.refer = 1
          vm.$router.push({ name: 'submit', query: { calcList: JSON.stringify(vm.calcList), children: vm.children, cardList: JSON.stringify(vm.cardList), value: vm.value, valuex: vm.valuex, acqcode: vm.$route.query.acqcode, rate: vm.$route.query.rate, planItem: JSON.stringify(vm.planItem), searchTime: vm.searchTime, endTime: vm.endTime, money: vm.money, area: document.querySelector('.el-cascader .el-input__inner').value.replace(/\s*/g, ''), merchantNo: vm.usermerchantNo } })
          break
        case 2:
          vm.$router.push({ name: 'upgrade' })
          break
      }
    }
  }
}
</script>

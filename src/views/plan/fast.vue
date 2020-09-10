<template>
  <div class='hundred'>
    <div style='height:1px'></div>
    <div>
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
            <div class='allFlex choose border planBackx'>
                <div class='garyChoose smallFont half textCenter'>
                    <p>{{cardList.BILL_DAY}}</p>
                    <p>账单日</p>
                </div>
                <div class='garyChoose smallFont half textCenter leftRight'>
                    <p>{{cardList.REPAYMENT_DAY}}</p>
                    <p>还款日</p>
                </div>
                <div class='garyChoose smallFont half textCenter'>
                    <p>{{cardList.LIMIT_MONEY}}</p>
                    <p>额度</p>
                </div>
            </div>
            <div class='leftRaduis'></div>
            <div class='rightRaduis'></div>
        </div>
        <div class='planContent'>
          <div class='loginInput regInput border noMargin' style='width:100%'>
            <input type="text" placeholder='请输入首笔消费金额' v-model='money' @input='IsMoney(1)'/>
          </div>
          <div class='redColor makePadding'>
            注：首笔消费金额不得高于卡里的可用金额
          </div>
          <div class='loginInput regInput border noMargin' style='width:100%'>
            <input type="text" placeholder='请输入计划还款总额(暂无需输入)' v-model='allmoney' readonly @input='IsMoney(2)'/>
          </div>
          <div class='redColor makePadding'>
            注：不输入计划还款总额，默认立马执行首笔消费金额再还款
          </div>
          <el-date-picker
            type="dates"
            v-model="dates"
            value-format='yyyy-MM-dd'
            :picker-options="pickerOptions"
            class="dateInput"
            placeholder="请选择日期">
          </el-date-picker>
          <div class='redColor makePadding'>
            注：计划时间请选择1到10天，为了更好养卡，建议每天消费不超过10笔
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
            <div class='blue' @click="calculation()" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
              提交计划
            </div>
          </div>
      </div>
    </div>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  data () {
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
      teamPlan: {},
      now: -1,
      money: '',
      allmoney: '',
      timeValue: new Date(),
      timeTwo: new Date(),
      searchTime: '点击选择年月日',
      endTime: '点击选择年月日',
      show: 0,
      type: 0,
      showCalc: 0,
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
        disabledDate (time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now()
        }
      },
      dates: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.cardList = JSON.parse(this.$route.query.item)
    this.usermerchantNo = this.$route.query.merchantNo
    if (this.usermerchantNo) {
      this.merchantNo = this.usermerchantNo
    }
    this.tong = this.$route.query.tong
    this.city(0)
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    IsMoney (type) { // 限制
      let vm = this
      let value = 0
      type === 1 ? value = vm.money : value = vm.allmoney
      value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤,此处控制的是如果没有小数点,首位不能为类似于 01、02的金额
        value = parseFloat(value)
      }
      type === 1 ? vm.money = value.toString() : vm.allmoney = value.toString()
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
    bSort (arr) {
      let len = arr.length
      for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      return arr
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
      // if (vm.allmoney.match(/^[ ]*$/)) {
      //   vm.$message({
      //     message: '金额必须填写',
      //     center: true,
      //     offset: 30,
      //     duration: 2500,
      //     type: 'warning'
      //   })
      //   return
      // }
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
      vm.changeNum = 0
      await vm.merchantList(vm.children[1])
      vm.dateList = []
      vm.dateList = await vm.bSort(vm.dates)
      vm.searchTime = vm.dateList[0]
      vm.endTime = vm.dateList[vm.dates.length - 1]
      vm.fullscreenLoading = true
      let parmas = {
        '0': '0700',
        '3': '193000',
        '7': 1,
        '8': vm.allmoney,
        '9': 1,
        '10': vm.dateList.toString(),
        '11': vm.cardList.BANK_ACCOUNT,
        '12': vm.cardList.ID,
        '13': vm.money,
        '14': 0,
        '23': 3,
        '42': vm.merchantNo,
        '43': vm.$route.query.acqcode,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.planItem = JSON.parse(res.data[57])
            vm.teamPlan = res.data
            vm.planItem.map((x, i) => {
              x.toCard = x.cardNo
              x.toBindId = x.bindID
              x.toMoney = x.money
              x.customizecity = x.bindID
              x.payFee = null
              x.planTime = Date.parse(x.time.replace(/-/g, '/'))
              x.customizecity = document.querySelector('.makeMax .el-input__inner').value.replace(/\s*/g, '')
              x.cityindustry = vm.tradeList[0].acqMerchantNo
              x.cityindustryName = vm.tradeList[0].acqMerchantName
              if (i === vm.planItem.length - 1) {
                vm.planItem = JSON.parse(JSON.stringify(vm.planItem).replace(/bindID/g, 'fromBindId').replace(/money/g, 'fromMoney').replace(/cardNo/g, 'fromCard'))
                this.next()
              }
            })
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
    next () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190210',
        '8': vm.money,
        '9': Number(vm.teamPlan[40]) + Number(vm.teamPlan[41]),
        '10': Date.parse(vm.searchTime.replace(/-/g, '/')),
        '11': Date.parse(vm.endTime.replace(/-/g, '/')),
        '12': vm.teamPlan[9],
        '13': vm.teamPlan[7],
        '14': 1,
        '25': '10E',
        '42': vm.merchantNo,
        '43': vm.$route.query.acqcode,
        '57': JSON.stringify(vm.planItem),
        '59': vm.version
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.fullscreenLoading = true
      vm.$http.post('request.app', url)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            if (this.usermerchantNo) {
              vm.$router.push({ name: 'intermediaryagency' })
            } else {
              vm.$router.push({ name: 'repayment' })
            }
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
    handleChange (value, label) {
      this.city(value[0])
    }
  }
}
</script>

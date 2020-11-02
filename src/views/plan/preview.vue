<template>
  <div class='hundred preview-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div style='height:1px'></div>
    <div class="headDiv">
      <div class="cardDiv">
        <div>
          <p><img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardList.short_cn_name}}</p>
          <span>{{cardList.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4,cardList.BANK_ACCOUNT.length)}}</span>
        </div>
        <div>
          <p><img src="../../assets/repay/sz.png" alt="">还款时间</p>
          <span>{{searchTime}}至{{endTime}}</span>
        </div>
      </div>
      <div class="aisleDiv">
        <p v-if="acqcodeArr.length<1">{{acqcodeObj.channelName}}</p>
        <p v-else>{{tdName.join(',')}}</p>
        <div>
          <div>
            <span>{{money}}</span>
            <p>还款总额</p>
          </div>
          <div>
            <p :style="tong=='QYK' ? 'visibility:hidden;':''"><span>周转金总额：</span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</p>
            <p><span>手续费小计：</span>{{(planItem[0].money).toFixed(2)}}<i @click="dataPopShow=true" class="el-icon-warning-outline"></i></p>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for='(item, index) in planItem' :key="index">
        <div>
          <p v-if="tong=='YK' || tong=='JYK'"><span :class="item.type=='sale' ? 'hSpan':''">{{item.type=='sale' ? '消费':'还款'}}</span>{{item.time}}</p>
          <p v-if="tong=='QYK'"><span :class="item.type=='sale' ? 'lSpan':item.type=='pay' ? 'hSpan':''">{{item.type=='sale' ? '手续费':item.type=='pay' ? '消费':'还款'}}</span>{{item.time.substring(0,10)}}</p>
          <span>{{(item.money.toFixed(2))}}</span>
        </div>
        <p v-if="item.type=='sale' && (tong=='YK' || tong=='JYK')">地区：{{item.customizecity}}</p>
        <p v-if="tong=='QYK' && item.type!='payment'">地区：
        <!-- <p v-if="item.type!='payment'">地区： -->
          <el-cascader
              separator=" - "
              class='indexDom'
              :placeholder="item.customizecity"
              :data-myindex='index'
              v-model="cityList[index].value"
              :options="cityList[index].city"
              @change="cascaderChange(index)"
              @expand-change="handleChange">
          </el-cascader>
          <i class="el-icon-arrow-down"></i>
        </p>
        
        <p v-if="item.type=='sale' || item.type=='pay'">商户：
          <el-select class="companySel" size="mini" :data-myindex='index' @change='changeno(index)' v-model="company[index].value">
            <el-option
              v-for="item in company[index].company"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </li>
    </ul>
    <div class='btnDiv'>
        <div class='blue' @click="zhqr=true"  element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
            提交计划
        </div>
    </div>
    <div @click="zhqr=false" v-if="zhqr" class="zhqr">
      <div>
        <div>温馨提示</div>
        <p>我已经确保卡内可用余额大于</p>
        <span v-if="tong!='QYK'">{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
        <span v-else>{{(planItem[0].money).toFixed(2)}}</span>
        <div>
          <p @click.stop="$router.go(-2)">修改计划</p>
          <p @click.stop="(tong == 'YK' || tong=='JYK') ? toYK():toQYK()">提交计划</p>
        </div>
      </div>
    </div>
    <div v-if="dataPopShow" class="aisle-layout">
      <div class="dataPopDiv">
        <ul>
          <li v-if="tong=='YK' || tong=='JYK'">
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
          <li v-if="tong=='YK' || tong=='JYK'">
            <span>周转金总额</span>
            <span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
          </li>
          <li v-if="tong=='QYK'">
            <span>手续费小计</span>
            <span>{{calcList[41]}}</span>
          </li>
        </ul>
        <i @click="dataPopShow=false" class="el-icon-circle-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      version: '',
      agentNo: '',
      merchantNo: '',
      hkbs: '',
      acqcodeObj: {},
      dataPopShow: false,
      zhqr: false,
      number: '',
      money: 0,
      calcList: 0,
      fullscreenLoading: false,
      planItem: [],
      cityList: [],
      company: [],
      now: 0,
      cnow: -1,
      cardList: [],
      children: [],
      acqcodeArr: [],
      tdName: [],
      tdCode: [],
      zhou: 0,
      first: 0
    }
  },
  watch: {
    cnow (n, o) {
      if (this.cnow !== -1) {
        this.merchantList(this.cnow)
      }
    }
  },
  created () {
    let vm = this
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    if (this.$route.query.merchantNo) {
      this.merchantNo = this.$route.query.merchantNo
    }else{
      this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    }
    this.number = Date.parse(new Date())
    this.searchTime = this.$route.query.searchTime
    this.endTime = this.$route.query.endTime
    this.money = this.$route.query.money
    this.hkbs = this.$route.query.hkbs
    this.calcList = this.$stact.state.allSb.calcList
    this.zhou = Math.floor(Number(this.calcList[40]) * 100 + Number(this.calcList[9]) * 100 + Number(this.calcList[7]) * 100) / 100
    this.shou = Math.floor(Number(this.calcList[9]) * 100 + Number(this.calcList[7]) * 100) / 100
    this.planItem = this.$stact.state.planItem
    console.log(this.planItem);
    
    this.cardList = this.$stact.state.allSb.cardList
    this.children = this.$route.query.children
    this.tong = this.$route.query.tong
    // arr为多通道YK
    if (this.$route.query.acqcodeObj) {
      this.$set(this,'acqcodeObj',JSON.parse(this.$route.query.acqcodeObj))
      console.log(this.acqcodeObj);
    }else{
      this.acqcodeArr = JSON.parse(this.$route.query.acqcodeArr)
      this.acqcodeArr.forEach(item => {
        this.tdName.push(item.channelName)
        this.tdCode.push(item.acqcode)
      });
    }
    new Promise((resolve, reject) => {
      this.planItem.map(async (x, i) => {
        this.cityList.push({
          value: '',
          city: []
        })
        this.company.push({
          value: '',
          no: '',
          company: []
        })
        if (vm.acqcodeArr.length<1) {
            await vm.merchantList(i,this.children[0],this.children[1])
        }
        if (vm.planItem.length - 1 === i) {
          await vm.city(0)
          vm.first = 1
          if (vm.acqcodeArr.length<1) {
            // await vm.merchantList(i,this.children[0],this.children[1])
          }else{
            vm.acqcodeArr.forEach(item => {
              vm.moreMerchantList(item.acqcode)
            });
          }
          console.log(this.company);
          
          resolve()
        }
      })
    }).then(r => {
    })
      .catch(error => console.log(error))
  },
  mounted () {
    let vm = this
    let oDiv = document.querySelectorAll('.indexDom')
    for (let i = 0; i < oDiv.length; i++) {
      (function (i) {
        oDiv[i].onclick = function () {
          vm.now = oDiv[i].dataset.myindex
        }
      })(i)
    }
    let cDiv = document.querySelectorAll('.indexDom')
    for (let i = 0; i < cDiv.length; i++) {
      (function (i) {
        cDiv[i].onclick = function () {
          vm.cnow = cDiv[i].dataset.myindex
          console.log(vm.cnow)
        }
      })(i)
    }
  },
  methods: {
    cascaderChange (index) {
      this.merchantList (index,this.cityList[index].value[0],this.cityList[index].value[1])
    },
    handleChange (value) {
      this.cnow = -1
      this.city(value[0])
    },
    changeno (i) {
      console.log(this.company[i])
      this.company[i].no = this.company[i].value
    },
    // 多通道
    moreMerchantList (acqcode) {
      let vm = this
      console.log(this.children)
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.cardList.ID,
        '31': vm.children[0],
        '32': vm.children[1],
        '33': acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            let dataArr = JSON.parse(res.data[38])
            this.planItem.forEach((item,index) => {
              if (item.acqCode==acqcode) {
                dataArr.forEach(itemSon => {
                  vm.company[index].company.push({
                    value: itemSon.acqMerchantNo,
                    label: itemSon.acqMerchantName
                  })
                });
                let cityCray = {}
                cityCray = dataArr[Math.floor(Math.random() * dataArr.length)]
                this.company[index].value = cityCray.acqMerchantName
                this.company[index].no = cityCray.acqMerchantNo
              }
            });
            console.log(this.company);
            
            // vm.company[type].company = []
            // JSON.parse(res.data[38]).map((x, i) => {
            //   vm.company[type].company.push({
            //     value: x.acqMerchantNo,
            //     label: x.acqMerchantName
            //   })
            //   if (JSON.parse(res.data[38]).length - 1 === i && vm.first === 1) {
            //     let cityCray = {}
            //     vm.planItem.map((y, z) => {
            //       cityCray = JSON.parse(res.data[38])[Math.floor(Math.random() * JSON.parse(res.data[38]).length)]
            //       vm.company[z].value = cityCray.acqMerchantName
            //       vm.company[z].no = cityCray.acqMerchantNo
            //     })
            //     vm.first = 0
            //   }
            // })
          }else{
            vm.company[vm.cnow].company = []
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    // 单通道
    merchantList (type,province,city) {
      let vm = this
      console.log(this.children)
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.cardList.ID,
        '31': province,
        '32': city,
        '33': vm.acqcodeObj.acqcode,
        '42': vm.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.company[type].company = []
            JSON.parse(res.data[38]).map((x, i) => {
              vm.company[type].company.push({
                value: x.acqMerchantNo,
                label: x.acqMerchantName
              })
              if (JSON.parse(res.data[38]).length - 1 === i && vm.first === 1) {
                let cityCray = {}
                vm.planItem.map((y, z) => {
                  cityCray = JSON.parse(res.data[38])[Math.floor(Math.random() * JSON.parse(res.data[38]).length)]
                  vm.company[z].value = cityCray.acqMerchantName
                  vm.company[z].no = cityCray.acqMerchantNo
                })
                vm.first = 0
              }
            })
          }else{
            vm.company[vm.cnow].company = []
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    toYK () {
      let vm = this
      let have = false
      document.querySelectorAll('.indexDom').forEach(function (item, index) {
        if (document.querySelectorAll('.indexDom .el-input__inner')[index].value) {
          vm.planItem[item.dataset.myindex].customizecity = document.querySelectorAll('.indexDom .el-input__inner')[index].value.replace(/\s*/g, '')
        }
        if (document.querySelectorAll('.companySel .el-input__inner')[index].value) {
          vm.planItem[item.dataset.myindex].cityindustryName = document.querySelectorAll('.companySel .el-input__inner')[index].value
          vm.planItem[item.dataset.myindex].cityindustry = vm.company[index].no
        } else {
          have = true
        }
      })
      if (have) {
        vm.$message({
          message: '请选择商户',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      let planArr = []
      this.planItem.forEach(item => {
        planArr.push(`{planTime=${item.planTime}, fromCard='${item.fromCard}', toCard='${item.toCard}', fromBindId='${item.fromBindId}', toBindId='${item.toBindId}', fromMoney=${item.fromMoney}, toMoney=${item.toMoney}, payFee=${item.payFee}, status='${item.status}', type='${item.type}', groupNum='${item.groupNum}', customizecity='${item.customizecity}', cityindustry='${item.cityindustry}', cityindustryName='${item.cityindustryName}', acqCode='${item.acqCode}'}`)
      });
      let parmas = {}
      if (this.acqcodeArr.length<1) {
        parmas = {
          '0': '0700',
          '3': '190210',
          '8': vm.money,
          '9': vm.calcList[40],
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '14': vm.hkbs,
          '16': '2',
          '37': '10A',
          '42': vm.merchantNo,
          '43': vm.acqcodeObj.acqcode,
          '44': vm.acqcodeObj.channelName,
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
        if (this.tong=='JYK') {
          parmas[29] = 'JYK'
          parmas[37] = '10C'
        }
      }else{
        parmas = {
          '0': '0700',
          '3': '190210',
          '8': vm.money,
          '9': vm.calcList[40],
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '14': vm.hkbs,
          '16': '2',
          '37': '10A',
          '42': vm.merchantNo,
          '43': this.tdCode.join(','),
          '44': this.tdName.join(','),
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.fullscreenLoading = true
      vm.$http.post('request.app', url)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '提交成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            if (vm.$route.query.tong == 'YK') {
              vm.$router.push({ name: 'selectcard',query:{aisle: 'YK'} })
            }else if (vm.$route.query.tong == 'QYK') {
              vm.$router.push({ name: 'selectcard',query:{aisle: 'QYK'} })
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
    toQYK () {
      let vm = this
      let have = false
      document.querySelectorAll('.indexDom').forEach(function (item, index) {
        if (document.querySelectorAll('.indexDom .el-input__inner')[index].value) {
          vm.planItem[item.dataset.myindex].customizecity = document.querySelectorAll('.indexDom .el-input__inner')[index].value.replace(/\s*/g, '')
        }
        if (document.querySelectorAll('.companySel .el-input__inner')[index].value) {
          vm.planItem[item.dataset.myindex].cityindustryName = document.querySelectorAll('.companySel .el-input__inner')[index].value
          vm.planItem[item.dataset.myindex].cityindustry = vm.company[index].no
        } else {
          have = true
        }
      })
      if (have) {
        vm.$message({
          message: '请选择商户',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      // vm.$confirm('我公司接入人民银行征信系统，网络小额贷款黑名单，支付宝黑名单等多种风控体系。公司将定期将不守信的用户上送各大征信平台。', '提示', {
      //   confirmButtonText: '我会守信',
      //   cancelButtonText: '我不会守信',
      //   type: 'warning'
      // }).then(() => {
        let planArr = []
        this.planItem.forEach(item => {
          planArr.push(`{planTime=${item.planTime}, fromCard='${item.fromCard}', toCard='${item.toCard}', fromBindId='${item.fromBindId}', toBindId='${item.toBindId}', fromMoney=${item.fromMoney}, toMoney=${item.toMoney}, payFee=${item.payFee}, status='${item.status}', type='${item.type}', groupNum='${item.groupNum}', customizecity='${item.customizecity}', cityindustry='${item.cityindustry}', cityindustryName='${item.cityindustryName}', acqCode='${item.acqCode}'}`)
        });
        let parmas = {
          '0': '0700',
          '3': '390049',
          '8': vm.money,
          '9': '0',
          '10': this.$moment(this.searchTime).valueOf(),
          '11': this.$moment(this.endTime).valueOf(),
          '12': vm.calcList[9],
          '13': vm.calcList[7],
          '37': '10B',
          '42': vm.merchantNo,
          '43': vm.acqcodeObj.acqcode,
          '44': vm.acqcodeObj.channelName,
          '57': `[${planArr.toString()}]`,
          '59': vm.version
        }
        vm.$route.query.couponId ? parmas : delete parmas['15']
        let url = vm.$mdata.mdGet(parmas)
        vm.fullscreenLoading = true
        vm.$http.post('request.app', url)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$message({
                message: '提交成功',
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
              vm.$router.push({ name: 'selectcard',query:~{aisle: 'QYK'} })
            } else {
              vm.$message({
                message: res.data.msg,
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
      // }).catch(() => {
      // })
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
              vm.cityList.map((y, z) => {
                JSON.parse(res.data[38]).map((x, i) => {
                  y.city.push({
                    value: x.id,
                    label: x.divisionName,
                    children: []
                  })
                })
              })
            } else {
              vm.cityList[vm.now].city.map((c, z) => {
                if (c.value === type) {
                  c.children = []
                  vm.company[vm.now].value = ''
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
    }
    // handleCompany (is) {
    //   if (is === true) {
    //     this.$nextTick(() => {
    //       this.merchantList(this.cnow)
    //     })
    //   }
    // }
  }
}
</script>

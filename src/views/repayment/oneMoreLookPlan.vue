<template>
  <div class='hundred oneMoreLookPlan-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li v-for="(item,index) in listArr" :key="item.bankAccount">
        <div class="planInfo-layout" style='padding:0;'>
          <div class="cardDiv">
            <div>
              <p><img :src="banks[item.bankCode]?require(`../../assets/bank/${banks[item.bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">{{item.bankName}}</p>
              <span>{{item.bankAccount.substring(0,4)}} **** **** {{item.bankAccount.substring(item.bankAccount.length-4,item.bankAccount.length)}}</span>
            </div>
            <div>
              <p><img src="../../assets/repay/sz.png" alt="">还款时间</p>
              <span>{{startTime.substring(0,10)}}至{{endTime.substring(0,10)}}</span>
            </div>
          </div>
        </div>
        <div class="aisleOrInfo">
          <p>{{aisleName}}</p>
          <p v-if="index>0">还款总额<span>{{item.debtMoney}}</span></p>
          <div v-else>
            <div>
              <span>{{item.debtMoney}}</span>
              <p>还款总额</p>
            </div>
            <div>
              <p><span>预留金总额：</span>{{yljze}}</p>
              <p><span>手续费小计：</span>{{sxfxj}}<i @click="popShow=true" class="el-icon-warning-outline"></i></p>
            </div>
          </div>
        </div>
        <div @click="btnObj[index]=false" v-if="btnObj[index]" class="ocDiv">收起计划<i class="el-icon-arrow-down"></i></div>
        <div @click="btnObj[index]=true" v-else class="ocDiv">查看计划<i class="el-icon-arrow-up"></i></div>
        <ol v-if="btnObj[index]">
          <li v-for="(itemSon,indexSon) in item.planItemList" :key="indexSon">
            <div><p><span :class="itemSon.type=='sale' ? 'xf':''">{{itemSon.type=='sale' ? '消费':'还款'}}</span>{{itemSon.time}}</p>{{itemSon.money}}</div>
            <span v-if="itemSon.type=='sale'">地区：{{itemSon.cityIndustry}}</span>
            <p v-if="itemSon.type=='sale'">商户：
              <el-select @change="selChange(index,indexSon)" size="mini" v-model="itemSon.cityIndustry" placeholder="">
                <el-option
                  v-for="itm in item.shArr"
                  :key="itm.value"
                  :label="itm.label"
                  :value="itm.value">
                </el-option>
              </el-select>
            </p>
          </li>
        </ol>
      </li>
    </ul>
    <div class="footDiv">
      <p>预留金总额：<span>{{yljze}}</span></p>
      <span @click="submit">提交计划</span>
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <div @click.stop="">
        <p><span>还款手续费</span><span>{{sxf}}</span></p>
        <p><span>还款笔数费</span><span>{{bsf}}</span></p>
        <p><span>手续费小计</span><span>{{sxfxj}}</span></p>
      </div>
      <i @click="popShow=false" class="el-icon-circle-close"></i>
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
      fullscreenLoading: false,
      popShow: false,
      listArr: [],
      aisleName: '',
      acqcode: '',
      startTime: '',
      endTime: '',
      yljze: '0',
      sxfxj: '0',
      sxf: '0',
      bsf: '0',
      planMoney: '0',
      costMoney: '0',
      btnObj: {
        '0': true,
        '1': false,
        '2': false,
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.listArr = JSON.parse(this.$store.state.finaArr)
    this.aisleName = this.$route.query.aisleName
    this.acqcode = this.$route.query.acqcode
    this.startTime = this.$route.query.startTime
    this.endTime = this.$route.query.endTime
    this.yljze = this.$route.query.yljze
    this.sxfxj = this.$route.query.sxfxj
    this.sxf = this.$route.query.sxf
    this.bsf = this.$route.query.bsf
    this.planMoney = this.$route.query.planMoney
    this.costMoney = this.$route.query.costMoney
    // this.bank = JSON.parse(this.$route.query.item)
    console.log(this.listArr);
    // this.aisle = this.$route.query.aisle
    // this.list()
    this.listArr.forEach((item,index) => {
      this.merchantList(index,item.cityId)
    });
  },
  methods: {
    submit () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '393044',
        '8': vm.planMoney,
        '9': vm.costMoney,
        // '10': this.$moment(this.startTime).valueOf(),
        // '11': this.$moment(this.endTime).valueOf(),
        '10': this.startTime,
        '11': this.endTime,
        '12': vm.sxf,
        '13': vm.bsf,
        '14': '1',
        '37': '10D',
        '42': vm.merchantNo,
        '43': this.acqcode,
        '44': this.aisleName,
        '57': JSON.stringify(this.listArr),
        '59': vm.version
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
            vm.$router.push({ name: 'selectcard',query:{aisle: 'YK'} })
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
    selChange(index,indexSon) {
      this.listArr[index].shArr.forEach(item => {
        if (item.value==this.listArr[index].planItemList[indexSon].cityIndustry) {
          this.listArr[index].planItemList[indexSon].industryName = item.label
        }
      });
    },
    merchantList (index,city) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '490006',
        '30': vm.listArr[index].bankId,
        '32': city,
        '33': vm.$route.query.acqcode,
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
            this.listArr[index].shArr = []
            dataArr.forEach(item => {
              this.listArr[index].shArr.push({
                value: item.acqMerchantNo,
                label: item.acqMerchantName,
              })
            });
            console.log(this.listArr[index].shArr);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '393045',
        '41': vm.$route.query.id,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.post(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.aisleObj = JSON.parse(res.data[45])
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach((item,index) => {
              if (index==0) {
                item.open=true
              }else{
                item.open=false
              }
              item.formatStartTime = this.$moment(item.startTime.time).format('YYYY-MM-DD')
              item.formatEndTime = this.$moment(item.endTime.time).format('YYYY-MM-DD')
              item.itemList.forEach(element => {
                element.formatTime = this.$moment(element.planTime.time).format('YYYY-MM-DD HH:mm:ss')
              });
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

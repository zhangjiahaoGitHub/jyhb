<template>
  <div class='hundred planInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li v-for="(item,index) in listArr" :key="item.bankAccount">
        <div class="cardDiv">
          <div>
            <p><img :src="banks[item.bankCode]?require(`../../assets/bank/${banks[item.bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">{{item.bankName}}</p>
            <span>{{item.bankAccount.substring(0,4)}} **** **** {{item.bankAccount.substring(item.bankAccount.length-4,item.bankAccount.length)}}</span>
          </div>
          <div>
            <p><img src="../../assets/repay/sz.png" alt="">还款时间</p>
            <span>{{item.formatStartTime}}至{{item.formatEndTime}}</span>
          </div>
        </div>
        <div class="moneyStateDiv">
          <p>还款金额：{{item.paymentMoney}}</p>
          <p>已还金额：{{item.successMoney}}</p>
          <p>订单状态：<span>{{stateObj[item.status]}}</span></p>
        </div>
        <div v-if="index==0" class="aisleDiv">
          <p><span>{{aisleObj.ACQ_NAME}}</span><span>还款形式：{{aisleObj.EVERY_NUM}}笔/日</span></p>
          <p><span>预留金总金额：{{aisleObj.CB_AMT}}</span><span>手续费：{{aisleObj.SALE_FREE}}笔/日</span></p>
          <p><span>笔数费：{{aisleObj.PAY_FREE}}</span><span>自用减免：{{aisleObj.DISCOUNTS_MONEY}}笔/日</span></p>
        </div>
        <p class="levelP">您当前为<span>{{aisleObj.level}}</span>,自用<span>可省</span>手续费￥{{aisleObj.DISCOUNTS_MONEY}}</p>
        <div @click="item.open=false" v-if="item.open" class="upDownBtn">收起计划<i class="el-icon-arrow-up"></i></div>
        <div @click="item.open=true" v-else class="upDownBtn">查看计划<i class="el-icon-arrow-down"></i></div>
        <ol v-if="item.open">
          <li v-for="itemSon in item.itemList" :key="itemSon.id">
            <div>
              <p><span :class="itemSon.type=='payment' ? 'hkSpan':'xfSpan'">{{itemSon.type=='payment' ? '还款':'消费'}}</span>{{itemSon.formatTime}}</p>
              <span>{{itemSon.money}}</span>
              <i v-if="itemSon.status=='10B'" class="el-icon-circle-check"></i>
              <i v-else class="el-icon-circle-close"></i>
            </div>
            <p v-if="itemSon.type!='payment'">地区：{{itemSon.customizeCity}}</p>
            <p v-if="itemSon.type!='payment'">行业：{{itemSon.industryName}}</p>
          </li>
        </ol>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="startPause(1)" v-if="state=='10D' || state=='10C'" class="run">启动计划</div>
      <div @click="startPause(2)" v-if="state=='10B' || state=='10A'" class="stop">取消计划</div>
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
      state: '',
      listArr: [],
      aisleObj: {},
      stateObj:{
        '10A': '未执行',
        '10B': '执行中',
        '10C': '失败',
        '10D': '已暂停',
        '10E': '已完成',
      },
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.state = this.$route.query.state
    // this.bank = JSON.parse(this.$route.query.item)
    // console.log(this.bank);
    // this.aisle = this.$route.query.aisle
    this.list()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toNewIframe(item){
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
    startPause(status){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190214',
        '7': status,
        '8': vm.$route.query.id,
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if (status==1) {
              vm.$message({
                type: 'success',
                message: '启动成功',
                center: true,
                offset: 30,
                duration: 2500
              })
            }else{
              vm.$message({
                type: 'success',
                message: '取消成功',
                center: true,
                offset: 30,
                duration: 2500
              })
            }
            this.$router.back()
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

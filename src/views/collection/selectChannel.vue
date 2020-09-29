<template>
    <div class='hundred selectChannel-layout' style="overflow-x: hidden;">
      <el-popover
        placement="bottom"
        title=""
        width="200"
        class="aisle-popover"
        trigger="manual"
        v-model="visible">
        <ol>
          <li @click="toiframimg(item)" v-for="(item,index) in listArr" :key="index">{{item.channelName}}</li>
        </ol>
        <i slot="reference" @click="visible = !visible">限额说明</i>
      </el-popover>
      <ul>
        <li @click="toNext(item)" v-for="item in listArr" :key="item.ID">
          <div class="headDiv">
            <p><img src="../../assets/bank/yl.png">{{item.channelName}}</p>
            <span>{{item.remark.split(',')[0]}}<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="flexDiv">
            <p>单笔限额：{{item.limit}}</p>
            <p v-if="item.remark.split(',')[1]">结算：{{item.remark.split(',')[1]}}</p>
          </div>
          <div class="flexDiv">
            <p>交易时间：{{item.T0date}}</p>
            <span>{{item.rate}}%</span>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      listArr: [],
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
      bank_accountid: '',
      showtabflag: false,
      visible: false,
      aisle: '',
      hb: true,
      nowIndex: '',
      item: {},
    }
  },
  created () {
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.money = this.$route.query.money
    this.aisle = this.$route.query.aisle
    if (this.aisle=='WK') {
      this.item = JSON.parse(this.$route.query.item)
      this.hb = false
    }
    this.getListData()
  },
  methods: {
    toNext(item){
      if (this.aisle=='WK') {
        this.tomakingPlans(item.acqcode,item.rate,item.limit,item.status)
      }else{
        this.hbPay(item.acqcode,item.rate,item.limit)
      }
    },
    hbPay(acqcode,rate,money) {
      let vm = this
      if (Number(vm.money) < Number(money.split('-')[0]) || Number(vm.money) > Number(money.split('-')[1].split('/')[0])) {
        vm.$message({
          message: `单笔限额${money}`,
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '3': '190959',
        '5': parseFloat(vm.money)*100,
        '41': '',
        '42': this.merchantNo,
        '43': acqcode,
        '44': rate,
        '45': '',
        '46': '',
        '59': this.$stact.state.version
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.$http.post(`request.app`,url)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'ifarme', query: { url: res.data[30], title: '无卡支付', aisle: vm.aisle } })
            
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
    tomakingPlans(acqcode,rate,money,status) {
      let vm = this
      if (Number(vm.money) < Number(money.split('-')[0]) || Number(vm.money) > Number(money.split('-')[1].split('/')[0])) {
        vm.$message({
          message: `单笔限额${money}`,
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (status == '开通') {
        vm.toHk(acqcode,rate)
      }else{
        this.$confirm('该通道暂未开通，请先进行开通', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$router.push({ name: 'tiedcard', query: { item: this.$route.query.item, acqcode: acqcode } })
        }).catch(() => {       
        });
      }
    },
    toHk(acqcode,rate) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190959',
        '5': this.$route.query.money*100,
        '41': JSON.parse(this.$route.query.item).BANK_ACCOUNT,
        '42': this.merchantNo,
        '43': acqcode,
        '44': rate,
        '45': JSON.parse(this.$route.query.item).cvn,
        '46': JSON.parse(this.$route.query.item).expdate,
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'ifarme', query: { url: res.data[30], title: '无卡支付', wkzf:true , aisle: vm.aisle} })
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
    toiframimg (item) {
      this.$router.push({ name: 'imgIframe', query: { url: `http://120.78.81.147/icon/icon_channel_${item.acqcode}.png`, title: item.channelName } })
    },
    // 获取列表
    getListData(){
      let vm = this
      let parmas = {}
      if (this.hb) {
        parmas = {
          '0': '0700',
          '3': '390013',
          '42': vm.merchantNo,
          '43': 'HB',
          '59': vm.$stact.state.version
        }
      }else{
        parmas = {
          '0': '0700',
          '3': '390013',
          '42': vm.merchantNo,
          '44': vm.item.ID,
          '59': vm.$stact.state.version
        }
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.listArr=JSON.parse(res.data[57]).acqData
            console.log(this.listArr);
            
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
  }
}
</script>

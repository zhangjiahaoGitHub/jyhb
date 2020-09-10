<template>
  <div class='hundred choseXycard-layout'>
    <ul>
      <li @click="toAisle(item)" v-for='item in cardList' :key='item.ID'>
        <div class="headDiv">
            <p><img :src="banks[item.BANK_NAME]?require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{item.short_cn_name}}</p>
            <span @click.stop="delCard(item.BANK_ACCOUNT)">解绑</span>
        </div>
        <p>{{item.BANK_ACCOUNT.substring(0,4)}} **** **** {{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4, item.BANK_ACCOUNT.length)}}</p>
        <ol>
          <li>
            <p>额度</p>
            <p>{{item.LIMIT_MONEY}}</p>
          </li>
          <li>
            <p>账单</p>
            <p>{{item.BILL_DAY}}</p>
          </li>
          <li>
            <p>还款日</p>
            <p>{{item.REPAYMENT_DAY}}</p>
          </li>
          <span>立即收款</span>
        </ol>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="$router.push({name: 'addcard'})"><i class="el-icon-plus"></i>添加信用卡</div>
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
      merchantNoquery: '', // 这个是不同用户根据不同merchantNo传过来获取卡片的
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
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.merchantNoquery = this.$route.query.merchantNo
    console.log(this.merchantNoquery)
    this.list()
  },
  methods: {
    delCard (BANK_ACCOUNT) {
      let vm = this
      this.$confirm('解绑信用卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '190520',
          '8': BANK_ACCOUNT,
          '42': vm.merchantNo,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              this.list()
              vm.$message({
                message: '解绑成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
            }else{
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.log(err)
            vm.$message.error({
                message: '解绑失败',
                center: true,
                offset: 30,
                duration: 2000,
              })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          center: true,
          offset: 30,
          duration: 2000,
        });          
      });
    },
    toAisle (item) {
      this.$router.push({
        name: 'selectChannel',
        query: {
          item: JSON.stringify(item),
          money: this.$route.query.money,
          aisle: 'WK' 
        }
      })
    },
    list () {
      let vm = this
      console.log(vm.merchantNoquery !== '')
      if (vm.merchantNoquery !== '' && vm.merchantNoquery !== undefined) {
        vm.merchantNo = vm.merchantNoquery
      }
      let parmas = {
        '0': '0700',
        '3': '190932',
        '42': vm.merchantNo,
        '43': '0',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.cardList = JSON.parse(res.data[57])
            console.log(vm.cardList)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

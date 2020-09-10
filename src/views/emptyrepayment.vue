<template>
  <div>
    <div style='height:1px'></div>
    <div class='allFlex'>
        <div class='half textRight cardSche'>
          <span :class="select===1 &&'checkCard'" @click='setype(1)'>信用卡</span>
        </div>
        <div class='half textLeft cardSche'>
          <span :class="select===2 && 'checkCard'" @click='setype(2)'>储蓄卡</span>
        </div>
    </div>
    <div v-if='select === 1'>
        <div class='bankgroud' :class="index === now ?'': 'overflow'" @click='showOver(index)' v-for='(item, index) in cardList' :key='item.ID'>
            <div class='allFlex'>
                <div class='half'>
                    <img :src="banks[item.BANK_NAME]?require(`../assets/bank/white/${banks[item.BANK_NAME]}.png`):require('../assets/bank/white/yl.png')" class='bankLogo' />
                    <span class='bankRight'>
                        {{item.short_cn_name}}
                    </span>
                </div>
                <div class='half textRight'>
                    <div>
                        <span class='garyChoose repayFont'>****</span>
                        <span class='repayPadding garyChoose whiteColor repayFont'>{{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4, item.BANK_ACCOUNT.length)}}</span>
                    </div>
                </div>
            </div>
            <div class='allFlex choose border'>
                <div class='garyChoose smallFont'>
                    <p>{{item.BILL_DAY}}</p>
                    <p>账单日</p>
                </div>
                <div class='garyChoose smallFont'>
                    <p>{{item.REPAYMENT_DAY}}</p>
                    <p>还款日</p>
                </div>
                <div class='garyChoose smallFont'>
                    <p>{{item.LIMIT_MONEY}}</p>
                    <p>额度</p>
                </div>
                <div @click='darw(item)' class='garyChoose whiteColor smallFont'>
                    <img src='../assets/repay/setcard.png'  class='immediately'/>
                </div>
            </div>
            <div class='allFlex choose borderTop'>
                <router-link tag="div" :to="{name:'matter',query: { item: JSON.stringify(item)} }" class='garyChoose smallFont whiteColor'>
                    <img src='../assets/repay/data.png' class='repayLogo'>
                    查看资料
                </router-link>
                <router-link tag="div" :to="{name:'exhaustive',query: { item: JSON.stringify(item)} }" class='garyChoose smallFont whiteColor'>
                    <img src='../assets/repay/plan.png' class='repayLogo'>
                    查看计划
                </router-link>
                <div class='garyChoose smallFont whiteColor' @click.stop='de(item.BANK_ACCOUNT)'>
                    <img src='../assets/repay/lift.png' class='repayLogo'>
                    解绑卡片
                </div>
            </div>
        </div>
        <div class='repayMax'>
          <router-link tag="div" :to="{ name:'addcard' }">
            <img src='../assets/repay/addcard.png'/>
          </router-link>
        </div>
    </div>
    <div v-if='select === 2'>
      <cardvue />
    </div>
    <el-drawer
      title="还款模式"
      class='memberUp'
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
    <div class='mouthSelect' @click='selectype(1)'>无预留本金还款</div>
    </el-drawer>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
import cardvue from '../components/card.vue'
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      cardList: [],
      select: 1,
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
      drawer: false,
      direction: 'btt',
      item: {},
      usermerchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    if (this.usermerchantNo) {
      this.merchantNo = this.usermerchantNo
    }
    this.list()
  },
  components: {
    'cardvue': cardvue
  },
  methods: {
    setype (select) {
      let vm = this
      vm.select = select
    },
    darw (item) {
      this.item = item
      this.drawer = true
    },
    selectype (type) {
      let vm = this
      if (vm.item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '您已有计划在执行!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      switch (type) {
        case 1:
          vm.$router.push({ name: 'aisle', query: { item: JSON.stringify(vm.item), money: vm.$route.query.money, aisle: 'QYK' } })
          break
      }
    },
    handleClose (done) {
      done()
    },
    list () {
      let vm = this
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
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    showOver (i) {
      this.now === i ? this.now = -1 : this.now = i
    },
    de (card) {
      let vm = this
      this.$confirm('是否删除信用卡？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700', // 固定传惨
          '3': '190520', // 根据数字判断接口
          '8': card,
          '42': vm.merchantNo,
          '59': vm.version // 固定传惨
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              vm.$message({
                type: 'success',
                message: '删除成功!',
                center: true,
                offset: 30,
                duration: 2500
              })
              vm.list()
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
      }).catch(() => {
      })
    }
  }
}
</script>

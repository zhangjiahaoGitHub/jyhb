<template>
  <div class='hundred'>
    <div style='height:1px'></div>
    <div class='allFlex'>
        <div class='half textCenter cardSche'>
          <span :class="select===1 &&'checkCard'" @click='setype(1)'>我的卡包</span>
        </div>
        <div class='half textCenter cardSche'>
          <router-link :to="{name: 'agent'}" tag="span">中介卡包</router-link>
        </div>
    </div>
    <div v-if='select === 1'>
        <div @click='showOver(index)' v-for='(item, index) in cardList' :key='item.ID'>
            <div class='bankgroud cardground'>
              <div class='allFlex'>
                <div class='half'>
                  <img :src="banks[item.BANK_NAME]?require(`../assets/bank/white/${banks[item.BANK_NAME]}.png`):require('../assets/bank/white/yl.png')" class='bankLogo' />
                  <span class='bankRight'>
                      {{item.short_cn_name}}
                  </span>
                </div>
                <div class='half textRight'>
                  <div>
                      信用卡
                  </div>
                </div>
              </div>
              <div class='allFlex choose'>
                <div class='garyChoose whiteColor'>{{item.BANK_ACCOUNT.substring(0, 4)}}</div>
                <div class='garyChoose whiteColor'>****</div>
                <div class='garyChoose whiteColor'>****</div>
                <div class='garyChoose whiteColor'>{{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4, item.BANK_ACCOUNT.length)}}</div>
              </div>
              <div class='allFlex choose border'>
                <div class='garyChoose smallFont'>
                    <p>{{item.BANK_ACCOUNT_NAME}}</p>
                </div>
                <div class='garyChoose smallFont'>
                    <div>
                      <span class='paddRight'>账单日 {{item.BILL_DAY}}</span>
                      <span>还款日 {{item.REPAYMENT_DAY}}</span>
                    </div>
                </div>
              </div>
            </div>
            <div class='centerSelect noBack' v-if='index === now'>
              <div @click.stop='selectype(1, item)' class='allFlex'>
                  <img src='../assets/repay/plan_zd.png' class='myImage'/>
                  定制还卡计划
                  <span class='rightPost gary'>{{item.plancount > 0 ? '正在执行中...' :''}}</span>
                  <img src='../assets/bright.png' class='rightNext'/>
              </div>
              <router-link tag="div" :to="{name:'exhaustive',query: { item: JSON.stringify(item), merchantNo: usermerchantNo} }" @click="cardNext('repaycopy')" class='allFlex'>
                  <img src='../assets/repay/plan_ck.png' class='myImage'/>
                  查看还卡计划
                  <img src='../assets/bright.png' class='rightNext'/>
              </router-link>
              <router-link tag="div" :to="{name:'matter',query: { item: JSON.stringify(item), merchantNo: usermerchantNo } }" class='allFlex'>
                  <img src='../assets/repay/data_ck.png' class='myImage'/>
                  养卡绑定详情
                  <img src='../assets/bright.png' class='rightNext'/>
              </router-link>
              <div @click.stop='de(item.BANK_ACCOUNT)' class='allFlex'>
                  <img src='../assets/repay/unty_jb.png' class='myImage'/>
                  卡片解绑
                  <img src='../assets/bright.png' class='rightNext'/>
              </div>
              <router-link tag="div" :to="{name:'cardinfo',query: { item: JSON.stringify(item), merchantNo: usermerchantNo } }" class='allFlex border'>
                  <img src='../assets/repay/card_xg.png' class='myImage'/>
                  卡片编辑
                  <img src='../assets/bright.png' class='rightNext'/>
              </router-link>
            </div>
        </div>
    </div>
    <router-link tag="div" :to="{ name:'addcard' }" class='repayMax'>
      <i class="el-icon-plus"></i>
    </router-link>
    <el-drawer
      title="还款模式"
      class='memberUp'
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
    <div class='mouthSelect' @click='selectype(2)'>预留本金还款</div>
    </el-drawer>
    <div class='bottomLong'></div>
  </div>
</template>
<script>
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
      usermerchantNo: '',
      item: {},
      type: '0' // 这是判断是不是中介用户登陆进来的,0 是根据账户查找卡片 1是根据中介查找全部卡片
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo = this.$route.query.merchantNo
    if (this.usermerchantNo) {
      this.merchantNo = this.usermerchantNo
    }
    this.list()
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
    selectype (type, item) {
      let vm = this
      if (item.plancount > 0) {
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
          vm.$router.push({ name: 'useCoupon', query: { item: JSON.stringify(item), money: vm.$route.query.money, aisle: 'YK' } })
          // vm.$router.push({ name: 'aisle', query: { item: JSON.stringify(item), money: vm.$route.query.money, aisle: 'YK' } })
          break
      }
    },
    handleClose (done) {
      done()
    },
    list () {
      let vm = this
      // 43域 0 是根据账户查找卡片 1是根据中介查找全部卡片   44域是账单日搜索
      let parmas = {
        '0': '0700',
        '3': '190932',
        '42': vm.merchantNo,
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
          '0': '0700',
          '3': '190520',
          '8': card,
          '42': vm.merchantNo,
          '59': vm.version
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

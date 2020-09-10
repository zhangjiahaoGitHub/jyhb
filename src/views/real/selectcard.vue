<template>
  <div class='hundred choseXycard-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li @click="makeSome(item)" v-for='item in cardList' :key='item.ID'>
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
          <span>{{item.plancount<1 ? '立即还款':'计划进行中'}}</span>
        </ol>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="$router.push({name: 'addcard'})"><i class="el-icon-plus"></i>添加信用卡</div>
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <div @click.stop="">
        <div>
          <div><img :src="banks[nowItem.BANK_NAME]?require(`../../assets/bank/${banks[nowItem.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{nowItem.short_cn_name}}<span>{{nowItem.BANK_ACCOUNT.substring(0,4)}} **** **** {{nowItem.BANK_ACCOUNT.substring(nowItem.BANK_ACCOUNT.length-4, nowItem.BANK_ACCOUNT.length)}}</span></div>
          <p><span>持卡人：{{nowItem.BANK_ACCOUNT_NAME.substring(0,1)}}*</span>预留手机号：{{nowItem.BANK_PHONE.substring(0,3)}}****{{nowItem.BANK_PHONE.substring(nowItem.BANK_PHONE.length-4,nowItem.BANK_PHONE.length)}}</p>
        </div>
        <ul>
          <li v-if="aisle=='YK'" @click='selectype()'>
            <p><img src="../../assets/repay/ylbjhk.png" alt="">预留本金还款</p>
            <div><span style="color:#4782F6" v-if="nowItem.plancount>0 && nowItem.TYPE=='10B'">进行中</span><i class="el-icon-arrow-right"></i></div>
          </li>
          <li @click="toMoreAisle" v-if="aisle=='YK'">
            <p><img src="../../assets/repay/dtdylhk.png" alt="">多通道预留还款</p>
            <div><span style="color:#4782F6" v-if="nowItem.plancount>0 && nowItem.TYPE=='10D'">进行中</span><i class="el-icon-arrow-right"></i></div>
          </li>
          <li @click="toOneCardDh" v-if="aisle=='YK'">
            <p><img src="../../assets/repay/ykdh.png" alt="">一卡多还</p>
            <div><span style="color:#4782F6" v-if="nowItem.plancount>0 && nowItem.TYPE=='10Y'">进行中</span><i class="el-icon-arrow-right"></i></div>
          </li>
          <li v-if="aisle=='QYK'" @click='selectype()'>
            <p><img src="../../assets/repay/ykdh.png" alt="">制定计划</p>
            <div><span style="color:#4782F6" v-if="nowItem.plancount>0 && nowItem.TYPE=='10C'">进行中</span><i class="el-icon-arrow-right"></i></div>
          </li>
          <li v-if="aisle=='JYK'" @click="toJYKAisle">
            <p><img src="../../assets/repay/ykdh.png" alt="">制定计划</p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li @click="toExhaustive">
            <p><img src="../../assets/repay/ckjh.png" alt="">查看计划</p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li @click="toMatter">
            <p><img src="../../assets/repay/ckzl.png" alt="">查看资料</p>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
      <i @click="popShow=false" class="el-icon-circle-close"></i>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      version: '',
      popShow: false,
      fullscreenLoading: false,
      agentNo: '',
      merchantNo: '',
      aisle: '',
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
      nowItem: {},
      id: '',
      type: '0' // 这是判断是不是中介用户登陆进来的,0 是根据账户查找卡片 1是根据中介查找全部卡片
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.aisle = this.$route.query.aisle
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
              this.$router.back()
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
    makeSome(item){
      this.nowItem = item
      this.popShow = true
      console.log(this.nowItem);
      
    },
    toExhaustive() {
      let type = ''
      if (this.aisle=='YK') {
        type = '10A'
      }else if (this.aisle=='QYK') {
        type = '10B'
      }else if (this.aisle=='JYK') {
        type = '10C'
      }
      this.$router.push({
        name: 'exhaustive',
        query: {
          item: JSON.stringify(this.nowItem),
          type: type
        }
      })
    },
    toMatter() {
      this.$router.push({
        name: 'matter',
        query: {
          item: JSON.stringify(this.nowItem)
        }
      })
    },
    // 精养卡查询是否有通道
    selectHaveAisle(id){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390016',
        '42': vm.merchantNo,
        '43': 'YK',
        '44': this.nowItem.ID,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$router.push({ name: 'JYKAisle', query: { item: JSON.stringify(vm.nowItem), money: vm.$route.query.money, aisle: vm.$route.query.aisle } })
          }else{
            vm.$message({
              type: 'success',
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    toJYKAisle () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '该卡片已有执行中计划，请在该计划暂停或完成后再创建新计划',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      this.selectHaveAisle()
    },
    toOneCardDh () {
      let vm = this
      let item = this.nowItem
      vm.$router.push({ name: 'oneCardDh', query: { item: JSON.stringify(item) } })
    },
    toMoreAisle () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '该卡片已有执行中计划，请在该计划暂停或完成后再创建新计划',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$router.push({ name: 'moreAisle', query: { item: JSON.stringify(item), aisle: vm.$route.query.aisle } })
    },
    selectype () {
      let vm = this
      let item = this.nowItem
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
      vm.$router.push({ name: 'aisle', query: { item: JSON.stringify(item), money: vm.$route.query.money, aisle: vm.$route.query.aisle } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190932',
        '42': vm.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.cardList = JSON.parse(res.data[57])
            console.log(this.cardList);
            
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

<template>
  <div class='hundred cardlist-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="navDiv">
      <p @click="navClick('xy')" :class="type=='xy' ? 'aP':''">信用卡</p>
      <p @click="navClick('cx')" :class="type=='cx' ? 'aP':''">储蓄卡</p>
    </div>
    <ul class="xyCard" v-if="type=='xy'">
      <li @click="toMatter(item)" v-for="item in xyArr" :key="item.ID">
        <div class="topDiv">
          <div>
            <p>
              <img :src="banks[item.BANK_NAME]?require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">
              {{item.short_cn_name}}({{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT)}})
            </p>
            <span>{{item.BANK_ACCOUNT_NAME.substring(0,1)}}<span v-for="(item,index) in item.BANK_ACCOUNT_NAME.length-1" :key="index">*</span></span>
          </div>
          <div>
            <span>{{item.day}}</span>
            <div>
              <p>天到期<span>{{item.PLAN_AMT>0 ? '已制定计划':'未制定计划'}}</span></p>
              <span>{{item.repDate}}</span>
            </div>
          </div>
          <ol>
            <li>
              <span>{{item.LIMIT_MONEY}}</span>
              <p>额度</p>
            </li>
            <li>
              <span>{{item.PLAN_AMT}}</span>
              <p>账单金额</p>
            </li>
            <li>
              <span>{{item.SURPLUS_PAYMENT_MONEY}}</span>
              <p>剩余应还</p>
            </li>
          </ol>
        </div>
        <div class="bottomDiv">
          <span @click.stop="delCard(item.BANK_ACCOUNT)">解绑</span>
        </div>
      </li>
      <div class="btnDiv">
        <div @click="()=>{this.$router.push({name:'addcard'})}"><i class="el-icon-plus"></i>添加信用卡</div>
      </div>
    </ul>
    <ul class="cxCard" v-if="type=='cx'">
      <li>
        <div>
          <img :src="banks[bankCode]?require(`../../assets/bank/${banks[bankCode]}.png`):require('../../assets/bank/yl.png')" alt="">
          <div>
            <p>{{bankDetail}}<span> 默认到账卡</span></p>
            <span>**** **** **** {{bankAccount.substring(bankAccount.length-4,bankAccount.length)}}</span>
          </div>
        </div>
      </li>
      <div class="btnDiv">
        <div @click="editCard">更换储蓄卡</div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bankDetail: '',
      bankCode: '',
      bankAccount: '',
      activeName: 'first',
      version: '',
      agentNo: '',
      merchantNo: '',
      xyArr: [],
      cxArr: [],
      type: 'xy',
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
      usermerchantNo: '',
      fullscreenLoading: false,
    }
  },
  created () {
    if (sessionStorage.getItem('activeName')) {
      this.activeName = sessionStorage.getItem('activeName')
    }
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo = this.$route.query.merchantNo
    if (sessionStorage.getItem('cardType')) {
      this.type = sessionStorage.getItem('cardType')
    }
    this.getXy()
    this.message()
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
                type: 'warning'
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
    toMatter(item) {
      this.$router.push({
        name: 'matter',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    navClick(type) {
      this.type = type
      sessionStorage.setItem('cardType',type)
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.fullscreenLoading = false
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            this.bankDetail = JSON.parse(res.data[57])[0].bankDetail
            this.bankCode = JSON.parse(res.data[57])[0].bankCode
            this.bankAccount = JSON.parse(res.data[57])[0].bankAccount
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    editCard() {
      this.$router.push({name:'change'})
    },
    handleClick(tab, event) {
      // if (tab.index==0) {
      //   sessionStorage.setItem("activeName", "first")
      // }else if (tab.index==1) {
      //   sessionStorage.setItem("activeName", "second")
      // }
    },
    getXy () {
      let vm = this
      // 43域 0 是根据账户查找卡片 1是根据中介查找全部卡片   44域是账单日搜索
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
            this.xyArr = JSON.parse(res.data[57])
            console.log(this.xyArr);
            
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    }
  },
  beforeDestroy () {
    sessionStorage.removeItem("activeName")
  }
}
</script>

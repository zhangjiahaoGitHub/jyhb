<template>
  <div class='hundred choseCard-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li @click="itemClick(item)" v-for='item in cardList' :key='item.ID'>
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
        </ol>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fullscreenLoading: false,
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
      cardList: [],
      type: '',
      cardOne: {},
      cardTwo: {},
      cardThree: {},
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.type = this.$route.query.type
    this.cardOne = this.$store.state.cardOne
    this.cardTwo = this.$store.state.cardTwo
    this.cardThree = this.$store.state.cardThree
    this.list()
  },
  methods: {
    itemClick(item){
      if (this.cardOne.ID==item.ID) {
        this.$message({
          type: 'success',
          message: '已选择该卡',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      if (this.cardTwo.ID==item.ID) {
        this.$message({
          type: 'success',
          message: '已选择该卡',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      if (this.cardThree.ID==item.ID) {
        this.$message({
          type: 'success',
          message: '已选择该卡',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      if (this.type=='one') {
        this.$store.commit('setCardOne',item)
      }else if (this.type=='two') {
        this.$store.commit('setCardTwo',item)
      }else if (this.type=='three') {
        this.$store.commit('setCardThree',item)
      }
      this.$router.back()
    },
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

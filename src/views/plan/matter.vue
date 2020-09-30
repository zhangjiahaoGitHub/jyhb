<template>
  <div class='hundred matter-layout'>
    <div style='height:1px'></div>
    <div class="headDiv">
      <img :src="banks[card.BANK_NAME]?require(`../../assets/bank/${banks[card.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">
      <div>
        <p>{{card.short_cn_name}}</p>
        <span>尾号 {{card.BANK_ACCOUNT.substring(card.BANK_ACCOUNT.length-4,card.BANK_ACCOUNT.length)}}</span>
      </div>
    </div>
    <ul>
      <li>
        <span>银行名称：</span>
        <p>{{card.short_cn_name}}</p>
      </li>
      <li>
        <span>银行卡号：</span>
        <p>{{card.BANK_ACCOUNT}}</p>
      </li>
      <li>
        <span>开户姓名：</span>
        <p>{{card.BANK_ACCOUNT_NAME}}</p>
      </li>
      <li>
        <span>预留手机：</span>
        <p>{{card.BANK_PHONE}}</p>
      </li>
      <li>
        <span>身份证号：</span>
        <p>{{card.ID_CARD_NUMBER}}</p>
      </li>
      <li>
        <span>信用额度：</span>
        <p>{{card.LIMIT_MONEY}}</p>
      </li>
      <li>
        <span>账单日期：</span>
        <p>{{card.BILL_DAY}}</p>
      </li>
      <li>
        <span>还款日期：</span>
        <p>{{card.REPAYMENT_DAY}}</p>
      </li>
      <li>
        <span>卡有效期：</span>
        <p>{{card.expdate}}</p>
      </li>
      <li>
        <span>cvv2码：</span>
        <p>{{card.cvn}}</p>
      </li>
    </ul>
    <div class="btnDiv">
      <div @click="$router.push({name:'cardinfo',query:{item:$route.query.item}})">修改卡信息</div>
      <div @click="delCard">解除绑定</div>
    </div>
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
      card: [],
      aisleList: [],
      usermerchantNo: '',
      merchantId: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.usermerchantNo = this.$route.query.merchantNo
    if (this.$route.query.merchantId) {
      this.merchantId = this.$route.query.merchantId
    }
    this.card = JSON.parse(this.$route.query.item)
    // this.list()
  },
  methods: {
    delCard () {
      let vm = this
      this.$confirm('解绑信用卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '190520',
          '8': vm.card.BANK_ACCOUNT,
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
         
      });
    },
    toNext (type, code, category) {
      let vm = this
      if (type === 1) {
        vm.$router.push({ name: 'tiedcard', query: { item: JSON.stringify(vm.card), code: code, category: category, merchantId: this.merchantId } })
      } else {
        vm.$message({
          message: '您已开通',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
      }
    }
  }
}
</script>

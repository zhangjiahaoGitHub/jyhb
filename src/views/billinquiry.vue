<template>
  <div class='hundred billinquiry-style'>
    <div class="list-row">
      <div class="yinghang">
        <div class="bank-img">
          <img :src="banks[308]?require(`../assets/bank/${banks[308]}.png`):require('../assets/bank/yl.png')" alt="">
        </div>
        <div class="name-phone">
          <div class="name">工商银行</div>
          <div class="rexian">客服热线 <span>95588</span></div>
        </div>
      </div>
      <div class="chaxun">
        <div class="xinxi">查询可用额度，常丹...</div>
        <i class="el-icon-arrow-right"></i>
      </div>
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
      banks: {
        313003: 'bj',
        303: 'gd', //光大
        306: 'gf', //广发
        105: 'js', //建设
        301: 'jt', //
        305: 'ms', //民生
        103: 'ny', //农业
        307: 'pa', //
        309: 'xy', //兴业
        310: 'pf', //浦发
        403: 'yz', //邮政
        308: 'zs', //招商
        102: 'gs', //工商
        104: 'zg', //中国
        302: 'zx', //中信
        313062: 'sh', //上海
        304: 'hx' //华夏
      },
      arrlist: [{
        bankcod: '102',
        bankname: '工商银行',
        phone: '95588',
        mes: '查询可用额度、账单查询',
        linkphone: '400-669-5588',
        
      }],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.listarr()
  },
  mounted () {
    
  },
  methods: {
    listarr () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792005',
        '42': vm.merchantNo,
        '44': 1,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.arrlist = JSON.parse(res.data[57])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

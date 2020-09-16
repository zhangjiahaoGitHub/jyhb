<template>
  <div class='hundred hkjh-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div v-for="item in listArr" :key="item.ID">
      <div class="cardDiv">
        <div>
          <p><img :src="banks[item.BANK_NAME] ? require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require(`../../assets/bank/yl.png`)" alt="">{{item.short_cn_name}}</p>
          <span>{{item.BANK_ACCOUNT.substring(0,4)}} **** **** {{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length)}}</span>
        </div>
        <ol>
          <li>
            <p>额度</p>
            <span>{{item.LIMIT_MONEY}}</span>
          </li>
          <li>
            <p>账单日</p>
            <span>{{item.BILL_DAY}}</span>
          </li>
          <li>
            <p>还款日</p>
            <span>{{item.REPAYMENT_DAY}}</span>
          </li>
        </ol>
      </div>
      <ul>
        <li>创建时间：{{$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')}} <span>进度：{{item.progress}}</span></li>
        <li>通道名称：{{item.acqName}}</li>
        <li>计划周期：{{$moment(item.START_TIME.time).format('YYYY-MM-DD')}}至{{$moment(item.END_TIME.time).format('YYYY-MM-DD')}}</li>
        <li>本期应还：￥{{item.PLAN_AMT}}</li>
        <li>本期已还：￥{{item.RETURN_MONEY}}</li>
        <li>订单状态：￥{{planState[item.STATUS]}}</li>
      </ul>
      <div @click="toPlanInfo(item)" class="btnDiv"><div>计划详情</div></div>
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
      planState: {
        '10A': '未执行',
        '10B': '执行中',
        '10C': '失败',
        '10D': '暂停',
        '10E': '已完成'
      },
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
      fullscreenLoading: false,
      listArr: [],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.list()
  },
  methods: {
    toPlanInfo(item){
      this.$router.push({
        name: 'particular',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190215',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'listArr',JSON.parse(res.data[57]))
            console.log(this.listArr);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

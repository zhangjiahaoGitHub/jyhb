<template>
  <div class='hundred hkjh-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div v-for="item in listArr" :key="item.ID">
      <div class="cardDiv">
        <div class="topDiv">
          <p><img :src="banks[item.BANK_NAME] ? require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require(`../../assets/bank/yl.png`)" alt="">{{item.short_cn_name}}</p>
          <span>{{item.BANK_ACCOUNT.substring(0,4)}} **** **** {{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length)}}</span>
        </div>
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

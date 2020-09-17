<template>
  <div class='hundred withdrawRecord-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li v-for="item in listArr" :key="item.id">
        <div>
          <p>申请提现</p>
          <p>￥{{item.trxAmt}}</p>
        </div>
        <div>
          <p>申请时间</p>
          <p>{{item.formatTime}}</p>
        </div>
        <div>
          <p>申请状态</p>
          <span class="cg" v-if="item.status=='10C'">提现成功</span>
          <span class="sb" v-if="item.status=='10A'">提现失败</span>
        </div>
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
      statusArr:{
        '10A':'失败',
        '10B':'提现中',
        '10C':'成功',
        '10D':'失败',
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
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190125',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.formatTime = this.$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')
              this.listArr.push(item)
            });
            console.log(this.listArr);
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

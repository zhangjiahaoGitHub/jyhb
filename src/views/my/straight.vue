<template>
    <div class='hundred'>
        <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' style="overflow:auto;height:calc(100vh - 1.7rem)">
            <router-link tag='li' :to="{name: 'strcont', query: {phone: item.PHONE} }" class='allFlex bankList gary' v-for='item in teamList' :key='item.ID'>
                <div class='half'>{{item.FREEZE_STATUS === '10B' ? item.MERCHANT_CN_NAME : '未实名'}}</div>
                <div class='half'>{{item.LEVEL>9?$stact.state.level[9]:$stact.state.level[item.LEVEL]}}</div>
                <div class='half'>{{item.PHONE}}</div>
                <div class='half'>{{$moment(item.CREATE_TIME.time).format('YYYY-MM-DD')}}</div>
                <div class='half'>{{item.teamNum}}</div>
            </router-link>
            <li v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</li>
            <li v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</li>
            <li class='bottomLong'></li>
        </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      page: 0,
      count: 10,
      loading: false,
      version: '',
      agentNo: '',
      merchantNo: '',
      teamList: [],
      name: '',
      fun: '',
      phone: ''
    }
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    load () {
      let vm = this
      vm.loading = true
      setTimeout(async () => {
        vm.loading = false
        console.log(vm.count)
        if (vm.count >= 10) {
          vm.page++
          await vm.list()
        }
      }, 1000)
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '3': '190115',
        '42': vm.merchantNo,
        '43': vm.page,
        '44': '10A',
        '45': vm.name,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.teamList = vm.teamList.concat(JSON.parse(res.data[6]))
            vm.count = JSON.parse(res.data[6]).length
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

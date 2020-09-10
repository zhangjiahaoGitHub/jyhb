<template>
  <div class="realname">
    <div style='height:1px'></div>
    <div class="reallist">
      <div class="realindex" v-for='(item, i) in realnamelist' :key='i'>
        <span class="seria">{{i + 1}}、</span>
        {{item.merchantCnName}}
        <span class="makeplan-addcard makeplan-bg" @click="toselectcard(item.merchantNo)">制定计划</span><span class="makeplan-addcard" @click="toaddcard(item)">查看计划</span></div>
    </div>
    <!--<router-link tag='div' :to="{name: 'addposition'}" class="addposition">
      增加卡位
    </router-link> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      realnamelist: [],
      type: {
        '10A': '审核未通过',
        '10B': '审核通过',
        '10C': '拒绝审核',
        '10D': '重新审核'
      },
      useStatustype: {
        '10A': '可用',
        '10B': '不可用'
      },
      screensAllNumber: '', // 总卡位
      screensNumber: '', // 剩余卡位
      clearsettimeout: null,
      version: '',
      agentNo: '',
      merchantNo: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.reallist()
    console.log(this.realnamelist)
  },
  methods: {
    toaddcard (data) {
      this.$router.push({ name: 'checkplan', query: { item: JSON.stringify(data) } })
    },
    toselectcard (merchantNoId) {
      this.$router.push({ name: 'selectcard', query: { merchantNo: merchantNoId } })
    },
    reallist () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390012',
        '42': vm.merchantNo,
        '43': vm.input, // 这是查找传入的名字
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.realnamelist = JSON.parse(res.data[37])
            vm.screensAllNumber = JSON.parse(res.data[36])[0].screensAllNumber
            vm.screensNumber = JSON.parse(res.data[36])[0].screensNumber
            // console.log(JSON.parse(res.data[36]))
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
    },
    selectchange () {
      let vm = this
      vm.reallist()
    },
    space () {
      let vm = this
      clearTimeout(vm.clearsettimeout)
      if (vm.input === '') {
        vm.clearsettimeout = setTimeout(() => {
          vm.reallist()
        }, 1500)
      }
    }
  }
}
</script>

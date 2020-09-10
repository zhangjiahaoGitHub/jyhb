<template>
  <div class='hundred creditlist-layout'>
    <div style='height:1px'></div>
    <ul v-if="teamList.length>0">
      <li @click="problem(item.url, '卡测评详情')" v-for='item in teamList' :key="item.id">
        <div>
          <span>查询时间</span>
          <p>{{item.createTime}}</p>
        </div>
        <div>
          <span>姓名</span>
          <p>{{item.name}}</p>
        </div>
        <div>
          <span>身份证号</span>
          <p>{{item.idCard.substring(0,4)}}**********{{item.idCard.substring(item.idCard.length-4,item.idCard.length)}}</p>
        </div>
        <div>
          <span>信用卡号</span>
          <p>{{item.bankAccount.substring(0,4)}}******{{item.bankAccount.substring(item.bankAccount.length-4,item.bankAccount.length)}}</p>
        </div>
        <div>
          <span>查询结果</span>
          <p><span>查询成功</span><span>点击查看</span></p>
        </div>
      </li>
    </ul>
    <div v-else class="noData">
      <img src="../../assets/empty.png" alt="">
      暂无数据
    </div>
    <!-- <div class='retreatRemarks black retBor' @click="problem(item.url, '卡测评详情')" v-for='(item, index) in teamList' :key='index'>
        <p>卡号：{{item.bankAccount}}</p>
        <p class='timePadding'>时间：{{item.createTime}}</p>
        <p class='redColor'>点击查看</p>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      id: '',
      teamList: []
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.id = JSON.parse(this.$stact.state.token)[0].id
    this.list()
  },
  mounted () {
  },
  methods: {
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690017',
        '42': vm.id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.teamList = JSON.parse(res.data[57])
            console.log(this.teamList);
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    }
  }
}
</script>

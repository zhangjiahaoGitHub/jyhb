<template>
  <div class='hundred hdzq-style'>
    <div class="list-box">
      <div class="list-row" v-for="(item,index) in arrlist" :key="index" @click.stop="toifram(item.shareUrl)">
        <div class="img-box">
          <img :src="item.image" alt="">
        </div>
        <div>
          <div class="title-top">{{item.title}}</div>
          <div class="time-bottom">{{item.createTime}}</div>
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
      arrlist: []
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.listarr()
  },
  mounted () {
    
  },
  methods: {
    toifram(url) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: '活动详情' } })
    },
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

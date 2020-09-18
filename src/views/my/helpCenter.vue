<template>
  <div class='hundred helpCenter-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="head">
      <img :src="type=='10A' ? require('../../assets/my/help_sm.png'):require('../../assets/my/help_wt.png')" alt="" srcset="">
    </div>
    <ol>
      <li @click="search('10A')" :class="type=='10A' ? 'aLi':''">帮助中心</li>
      <li @click="search('10B')" :class="type=='10B' ? 'aLi':''">常见问题</li>
    </ol>
    <ul>
      <li @click="toInfo(item)" v-for="item in listArr" :key="item.id">
        <span>{{item.title}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      fullscreenLoading: false,
      type: '10A',
      listArr: [],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getData()
  },
  methods: {
    toInfo(item){
      this.$router.push({
        name: 'helpCenterInfo',
        query: {
          title: item.title,
          id: item.id
        }
      })
    },
    search(type){
      this.type = type
      this.getData()
    },
    getData () {
      this.fullscreenLoading = true
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792001',
        '21': this.type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$set(this,'listArr',JSON.parse(res.data[57]))
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.count=0
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

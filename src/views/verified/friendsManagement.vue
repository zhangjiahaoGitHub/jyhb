<template>
  <div class='hundred friendsManagement-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="search">
      <i class="el-icon-search"></i>
      <input v-model="name" placeholder="请输入姓名" type="text" name="" id="">
      <p @click="search">搜索</p>
    </div>
    <ul
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance='20'>
      <li v-for="(item,index) in listArr" :key="item.ID">
        <div>
          {{index+1}}
          <p>{{item.BANK_ACCOUNT_NAME}}</p>
        </div>
        <p><span @click="edit(item)" class="aSpan">修改费率</span><span @click="toCardManage(item)">卡片管理</span></p>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
  </div>
</template>
<script>

export default {
  data () {
    return {
      stateObj: {
        '10A':'未认证',
        '10B':'审核通过',
        '10C':'审核拒绝',
        '10D':'重新审核',
        '10E':'照片不全',
        '10F':'审核中',
      },
      fullscreenLoading: false,
      name: '',
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
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
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  methods: {
    toCardManage(item){
      if (item.FREEZE_STATUS!='10B') {
        this.$message({
          message: '还未通过认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({
        name: 'cardManagement',
        query: {
          item: JSON.stringify(item),
          title: '卡片管理'
        }
      })
    },
    search(){
      this.listArr=[]
      this.pageCount=1
      this.count=20
      this.load()
    },
    edit(item){
      if (item.FREEZE_STATUS!='10B') {
        this.$message({
          message: '还未通过认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$router.push({
        name: 'modifyRate',
        query:{
          item: JSON.stringify(item)
        }
      })
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190995',
        '42': this.merchantNo,
        '43': this.name,
        '44': this.pageCount,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }else{
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
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

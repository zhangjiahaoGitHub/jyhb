<template>
    <div class='hundred loopList-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
        <div class="searchDiv">
          <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            size="mini"
            v-model="searchStr">
          </el-input>
          <div @click="search">搜索</div>
        </div>
        <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
          <li @click="toPersonalTeam(item)" v-for="(item,index) in listArr" :key="index">
            <div>
              <img :src="item.HEAD_URL ? item.HEAD_URL:require('../../assets/my/myTeam/head.jpg')" alt="">
              <div>
                <span>{{item.MERCHANT_CN_NAME}}</span>
                <em>{{level[item.LEVEL]}}</em>
                <p>注册时间:{{item.formatTime}}</p>
              </div>
            </div>
            <div>
              <div @click.stop="serive(item.PHONE)">
                <span>{{item.PHONE.substring(0,3)}}****{{item.PHONE.substring(item.PHONE.length-4,item.PHONE.length)}}</span>
                <img src="../../assets/my/myTeam/iv_lxzt_bg.png" alt="">
              </div>
              <p>团队名额{{item.count}}名</p>
            </div>
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
      count: 20,
      loading: false,
      listArr: [],
      pageCount: 1,
      searchStr: '',
      level: {
        1: '普通用户',
        2: '黄金会员',
        3: '铂金会员',
        4: '白金会员',
        5: '黄金联营',
        6: '铂金联营',
        7: '白金联营',
      },
      fullscreenLoading: false
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
    toPersonalTeam (item) {
      this.$router.push({
        name: 'personalTeam',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    serive (phone) {
      let vm = this
      this.$confirm(phone, '拨打电话？', {
        confirmButtonText: '拨打',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = `tel:${phone}`
      }).catch(() => {
      })
    },
    search () {
      this.loading=true
      this.count = 20
      this.pageCount=1
      this.listArr=[]
      this.fullscreenLoading = true
      this.list()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690026',
        '41': this.searchStr,
        '42': vm.merchantNo,
        '43': vm.pageCount,
        '44': '10A',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          this.loading=false
          if (res.data[39] === '00') {
            this.count = JSON.parse(res.data[6]).length
            let getList = JSON.parse(res.data[6])
            getList.forEach(item => {
              item.formatTime=this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')
              this.listArr.push(item)
            });
            this.pageCount++
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

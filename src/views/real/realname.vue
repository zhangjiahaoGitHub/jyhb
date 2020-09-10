<template>
  <div class="realname-layout hundred" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <h3 @click="()=>{this.$router.push({name:'lookPlan'})}">查看计划</h3>
    <h6><span>保障金余额：{{shBzj}}</span><span @click="()=>{this.$router.push({name:'kfjl',query:{shBzj:this.shBzj}})}">扣费记录</span></h6>
    <div class="searchDiv">
      <div>
        <i class="el-icon-search"></i>
        <input v-model="name" type="text" placeholder="请输入客户姓名">
        <span @click="list">搜索</span>
      </div>
    </div>
    <div class="numberDiv">
      <p><span>已使用卡位：{{usedScreen}}</span><span>剩余卡位：{{SCREENS_NUMBER}}</span></p>
      <span @click="popShow = true">购买卡位</span>
    </div>
    <ul
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance='20'>
      <li v-for="(item,index) in listArr" :key="item.ID">
        <div class="leftDiv">
          <span>{{item.MERCHANT_CN_NAME}}</span>
          <p>
            <span>信用卡张数：{{item.bind_card_count}}</span>
            <span>进行中的计划：{{item.planCount}}</span>
          </p>
        </div>
        <img @click="whoShow=index" src="../../assets/threePoints.png" alt="">
        <div @click="createPlan(item)" v-if="whoShow===index" class="rightDiv">
          <img src="../../assets/xykgl.png" alt="">
          <p>信用卡管理</p>
        </div>
      </li>
      <!-- <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p> -->
    </ul>
    <i @click="()=>{this.$router.push({name:'adduser'})}" class="el-icon-plus">添加客户</i>
    <div v-if="popShow" class="popDiv">
      <div>
        <p>联系客服购买卡位</p>
        <div class="contentDiv">
          <span>请联系客服增加卡位</span>
          <a :href="`tel:${kePhone}`">{{kePhone}}</a>
        </div>
        <div @click="call" class="btnDiv">
          立即联系
        </div>
      </div>
      <i @click="popShow = false" class="el-icon-circle-close"></i>
    </div>
    <div v-if="choseShow" class="chosePlan">
      <ul>
        <li @click="makePlan('YK')">制定预留计划</li>
        <li @click="makePlan('QYK')">制定空卡计划</li>
        <li @click="choseShow=false">取消</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      whoShow: '',
      khId: '',
      choseShow: false,
      popShow: false,
      fullscreenLoading: false,
      count: 20,
      // 无限滚动开关：true关
      loading: true,
      listArr: [],
      pageCount: 1,
      shBzj: 0,
      usedScreen: 0,
      SCREENS_NUMBER: 0,
      kePhone: 0,
      name: '',
      nowItem: {}
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
    this.getBzj()
    this.list()
  },
  methods: {
    createPlan (item) {
      this.khId = item.ID
      if (item.FREEZE_STATUS == '10B') {
        this.choseShow=true
        this.nowItem = item
      }else if(item.FREEZE_STATUS == '10A'){
        this.$message({
          message: '未认证，请等待认证',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
      }else{
        this.$router.replace({
          name: 'adduserreal',
          query: {
            merchantId: item.ID,
            merchantNo: item.MERCHANT_NO,
          }
        })
      }
      console.log(item);
    },
    makePlan (type) {
      this.$router.push({ name: 'selectcard', query: { kePhone: this.kePhone, item:JSON.stringify(this.nowItem), aisle: type, usedScreen: this.usedScreen, SCREENS_NUMBER: this.SCREENS_NUMBER, khId: this.khId } })
    },
    call () {
      window.location.href = `tel://${this.kePhone}`
    },
    getBzj () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '700001',
        '6': '10B',
        '7': '1',
        '42': this.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.shBzj = res.data[58]
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    load () {
      this.loading = true
      // this.list()
    },
    // 获取卡位信息
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390012',
        '42': vm.merchantNo,
        '43': vm.name,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            console.log(JSON.parse(res.data[36]));
            console.log(JSON.parse(res.data[37]));
            this.listArr = JSON.parse(res.data[37])
            this.SCREENS_NUMBER = JSON.parse(res.data[36]).SCREENS_NUMBER
            this.usedScreen = JSON.parse(res.data[36]).usedScreen
            this.kePhone = res.data[38]
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

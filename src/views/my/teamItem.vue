<template>
    <div class='hundred teamItem-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已实名" name="first">
          <div class="searchDiv">
            <div>
              <p>
                <i class="el-icon-search"></i>
                <input v-model="phone" type="number" placeholder="请输入手机号">
              </p>
              <span @click="searchList">搜索</span>
            </div>
          </div>
          <ul
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance='20'>
            <li v-for="(item,index) in listArr" :key="index">
              <div>
                <p>{{item.merchantCnName}}</p>
                <img v-if="jzt" :src="item.parentPhone==dlrPhone ? require('../../assets/my/myTeam/zt.png'):require('../../assets/my/myTeam/jt.png')" alt="">
                <img v-else :src="require(`../../assets/my/myTeam/level${item.level}.png`)" alt="">
                <span v-if="item.parentPhone==dlrPhone">{{item.linkPhone}}</span>
                <span v-else>{{item.linkPhone.substring(0,3)}}****{{item.linkPhone.substring(item.linkPhone.length-4,item.linkPhone.length)}}</span>
                <img v-if="item.parentPhone==dlrPhone" @click="call(item.linkPhone)" src="../../assets/my/myTeam/phone.png" alt="">
              </div>
              <span>{{item.createTime}}</span>
            </li>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="未实名" name="second">
          <div class="searchDiv">
            <div>
              <p>
                <i class="el-icon-search"></i>
                <input v-model="phone" type="number" placeholder="请输入手机号">
              </p>
              <span @click="searchList">搜索</span>
            </div>
          </div>
          <ul
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance='20'>
            <li v-for="(item,index) in listArr" :key="index">
              <!-- <div><p>{{item.merchantCnName}}</p><img v-if="jzt" :src="item.parentPhone==dlrPhone ? require('../../assets/my/myTeam/zt.png'):require('../../assets/my/myTeam/jt.png')" alt=""><img v-else :src="require(`../../assets/my/myTeam/level${level}.png`)" alt="">{{item.linkPhone}}<img @click="call(item.linkPhone)" src="../../assets/my/myTeam/phone.png" alt=""></div> -->
              <div>
                <p>未实名</p>
                <img v-if="jzt" :src="item.parentPhone==dlrPhone ? require('../../assets/my/myTeam/zt.png'):require('../../assets/my/myTeam/jt.png')" alt="">
                <img v-else :src="require(`../../assets/my/myTeam/level${item.level}.png`)" alt="">
                <span v-if="item.parentPhone==dlrPhone">{{item.linkPhone}}</span>
                <span v-else>{{item.linkPhone.substring(0,3)}}****{{item.linkPhone.substring(item.linkPhone.length-4,item.linkPhone.length)}}</span>
                <img v-if="item.parentPhone==dlrPhone" @click="call(item.linkPhone)" src="../../assets/my/myTeam/phone.png" alt="">
              </div>
              <span>{{item.createTime}}</span>
            </li>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

export default {
  data () {
    return {
      level: '',
      type: '',
      phone: '',
      activeName: 'first',
      count: 20,
      loading: false,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1,
      jzt: false,
      dlrPhone: '',
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
    this.dlrPhone = JSON.parse(this.$stact.state.token)[0].phone
    this.jzt = this.$route.query.jzt
    this.level = this.$route.query.level
    this.type = this.$route.query.type
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.phone =''
      this.count = 20
      this.pageCount = 1
      this.listArr = []
      this.load()
    },
    call(phone){
      window.location.href = `tel://${phone}`
    },
    searchList () {
      this.count = 20
      this.pageCount = 1
      this.listArr = []
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let sm = ''
      if (this.activeName=='first') {
        sm = '10B'
      }else{
        sm = '10A'
      }
      let parmas = {
        '0': '0700',
        '3': '399200',
        '41': vm.phone,
        '42': vm.merchantNo,
        '43': vm.level,
        '44': vm.type,
        '45': sm,
        '46': vm.pageCount,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.createTime = item.createTime.substring(0,10)
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
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

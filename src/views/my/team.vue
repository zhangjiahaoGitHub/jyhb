<template>
    <div class='hundred team-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <div class="head">
        <p @click="activeName=1" :class="activeName==1 ? 'aP':''">我的团队</p>
        <p @click="activeName=2" :class="activeName==2 ? 'aP':''">我的客户</p>
      </div>
      <div class="content">
        <div>
          <p><img src="../../assets/my/myTeam/wdtd.png" alt=""></p>
          <span>客户数量：{{dataObj[14]}}</span>
        </div>
        <ol>
          <li>
            <img src="../../assets/my/myTeam/tjr.png" alt="">
            <p v-if="dataObj[10]">{{dataObj[10]}}</p>
            <p v-if="dataObj[11]">{{dataObj[11]}}</p>
            <p v-else>鲸鹰伙伴</p>
          </li>
          <li>
            <img src="../../assets/my/myTeam/gfpt.png" alt="">
            <p v-if="dataObj[12]">{{dataObj[12]}}</p>
            <p v-if="dataObj[13]">{{dataObj[13]}}</p>
            <p v-else>鲸鹰伙伴</p>
          </li>
        </ol>
        <ul>
          <div v-if="activeName==1">
            <li v-for="(item,index) in listArr" :key="index" @click="$router.push({name: 'teamItem',query: {title: item.levelName,level: 1,}})" v-if="item.count>0">
              <div>
                <p>
                  <img :src="item.iUrl" alt="">
                </p>
                <div>
                  <p>{{item.count}}</p>
                  <span>{{item.levelName}}</span>
                </div>
              </div>
              <p v-if="item.tCount || item.tCount==0">今日新增<span>{{item.tCount}}</span></p>
            </li>
          </div>
          <div v-else>
            <li @click="$router.push({name: 'teamItem',query: {title: '直推会员',level: 10,}})" v-if="dataObj[23]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l10.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[23]}}</p>
                  <span>直推会员</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[24]}}</span></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '间推会员',level: 11,}})" v-if="dataObj[25]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l11.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[25]}}</p>
                  <span>间推会员</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[26]}}</span></p>
            </li>
          </div>
        </ul>
      </div>
      <router-view></router-view>
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
      listArr: [],
      dataObj: {},
      activeName: '1',
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.level = this.$stact.state.level
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      // if (tab.name == 'second') {
      // }else{
      // }
    },
    call(phone){
      window.location.href = `tel://${phone}`
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '1': JSON.parse(this.$stact.state.token)[0].phone,
        '3': '190114',
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.dataObj = res.data
            this.listArr = JSON.parse(this.dataObj[15])
            console.log(this.listArr);
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>

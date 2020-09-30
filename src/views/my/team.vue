<template>
    <div class='hundred team-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <div class="head">
        <p @click="activeName=1" :class="activeName==1 ? 'aP':''">我的团队</p>
        <p @click="activeName=2" :class="activeName==2 ? 'aP':''">我的客户</p>
      </div>
      <div class="content">
        <div>
          <p><img src="../../assets/my/myTeam/wdtd.png" alt=""></p>
          <span>客户数量：{{dataObj[19]}}</span>
        </div>
        <ol>
          <li>
            <img src="../../assets/my/myTeam/tjr.png" alt="">
            <p v-if="sjtgName">{{sjtgName}}</p>
            <p v-if="sjtgName">{{sjtgPhone.substring(0,3)}}****{{sjtgPhone.substring(sjtgPhone.length-4,sjtgPhone.length)}}</p>
            <p v-else>鲸鹰伙伴</p>
          </li>
          <li>
            <img src="../../assets/my/myTeam/gfpt.png" alt="">
            <p>{{sjdlName}}</p>
            <p>{{sjdlPhone.substring(0,3)}}****{{sjdlPhone.substring(sjdlPhone.length-4,sjdlPhone.length)}}</p>
          </li>
        </ol>
        <ul>
          <div v-if="activeName==1">
            <li @click="$router.push({name: 'teamItem',query: {title: '普通会员',level: 1,}})" v-if="dataObj[31]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l1.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[31]}}</p>
                  <span>普通会员</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[34]}}</span></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '经纪人',level: 2,}})" v-if="dataObj[32]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l2.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[32]}}</p>
                  <span>经纪人</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[35]}}</span></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '城市服务商',level: 3,}})" v-if="dataObj[33]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l3.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[33]}}</p>
                  <span>城市服务商</span>
                </div>
              </div>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '城市运营商',level: 4,}})" v-if="dataObj[36]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l4.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[36]}}</p>
                  <span>城市运营商</span>
                </div>
              </div>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '高级合伙人',level: 5,}})" v-if="dataObj[37]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l5.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[37]}}</p>
                  <span>高级合伙人</span>
                </div>
              </div>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '经纪人',level: 6,}})" v-if="dataObj[38]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l6.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[38]}}</p>
                  <span>达标团队长</span>
                </div>
              </div>
            </li>
          </div>
          <div v-else>
            <li @click="$router.push({name: 'teamItem',query: {title: '直推会员',level: 10,}})" v-if="dataObj[21]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l10.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[21]}}</p>
                  <span>直推会员</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[22]}}</span></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '间推会员',level: 11,}})" v-if="dataObj[23]>0">
              <div>
                <p>
                  <img src="../../assets/my/myTeam/l11.png" alt="">
                </p>
                <div>
                  <p>{{dataObj[23]}}</p>
                  <span>间推会员</span>
                </div>
              </div>
              <p>今日新增<span>{{dataObj[24]}}</span></p>
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
      sjtgName: '',
      sjtgPhone: '',
      sjdlName: '',
      sjdlPhone: '',
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
        '3': '999200',
        '43': JSON.parse(this.$stact.state.token)[0].phone,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.sjtgName = res.data[18].split(',')[0]
            this.sjtgPhone = res.data[18].split(',')[1]
            this.sjdlName = res.data[25].split(',')[0]
            this.sjdlPhone = res.data[25].split(',')[1]
            this.dataObj = res.data
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190114',
        '42': vm.merchantNo,
        '43': vm.pageCount,
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
            this.teamCount = res.data[23]
            this.vipCount = res.data[24]
            this.realCount = res.data[25]
            this.sjName = res.data[21]
            this.sjLevel = res.data[20]
            this.sjUrl = res.data[19]
            this.sjPhone = res.data[22]
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.formatTime=this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')
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

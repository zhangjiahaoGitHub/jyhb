<template>
    <div class='hundred team-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <div class="headDiv">
        <div class="firstDiv">
          <p>我的<span>{{khs}}</span>客户</p>
        </div>
        <ol>
          <li>
            <div>
              <p>{{sjtgName}}</p>
              <p v-if="sjtgPhone.length>10">{{sjtgPhone.substring(0,3)}}****{{sjtgPhone.substring(sjtgPhone.length-4,sjtgPhone.length)}}</p>
              <p v-else>{{sjtgPhone}}</p>
            </div>
          </li>
          <li>
            <div>
              <p>{{sjdlName}}</p>
              <p>{{sjdlPhone.substring(0,3)}}****{{sjdlPhone.substring(sjdlPhone.length-4,sjdlPhone.length)}}</p>
            </div>
          </li>
        </ol>
      </div>
      <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的团队" name="first">
          <ul>
            <li @click="$router.push({name: 'teamItem',query: {title: '体验用户',level: 1,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/tyyh.png" alt="">
                体验用户
              </div>
              <span>{{tys}}</span>
              <p>今日新增<em>{{tyxzs}}</em><i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '白银用户',level: 2,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/by.png" alt="">
                白银用户
              </div>
              <span>{{bys}}</span>
              <p>今日新增<em>{{byxzs}}</em><i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '黄金用户',level: 3,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/hjyh.png" alt="">
                黄金用户
              </div>
              <p>{{hjs}}<i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '铂金用户',level: 4,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/bjyh.png" alt="">
                铂金用户
              </div>
              <p>{{bjs}}<i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '城市合伙人',level: 5,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/cshhr.png" alt="">
                钻石用户
              </div>
              <p>{{cshhrs}}<i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '运营中心',level: 6,type: '10A',jzt: true}})">
              <div>
                <img src="../../assets/my/myTeam/yyzx.png" alt="">
                领航者
              </div>
              <p>{{yyzxs}}<i class="el-icon-arrow-right"></i></p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的客户" name="second">
          <ul>
            <li @click="$router.push({name: 'teamItem',query: {title: '直推会员',level: 1,type: '10B'}})">
              <div>
                <img src="../../assets/my/myTeam/zthy.png" alt="">
                直推会员
              </div>
              <span>{{zthys}}</span>
              <p>今日新增<em class="aEm">{{zthyxzs}}</em><i class="el-icon-arrow-right"></i></p>
            </li>
            <li @click="$router.push({name: 'teamItem',query: {title: '间推会员',level: 2,type: '10B'}})">
              <div>
                <img src="../../assets/my/myTeam/jthy.png" alt="">
                间推会员
              </div>
              <span>{{jthys}}</span>
              <p>今日新增<em class="aEm">{{jthyxzs}}</em><i class="el-icon-arrow-right"></i></p>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
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
      khs: 0,
      tys: 0,
      tyxzs: 0,
      bys: 0,
      byxzs: 0,
      hjs: 0,
      bjs: 0,
      cshhrs: 0,
      yyzxs: 0,
      zthys: 0,
      zthyxzs: 0,
      jthys: 0,
      jthyxzs: 0,
      activeName: 'first',
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
            this.khs = res.data[19]
            this.tys = res.data[31]
            this.tyxzs = res.data[34]
            this.bys = res.data[32]
            this.byxzs = res.data[35]
            this.hjs = res.data[33]
            this.bjs = res.data[36]
            this.cshhrs = res.data[37]
            this.yyzxs = res.data[38]
            this.zthys = res.data[21]
            this.zthyxzs = res.data[22]
            this.jthys = res.data[23]
            this.jthyxzs = res.data[24]
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

<template>
  <div class='hundred signIn-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <img src="../assets/signIn.png" alt="">
      <div><img src="../assets/jb.png" alt="">再连续签到{{lxjd}}天可获得{{lxjdjf}}积分</div>
    </div>
    <div class="contentDiv">
      <div class="calendarDiv">
        <p>{{headDay}}</p>
        <ol>
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ol>
        <ul>
          <li v-for="item in fakeDayArr" :key="item"></li>
          <li :class="item.have ? 'aLi':''" v-for="(item,index) in realDayArr" :key="index">{{item.key}}</li>
        </ul>
      </div>
      <div @click="signIn" class="btnDiv">立即签到</div>
      <p>签到奖励规则</p>
      <span>1.每连续签到7天可获得50积分，无上限<br/>2.签到获得的积分可以兑换白银用户。</span>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      headDay: '',
      month: '',
      monthFirstWeek: '',
      nowDays: '',
      // 2个数组，前一个用来当空项用，后一个才有实际用处
      fakeDayArr: [],
      realDayArr: [],
      fullscreenLoading: false,
      lxjd: 0,
      lxjdjf: 0,
    }
  },
  created () {
    this.headDay = this.$moment().format('YYYY年MM月')
    let startTime = this.$moment().startOf('month');//月初
    this.monthFirstWeek = this.$moment(startTime).day()
    this.nowDays = this.$moment().daysInMonth()
    for (let i = 1; i < this.monthFirstWeek+1; i++) {
      this.fakeDayArr.push(-i)
    }
    
    this.getData()
  },
  methods: {
    getData() {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '153260',
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '59': this.$stact.state.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.lxjd = res.data[41]
            this.lxjdjf = res.data[38]
            let dataArr = res.data[40].split(',')
            for (let i = 1; i < this.nowDays+1; i++) {
              let flag = false
              dataArr.forEach(item => {
                if (item==i) {
                  flag = true
                }
              });
              if (flag) {
                this.realDayArr.push({
                  key: i,
                  have: true
                })
              }else{
                this.realDayArr.push({
                  key: i,
                  have: false
                })
              }
            }
            console.log(this.realDayArr);
            
          } else {
            this.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    signIn() {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '153261',
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '59': this.$stact.state.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.realDayArr=[]
            this.getData()
            this.$message({
              message: `签到成功`,
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            if (res.data[38]) {
              this.$message({
                message: `获得${res.data[38]}积分`,
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            }
          } else {
            this.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
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

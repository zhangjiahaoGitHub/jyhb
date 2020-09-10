<template>
    <div class='hundred activityAward-layout'>
        <ul>
          <li @click="toInfo(index)" v-for="(item,index) in infoArr" :key="index">
            <img :src="listArr[index]" alt="">
            <div>
              <p>{{item.name}}</p>
              <p>倒计时：{{item.countdown}}天</p>
            </div>
          </li>
        </ul>
        <div>
          <img src="../../assets/logo.png" alt="">
          誠方印全国运营中心
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      listArr: [],
      infoArr: []
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getInfo()
  },
  methods: {
    toInfo (index) {
      this.$router.push({
        name:'activityAwardInfo',
        query:{
          listArr:this.listArr[index],
          infoArr:JSON.stringify(this.infoArr[index])
        }
      })
    },
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390007',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.listArr.push(JSON.parse(res.data[57])['10Q'])
            this.listArr.push(JSON.parse(res.data[57])['10R'])
            console.log(this.listArr);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getInfo () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690025',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            for (let i = JSON.parse(res.data[57]).length-1; i>=0; i--) {
              this.infoArr.push(JSON.parse(res.data[57])[i])
            }
            this.infoArr[1].name='月交易量奖励'
            this.infoArr.forEach(item => {
              let m1 = this.$moment()
              let m2 = this.$moment(item.endTime.time)
              item.countdown = m2.diff(m1, 'day')
            });
            this.getData()
            console.log(this.infoArr);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

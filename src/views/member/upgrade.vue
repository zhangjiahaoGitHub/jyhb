<template>
  <div class='hundred upgrade-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li v-for="item in itemArr" :key="item.id">
        <img @click="popShow(item)" :src="item.url" alt="">
      </li>
    </ul>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false">
      <i @click="drawer=false" class="el-icon-close"></i>
      <div class="titleDiv">
        <p>需支付</p>
        <span>{{money}}</span>
      </div>
      <p>选择支付方式</p>
      <ul>
        <li @click="radio='w'">
          <div>
            <img src="../../assets/member/wx.png" alt="">
            <div>
              <p>微信支付</p>
              <p>最快捷的支付方式</p>
            </div>
          </div>
          <el-radio v-model="radio" label="w"></el-radio>
        </li>
        <li @click="radio='z'">
          <div>
            <img src="../../assets/member/zfb.png" alt="">
            <div>
              <p>支付宝支付</p>
              <p>最快捷的支付方式</p>
            </div>
          </div>
          <el-radio v-model="radio" label="z"></el-radio>
        </li>
      </ul>
      <div @click="pay" class="btnDiv">立即升级</div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      direction: 'btt',
      drawer: false,
      fullscreenLoading: false,
      level: 0,
      needToLevel: 0,
      itemArr: [],
      radio: 'z',
      levelObj: {
        '1': '体验用户',
        '2': '白银用户',
        '3': '黄金用户',
        '4': '铂金用户',
        '5': '城市合伙人',
        '6': '运营中心',
      },
      money: 0,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getList()
  },
  methods: {
    popShow(item){
      if (this.level >= item.level) {
        this.$message({
          message: '您已经升过该等级',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      this.money = item.upgradeAmt
      this.needToLevel = item.level
      this.drawer = true
    },
    // 支付
    pay () {
      if (this.radio=='w') {
        this.$message({
          message: '暂不支持',
          type: 'success'
        });
        return
      }
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190111',
        '5': this.money*100,
        '8': this.radio,
        '13': this.needToLevel,
        '41': 'M',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            if (this.radio=='z') {
              this.$router.push({
                name: 'payForm',
                query: {
                  form: res.data[14]
                }
              })
            }else if (this.radio=='w') {
              window.location.href=JSON.parse(res.data[14]).mweb_url
            }
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    getList () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390003',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.level = res.data[33]
            this.itemArr = JSON.parse(res.data[57])
            console.log(this.itemArr);
            
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

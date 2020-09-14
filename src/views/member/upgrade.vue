<template>
  <div class='hundred upgrade-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div class="headDiv">
      <div>
        <p>{{levelObj[level]}}</p>
        <p>升级享受更多权益</p>
      </div>
    </div>
    <div class="navDiv">
      <p class="titleP">会员等级</p>
      <ol>
        <li @click="lookItem(index+1)" v-for="(item,index) in itemArr" :key="index">
          <img class="bgImg" :src="item.image" alt="">
          <img v-if="needToLevel == index+1" class="dwImg" src="../../assets/member/choseIcon.png" alt="">
        </li>
      </ol>
    </div>
    <p>升级条件：{{itemObj[16]}}</p>
    <div class="footDiv">
      <p class="titleP">会员特权</p>
      <ul>
        <li>
          <img src="../../assets/member/znhk.png" alt="" srcset="">
          <div>
            <span>智能还款</span>
            <p>费率低至{{itemObj[11]}}%</p>
          </div>
        </li>
        <li class="noRight">
          <img src="../../assets/member/hdsy.png" alt="" srcset="">
          <div>
            <span>活动收益</span>
            <p>费率低至{{itemObj[12]}}%</p>
          </div>
        </li>
        <li>
          <img src="../../assets/member/kjsk.png" alt="" srcset="">
          <div>
            <span>快捷收款</span>
            <p>费率低至{{itemObj[10]}}%</p>
          </div>
        </li>
        <li class="noRight">
          <img src="../../assets/member/tjjl.png" alt="" srcset="">
          <div>
            <span>推荐奖励</span>
            <p>费率低至{{itemObj[13]}}%</p>
          </div>
        </li>
        <li class="noBottom">
          <img src="../../assets/member/bksq.png" alt="" srcset="">
          <div>
            <span>办卡申请</span>
            <p>费率低至{{itemObj[17]}}%</p>
          </div>
        </li>
        <li class="noBottom noRight">
          <img :src="itemObj[14]=='1' ? require('../../assets/member/kkqx.png'):require('../../assets/member/wkkqy.png')" alt="">
          <div>
            <span>{{itemObj[14]=='1' ? '':'无'}}空卡权限</span>
            <p>活动使用权限</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="btnDiv">
      <span>{{itemObj[15] || '自动升级'}}</span>
      <img @click="itemObj[15] ? popShow=true: ''" :src="itemObj[15] ? require('../../assets/member/ljkt.png'):require('../../assets/member/ljkth.png')" alt="">
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <ul @click.stop="">
        <li>
          <img src="../../assets/member/zfb.png" alt="">
          支付宝支付
        </li>
        <li>
          <img src="../../assets/member/wx.png" alt="">
          微信支付
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      direction: 'btt',
      popShow: false,
      fullscreenLoading: false,
      level: 1,
      needToLevel: 1,
      itemArr: [],
      radio: 'z',
      levelObj: {
        '1': '普通用户',
        '2': '经济人',
        '3': '城市服务商',
        '4': '城市运营商',
        '5': '高级合伙人',
        '6': '达标团队长',
        '7': '一星团队长',
        '8': '二星团队长',
        '9': '三星团队长',
      },
      money: 0,
      level: 1,
      itemObj: {},
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.needToLevel = this.$route.query.level
    this.getList()
    this.getData(this.needToLevel)
  },
  methods: {
    lookItem(level){
      this.needToLevel = level
      this.getData(this.needToLevel)
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
        '3': '190124',
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
            this.$set(this,'itemArr',JSON.parse(res.data[10]))
            console.log(this.itemArr);
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    getData (level) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190126',
        '43': level,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$set(this,'itemObj',res.data)
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

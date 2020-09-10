<template>
  <div class='hundred credit-layout'>
    <div style='height:1px'></div>
    <p>基本信息</p>
    <input type="text" placeholder='请输入姓名' v-model='name' />
    <input type="text" v-model='idCard' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')"  placeholder='请输入身份证号'/>
    <input type="text" v-model='card' placeholder='请输入信用卡卡号' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')"/>
    <input type="number" v-model='phone' placeholder='请输入预留手机号' oninput="this.value=this.value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" />
    <p>查询费用：{{cardMoney}}元</p>
    <div class='btnDiv' @click='get()' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      查询
    </div>
    <div class="agreeXy">查询即默认同意《用户授权协议》</div>
    <pre>
  查询须知：
  1.两个月内新卡请勿查询，否则查询无结果
  2.近半年内无交易的卡请勿查询，否则查无结果
  3.请确保输入信息属实，否则查无结果
    </pre>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <div @click.stop="">
        <p>支付方式</p>
        <div>
          <div @click="pay('z')">
            <img src="../../assets/member/zfb.png" alt="">
            <span>支付宝支付</span>
          </div>
          <div @click="pay('w')">
            <img src="../../assets/member/wx.png" alt="">
            <span>微信支付</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fullscreenLoading: false,
      popShow: false,
      name: '',
      idCard: '',
      card: '',
      phone: '',
      share: 0,
      cardMoney: 0
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.cardMoney = this.$stact.state.cardMoney
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
  },
  methods: {
    // 支付
    pay (radio) {
      if (radio=='w') {
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
        '5': this.cardMoney*100,
        '8': radio,
        '41': 'CZ',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.$router.push({
              name: 'payForm',
              query: {
                form: res.data[14]
              }
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    get () {
      let vm = this
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '姓名必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.idCard.match(/^[ ]*$/)) {
        this.$message({
          message: '身份证必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.card.match(/^[ ]*$/)) {
        this.$message({
          message: '信用卡卡号必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      this.$confirm(`此次查询费用${this.cardMoney}元，将从可提现分润扣除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '690016',
          '40': vm.merchantNo,
          '42': vm.idCard,
          '43': vm.card,
          '44': vm.name,
          '45': vm.phone,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.fullscreenLoading = true
        vm.$http.get(`request.app${url}`)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$router.push({ name: 'ifarme', query: { url: res.data[57], title: '卡测评' } })
            } else if (res.data[39] == 'ZZ') {
              // vm.$router.push({ name: 'paycopy' })
              vm.$message({
                message: '余额不足，请充值',
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
              this.popShow = true
            }else{
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2500,
                type: 'success'
              })
            }
            
          })
          .catch(err => {
            vm.fullscreenLoading = false
            console.log(err)
          })
      }).catch(() => {
      })
    }
  }
}
</script>

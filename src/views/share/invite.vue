<template>
  <div class='hundred invite-layout'>
    <div class="headDiv">
      <div>
        <p>推广服务</p>
        <p>自用省钱，推广赚钱</p>
        <ul>
          <li @click="$router.push({name: 'faceToface'})">
            <img src="../../assets/share/ic_share_face_to_face_registration.png" alt="">
            <span>面对面注册</span>
          </li>
          <li @click="()=>{this.$router.push({name:'shareimg'})}">
            <img src="../../assets/share/ic_share_share_qr_code.png" alt="">
            <span>分享二维码</span>
          </li>
          <li @click="()=>{this.$router.push({name:'upgrade'})}">
            <img src="../../assets/share/ic_share_i_want_to_upgrade.png" alt="">
            <span>我要升级</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="imgDiv">
      <img src="../../assets/share/banner.png" alt="">
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
      code: ''
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.code = this.$route.query.code
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.message()
  },
  mounted () {
  },
  methods: {
    zwkf () {
      this.$message({
        message: '暂未开放--',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'success'
      })
    },
    toIframe () {
      this.$router.push({ name: 'ifarme', query: { url: 'https://x.eqxiu.com/s/4LSgWp4u', title: '操作手册' } })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '43': '10M',
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            console.log(JSON.parse(res.data[57]));
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

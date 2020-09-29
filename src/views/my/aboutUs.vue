<template>
  <div class="hundred aboutUs-layout">
    <div class="imgDiv">
      <img src="../../assets/logo.png" alt="" srcset="">
    </div>
    <ul>
      <li>
        <span>版本信息</span>
        <span>V{{version.substring(version.length-5,version.length)}}</span>
      </li>
      <li @click="callService(kfPhone)">
        <span>客服电话</span>
        <p>{{kfPhone}} <img src="../../assets/my/aboutPhone.png" alt=""></p>
      </li>
    </ul>
    <ul>
      <li @click="problem(yhxi, '用户协议')">
        <span>用户协议</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="problem(gsjj, '公司简介')">
        <span>公司简介</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      version: "",
      password: "",
      agentNo: "",
      fullscreenLoading: false,
      kfPhone: "",
      yhxi: "",
      gsjj: "",
    };
  },
  created() {
    this.version = this.$stact.state.version;
    this.agentNo = this.$stact.state.agentNo;
    this.kfPhone = window.localStorage.getItem('kfPhone')
    this.yhxi = this.$route.query.yhxi
    this.gsjj = this.$route.query.gsjj
  },
  methods: {
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    callService(phone){
      const h = this.$createElement;
      this.$msgbox({
          // title: '提示',
          message: h('p', null, [
            h('p', { style: 'text-align: center' },'拨打电话'),
            h('p', { style: 'text-align: center' }, phone)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'callPhone',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              window.location.href= 'tel:'+localStorage.phone
            } else {
              done();
            }
          }
        }).then(action => {
          
        });
    },
  },
};
</script>

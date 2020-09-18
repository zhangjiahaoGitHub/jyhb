<template>
  <div class='hundred zhgl-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <span @click="type=!type" v-if="!type">编辑</span>
    <span @click="type=!type" v-else>完成</span>
    <ul>
      <li @click="!type ? login(item,index):''" v-for="(item,index) in userList" :key="item.merchantNo">
        <div>
          <i @click.stop="del(index)" v-if="type" class="el-icon-remove"></i>
          <img :src="item.headUrl" alt="">
          <div>
            <span>{{item.merchantCnName}}</span>
            <p>{{item.phone}}</p>
          </div>
        </div>
        <i v-if="item.phone==phone" class="el-icon-check"></i>
      </li>
    </ul>
    <div @click="$router.push({name:'addZh'})">
      <i class="el-icon-circle-plus"></i>
      添加账号
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: '',
      version: '',
      agentNo: '',
      userList: [],
      type: false,
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.$set(this,'userList',JSON.parse(window.localStorage.getItem('userList')))
    console.log(this.userList);
  },
  methods: {
    login(item,index){
      let vm = this
      let parmas = {
        0: "0700",
        1: item.phone,
        3: "190928",
        8: item.passWord,
        59: vm.version,
      };
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas));
      vm.fullscreenLoading = true;
      vm.$http
        .get(`request.app${url}`)
        .then((res) => {
          vm.fullscreenLoading = false;
          if (res.data[39] === "00" || res.data[39] === "W8") {
            vm.$message({
              message: "登录成功",
              center: true,
              offset: 30,
              duration: 2500,
              type: "success",
            });
            localStorage.setItem('kfPhone',res.data[18])
            localStorage.setItem('sjMoney',res.data[21])

            new Promise((resolve, reject) => {
              vm.$stact.dispatch("SetToken", res.data[42]); // 存token 进行登录退出判断
              vm.$stact.dispatch("setCardm", res.data[19]);
              resolve();
            })
              .then((r) => {
                if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                  vm.$router.push({ name: "home" }); // ios 调路由第一次无法跳转存在问题 该问题是vue脚手架问题无法解决 侧面解决多运行一次
                  setTimeout(() => {
                    vm.$router.push({ name: "home" });
                  }, 1000);
                } else {
                  vm.$router.push({ name: "home" });
                }
              })
              .catch((err) => console.log(err));
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: "success",
            });
            vm.del(index)
          }
        })
        .catch((err) => {
          console.log(err);
          vm.fullscreenLoading = false;
        });
    },
    del(index){
      let me = this
      this.userList.splice(index,1)
      localStorage.setItem('userList',JSON.stringify(me.userList))
    }
  }
}
</script>

<template>
  <div class="hundred addUser-layout">
    <ul>
      <li>
        <span>账号</span>
        <input v-model="phone" type="number" placeholder="手机号" />
      </li>
      <li>
        <span>密码</span>
        <input v-model="password" type="password" placeholder="密码" />
      </li>
    </ul>
    <div @click="login" class="btnDiv">登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      version: "",
      password: "",
      agentNo: "",
      fullscreenLoading: false,
    };
  },
  created() {
    this.version = this.$stact.state.version;
    this.agentNo = this.$stact.state.agentNo;
  },
  mounted() {
    this.$inputLen.inputJs();
  },
  methods: {
    login(){
      let vm = this
      let parmas = {}
      if (vm.phone.match(/^[ ]*$/)) {
        vm.$message({
          message: "手机号码必须填写",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      if (!/^1[1-9]\d{9}$/.test(vm.phone)) {
        vm.$message({
          message: "手机号码有误，请重填",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      if (vm.password.match(/^[ ]*$/)) {
        vm.$message({
          message: "密码必须填写",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      parmas = {
        0: "0700",
        1: vm.phone,
        3: "190928",
        8: vm.$md5(vm.password),
        12: window.localStorage.getItem('openId'),
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

            window.sessionStorage.clear()

            localStorage.setItem('kfPhone',res.data[18])
            localStorage.setItem('sjMoney',res.data[21])
            
            // 多用户
            let userList = JSON.parse(localStorage.getItem('userList')) || []
            
            // 把老的，相同的，以前的账号删除
            let flag = ''
            for (let i = 0; i < userList.length; i++) {
              if (userList[i].phone == vm.phone) {
                flag = i
              }
            }
            if (flag!=='') {
              userList.splice(flag,1)
            }

            userList.unshift({
              phone: JSON.parse(res.data[42])[0].phone,
              passWord: JSON.parse(res.data[42])[0].passwd,
              merchantNo: JSON.parse(res.data[42])[0].merchantNo,
              headUrl: JSON.parse(res.data[42])[0].headUrl,
              merchantCnName: JSON.parse(res.data[42])[0].merchantCnName,
            })
            localStorage.setItem('userList',JSON.stringify(userList))

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
          }
        })
        .catch((err) => {
          console.log(err);
          vm.fullscreenLoading = false;
        });
    },
  },
};
</script>

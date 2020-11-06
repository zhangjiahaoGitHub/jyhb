<template>
  <div class="hundredW login-layout">
    <div class="pageTitle">
      登录
      <span @click="()=>{this.$router.push({name:'registered'})}">注册</span>
    </div>
    <img src="../assets/loginLogo.png" alt srcset />
    <div class="contentDiv">
      <div class="navDiv">
        <p @click="loginType=1" :class="loginType==1 ? 'aP':''">密码登录</p>
        <p @click="loginType=2" :class="loginType==2 ? 'aP':''">短信登录</p>
      </div>
      <ul>
        <li>
          <img src="../assets/registerLogin/userIcon.png" alt />
          <input v-model="phone" type="number" placeholder="请输入您的手机号码" />
          <img
            v-if="phone.length>0"
            @click="()=>{this.phone = '';this.password = ''}"
            src="../assets/registerLogin/del.png"
            alt
          />
        </li>
        <li v-if="!checked && loginType==1">
          <img src="../assets/registerLogin/passwordIcon.png" alt />
          <input v-model="password" type="password" placeholder="请输入您的密码" />
          <img @click="()=>{this.checked = true}" src="../assets/registerLogin/hideEye.png" alt />
        </li>
        <li v-if="checked && loginType==1">
          <img src="../assets/registerLogin/passwordIcon.png" alt />
          <input v-model="password" type="text" placeholder="请输入您的密码" />
          <img @click="()=>{this.checked = false}" src="../assets/registerLogin/openEye.png" alt />
        </li>
        <li v-if="loginType==2">
          <img src="../assets/registerLogin/passwordIcon.png" alt />
          <input v-model="code" type="text" placeholder="请输入您的验证码" />
          <span @click="time <= 0 ? getCode() : ''">{{text}}</span>
        </li>
        <p @click="()=>{this.$router.push({name:'forget'})}">忘记密码？</p>
      </ul>
      <div @click="login" class="btnDiv">登录</div>
    </div>
    <div class="footDiv">
      <p>
        登录即表示您已同意
        <span
          @click="$router.push({ name: 'ifarme', query: { url: 'http://jyhbban.llyzf.cn/jyhb/register_protocol.html', title: '用户使用协议' } })"
        >《用户使用协议》</span>
      </p>
      <p>
        如需帮助，请致电
        <span>4008546580</span>(服务时间9:00-18:00)
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 0,
      text: "获取验证码",
      checked: false,
      phone: "",
      version: "",
      password: "",
      agentNo: "",
      fullscreenLoading: false,
      openId: "",
      code: "",
      loginType: 1,
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
    getCode() {
      // 获取验证码
      let vm = this;
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: "手机号码必须填写",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      if (!/^1[1-9]\d{9}$/.test(this.phone)) {
        this.$message({
          message: "手机号码有误，请重填",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      let parmas = {
        0: "0700",
        1: vm.phone,
        3: "190919",
        5: "2",
        59: vm.version,
      };
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas));
      vm.fullscreenLoading = true;
      vm.$http
        .get(`request.app${url}`)
        .then((res) => {
          vm.fullscreenLoading = false;
          if (res.data[39] === "00") {
            vm.$message({
              message: "发送成功",
              center: true,
              offset: 30,
              duration: 2500,
              type: "success",
            });
            vm.sendMail();
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          vm.fullscreenLoading = false;
        });
    },
    sendMail() {
      // 倒计时
      this.time = 60;
      this.timer();
    },
    timer() {
      // 倒计时中
      if (this.time > 0) {
        this.text = `${this.time--}S后可重发`;
        setTimeout(this.timer, 1000);
      } else {
        this.text = "重新获取";
      }
    },
    login(){
      let vm = this
      let parmas = {}
      if (this.loginType==1) {
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
          59: vm.version,
        };
      }else if (this.loginType==2) {
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
        if (vm.code.length!=6) {
          vm.$message({
            message: "验证码为6位",
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
          13: 1,
          21: vm.code,
          59: vm.version,
        };
      }
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
            localStorage.setItem('baodan',res.data[26])
            localStorage.setItem('switch',res.data[23])
            
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
                  // 实名审核拒绝
                  if (JSON.parse(res.data[42])[0].freezeStatus=='10C') {
                    this.$router.push({name: 'real'})
                    setTimeout(() => {
                      vm.$router.push({ name: "real" });
                    }, 1000);
                  }else{
                    vm.$router.push({ name: "home" }); // ios 调路由第一次无法跳转存在问题 该问题是vue脚手架问题无法解决 侧面解决多运行一次
                    setTimeout(() => {
                      vm.$router.push({ name: "home" });
                    }, 1000);
                  }
                } else {
                  // 实名审核拒绝
                  if (JSON.parse(res.data[42])[0].freezeStatus=='10C') {
                    this.$router.push({
                      name: 'real'
                    })
                  }else{
                    vm.$router.push({ name: "home" });
                  }
                }
              })
              .catch((err) => console.log(err));
          } else {
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: "warning",
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

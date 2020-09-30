<template>
    <div class='hundred emptyCardCredit-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="headDiv">
        <div>
          <img :src="dataObj[31] ? dataObj[31]:require('../../assets/head.png')" alt="">
          <div>
            <p>{{dataObj[33]}}<span>{{dataObj[32]}}</span></p>
            <span>{{dataObj[34]}}</span>
          </div>
        </div>
      </div>
      <div class="xyfDiv">
        <div>
          <p>当前空卡单笔上限：{{dataObj[35]}}<span @click="toSxTx">信用分充值</span></p>
          <p>当前信用分：{{dataObj[36]}}元</p>
          <p>被授信额度：{{dataObj[37]}}元</p>
          <p>冻结额度：{{dataObj[38]}}元</p>
        </div>
        <ul>
          <li>授信列表</li>
          <li @click="sqsxPopDiv=true">申请授信</li>
          <li @click="kjsxPopDiv=true">快捷授信</li>
        </ul>
      </div>

      <img @click="searchList(true)" :src="type==1 ? require(`../../assets/my/nav_sqlb.png`):require(`../../assets/my/nav_sxmx.png`)" alt="">

      <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
        <div v-if="type==1" class="sqlb">
          <li v-for="(item,index) in listArr" :key="index">
            <p>日期：{{item.formatTime}}</p>
            <p>去向：{{item.MERCHANT_CN_NAME}} {{item.LINK_PHONE}}</p>
            <div>
              <span>授信额度：{{item.QYK_SORE}}</span>
              <p v-if="item.SUB_STATUS=='10B'">
                <span @click="jj(index)">拒绝</span>
                <span @click="ty(index)">同意</span>
                <span @click="edit(item,index)">修改</span>
              </p>
            </div>
          </li>
        </div>
        <div v-if="type==2" class="sxmx">
          <li v-for="(item,index) in listArr" :key="index">
            <p>日期：{{item.formatTime}}</p>
            <p>去向：{{item.MERCHANT_CN_NAME}} {{item.LINK_PHONE}}</p>
            <div>
              <span>授信额度：{{item.QYK_SORE}}</span>
              <p>
                <span v-if="item.STATUS=='10B'" class="tySpan">已同意授信</span>
                <span v-else class="jjSpan">拒绝授信</span>
              </p>
            </div>
          </li>
        </div>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul>

      <div v-if="sqsxPopDiv" class="sqsxPopDiv">
        <div>
          <div>
            <p>申请授信</p>
            <div>
              <img src="../../assets/my/qb.png" alt="">
              <input v-model="sqsxMoney" type="number" placeholder="请输入申请授信额度">
            </div>
          </div>
          <ol>
            <li>
              <p>{{dataObj[29]}}</p>
              <span>推荐人</span>
            </li>
            <span></span>
            <li>
              <p>{{dataObj[30]}}</p>
              <span>推荐人手机号</span>
            </li>
          </ol>
          <p @click="sqsx">确认</p>
        </div>
        <i @click="sqsxPopDiv=false" class="el-icon-circle-close"></i>
      </div>
      <div v-if="kjsxPopDiv" class="kjsxPopDiv">
        <div>
          <div>
            <p>快捷授信</p>
            <ol>
              <li>
                <img src="../../assets/my/phone.png" alt="">
                <input v-model="xjPhone" type="number" name="" id="" placeholder="请输入下级手机号">
                <p @click="cxxj">查询</p>
              </li>
              <li>
                <img src="../../assets/my/phone.png" alt="">
                <input v-model="kjsxPhone" type="number" name="" id="" placeholder="请输入手机号">
              </li>
              <li>
                <img src="../../assets/my/code.png" alt="">
                <input v-model="code" type="text" placeholder="请输入验证码" />
                <span @click="time <= 0 ? getCode() : ''">{{text}}</span>
              </li>
              <li>
                <img src="../../assets/my/qb.png" alt="">
                <input v-model="kjsxMoney" type="number" name="" id="" placeholder="请输入申请授信额度">
              </li>
            </ol>
          </div>
          <p><span @click="kjsxQx">取消</span><span @click="kjsx">确认</span></p>
        </div>
      </div>
      <div v-if="editSx" class="editSx">
        <div>
          <p>温馨提示</p>
          <div>
            <p>请输入修改的额度积分</p>
            <input v-model="nowItemEd" type="number" name="" id="">
            <div>
              <p @click="xgQx">取消</p>
              <p @click="xg">确定</p>
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
      dataObj: {},
      sqsxPopDiv: false,
      kjsxPopDiv: false,
      editSx: false,
      text: '获取验证码',
      code: '',
      time: 0,
      type: 1,
      count: 20,
      loading: false,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1,
      sqsxMoney: '',
      xjPhone: '',
      kjsxPhone: '',
      kjsxMoney: '',
      nowItemEd: '',
      nowIndex: '',
      nowItemId: '',
    }
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
  },
  methods: {
    toSxTx(){
      this.$router.push({
        name:'sxTx',
        query: {
          balance: this.dataObj[41]
        }
      })
    },
    kjsxQx(){
      this.code = ''
      this.xjPhone = ''
      this.kjsxPhone = ''
      this.kjsxMoney = ''
      this.text = '获取验证码'
      this.time = 0
      this.kjsxPopDiv = false
    },
    xgQx(){
      this.nowItemEd = ''
      this.nowIndex = ''
      this.nowItemId = ''
      this.editSx = false
    },
    searchList (change) {
      if (change) {
        if (this.type==1) {
          this.type=2
        }else{
          this.type=1
        }
      }
      this.count = 20
      this.pageCount = 1
      this.listArr = []
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    getCode () { // 获取验证码
      let vm = this
      if (this.kjsxPhone.match(/^[ ]*$/)) {
        this.$message({
          message: '手机号码必须填写',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.kjsxPhone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': vm.kjsxPhone,
        '3': '190919',
        '5': '3',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: '发送成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.sendMail()
          } else {
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
          console.log(err)
          vm.fullscreenLoading = false
        })
    },
    sendMail () { // 倒计时
      this.time = 60
      this.timer()
    },
    timer () { // 倒计时中
      if (this.time > 0) {
        this.text = `${this.time--}S后可重发`
        setTimeout(this.timer, 1000)
      } else {
        this.text = '重新获取'
      }
    },
    edit (item,index) {
      this.editSx = true
      this.nowItemEd = item.QYK_SORE
      this.nowItemId = item.ID
      this.nowIndex = index
    },
    xg () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390096',
        '10': vm.nowItemId,
        '11': vm.nowItemEd,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
      .then(res => {
        this.fullscreenLoading = false
        if (res.data[39] === '00') {
          vm.$message({
            message: "修改成功",
            center: true,
            offset: 30,
            duration: 2500,
            type: "success",
          });
          this.listArr[vm.nowIndex].QYK_SORE = this.nowItemEd
          this.xgQx()
        }else{
          this.$message({
            message: res.data[39],
            type: 'success'
          });
        }
      })
      .catch(err => {
        this.fullscreenLoading = false
        console.log(err)
      })
    },
    ty (index) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390095',
        '10': vm.listArr[index].ID,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.$confirm('是否同意?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true
        vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: "操作成功",
              center: true,
              offset: 30,
              duration: 2500,
              type: "success",
            });
            this.listArr.splice(index,1)
          }else{
            this.$message({
              message: res.data[39],
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    jj (index) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390094',
        '10': vm.listArr[index].ID,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.$confirm('是否拒绝?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true
        vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$message({
              message: "操作成功",
              center: true,
              offset: 30,
              duration: 2500,
              type: "success",
            });
            this.listArr.splice(index,1)
          }else{
            this.$message({
              message: res.data[39],
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    kjsx () {
      let vm = this
      if (!(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/).test(this.xjPhone)) {
        vm.$message({
          message: "下级手机号格式错误",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      if (!(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/).test(this.kjsxPhone)) {
        vm.$message({
          message: "手机号格式错误",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      if (this.code.match(/^[ ]*$/)) {
        this.$message({
          message: '验证码必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      console.log(this.code.length)
      if (this.code.length !== 6) {
        this.$message({
          message: '验证码必须为六位',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(this.kjsxMoney>0)) {
        vm.$message({
          message: "请输入申请授信额度",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      let parmas = {
        '0': '0700',
        '3': '390092',
        '42': vm.xjPhone,
        '43': vm.kjsxPhone,
        '44': vm.kjsxMoney,
        '45': vm.code,
        '46': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$message({
              message: '授信成功',
              type: 'success'
            });
            this.kjsxQx()
            this.searchList(false)
          }else{
            this.$message({
              message: res.data[39],
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    cxxj () {
      let vm = this
      if (!(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/).test(this.xjPhone)) {
        vm.$message({
          message: "下级手机号格式错误",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      let parmas = {
        '0': '0700',
        '3': '190117',
        '10': this.xjPhone,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$message({
              message: '该手机号为您的直推客户，可正常授信',
              type: 'success'
            });
          }else{
            this.$message({
              message: res.data[39],
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    sqsx () {
      let vm = this
      if (!(this.sqsxMoney>0)) {
        vm.$message({
          message: "请输入授信额度",
          center: true,
          offset: 30,
          duration: 2500,
          type: "warning",
        });
        return;
      }
      let parmas = {
        '0': '0700',
        '3': '390091',
        '42': vm.merchantNo,
        '43': vm.dataObj[30],
        '44': vm.sqsxMoney,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.sqsxPopDiv = false
          }else{
            this.$message({
              message: res.data[39],
              type: 'success'
            });
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390090',
        '42': vm.merchantNo,
        // 1-申请列表，2-授信明细
        '43': this.type,
        // 页码
        '44': this.pageCount,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.dataObj = res.data
            vm.count = JSON.parse(res.data[40]).length
            let getList = JSON.parse(res.data[40])
            getList.forEach(item => {
              item.formatTime = this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm')
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

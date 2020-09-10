<template>
  <div class='hundred oneCardDh-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true'>
      <el-tab-pane label="全部" name="all">
        <ul>
          <li @click="toPlanInfo(item)" v-for="item in listArr" :key="item.ID">
            <div class="titleDiv">
              <p><img src="../../assets/repay/package.png" alt="">批次号：{{item.ID.substring(0,10)}}</p>
              <p><img :src="(item.STATUS=='10C' || item.STATUS=='10D') ? require('../../assets/repay/stop.png'):require('../../assets/repay/running.png')" alt="">{{stateObj[item.STATUS]}}</p>
            </div>
            <div class="timeDiv"><span>{{item.formatTime}}</span><i class="el-icon-arrow-right"></i></div>
            <p>{{item.bank}}</p>
            <div @click.stop="delPlan(item)" class="delDiv">删除批次</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="等待执行" name="10A">
        <ul>
          <li @click="toPlanInfo(item)" v-for="item in listArr" :key="item.ID">
            <div class="titleDiv">
              <p><img src="../../assets/repay/package.png" alt="">批次号：{{item.ID.substring(0,10)}}</p>
              <p><img :src="(item.STATUS=='10C' || item.STATUS=='10D') ? require('../../assets/repay/stop.png'):require('../../assets/repay/running.png')" alt="">{{stateObj[item.STATUS]}}</p>
            </div>
            <div class="timeDiv"><span>{{item.formatTime}}</span><i class="el-icon-arrow-right"></i></div>
            <p>{{item.bank}}</p>
            <div @click.stop="delPlan(item)" class="delDiv">删除批次</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="正在执行" name="10B">
        <ul>
          <li @click="toPlanInfo(item)" v-for="item in listArr" :key="item.ID">
            <div class="titleDiv">
              <p><img src="../../assets/repay/package.png" alt="">批次号：{{item.ID.substring(0,10)}}</p>
              <p><img :src="(item.STATUS=='10C' || item.STATUS=='10D') ? require('../../assets/repay/stop.png'):require('../../assets/repay/running.png')" alt="">{{stateObj[item.STATUS]}}</p>
            </div>
            <div class="timeDiv"><span>{{item.formatTime}}</span><i class="el-icon-arrow-right"></i></div>
            <p>{{item.bank}}</p>
            <div @click.stop="delPlan(item)" class="delDiv">删除批次</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="10E">
        <ul>
          <li @click="toPlanInfo(item)" v-for="item in listArr" :key="item.ID">
            <div class="titleDiv">
              <p><img src="../../assets/repay/package.png" alt="">批次号：{{item.ID.substring(0,10)}}</p>
              <p><img :src="(item.STATUS=='10C' || item.STATUS=='10D') ? require('../../assets/repay/stop.png'):require('../../assets/repay/running.png')" alt="">{{stateObj[item.STATUS]}}</p>
            </div>
            <div class="timeDiv"><span>{{item.formatTime}}</span><i class="el-icon-arrow-right"></i></div>
            <p>{{item.bank}}</p>
            <div @click.stop="delPlan(item)" class="delDiv">删除批次</div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div class="btnDiv">
      <div @click="$router.push({name: 'addPlan'})">添加计划</div>
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
      activeName: 'all',
      listArr: [],
      stateObj:{
        '10A': '待执行',
        '10B': '执行中',
        '10C': '失败',
        '10D': '已暂停',
        '10E': '已完成',
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.bank = JSON.parse(this.$route.query.item)
    console.log(this.bank);
    this.aisle = this.$route.query.aisle
    this.list()
  },
  methods: {
    toPlanInfo(item){
      this.$router.push({
        name: 'planInfo',
        query: {
          id: item.ID,
          state: item.STATUS
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.list()
    },
    delPlan(item){
      console.log(item);
      let vm = this
      if (item.STATUS === '10A') {
        vm.$message({
          type: 'success',
          message: '请先暂停计划再删除!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      if (item.STATUS === '10B') {
        vm.$message({
          type: 'success',
          message: '请先暂停计划再删除!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$confirm('是否删除计划？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '390002',
          '8': item.ID,
          '42': vm.merchantNo,
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              vm.$message({
                type: 'success',
                message: '删除成功!',
                center: true,
                offset: 30,
                duration: 2500
              })
              this.list()
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
          })
      }).catch(() => {
      })
    },
    toNewIframe(item){
      this.$router.push({ name: 'imgIframe', query: { url: item.url, title: item.channelName } })
    },
    list () {
      let vm = this
      let state = ''
      if (this.activeName!='all') {
        state = this.activeName
      }
      let parmas = {
        '0': '0700',
        '3': '393046',
        '42': vm.merchantNo,
        '43': state,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            let dataArr = JSON.parse(res.data[57])
            dataArr.forEach(item => {
              item.formatTime = this.$moment(item.CREATE_TIME.time).format('YYYY-MM-DD HH:mm:ss')
            })
            this.$set(this,'listArr',dataArr)
            console.log(this.listArr);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>

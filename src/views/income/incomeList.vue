<template>
    <div class='hundred incomeList-style' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div v-if="$route.meta.incomeList" class="pageTitle">
        <i @click="goTop" class="el-icon-arrow-left bs"></i>
        {{$route.query.title}}({{ryry}})
        <span class="rightCorner xuanzhuan" @click.stop="changery"><i class="el-icon-sort"></i></span>
      </div>
      <div v-if="$route.query.type == '1'">
        <div class="hezi-box-sy">
          <div class="title-time">
            <div>2019/06收益</div>
            <div class="price-r">6.44</div>
          </div>
          <div class="detail-box">
            <div class="title-top-bottom" @click.stop="openshow(1)">
              <div>收益明细</div>
              <i class="el-icon-arrow-down" v-show="openindex != 1"></i>
              <i class="el-icon-arrow-up" v-show="openindex == 1"></i>
            </div>
            <div class="detail-list" v-show="openindex == 1">
              <div class="list-row">
                <div>余额代还</div>
                <div>0.56</div>
              </div>
              <div class="list-row">
                <div>余额代还</div>
                <div>0.56</div>
              </div>
              <div class="list-row">
                <div>余额代还</div>
                <div>0.56</div>
              </div>
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
      merchantNo: '',
      agentNo: '',
      fullscreenLoading: false,
      openindex: 0,
      cahngeflag: false,
      ryry: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.type = this.$route.query.type
    // this.list()
    this.changery()
  },
  methods: {
    goTop() {
      this.$router.go(-1)
    },
    openshow(index) {
      if(this.openindex == index) {
        this.openindex = -1
      }else {
        this.openindex = index
      }
    },
    changery() {
      let vm = this
      this.cahngeflag = !this.cahngeflag
      if(vm.$route.query.type == '1') {
        if(vm.cahngeflag) {
          vm.ryry = '日'
        }else {
          vm.ryry = '月'
        }
      }
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690036',
        '42': vm.merchantNo,
        '43': vm.pageCount,
        '45': vm.$route.query.type,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
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
    },
  }
}
</script>

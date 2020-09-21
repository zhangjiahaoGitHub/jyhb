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
      <div v-if="$route.query.type == '2' || $route.query.type == '4'">
        <div class="hezi-box-sy">
          <div class="title-time-two" v-if="$route.query.type == '2'">
            <div>日期</div>
            <div>总收益额(元)</div>
          </div>
          <div class="title-time-two" v-if="$route.query.type == '4'">
            <div>日期</div>
            <div>总返佣额(元)</div>
          </div>
          <div class="detail-box">
            <div class="title-top-bottom" @click.stop="openshow(1)">
              <div class="two-flex-bet timte-two-two">
                <div>2020-06-23</div>
                <div>23656.00</div>
              </div>
              <i class="el-icon-arrow-down" v-show="openindex != 1"></i>
              <i class="el-icon-arrow-up" v-show="openindex == 1"></i>
            </div>
            <div class="detail-list" v-show="openindex == 1">
              <div class="two-flex-bet title-two">
                <div>关系</div>
                <div>金额</div>
              </div>
              <div class="two-flex-bet">
                <div>直推</div>
                <div>0.56</div>
              </div>
              <div class="two-flex-bet">
                <div>间推</div>
                <div>0.56</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.query.type == '3' || $route.query.type == '5'">
        <div class="three-box">
          <div class="list-row">
            <div>2020-06-12</div>
            <div>4人</div>
          </div>
          <div class="list-row">
            <div>2020-06-12</div>
            <div>4人</div>
          </div>
          <div class="list-row">
            <div>2020-06-12</div>
            <div>4人</div>
          </div>
          <div class="list-row">
            <div>2020-06-12</div>
            <div>4人</div>
          </div>
        </div>
      </div>
      <div v-if="$route.query.type == '6'">
        <div class="hezi-box-sy">
          <div class="title-time-two" v-if="$route.query.type == '2'">
            <div>日期</div>
            <div>总收益额(元)</div>
          </div>
          <div class="title-time-two" v-if="$route.query.type == '4'">
            <div>日期</div>
            <div>总返佣额(元)</div>
          </div>
          <div class="detail-box">
            <div class="title-top-bottom" @click.stop="openshow(1)">
              <div class="two-flex-bet timte-six-six">
                <div>2020-06-23</div>
                <div>23656.00</div>
              </div>
              <i class="el-icon-arrow-down" v-show="openindex != 1"></i>
              <i class="el-icon-arrow-up" v-show="openindex == 1"></i>
            </div>
            <div class="detail-list-six" v-show="openindex == 1">
              <div class="left-six-box">
                <div class="row-list">个人业绩：0.00</div>
                <div class="row-list">余额代还：0.00</div>
                <div class="row-list">空卡代还：0.00</div>
                <div class="row-list">一键收款：0.00</div>
                <div class="row-list">花呗收款：0.00</div>
              </div>
              <div class="left-six-box">
                <div class="row-list">个人业绩：0.00</div>
                <div class="row-list">余额代还：0.00</div>
                <div class="row-list">空卡代还：0.00</div>
                <div class="row-list">一键收款：0.00</div>
                <div class="row-list">花呗收款：0.00</div>
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
      ryry: '',
      ryrynum: '0',
      page: 1
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.type = this.$route.query.type
    this.list()
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
      if(vm.$route.query.type) {
        if(vm.cahngeflag) {
          vm.ryry = '日'
          vm.ryrynum = '0'
        }else {
          vm.ryry = '月'
          vm.ryrynum = '1'
        }
      }
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690041',
        '42': vm.merchantNo,
        '43': vm.page,
        '45': vm.ryrynum,
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

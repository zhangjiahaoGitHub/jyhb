<template>
    <div class='hundred income-style' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="bg-box">
        <div class="mysy">我的今日收益(元)</div>
        <div class="jine-mysy">68800003.00</div>
        <div class="benyue-price" @click.stop="toincomeList('1','收益额')">本月总收益(元)：300.00 <i class="el-icon-arrow-right"></i></div>
      </div>
      <div class="flex-shouyi-betw">
        <div class="flex-box-lr">
          <div class="price-t">68800.00</div>
          <div>总交易分润(元)</div>
        </div>
        <div class="flex-box-lr">
          <div class="price-t">68800.00</div>
          <div>总活动返佣(元)</div>
        </div>
      </div>
      <div class="list-row" @click.stop="toincomeList('2','激活返佣')">
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>今日激活返佣(元)</div>
        </div>
        <span class="shu"></span>
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>本月激活返佣(元)</div>
          <i class="el-icon-arrow-right dingwei-right"></i>
        </div>
      </div>
      <div class="list-row" @click.stop="toincomeList('3','激活人数')">
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>今日激活(人)</div>
        </div>
        <span class="shu"></span>
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>本月激活(人)</div>
          <i class="el-icon-arrow-right dingwei-right"></i>
        </div>
      </div>
      <div class="list-row" @click.stop="toincomeList('4','实名返佣')">
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>今日实名返佣(元)</div>
        </div>
        <span class="shu"></span>
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>本月实名返佣(元)</div>
          <i class="el-icon-arrow-right dingwei-right"></i>
        </div>
      </div>
      <div class="list-row" @click.stop="toincomeList('5','实名人数')">
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>今日实名(人)</div>
        </div>
        <span class="shu"></span>
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>本月实名(人)</div>
          <i class="el-icon-arrow-right dingwei-right"></i>
        </div>
      </div>
      <div class="list-row" @click.stop="toincomeList('6','交易额')">
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>今日交易额(元)</div>
        </div>
        <span class="shu"></span>
        <div class="hezi-flex">
          <div class="price">2.0</div>
          <div>本月交易额(元)</div>
          <i class="el-icon-arrow-right dingwei-right"></i>
        </div>
      </div>
      <div class='bottomLong'></div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      fullscreenLoading: false,
      version: '',
      merchantNo: '',
      agentNo: '',
      ktxsy: '0.00',
      jrsy: '0.00',
      bysy: '0.00',
      sysy: '0.00',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.getData()
  },
  methods: {
    toincomeList(type,title) {
      this.$router.push({name: 'incomeList',query: {type: type,title: title}})
    },
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792005',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            
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

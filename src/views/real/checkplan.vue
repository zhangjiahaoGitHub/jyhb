<template>
  <div class="hundred">
    <div class="checkplan" element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <el-tabs v-model="activeName" @tab-click="handleClick"  :stretch="true" class="checkplan-bg">
          <el-tab-pane :label="item.title" :name="item.name"  v-for='(item, index) in type' :key='index'>
            <div class='checkInput'>
              <div class='allFlex'>
                <span>时间</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='allFlex'>
                <span class='widthCheck'>姓名</span>
                <el-input
                  placeholder="请输入姓名"
                  prefix-icon="el-icon-search"
                  v-model="input"
                  class='einput'
                  @change="selectchange()"
                  @input="space()">
                </el-input>
              </div>
            </div>
            <div class="flex-height" v-infinite-scroll='load' infinite-scroll-disabled='disabled' infinite-scroll-delay='1500' style="overflow:auto;height: 60vh">
              <div class="checklist" @click="toparticular(item)" v-for="(item, i) in checkplanListdata" :key="i">
                <div class="checklist-top">
                  <div class="head-title allFlex">
                    <div class='half'>
                      <span>{{item.bank_name}}</span>
                      <span class="mar-left">尾号&nbsp;{{ item.BANK_ACCOUNT !== null ? (item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4, item.BANK_ACCOUNT.length)) : '' }}</span>
                    </div>
                    <span class='half textRight'>{{item.MERCHANT_CN_NAME}}  状态：{{stauts[item.STATUS]}}</span>
                  </div>
                  <div class="bottom-title">
                    <span>开始时间：{{$moment(item.START_TIME.time).format('YYYY-MM-DD')}}</span>
                    <span>结束时间：{{$moment(item.END_TIME.time).format('YYYY-MM-DD')}}</span>
                  </div>
                </div>
                <div class="checklist-bottom">
                  <div class="price-bottom">
                    <div class="price-t">还款金额</div>
                    <div class="price-c">{{item.PLAN_AMT}}</div>
                  </div>
                  <div class="price-bottom">
                    <div class="price-t">信用卡预留金额</div>
                    <div class="price-c">{{item.CB_AMT}}</div>
                  </div>
                  <div class="price-bottom">
                    <div class="price-t">手续费</div>
                    <div class="price-c">{{item.SALE_FREE}}</div>
                  </div>
                </div>
              </div>
              <p v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</p>
              <p v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</p>
            </div>
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      input: '',
      checkplanList: [], // 定义一个空数组接收计划数据列表vm.searchTime = vm.$moment(n).format('YYYY-MM-DD')
      plantype: '10B', // 初始值为进行中计划
      activeName: 'first',
      serviceprice: '', // 手续费 = 费率 + 手续费   SALE_FREE + PAY_FREE
      cardLista: [],
      usemerchantNo: '', // 获得对应用户的mechantNo
      page: -1,
      checkplanListdata: [], // 这是上拉加载的数据
      loading: false,
      stauts: {
        '10A': '未执行',
        '10B': '执行中',
        '10C': '暂停',
        '10D': '失败',
        '10E': '完成'
      },
      type: [
        {
          'name': 'first',
          'title': '进行中计划'
        },
        {
          'name': 'second',
          'title': '成功计划'
        },
        {
          'name': 'third',
          'title': '失败计划'
        },
        {
          'name': 'fourth',
          'title': '暂停计划'
        }
      ],
      value1: '',
      select: 'first',
      options: [{
        value: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
        label: '一日内'
      }, {
        value: this.$moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
        label: '一周内'
      }, {
        value: this.$moment().subtract(1, 'months').format('YYYY-MM-DD'),
        label: '一月内'
      }],
      value: '',
      version: '',
      agentNo: '',
      merchantNo: '',
      count: 10,
      fullscreenLoading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  watch: {
    value (n, o) {
      this.page = -1
      this.count = 10
      this.load()
    },
  },
  methods: {
    selectchange () {
      let vm = this
      vm.page = -1
      vm.count = 10
      vm.load()
    },
    load () {
      let vm = this
      vm.loading = true
      vm.fullscreenLoading = true
      setTimeout(async () => {
        vm.loading = false
        vm.fullscreenLoading = false
        if (vm.count >= 10) {
          vm.page++
          await vm.reallist()
        }
      }, 1000)
    },
    space () {
      let vm = this
      clearTimeout(vm.clearsettimeout)
      if (vm.input === '') {
        vm.clearsettimeout = setTimeout(() => {
          vm.reallist()
        }, 1000)
      }
    },
    handleClick (tab, event) {
      let vm = this
      vm.checkplanListdata = []
      vm.page = -1
      vm.count = 10
      if (tab.name === 'first') {
        vm.plantype = '10B' // 计划进行中
        this.load()
      } else if (tab.name === 'second') {
        vm.plantype = '10E' // 成功计划
        this.load()
      } else if (tab.name === 'third') {
        vm.plantype = '10D' // 失败计划
        this.load()
      } else if (tab.name === 'fourth') {
        vm.plantype = '10C' // 暂停计划
        this.load()
      }
    },
    reallist () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390014',
        '5': vm.page,
        '6': 10,
        '37': vm.value,
        '38': vm.$moment().format('YYYY-MM-DD'),
        '42': vm.merchantNo,
        '43': vm.plantype,
        '44': vm.input,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.checkplanListdata = JSON.parse(res.data[57])
            vm.count = JSON.parse(res.data[57]).length
          }
        })
    },
    toparticular (itema) {
      let vm = this
      this.$router.push({ name: 'particular', query: { item: JSON.stringify(itema), cardList: JSON.stringify(itema), intermediary: 1 } })
    }
  }
}
</script>

<template>
    <div class='hundred'>
        <div style='height:1px'></div>
        <div class='allFlex justifyBetween strcont'>
          <div @click="select('10A', 1)">
            <p>今日新增(人)</p>
            <p class='redColor fontWeight'>{{teamList[4]}}</p>
          </div>
          <div  @click="select('10B', 2)">
            <p>本月新增(人)</p>
            <p class='redColor fontWeight'>{{teamList[5]}}</p>
          </div>
        </div>
        <div class='redColor fontWeight textCenter'>交易量</div>
        <div class='allFlex justifyBetween strcont'>
          <div @click="select('10C', 1)">
            <p>今日新增(元)</p>
            <p class='redColor fontWeight'>{{teamList[6]}}</p>
          </div>
          <div @click="select('10D', 2)">
            <p>本月新增(元)</p>
            <p class='redColor fontWeight'>{{teamList[7]}}</p>
          </div>
        </div>
        <div class='redColor fontWeight textCenter'>交易达标数</div>
        <div class='allFlex justifyBetween strcont'>
          <div @click="select('10E', 1)">
            <p>今日新增累计1000元</p>
            <p class='redColor fontWeight'>{{teamList[10]}}</p>
          </div>
          <div @click="select('10F', 2)">
            <p>本月新增累计1000元</p>
            <p class='redColor fontWeight'>{{teamList[12]}}</p>
          </div>
        </div>
        <div class='allFlex justifyBetween strcont'>
          <div @click="select('10H', 1)">
            <p>今日新增累计5000元</p>
            <p class='redColor fontWeight'>{{teamList[11]}}</p>
          </div>
          <div @click="select('10G', 2)">
            <p>本月新增累计5000元</p>
            <p class='redColor fontWeight'>{{teamList[13]}}</p>
          </div>
        </div>
        <ul class='allFlex textCenter whiteBack fontWeight'>
            <li class='half contXp' @click="select('YK' ,3)">
                <span class='contPadd' :class="selectName === 'YK'&& 'contRed'">养卡消费</span>
            </li>
            <li class='half contXp' @click="select('MYK' ,3)">
                <span class='contPadd' :class="selectName === 'MYK'&& 'contRed'">极速还款</span>
            </li>
            <li class='half contXp' @click="select('WK' ,3)">
                <span class='contPadd' :class="selectName === 'WK'&& 'contRed'">快捷收款</span>
            </li>
        </ul>
        <div class='fixed' @click='showdown()' v-if='show === 1'>
            <div style='display: inline-block;position: absolute;top:20%;' class='xcs' @click.stop='datesele()'>
              <vc-date-picker
                  class="picksele"
                  is-inline
                  mode='single'
                  is-required
                  :max-date="new Date()"
                  v-model='dates'
              />
            </div>
        </div>
        <el-drawer
            title="月份选择"
            class='memberUp'
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <div class='mouthSelect' v-for='(item, index) in mouth' @click='selectMouth(Object.values(item))' :key='index'>{{Object.keys(item).toString()}}月</div>
        </el-drawer>
        <div class='bottomLong' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'></div>
    </div>
</template>
<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

export default {
  data () {
    return {
      page: 0,
      count: 10,
      loading: false,
      version: '',
      agentNo: '',
      merchantNo: '',
      teamList: [],
      name: '',
      dates: '',
      fun: '',
      phone: '',
      fullscreenLoading: false,
      type: '',
      show: 0,
      drawer: false,
      direction: 'btt',
      mouth: [
        { '近3': 0 },
        {},
        {},
        {}
      ],
      mouthDate: '',
      now: 1,
      selectName: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.phone = this.$route.query.phone
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.mouth[1][this.$moment().subtract(2, 'months').month() + 1] = this.$moment().subtract(2, 'months').format('YYYY-MM')
    this.mouth[2][this.$moment().subtract(1, 'months').month() + 1] = this.$moment().subtract(1, 'months').format('YYYY-MM')
    this.mouth[3][this.$moment().month() + 1] = this.$moment().format('YYYY-MM')
    this.list()
  },
  mounted () {
  },
  watch: {
    dates (n, o) {
      let vm = this
      vm.show = 0
      vm.list()
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    select (type, now) {
      let vm = this
      vm.now = now
      vm.selectName = ''
      switch (vm.now) {
        case 1:
          vm.type = type
          vm.show = 1
          this.$nextTick(() => {
            document.querySelector('.xcs').style.left = (window.innerWidth - document.querySelector('.xcs').clientWidth) / 2 + 'px'
          })
          break
        case 2:
          vm.drawer = true
          break
        case 3:
          vm.selectName = type
          vm.list()
          break
      }
    },
    showdown () {
      let vm = this
      vm.show = 0
    },
    selectMouth (v) {
      let vm = this
      vm.mouthDate = v.toString()
      vm.drawer = false
      vm.list()
    },
    datesele () {
      let vm = this
    },
    list () {
      let vm = this
      console.log(vm.dates)
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '3': '190116',
        '42': vm.merchantNo,
        '43': 1,
        '44': vm.type,
        '45': vm.now === 1 ? vm.dates ? vm.$moment(vm.dates).format('YYYY-MM-DD') : '' : vm.now === 2 ? vm.mouthDate : '',
        '46': vm.now === 3 ? vm.selectName : '',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.teamList = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

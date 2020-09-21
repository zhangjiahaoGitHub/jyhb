<template>
    <div class='hundred partnerpage-style' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true'>
        <el-tab-pane label="伙伴" name="first">
          <div class="huoban-box">
            <div class="icon-posi">
              <img src="../assets/huoban-icon.png" alt="">
            </div>
            <div class="title-top">伙伴总数</div>
            <div class="num-title">{{datalist[10]}}</div>
            <div class="fore-box">
              <div class="flex-two">
                <div class="pinjun-box">
                  <div class="title">今日新增</div>
                  <div class="num-num">{{datalist[11]}}</div>
                </div>
                <span class="fenge"></span>
                <div class="pinjun-box">
                  <div class="title">本月新增</div>
                  <div class="num-num">{{datalist[12]}}</div>
                </div>
              </div>
              <div class="flex-two no-bottom-border">
                <div class="pinjun-box">
                  <div class="title">下级伙伴</div>
                  <div class="num-num">{{datalist[14]}}</div>
                </div>
                <span class="fenge-two"></span>
                <div class="pinjun-box">
                  <div class="title">我的直属伙伴</div>
                  <div class="num-num">{{datalist[13]}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="huoban-box">
            <div class="icon-posi">
              <img src="../assets/sahnghu-icom.png" alt="">
            </div>
            <div class="title-top">商户总数</div>
            <div class="num-title">{{datalist[15]}}</div>
            <div class="fore-box">
              <div class="flex-two">
                <div class="pinjun-box">
                  <div class="title">今日新增</div>
                  <div class="num-num">{{datalist[16]}}</div>
                </div>
                <span class="fenge"></span>
                <div class="pinjun-box">
                  <div class="title">本月新增</div>
                  <div class="num-num">{{datalist[17]}}</div>
                </div>
              </div>
              <div class="flex-two no-bottom-border">
                <div class="pinjun-box">
                  <div class="title">下级商户</div>
                  <div class="num-num">{{datalist[19]}}</div>
                </div>
                <span class="fenge-two"></span>
                <div class="pinjun-box">
                  <div class="title">我的直属商户</div>
                  <div class="num-num">{{datalist[18]}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="业绩" name="second">
          <div class="yeji-box">
            <div class="three-flex" @click.stop="selectb('0')"><span :class="selectnum == '0' ? 'select-span' : ''">日榜</span></div>
            <div class="three-flex" @click.stop="selectb('1')"><span :class="selectnum == '1' ? 'select-span' : ''">月榜</span></div>
            <div class="three-flex" @click.stop="selectb('2')"><span :class="selectnum == '2' ? 'select-span' : ''">总榜</span></div>
          </div>
          <div class="qian-san">
            <div class="one-two-three-o">
              <div class="touxiang">
                <img :src="dierming.HEAD_URL ? dierming.HEAD_URL : require('../assets/logo.png')" alt="">
              </div>
              <div class="name">{{dierming.MERCHANT_CN_NAME}}</div>
              <div class="liang">交易量:{{(Number(dierming.sumMoney) / 10000) | numFilter}}万</div>
              <div class="level-img">
                <img  v-if="dierming.LEVEL" :src="require('../assets/levelimg/'+ levelimg[dierming.LEVEL] +'.png')" alt="">
              </div>
            </div>
            <div class="one-two-three-t">
              <div class="touxiang-diyi">
                <img :src="diyiming.HEAD_URL ? dierming.HEAD_URL : require('../assets/logo.png')" alt="">
              </div>
              <div class="name-diyi">{{diyiming.MERCHANT_CN_NAME}}</div>
              <div class="liang">交易量:{{(Number(diyiming.sumMoney) / 10000) | numFilter}}万</div>
              <div class="level-img">
                <img v-if="diyiming.LEVEL" :src="require('../assets/levelimg/'+ levelimg[diyiming.LEVEL] +'.png')" alt="">
              </div>
            </div>
            <div class="one-two-three-s">
              <div class="touxiang">
                <img :src="disanming.HEAD_URL ? dierming.HEAD_URL : require('../assets/logo.png')" alt="">
              </div>
              <div class="name">{{disanming.MERCHANT_CN_NAME}}</div>
              <div class="liang">交易量:{{(Number(disanming.sumMoney) / 10000) | numFilter}}万</div>
              <div class="level-img">
                <img v-if="disanming.LEVEL" :src="require('../assets/levelimg/'+ levelimg[disanming.LEVEL] +'.png')" alt="">
              </div>
            </div>
          </div>
          <div class="list-box">
            <div class="list-row" v-for="(item,index) in listpaiming" :key="index">
              <div class="paihang">{{index + 4}}</div>
              <div class="left-touxiang">
                <img :src="item.HEAD_URL ? item.HEAD_URL : require('../assets/logo.png')" alt="">
              </div>
              <div class="name-con">
                <div class="xingming-n">{{item.MERCHANT_CN_NAME}}</div>
                <div class="jyl">交易量{{(Number(item.sumMoney) / 10000) | numFilter}}万</div>
              </div>
              <div class="dengji-img">
                <img v-if="item.LEVEL" :src="require('../assets/levelimg/'+ levelimg[item.LEVEL] +'.png')" alt="">
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      datalist: [],
      activeName: 'first',
      selectnum: '0',
      diyiming: {},
      dierming: {},
      disanming: {},
      listpaiming: [],
      levelimg: {
        '1': 'pthy',
        '2': 'jjr',
        '3': 'csfws',
        '4': 'csyys',
        '5': 'gjhhr',
        '6': 'dbtdz',
        '7': 'yxtdz',
        '8': 'extdz',
        '9': 'sxtdz',
      }
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getDataone()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.name == 'first') {
        this.getDataone()
      }else if (tab.name == 'second') {
        this.getDatatwo()
      }
    },
    getDataone () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190116',
        '42': vm.merchantNo,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.datalist = res.data
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    selectb(num) {
      this.selectnum = num
      this.getDatatwo()
    },
    getDatatwo () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390016',
        '42': vm.merchantNo,
        '43': vm.selectnum,// 类型0-日榜，1-月榜，2-总榜
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.diyiming = JSON.parse(res.data[15])
            vm.dierming = JSON.parse(res.data[16])
            vm.disanming = JSON.parse(res.data[17])
            vm.listpaiming = JSON.parse(res.data[57])
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
  },
  filters: {
    numFilter (value) {
      // 截取当前数据到小数点后三位
      let tempVal = parseFloat(value).toFixed(3)
      let realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  }
}
</script>

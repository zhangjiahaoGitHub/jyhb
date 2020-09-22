<template>
  <div class='hundred'>
    <div style='height:1px'></div>
    <div class='planInfo-layout' style='padding: 0.6rem 0.6rem 0 0.6rem'>
      <div class="cardDiv">
            <div>
              <p><img :src="banks[cardList.BANK_NAME]?require(`../../assets/bank/${banks[cardList.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{cardList.short_cn_name}}</p>
              <span>{{cardList.BANK_ACCOUNT.substring(0,4)}} **** **** {{cardList.BANK_ACCOUNT.substring(cardList.BANK_ACCOUNT.length-4,cardList.BANK_ACCOUNT.length)}}</span>
            </div>
            <div style='padding-right: 0.6rem'>
              <p><img src="../../assets/repay/sz.png" alt="">还款时间</p>
              <span>{{$moment(itemList.START_TIME.time).format('YYYY-MM-DD')}}至{{$moment(itemList.END_TIME.time).format('YYYY-MM-DD')}}</span>
            </div>
      </div>
    </div>
    <div class='planContent exhaustiveContent'>
        <ul>
            <li class='allFlex flexPadding'>
                <div class='borpaLine half'>
                <span class='gary'>
                  还款金额：
                </span>
                ￥{{itemList.PLAN_AMT}}
                </div>
                <div class='borpaLine half'>
                <span class='gary'>
                  ￥已还金额：
                </span>
                {{itemList.payed}}
                </div>
            </li>
            <li class='allFlex  flexPadding'>
                <div class='borpaLine half'>
                <span class='gary'>
                  订单状态：
                </span>
                <span class='greenColor'>{{status[itemList.STATUS]}}</span>
                </div>
                <div class='borpaLine half'>
                <span class='gary'>
                  当前进度：
                </span>
                <span  class='greenColor'>{{itemList.progress}}</span>
                </div>
            </li>
            <li class='widthExhaustive widthParticular'></li>
            <li class='allFlex flexPadding'>
                <div class='half'>
                    <span class='gary'>
                        通道名称：
                    </span>
                        {{itemList.ACQ_NAME}}
                </div>
                <div class='half' v-if="itemList.TYPE !== '10C'">
                    <span class='gary'>
                        还款形式：
                    </span>
                        {{itemList.EVERY_NUM}}笔/日
                </div>
            </li>
            <li class='allFlex flexPadding'>
                <div class='half'>
                    <span class='gary'>
                        {{itemList.TYPE === '10C' ? '手续费小计:' : '周转金总额:'}}
                    </span>
                        {{itemList.TYPE === '10C' ? listMore[0].money : parseInt(itemList.CB_AMT * 100 + itemList.SALE_FREE * 100 + itemList.PAY_FREE * 100) / 100 }}
                </div>
                <div class='half'>
                    <span class='gary'>
                        手续费：
                    </span>
                        {{itemList.SALE_FREE}}
                </div>
            </li>
            <li class='allFlex flexPadding'>
                <div class='half'>
                    <span class='gary'>
                        笔数费：
                    </span>
                        {{itemList.PAY_FREE}}
                </div>
                <div class='half'>
                    <span class='gary'>
                        自用减免：
                    </span>
                        ￥{{itemList.DISCOUNTS_MONEY}}
                </div>
            </li>
            <li></li>
        </ul>
        <div class='widthExhaustive widthParticular'></div>
        <div class='allFlex flexPadding'>
            您当前为<span class='redColor'>{{levelObj[itemList.LEVEL]}}</span>，自用<span class='redColor'>可省</span>手续费￥{{itemList.DISCOUNTS_MONEY}}
        </div>
    </div>
    <div class='planContent exhaustiveContent'>
        <ul class='partHeight' :class="item.type === 'sale' ? '' : 'partMin'" v-for='(item, index) in listMore' :key='item.id'>
            <li class='allFlex justifyBetween flexPadding'>
                <div>
                  <a v-if="itemList.TYPE == '10C'" class="partStatus" :class=" item.type == 'sale' ? 'partGreen':item.type == 'payment' ? 'partBlue':'partStatus'">{{item.type == 'sale' ? '手续费':item.type == 'payment' ? '消费':'还款'}}</a>
                  <a v-else class="partStatus" :class="item.type == 'sale' ? 'partStatus':'partBlue'">{{item.type == 'sale' ? '消费':'还款'}}</a>
                     <span class='partFont'>{{$moment(item.planTime.time).format('YYYY-MM-DD')}}</span>
                </div>
                <div>
                    <span class='partFont'>{{item.money}}</span>
                    <span class='repleni blueColor' v-if="item.status === '10B' || item.status === '10Y'">
                      <span  @click="item.status === '10Y' ? getrue() : get(item.id)" :class="item.status === '10Y' ? 'garyRep' : 'redRep'" v-if="item.type === 'sale' && listMore[index+1].type === 'sale'&& listMore[index+1].status === '10C'">
                        还款
                      </span>
                      <i class="el-icon-circle-check"></i>
                    </span>
                </div>
                <img v-if="item.status=='10B'" style="width:0.6rem;height:0.6rem" src="../../assets/repay/wc.png" alt="">
                <img v-else-if="item.status=='10C'" style="width:0.6rem;height:0.6rem" src="../../assets/repay/cw.png" alt="">
                <img v-else style="width:0.6rem;height:0.6rem" src="../../assets/repay/dd.png" alt="">
            </li>
            <li class='flexPadding partExp' v-if="item.type == 'sale' || item.type=='pay'">
                <div>
                    <span class='gary'>
                        地址：{{item.customizeCity}}
                    </span>
                </div>
                <div>
                    <span class='gary'>
                        商铺：{{item.cityIndustry}}
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="itemList.TYPE!='10C'" class='partSubmit'>
        <div class='allFlex justifyBetween planMargin'>
            <div :style="itemList.STATUS=='10D' ? 'background: #B0B0B0;':''" class='submitPlan' @click="itemList.STATUS === '10E' || stop(itemList.STATUS)">{{itemList.STATUS !== '10D' ? itemList.STATUS === '10E'? '完成计划' : '停止计划': '启用计划'}}</div>
            <div class='submitPlan' @click='de(itemList.STATUS)'>删除</div>
        </div>
    </div>
    <div class='bottomLong' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      cardList: [],
      number: '',
      status: {
        '10A': '未执行',
        '10B': '执行中',
        '10C': '失败',
        '10D': '已暂停',
        '10E': '已完成',
        '10F': '已退款',
      },
      itemList: [],
      listMore: [],
      usermeichantNo: '',
      intermediary: 0,
      mervip: '',
      levelObj: {
        '1': '普通会员',
        '2': '经纪人',
        '3': '城市服务商',
        '4': '城市运营商',
        '5': '高级合伙人',
        '6': '达标团队长',
        '7': '一星团队长',
        '8': '二星团队长',
        '9': '三星团队长',
      },
      banks: {
        313003: 'bj',
        303: 'gd',
        306: 'gf',
        105: 'js',
        301: 'jt',
        305: 'ms',
        103: 'ny',
        307: 'pa',
        309: 'xy',
        310: 'pf',
        403: 'yz',
        308: 'zs',
        102: 'gs',
        104: 'zg',
        302: 'zx',
        313062: 'sh',
        304: 'hx'
      },
      fullscreenLoading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    if (this.$route.query.cardList) {
      this.cardList = JSON.parse(this.$route.query.cardList)
    }else{
      this.cardList = JSON.parse(this.$route.query.item)
    }
    console.log(this.cardList);
    this.itemList = JSON.parse(this.$route.query.item)
    this.intermediary = this.$route.query.intermediary
    this.mervip = this.$route.query.mervip
    console.log(this.itemList)
    this.list()
  },
  methods: {
    list () {
      let vm = this
      this.fullscreenLoading = true
      let parmas = {
        '0': '0700',
        '3': '190213',
        '8': vm.itemList.ID,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.listMore = JSON.parse(res.data[57])
            this.number = res.data[8]
            console.log(this.listMore)
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    getrue () {
      vm.$message({
        type: 'success',
        message: '您也成功操作请勿重复!',
        center: true,
        offset: 30,
        duration: 2500
      })
    },
    get (id) {
      let vm = this
      this.$confirm('是否还款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '690028',
          '42': Number(vm.intermediary) === 1 ? vm.mervip : vm.merchantNo,
          '43': id,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.fullscreenLoading = true
        vm.$http.get(`request.app${url}`)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$message({
                type: 'success',
                message: '操作成功!',
                center: true,
                offset: 30,
                duration: 2500
              })
              this.$router.go(0)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    stop () {
      let vm = this
      this.$confirm(`${vm.itemList.STATUS === '10D' ? '是否开启计划？' : '是否暂停计划？'}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '190214',
          '7': vm.itemList.STATUS === '10D' ? 1 : 2,
          '8': vm.itemList.ID,
          '42': Number(vm.intermediary) === 1 ? vm.mervip : vm.merchantNo,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              vm.$message({
                type: 'success',
                message: '操作成功!',
                center: true,
                offset: 30,
                duration: 2500
              })
              // vm.$router.go(-1)
              if (vm.itemList.STATUS === '10D') {
                this.itemList.STATUS = '10B'
              }else{
                this.itemList.STATUS = '10D'
              }
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
    de (type) {
      let vm = this
      if (type === '10A') {
        vm.$message({
          type: 'success',
          message: '请先暂停计划再删除!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      if (type === '10B') {
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
          '8': vm.itemList.ID,
          '42': Number(vm.intermediary) === 1 ? vm.mervip : vm.merchantNo,
          '59': vm.version
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
              vm.$router.go(-1)
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
    }
  }
}
</script>

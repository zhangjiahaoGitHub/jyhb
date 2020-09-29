<template>
  <div class='hundred selectcard-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <div v-if="cardList.length<0" class="zw">
      <img src="../../assets/repay/zw.png" alt="" srcset="">
      <p>暂无可用信用卡！</p>
    </div>
    <ul v-else>
      <li v-for='item in cardList' :key='item.ID'>
        <div>
          <p><img :src="banks[item.BANK_NAME]?require(`../../assets/bank/${banks[item.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{item.short_cn_name}}({{item.BANK_ACCOUNT.substring(item.BANK_ACCOUNT.length-4,item.BANK_ACCOUNT.length)}})</p>
          <p>{{item.BANK_ACCOUNT_NAME.substring(0,1)}}<span v-for="(t,i) in item.BANK_ACCOUNT_NAME.substring(1,item.BANK_ACCOUNT_NAME.length)" :key="i">*</span></p>
        </div>
        <div>
          <span>{{item.day}}</span>
          <div>
            <p>天到期<span>{{item.plancount<1 ? '未制定计划':'已制定计划'}}</span></p>
            <span>{{item.repDate}}</span>
          </div>
        </div>
        <ol>
          <li>
            <span>{{item.LIMIT_MONEY}}</span>
            <p>额度</p>
          </li>
          <li>
            <span>{{item.PLAN_AMT}}</span>
            <p>账单金额</p>
          </li>
          <li>
            <span>{{item.SURPLUS_PAYMENT_MONEY}}</span>
            <p>剩余应还</p>
          </li>
        </ol>
        <div>
          <p @click.stop="delCard(item.BANK_ACCOUNT)">解绑</p>
          <p @click.stop="ljhk(item)">立即还款</p>
        </div>
      </li>
    </ul>
    <div class="tjxyk" @click="$router.push({name: 'addcard'})"><i class="el-icon-plus"></i>添加信用卡</div>
    <div @click="planDiv=false" v-if="planDiv" class="planDiv">
      <div @click.stop="">
        <div class="titleDiv">智能还款方式<i @click.stop="planDiv=false" class="el-icon-close"></i></div>
        <ol>
          <li @click="radio='YK'">
            <div>
              <img src="../../assets/repay/yehk.png" alt="">
              <div>
                <span>余额还款</span>
                <p>卡内预留额度5%-10%本金即可全额还款</p>
              </div>
            </div>
            <el-radio v-model="radio" label="YK"></el-radio>
          </li>
          <li @click="radio='YJYK'">
            <div>
              <img src="../../assets/repay/yehk.png" alt="">
              <div>
                <span>余额应急还款</span>
                <p>卡内预留额度2%-10%本金，临近还款日还款</p>
              </div>
            </div>
            <el-radio v-model="radio" label="YJYK"></el-radio>
          </li>
          <li @click="radio='QYK'">
            <div>
              <img src="../../assets/repay/kkhk.png" alt="">
              <div>
                <span>空卡还款</span>
                <p>卡内预留额度1%左右手续费即可全额还款</p>
              </div>
            </div>
            <el-radio v-model="radio" label="QYK"></el-radio>
          </li>
          <li @click="radio='DTD'">
            <div>
              <img src="../../assets/repay/dtdhk.png" alt="">
              <div>
                <span>多通道预留还款</span>
                <p>一张卡可以选择多个通道制定计划</p>
              </div>
            </div>
            <el-radio v-model="radio" label="DTD"></el-radio>
          </li>
          <li @click="notYetOpen">
          <!-- <li @click="radio='YKD'"> -->
            <div>
              <img src="../../assets/repay/ykdh.png" alt="">
              <div>
                <span>一卡多还</span>
                <p>一张卡内存够周转金，可以还其他二张副卡包括主卡的3张卡的月账单。</p>
              </div>
            </div>
            <el-radio v-model="radio" label="YKD"></el-radio>
          </li>
          <li @click="toExhaustive">
            <div>
              <img src="../../assets/repay/ckjh.png" alt="">
              <div>
                <span>查看计划</span>
              </div>
            </div>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li @click="toMatter">
            <div>
              <img src="../../assets/repay/ckzl.png" alt="">
              <div>
                <span>查看资料</span>
              </div>
            </div>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ol>
        <div class="btnDiv">
          <p @click='jxhk'>继续还款</p>
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
      planDiv: false,
      fullscreenLoading: false,
      agentNo: '',
      merchantNo: '',
      radio: 'YK',
      aisle: '',
      cardList: [],
      select: 1,
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
      nowItem: {},
      id: '',
      type: '0' // 这是判断是不是中介用户登陆进来的,0 是根据账户查找卡片 1是根据中介查找全部卡片
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.aisle = this.$route.query.aisle
    this.list()
  },
  methods: {
    notYetOpen () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'warning'
      })
    },
    jxhk(){
      if (this.radio=='YK' || this.radio=='YJYK' || this.radio=='QYK') {
        this.selectype()
      }else if (this.radio=='DTD') {
        this.toMoreAisle()
      }else{
        this.toOneCardDh()
      }
    },
    delCard (BANK_ACCOUNT) {
      let vm = this
      this.$confirm('解绑信用卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parmas = {
          '0': '0700',
          '3': '190520',
          '8': BANK_ACCOUNT,
          '42': vm.merchantNo,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            if (res.data[39] === '00') {
              this.list()
              vm.$message({
                message: '解绑成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
            }else{
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2000,
                type: 'warning'
              })
            }
          })
          .catch(err => {
            console.log(err)
            vm.$message.error({
                message: '解绑失败',
                center: true,
                offset: 30,
                duration: 2000,
              })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          center: true,
          offset: 30,
          duration: 2000,
        });          
      });
    },
    ljhk(item){
      this.nowItem = item
      this.planDiv = true
      console.log(this.nowItem);
    },
    toExhaustive() {
      this.$router.push({
        name: 'exhaustive',
        query: {
          item: JSON.stringify(this.nowItem),
        }
      })
    },
    toMatter() {
      this.$router.push({
        name: 'matter',
        query: {
          item: JSON.stringify(this.nowItem)
        }
      })
    },
    // 一卡多还
    toOneCardDh () {
      let vm = this
      let item = this.nowItem
      vm.$router.push({ name: 'oneCardDh', query: { item: JSON.stringify(item) } })
    },
    // 多通道
    toMoreAisle () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '该卡片已有执行中计划，请在该计划暂停或完成后再创建新计划',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$router.push({ name: 'moreAisle', query: { item: JSON.stringify(item), aisle: 'YK' } })
    },
    selectype () {
      let vm = this
      let item = this.nowItem
      if (item.plancount > 0) {
        vm.$message({
          type: 'warning',
          message: '您已有计划在执行!',
          center: true,
          offset: 30,
          duration: 2500
        })
        return
      }
      vm.$router.push({ name: 'aisle', query: { item: JSON.stringify(item), aisle: vm.radio } })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190932',
        '42': vm.merchantNo,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'cardList',JSON.parse(res.data[57]))
            console.log(this.cardList);
            
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

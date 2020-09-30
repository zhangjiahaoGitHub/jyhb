<template>
  <div class='hundred tdbb-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
    <ul>
      <li v-for="(item,index) in aisleList" :key="index">
        <div class="headDiv">
          <p><img src="../../assets/bank/yl.png" alt=""><span>{{item.channelName}}({{item.acqcode}})</span></p>
          <span @click="toiframimg (item)">限额说明</span>
        </div>
        <div class="contentDiv">
          <div>
            <span>{{item.rate}}</span>
            <div>
              <p>单笔限额：{{item.limit}}</p>
              <p>交易时间：{{item.T0date}}</p>
            </div>
          </div>
          <span @click="bindCard(item)" v-if="item.status!='开通'">立即报备</span>
          <img v-else src="../../assets/xz.png" alt="">
        </div>
      </li>
    </ul>
    <!-- <div class="cardDiv">
      <div>
        <div>
          <p><img :src="banks[bank.BANK_NAME]?require(`../../assets/bank/${banks[bank.BANK_NAME]}.png`):require('../../assets/bank/yl.png')" alt="">{{bank.short_cn_name}}</p>
          <span>{{bank.BANK_ACCOUNT.substring(0,4)}} **** **** {{bank.BANK_ACCOUNT.substring(bank.BANK_ACCOUNT.length-4,bank.BANK_ACCOUNT.length)}}</span>
        </div>
        <ul>
          <li>
            <p>额度</p>
            <span>{{bank.LIMIT_MONEY}}</span>
          </li>
          <li>
            <p>账单日</p>
            <span>{{bank.BILL_DAY}}</span>
          </li>
          <li>
            <p>还款日</p>
            <span>{{bank.REPAYMENT_DAY}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tdDiv">
      <p>选择通道</p>
      <ul>
        <li v-for="(item,index) in aisleList" :key="index">
          <div class="headDiv">
            <p><img src="../../assets/bank/yl.png" alt=""><span>{{item.channelName}}({{item.acqcode}})</span></p>
            <span @click="toiframimg (item)">限额说明</span>
          </div>
          <div class="contentDiv">
            <div>
              <span>{{item.rate}}</span>
              <div>
                <p>单笔限额：{{item.limit}}</p>
                <p>交易时间：{{item.T0date}}</p>
              </div>
            </div>
            <span @click="bindCard(item)" v-if="item.status!='开通'">立即报备</span>
            <img v-else @click="nowIndex=index" :src="nowIndex!==index ? require('../../assets/wxz.png'):require('../../assets/xz.png')" alt="">
          </div>
        </li>
      </ul>
      <div class="btnDiv"><div @click="finishChoseAisle">提交计划预览</div></div>
    </div>
    <div @click="popShow=false" v-if="popShow" class="popDiv">
      <div @click.stop="">
        <p>计划概览</p>
        <ul>
          <li>
            <span>还款金额</span>
            <input @change="planItem=[]" v-model='money' type="number" placeholder="请输入还款金额">
          </li>
          <li>
            <span>还款日期</span>
            <el-date-picker
              @change="planItem=[]"
              type="dates"
              v-model="dates"
              size="mini"
              value-format='yyyy-MM-dd'
              :picker-options="pickerOptions"
              placeholder="请选择日期">
            </el-date-picker>
          </li>
          <li v-if="aisle=='YK'">
            <span>消还模式</span>
            <el-select @change="planItem=[]" size="mini" v-model="xhms" placeholder="请选择消还模式">
              <el-option
                  v-for="item in xhmsoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li v-if="aisle=='YK'">
            <span>还款笔数</span>
            <el-select v-if="jxType=='YJYK'" @change="planItem=[]" size="mini" v-model="hkbs" placeholder="请选择还款笔数">
              <el-option
                  v-for="item in YJYK"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-select v-else @change="planItem=[]" size="mini" v-model="hkbs" placeholder="请选择还款笔数">
              <el-option
                  v-for="item in hkbsoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>城市地区</span>
            <el-cascader
              size="mini"
              separator=" - "
              v-model="children"
              :options="cityList"
              @expand-change="handleChange">
            </el-cascader>
          </li>
          <li v-if="aisle=='YK'">
            <span>周转金总额</span>
            <div class="iptDiv"><span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span><i v-if="planItem.length>0" @click="dataPopShow=true" class="el-icon-warning-outline"></i><p @click="planYk">计算周转金</p></div>
          </li>
          <li v-if="aisle=='QYK'">
            <span>手续费小计</span>
            <div class="iptDiv"><span>{{calcList[41]}}</span><i v-if="planItem.length>0" @click="dataPopShow=true" class="el-icon-warning-outline"></i><p @click="planQYK">计算手续费</p></div>
          </li>
        </ul>
        <div class="btnDiv">
          <div @click="nextStep">下一步</div>
        </div>
      </div>
    </div>
    <div v-if="dataPopShow" class="dataPopDiv">
      <ul>
        <li v-if="aisle=='YK'">
          <span>周转金</span>
          <span>{{calcList[40]}}</span>
        </li>
        <li>
          <span>还款手续费</span>
          <span>{{calcList[9]}}</span>
        </li>
        <li>
          <span>还款笔数费</span>
          <span>{{calcList[7]}}</span>
        </li>
        <li v-if="aisle=='YK'">
          <span>周转金总额</span>
          <span>{{(parseFloat(calcList[40])+parseFloat(calcList[7])+parseFloat(calcList[9])).toFixed(2)}}</span>
        </li>
        <li v-if="aisle=='QYK'">
          <span>手续费小计</span>
          <span>{{calcList[41]}}</span>
        </li>
      </ul>
      <i @click="dataPopShow=false" class="el-icon-circle-close"></i>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      aisleList: [],
      fullscreenLoading: false,
      bank: {},
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.bank = JSON.parse(this.$route.query.item)
    this.list()
  },
  methods: {
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390014',
        '42': vm.merchantNo,
        '43': 'YK',
        '44': vm.bank.ID,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'aisleList',JSON.parse(res.data[57]).acqData)
            console.log(this.aisleList);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
    bindCard(item){
      this.$router.push({ name: 'tiedcard', query: { item: this.$route.query.item, acqcode: item.acqcode } })
    },
    toiframimg (item) {
      this.$router.push({ name: 'imgIframe', query: { url: `http://120.78.81.147/icon/icon_channel_${item.acqcode}.png`, title: item.channelName } })
    },
  }
}
</script>

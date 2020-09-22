<template>
  <div class='hundred billinquiry-style'>
    <div class="list-row" v-for="(item,index) in arrlist" :key="index" @click="tobillinquirydetail(item)">
      <div class="yinghang">
        <div class="bank-img">
          <img :src="banks[item.code]?require(`../assets/bank/${banks[item.code]}.png`):require('../assets/bank/yl.png')" alt="">
        </div>
        <div class="name-phone">
          <div class="name">{{item.name}}</div>
          <div class="rexian">客服热线 <span>{{item.phone}}</span></div>
        </div>
      </div>
      <div class="chaxun">
        <div class="xinxi">{{item.info}}</div>
        <i class="el-icon-arrow-right"></i>
      </div>
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
      banks: {
        313003: 'bj',
        303: 'gd', //光大
        306: 'gf', //广发
        105: 'js', //建设
        301: 'jt', //交通银行
        305: 'ms', //民生
        103: 'ny', //农业
        307: 'pa', //
        309: 'xy', //兴业
        310: 'pf', //浦发
        403: 'yz', //邮政
        308: 'zs', //招商
        102: 'gs', //工商
        104: 'zg', //中国
        302: 'zx', //中信
        313062: 'sh', //上海
        304: 'hx' //华夏
      },
      arrlist: [
        {code: '102', name: '工商银行', phone: '95588', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-669-5588', smsMobileReceiver: '95588', smsUnicomReceiver: 'null', smsBill: 'CXZD#', smsJifen: 'CXJF#', smsEdu: 'CXED#', smsBillTip: '发送CXZD#+卡号#+短信密码到95588', smsjifenTip: '发送CXJF#+卡号#+短信密码到95588', smseduTip: '发送CXED#+卡号#+短信密码到95588', smsBillExample: '例如：CXZD#6236681820051005104#123456', smsJifenExample: '例如：CXJF#6236681820051005104#123456', smsEduExample: '例如：CXED#6236681820051005104#123456', isZhaoshang: false},
        {code: '310', name: '浦发银行', phone: '95528', info: '查询账单、积分', cxZhangdan: true, cxedu: false, cxjifen: true, serviceCall: '400-820-8788', smsMobileReceiver: '95528', smsUnicomReceiver: 'null', smsBill: 'ZDCX ', smsJifen: 'JFCX ', smsEdu: 'null', smsBillTip: '发送ZDCX+空格+卡号后四位到95528', smsjifenTip: '发送JFCX+空格+卡号后四位到95528', smseduTip: 'null', smsBillExample: '例如：ZDCX 1234', smsJifenExample: '例如：JFCX 1234', smsEduExample: 'null', isZhaoshang: false},
        {code: '105', name: '建设银行', phone: '95533', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-820-0588', smsMobileReceiver: '95533', smsUnicomReceiver: 'null', smsBill: 'CCZD#', smsJifen: 'CCJF#', smsEdu: 'CCED#', smsBillTip: '发送CCZD#+卡号后四位到95533', smsjifenTip: '发送CCJF#+卡号后四位到95533', smseduTip: '发送CCED#+卡号后四位到95533', smsBillExample: '例如：CCZD#1234', smsJifenExample: '例如：CCJF#1234', smsEduExample: '例如：CCED#1234', isZhaoshang: false}, 
        {code: '301', name: '交通银行', phone: '95559', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-800-9888', smsMobileReceiver: '95559', smsUnicomReceiver: 'null', smsBill: 'CC账单#', smsJifen: 'CC积分#', smsEdu: 'CC额度#', smsBillTip: '发送CC账单#+卡号后四位到95559', smsjifenTip: '发送CC积分#+卡号后四位到95559', smseduTip: '发送CC额度#+卡号后四位到95559', smsBillExample: 'CC账单#1234', smsJifenExample: 'CC积分#1234', smsEduExample: 'CC额度#1234', isZhaoshang: false}, 
        {code: '103', name: '农业银行', phone: '95599', info: '查询账单、积分', cxZhangdan: true, cxedu: false, cxjifen: true, serviceCall: '400-669-5599', smsMobileReceiver: '1069095599', smsUnicomReceiver: 'null', smsBill: 'CCDQZD#', smsJifen: 'CCJFKH#', smsEdu: 'null', smsBillTip: '发送CCDQZD#+卡号后四位到1069095599', smsjifenTip: '发送CCJFKH#+卡号后四位到1069095599', smseduTip: 'null', smsBillExample: '例如：发送CCDQZD#1234', smsJifenExample: '例如：发送CCJFKH#1234', smsEduExample: 'null', isZhaoshang: false}, 
        {code: '308', name: '招商银行', phone: '95555', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-820-5555', smsMobileReceiver: '1065795555', smsUnicomReceiver: '1065502010095555', smsBill: '#ZD', smsJifen: '#JF', smsEdu: '#ED', smsBillTip: '发送#ZD到1065795555', smsjifenTip: '发送#JF到1065795555', smseduTip: '发送#ED到1065795555', smsBillExample: '例如：#ZD', smsJifenExample: '例如：#JF', smsEduExample: '例如：#ED', isZhaoshang: true}, 
        {code: '303', name: '光大银行', phone: '95595', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-788-8888', smsMobileReceiver: '95595', smsUnicomReceiver: 'null', smsBill: '账单#', smsJifen: '积分#', smsEdu: '额度#', smsBillTip: '发送账单#+卡号后四位到95595', smsjifenTip: '发送积分#+卡号后四位到95595', smseduTip: '发送额度#+卡号后四位到95595', smsBillExample: '例如：账单#1234', smsJifenExample: '例如：积分#1234', smsEduExample: '例如：额度#1234', isZhaoshang: false}, 
        {code: '309', name: '兴业银行', phone: '95561', info: '查询账单', cxZhangdan: true, cxedu: false, cxjifen: false, serviceCall: 'null', smsMobileReceiver: '95561', smsUnicomReceiver: 'null', smsBill: '30', smsJifen: 'null', smsEdu: 'null', smsBillTip: '发送30+卡号后四位到95561', smsjifenTip: 'null', smseduTip: 'null', smsBillExample: '例如：301234', smsJifenExample: 'null', smsEduExample: 'null', isZhaoshang: false}, 
        {code: '305', name: '民生银行', phone: '95568', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '400-669-5568', smsMobileReceiver: '106902895568', smsUnicomReceiver: 'null', smsBill: 'ZD', smsJifen: 'JF', smsEdu: 'ED', smsBillTip: '发送ZD+卡号后四位到106902895568', smsjifenTip: '发送JF+卡号后四位到106902895568', smseduTip: '发送ED+卡号后四位到106902895568', smsBillExample: '例如：ZD1234', smsJifenExample: '例如：JF1234', smsEduExample: '例如：ED1234', isZhaoshang: false}, 
        {code: '104', name: '中国银行', phone: '95566', info: '查询可用额度、积分', cxZhangdan: false, cxedu: true, cxjifen: true, serviceCall: '400-669-5566', smsMobileReceiver: '95566', smsUnicomReceiver: 'null', smsBill: 'null', smsJifen: '17#', smsEdu: '1#', smsBillTip: 'null', smsjifenTip: '发送17#+卡号后四位到95566', smseduTip: '发送1#+卡号后四位到95566', smsBillExample: 'null', smsJifenExample: '例如：17#1234', smsEduExample: '例如：1#1234', isZhaoshang: false}, 
        {code: '304', name: '华夏银行', phone: '95577', info: '查询账单', cxZhangdan: true, cxedu: false, cxjifen: false, serviceCall: '400-669-5577', smsMobileReceiver: '106902895577', smsUnicomReceiver: 'null', smsBill: 'ZD', smsJifen: 'null', smsEdu: 'null', smsBillTip: '发送ZD+卡号后四位到95595', smsjifenTip: 'null', smseduTip: 'null', smsBillExample: '例如：ZD234', smsJifenExample: 'null', smsEduExample: 'null', isZhaoshang: false}, 
        {code: '403', name: '邮政储蓄银行', phone: '95580', info: '查询可用额度、积分', cxZhangdan: false, cxedu: true, cxjifen: true, serviceCall: '400-88-95580', smsMobileReceiver: '95580', smsUnicomReceiver: 'null', smsBill: 'null', smsJifen: 'JFCX#', smsEdu: 'EDCX#', smsBillTip: 'null', smsjifenTip: '发送JFCX#+卡号后四位到95580', smseduTip: '发送EDCX#+卡号后四位到95580', smsBillExample: 'null', smsJifenExample: '例如：JFCX#1234', smsEduExample: '例如：EDCX#1234', isZhaoshang: false}, 
        {code: '313062', name: '上海银行', phone: '95594', info: '', cxZhangdan: false, cxedu: false, cxjifen: false, serviceCall: '95594', smsMobileReceiver: 'null', smsUnicomReceiver: 'null', smsBill: 'null', smsJifen: 'null', smsEdu: 'null', smsBillTip: 'null', smsjifenTip: 'null', smseduTip: 'null', smsBillExample: 'null', smsJifenExample: 'null', smsEduExample: 'null', isZhaoshang: false}, 
        {code: '306', name: '广发银行', phone: '95508', info: '查询可用额度、积分', cxZhangdan: false, cxedu: true, cxjifen: true, serviceCall: '95508', smsMobileReceiver: '95508', smsUnicomReceiver: 'null', smsBill: 'null', smsJifen: 'XJF#', smsEdu: 'XED#', smsBillTip: 'null', smsjifenTip: '发送XJF#+卡号后四位到95508', smseduTip: '发送XED#+卡号后四位到95508', smsBillExample: 'null', smsJifenExample: '例如：XJF#1234', smsEduExample: '例如：XED#1234', isZhaoshang: false}, 
        {code: '302', name: '中信银行', phone: '95558', info: '查询可用额度、账单、积分', cxZhangdan: true, cxedu: true, cxjifen: true, serviceCall: '95558', smsMobileReceiver: '10698009558', smsUnicomReceiver: 'null', smsBill: 'ZD', smsJifen: 'JF', smsEdu: 'YE', smsBillTip: '发送ZD+卡号后四位到106980095558', smsjifenTip: '发送JF+卡号后四位到106980095558', smseduTip: '发送ED+卡号后四位到106980095558', smsBillExample: '例如：ZD1234', smsJifenExample: '例如：JF1234', smsEduExample: '例如：YE1234', isZhaoshang: false}
      ]
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    // this.listarr()
  },
  mounted () {
    
  },
  methods: {
    tobillinquirydetail(item) {
      this.$router.push({name: 'billinquirydetail',query: {item: JSON.stringify(item),title: item.name + '服务大厅'}})
    },
    listarr () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792005',
        '42': vm.merchantNo,
        '44': 1,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.arrlist = JSON.parse(res.data[57])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

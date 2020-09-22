<template>
  <div class='hundred billinquiry-style'>
    <div v-if="listarr.name == '工商银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单(移动用户)</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '浦发银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '建设银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '交通银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '农业银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '招商银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单( 移动用户 )</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单( 联通、电信用户 )</div>
          <div class="xinxi-con">发送#ZD到{{listarr.smsUnicomReceiver}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsUnicomReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询积分( 联通、电信用户 )</div>
          <div class="xinxi-con">发送#JF到{{listarr.smsUnicomReceiver}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsUnicomReceiver + '?body=' + listarr.smsJifen" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度( 移动用户 )</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度( 联通、电信用户 )</div>
          <div class="xinxi-con">发送#ED到{{listarr.smsUnicomReceiver}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsUnicomReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '光大银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '兴业银行'">
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '民生银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '中国银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '华夏银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '邮政储蓄银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '上海银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
    </div>
    <div v-if="listarr.name == '广发银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div v-if="listarr.name == '中信银行'">
      <div class="dianhua" @click.stop="pencall(listarr.serviceCall)">
        <div>信用卡服务热线 <span>{{listarr.serviceCall}}</span></div>
        <div class="dianhua-img">
          <img src="../assets/dianhua.png" alt="">
        </div>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询账单</div>
          <div class="xinxi-con">{{listarr.smsBillTip}}</div>
          <div class="xinxi-con">{{listarr.smsBillExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsBill" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
      <div class="con-mes">
        <div class="left-box">
          <div class="title">查询可用额度</div>
          <div class="xinxi-con">{{listarr.smseduTip}}</div>
          <div class="xinxi-con">{{listarr.smsEduExample}}</div>
        </div>
        <a :href="'sms:'+ listarr.smsMobileReceiver + '?body=' + listarr.smsEdu" class="duanxin-img">
          <img src="../assets/xinjian.png" alt="">
        </a>
      </div>
    </div>
    <div class="shap-bg-shap" v-show="flag">
      <div class="call-box">
        <div class="title">客服电话</div>
        <div class="phone">{{phone}}</div>
        <div class="boda">
          <div @click.stop="()=>{flag = false}">取消</div>
          <div><a :href="'tel:'+ phone">拨打</a></div>
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
      agentNo: '',
      merchantNo: '',
      listarr: {},
      phone: '',
      flag: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.listarr = JSON.parse(this.$route.query.item)
    console.log(this.listarr)
  },
  mounted () {
    
  },
  methods: {
    pencall(phone) {
      this.flag = true
      this.phone = phone
    },
  }
}
</script>

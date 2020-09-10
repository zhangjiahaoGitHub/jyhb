<template>
  <div class='jyj-uprage' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headDiv">
      <p @click="search('10A')" :class="type=='10A' ? 'aP':''">团队VIP</p>
      <p @click="search('10B')" :class="type=='10B' ? 'aP':''">刷卡金额</p>
    </div>
      <div>
        <div>
          <div class="numberone" v-if='Object.keys(pnumberone).length'>
            <div class="left-number">
              <img class="img-size-l" src="../assets/jinpail.png" alt="">
            </div>
            <div class="right-message">
              <div class="img-size-r">
                <div class="img-title">
                  <img :src="pnumberone.HEAD_URL ? pnumberone.HEAD_URL : require('../assets/head.png')" alt="">
                </div>
              </div>
              <p class="phone-top">{{pnumberone.MERCHANT_CN_NAME.substring(0,1)}}<span v-for="(item,index) in pnumberone.MERCHANT_CN_NAME.length-1" :key="index">*</span> {{pnumberone.PHONE.substring(0,3)}}****{{pnumberone.PHONE.substring(pnumberone.PHONE.length-4,pnumberone.PHONE.length)}}</p>
              <p>{{type == '10A' ? '团队VIP':'刷卡金额' }}<span class="clor">{{pnumberone.count}}</span>{{type == '10A' ? '人':'元' }}</p>
            </div>
          </div>
          <div class="numbertwo" v-if='Object.keys(pnumbertwo).length'>
            <div class="left-number">
              <img class="img-size-l" src="../assets/yinpai.png" alt="">
            </div>
            <div class="right-message-two">
              <div class="title-box">
                <div class="position-box">
                  <div class="border-radius-box">
                    <img :src="pnumbertwo.HEAD_URL ? pnumbertwo.HEAD_URL : require('../assets/head.png')" alt="">
                  </div>
                  <div class="bg-two"></div>
                </div>
              </div>
              <div class="right-con">
                <div>
                  <p>{{pnumbertwo.MERCHANT_CN_NAME.substring(0,1)}}<span v-for="(item,index) in pnumbertwo.MERCHANT_CN_NAME.length-1" :key="index">*</span></p>
                  <p>{{pnumbertwo.PHONE.substring(0,3)}}****{{pnumbertwo.PHONE.substring(pnumbertwo.PHONE.length-4,pnumbertwo.PHONE.length)}}</p>
                </div>
                <div>{{type == '10A' ? '团队VIP':'刷卡金额' }}<span class="clor">{{pnumbertwo.count}}</span>{{type == '10A' ? '人':'元' }}</div>
              </div>
            </div>
          </div>
          <div class="numbertwo" v-if='Object.keys(pnumberthree).length'>
            <div class="left-number">
              <img class="img-size-l" src="../assets/tongpai.png" alt="">
            </div>
            <div class="right-message-two">
              <div class="title-box">
                <div class="position-box">
                  <div class="border-radius-box">
                    <img :src="pnumberthree.HEAD_URL ? pnumberthree.HEAD_URL : require('../assets/head.png')" alt="">
                  </div>
                  <div class="bg-three"></div>
                </div>
              </div>
              <div class="right-con">
                <div>
                  <p>{{pnumberthree.MERCHANT_CN_NAME.substring(0,1)}}<span v-for="(item,index) in pnumberthree.MERCHANT_CN_NAME.length-1" :key="index">*</span></p>
                  <p>{{pnumberthree.PHONE.substring(0,3)}}****{{pnumberthree.PHONE.substring(pnumberthree.PHONE.length-4,pnumberthree.PHONE.length)}}</p>
                </div>
                <div>{{type == '10A' ? '团队VIP':'刷卡金额' }}<span class="clor">{{pnumberthree.count}}</span>{{type == '10A' ? '人':'元' }}</div>
              </div>
            </div>
          </div>
          <div class="number-list" v-for="(item, index) in numberlist" :key="index">
            <div class="number-num">
              NO.{{index+4}}
            </div>
            <div class="right-box">
              <div class="img-title">
                <img :src="item.HEAD_URL ? item.HEAD_URL : require('../assets/head.png')" alt="">
              </div>
              <div class="right-con">
                <div>
                  <p>{{item.MERCHANT_CN_NAME.substring(0,1)}}<span v-for="(item,index) in item.MERCHANT_CN_NAME.length-1" :key="index">*</span></p>
                  <p>{{item.PHONE.substring(0,3)}}****{{item.PHONE.substring(item.PHONE.length-4,item.PHONE.length)}}</p>
                </div>
                <div>{{type == '10A' ? '团队VIP':'刷卡金额' }}<span class="clor">{{item.count}}</span>{{type == '10A' ? '人':'元' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="set-bottom"></div>
    <div class="my-uprage">
      <div class="my-level">
        <div class="top-mar">NO.{{mylist.rownum || 1}}</div>
        <div>我的排名</div>
      </div>
      <div class="my-tit-img">
        <img :src="mylist.HEAD_URL ? mylist.HEAD_URL : require('../assets/head.png')" alt="">
      </div>
      <div class="my-message">
        <div class="top-mar">{{mylist.phone || '暂无'}}</div>
        <div>{{type == '10A' ? '团队VIP':'刷卡金额' }}<span class="clor">{{mylist.count  || 0}}</span>{{type == '10A' ? '人':'元' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      level: '',
      type: '10A',
      price: '',
      uplevel: '2',
      list: [],
      copylist: [],
      pnumberone: {},
      pnumbertwo: {},
      pnumberthree: {},
      numberlist: [],
      mylist: [],
      fullscreenLoading: false,
    }
  },
  components: {
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.listmessage()
  },
  methods: {
    search(type){
      this.type=type
      this.list=[]
      this.mylist=[]
      this.listmessage()
    },
    listmessage () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390015',
        '42': vm.merchantNo,
        '43': vm.type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      this.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.list = JSON.parse(res.data[22])
            console.log(vm.list);
            vm.mylist = JSON.parse(res.data[21])[0]
            vm.mylist.phone = vm.mylist.PHONE.substring(0, 3) + '****' + vm.mylist.PHONE.substring(7, 11)
            for (let i in vm.list) {
              if (vm.list[i].phone) {
                vm.list[i].phone = vm.list[i].phone.substring(0, 3) + '****' + vm.list[i].phone.substring(7, 11)
              } else {
                vm.list[i].phone = '无电话'
              }
              if (i > 2) {
                vm.numberlist.push(vm.list[i])
              }
            }
            if (vm.list.length >= 1) {
              vm.pnumberone = vm.list[0]
            }
            if (vm.list.length >= 2) {
              vm.pnumbertwo = vm.list[1]
            }
            if (vm.list.length >= 3) {
              vm.pnumberthree = vm.list[2]
            }
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>

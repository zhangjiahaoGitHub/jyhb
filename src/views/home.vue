<template>
  <div class='home-layout'>
    <div class="headDiv">
      <ul>
        <li @click="()=>{this.$router.push({ name: 'selectcard', query: { aisle: 'YK' } })}">
          <img src="../assets/home/znhk.png" alt="">
          <p>智能还款</p>
        </li>
        <li @click="()=>{this.$router.push({ name: 'collection'})}">
          <img src="../assets/home/kjsk.png" alt="">
          <p>快捷刷卡</p>
        </li>
        <li @click="kkhk">
          <img src="../assets/home/kkhk.png" alt="">
          <p>空卡还款</p>
        </li>
        <li @click="()=>{this.$router.push({ name: 'selectcard', query: { aisle: 'JYK' } })}">
          <img src="../assets/home/jyk.png" alt="">
          <p>精养卡</p>
        </li>
      </ul>
      <div @click="()=>{this.$router.push({name:'message'})}" class="home-news">
        <p>
          <img src="../assets/horn.png"/>
          <span v-if="hasRead=='0'"></span>
        </p>
        <div>
          <p id="newsP">
            <span v-for="(item,index) in newsList" :key="index">{{item.content}}</span>
          </p>
        </div>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div v-if="bannerList.length" class="swiperDiv">
      <swiper :options="swiperOption" ref="mySwper">
        <swiper-slide v-for='(item, index) in bannerList' :key='index'>
          <img :src="item.singleNo" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="threeDiv">
      <ul>
        <li @click="()=>{this.$router.push({name:'onlineshop'})}">
          <img src="../assets/home/wdxyk.png" alt="">
          <p>雲领商城</p>
        </li>
        <li @click="$router.push({name: 'intermediaryagency'})">
          <img src="../assets/home/zjdh.png" alt="">
          <p>中介代还</p>
        </li>
        <li @click="dkbk('BK')">
          <img src="../assets/home/xykbl.png" alt="">
          <p>信用卡办理</p>
        </li>
        <li @click="dkbk('DK')">
          <img src="../assets/home/jrfw.png" alt="">
          <p>金融服务</p>
        </li>
        <li @click="$router.push({name: 'integraldetails'})">
          <img src="../assets/my/wdjf.png" alt="">
          <p>会员积分兑换</p>
        </li>
        <li @click="$router.push({name: 'dragonlist'})">
          <img src="../assets/my/phb.png" alt="">
          <p>龙虎榜</p>
        </li>
        <!-- <li @click="$router.push({name: 'credit'})"> -->
        <!-- <li @click="zwkf">
          <img src="../assets/home/kcp.png" alt="">
          <p>卡测评</p>
        </li> -->
        <li @click="zwkf">
        <!-- <li @click="dkbk('JF')"> -->
          <img src="../assets/home/jfdh.png" alt="">
          <p>信用卡积分</p>
        </li>
        <li @click="$router.push({name: 'upgrade'})">
          <img src="../assets/home/wysj.png" alt="">
          <p>我要升级</p>
        </li>
      </ul>
    </div>
    <ol>
      <li>
        <p>商学院</p>
        <img @click="$router.push({name: 'commerce'})" src="../assets/home/sxy.png" alt="">
      </li>
      <li>
        <p>酷友圈</p>
        <img @click="$router.push({name: 'cool'})" src="../assets/home/kyq.png" alt="">
      </li>
    </ol>
    <div @click="imgPop=false" v-if="imgPop" class="imgPopDiv">
      <img @click.stop="" :src="popImg" alt="">
    </div>
    <div class='bottomLong'></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: '1',
        spaceBetween: 0,//slide之间的距离（单位px）。
        centeredSlides: true,//设定为true时，活动块会居中，而不是默认状态下的居左。
        loop : true,//复制多份循环(这里就是让轮播看起来是循环的，去掉这个就恢复了默认的swiper轮播)
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function() {
            // document.querySelector('#qrcodeImg').src=document.querySelector('.swiper-slide-active img').src
          }
        }
      },
      agentNo: '',
      version: '',
      hasRead: 1,
      hasWirte: false,
      imgPop: false,
      merchantNo: '',
      popImg: '',
      newsList: [],
      bannerList: [],
      cardUrl: '',
      textList: '',
      noticeList: '',
      freezeStatus: '',
      level: 0,
      isIntermediary: 0,
      dialogVisible: false,
      readNo: [],
      readNow: {},
      key: 0,
      now: 0
    }
  },
  components: {
  },
  watch: {
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.isIntermediary = JSON.parse(this.$stact.state.token)[0].isIntermediary
    this.popImg = localStorage.getItem('homePopImg')
    
    if (sessionStorage.getItem('imgPopShow')) {
      
    }else{
      this.imgPop=true
      sessionStorage.setItem('imgPopShow',true)
    }
    clearInterval(window.dsq)
    this.banner()
    this.text()
    this.message()
  },
  mounted () {
  },
  methods: {
    kkhk(){
      if (this.level<2) {
        this.$message({
          message: '体验用户不可使用空卡',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      if(JSON.parse(this.$stact.state.token)[0].qykSwitch!='10B'){
        this.$message({
          message: '权限未开通',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        return
      }
      this.$router.push({ name: 'selectcard', query: { aisle: 'QYK' } })
    },
    toQyhk () {
      if (JSON.parse(this.$stact.state.token)[0].isIntermediary == '0') {
        this.$router.push({ name: 'qyhkIntroduction'})
      }else if (JSON.parse(this.$stact.state.token)[0].isIntermediary == '1') {
        this.$router.push({ name: 'realname'})
      }
    },
    toIframe (url,title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    // 办卡贷款 1：贷款，2：办卡
    dkbk (type) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690034',
        '42': vm.merchantNo,
        '43': type,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            window.location.href = res.data[38]
            // if (type=='BK') {
            //   this.toIframe(res.data[38],'信用卡办理')
            // }else if (type=='DK') {
            //   this.toIframe(res.data[38],'贷款办理')
            // }else if (type=='JF') {
            //   this.toIframe(res.data[38],'积分兑换')
            // }
          } else {
            this.$message({
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
    },
    handleClose () {
      this.dialogVisible = false
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.fullscreenLoading = false
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    banner () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190108',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.bannerList = JSON.parse(res.data[57])
            console.log(this.bannerList);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    problem (url, title) {
      console.log(1)
      window.location.href = url
    },
    zwkf () {
      this.$message({
        message: '暂未开放',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'success'
      })
    },
    text () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190103',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            console.log(res.data);
            if (res.data[60]) {
              this.newsList = JSON.parse(res.data[60])
              this.newsList.forEach(item => {
                if (item.hasRead==0) {
                  this.hasRead=0
                }
              });
              clearInterval(window.dsq)
              let newsP=document.querySelector('#newsP')
              if (newsP) {
                window.dsq=setInterval(() => {
                  newsP.style=`left:${newsP.offsetLeft-1}px`
                  if (newsP.offsetLeft+newsP.offsetWidth==0) {
                    newsP.style=`left:0px`
                  }
                }, 50);
              }
            }
          } else {
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    useit (rou) {
      let vm = this
      if (vm.freezeStatus !== '10B') {
        vm.$confirm('尚未实名请先实名？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$router.push({ name: 'real' })
        }).catch(() => {
        })
        return
      }
      this.$router.push({ name: rou })
    },
    toNext (rou) {
      console.log(this.level)
      let vm = this
      if (Number(vm.level) === 0) {
        vm.$message({
          message: '普通用户无法使用全能还款',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
      }
      if (vm.freezeStatus !== '10B') {
        vm.$confirm('尚未实名请先实名？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$router.push({ name: 'real' })
        }).catch(() => {
        })
        return
      }
      this.$router.push({ name: rou })
    }
  },
  beforeDestroy () { // 摧毁新闻公告的定时器 避免持续报错
    let vm = this
    clearInterval(window.dsq)
  },
}
</script>

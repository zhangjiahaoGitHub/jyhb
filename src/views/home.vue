<template>
  <div class='home-layout home-style-p'>
    <!-- <div class="headDiv">
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
        <li @click="zwkf">
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
    </div> -->
    <div class="top-home-top">
      <div class="legt-title-add">
        <div class="head-img-photo">
          <img :src="peopleimg ? peopleimg : require('../assets/head.png')" alt="" error="../assets/home/logo.png">
        </div>
        <div class="name-adress">
          <div>{{userName}}</div>
          <div class="adress-icon"><img src="../assets/home/dizhiicon.png" alt=""> 上海市</div>
        </div>
      </div>
      <div class="legt-title-add">
        <span class="real-box"><img src="../assets/home/home-real.png" alt="">{{freezeStatus == '10B' ? '已实名' : '未实名'}}</span>
        <img class="message-icon" src="../assets/home/message.png" alt="" @click="()=>{this.$router.push({name:'message'})}">
      </div>
    </div>
    <div class="return-three">
      <div class="return-box">
        <div class="return-img">
          <img src="../assets/home/zn-return.png" alt="">
        </div>
        <div>智能还款</div>
      </div>
      <div class="return-box">
        <div class="return-img">
          <img src="../assets/home/yj-return.png" alt="">
        </div>
        <div>一键收款</div>
      </div>
      <div class="return-box">
        <div class="return-img">
          <img src="../assets/home/hb-return.png" alt="">
        </div>
        <div>花呗收款</div>
      </div>
    </div>
    
    <div class="notece-laba">
      <img class="img-laba" src="../assets/gonggao-laba.png" alt="">
      <div class="closetext" @click="()=>{this.$router.push({name:'message'})}">
        <div class="inner-shadow" ref="box">
          <span v-if="hasRead == 0">{{newsList[0].content}}</span>
          <span v-else>暂无公告</span>
          <!-- <span v-if="hasread == 0" class="hongyuanyuan"></span> -->
        </div>
      </div>
      <!-- <i class="el-icon-arrow-right"></i> -->
    </div>
    <div class="swiper">
      <swiper :options="swiperOptiontwo" ref="mySwiper" v-if="bannerList.length" >
        <swiper-slide v-for="item in bannerList" :key="item.id" class="swiper-slide">
          <img :src="item.singleNo" class='imgBanner' @click.stop="toimgurl(item.orderPaymentId,item.id)" />
        </swiper-slide>
        <!-- 这是之后下方的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide">
          <div class="icon-tager-box">
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/zjdh.png" alt="">
              </div>
              <div>中介代还</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/ysf.png" alt="">
              </div>
              <div>云闪付</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/xyksq.png" alt="">
              </div>
              <div>信用卡申请</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/dksq.png" alt="">
              </div>
              <div>贷款申请</div>
            </div>
            <div class="icon-img-box mar-top-img">
              <div class="icon-img-img">
                <img src="../assets/home/zdcx.png" alt="">
              </div>
              <div>账单查询</div>
            </div>
            <div class="icon-img-box mar-top-img">
              <div class="icon-img-img">
                <img src="../assets/home/bd.png" alt="">
              </div>
              <div>保单</div>
            </div>
            <div class="icon-img-box mar-top-img">
              <div class="icon-img-img">
                <img src="../assets/home/jfdh.png" alt="">
              </div>
              <div>积分兑换</div>
            </div>
            <div class="icon-img-box mar-top-img">
              <div class="icon-img-img">
                <img src="../assets/home/jfsc.png" alt="">
              </div>
              <div>积分商城</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="icon-tager-box">
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/frd.png" alt="">
              </div>
              <div>分润贷</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/pyp.png" alt="">
              </div>
              <div>碰一碰</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/dsjcx.png" alt="">
              </div>
              <div>大数据查询</div>
            </div>
            <div class="icon-img-box">
              <div class="icon-img-img">
                <img src="../assets/home/kcp.png" alt="">
              </div>
              <div>卡测评</div>
            </div>
          </div>
        </swiper-slide>
        <!-- 这是之后下方的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="shouyi-zhangdan">收益账单</div>
    <div class="echats-box-mes">
      <div class="echarts-type-select">
        <span class="bottom-bor">近七日</span>
        <span>本月</span>
      </div>
      <div class="setting-rata">
        <div class="fr-jh">
          <div class="fr-jh mar-right-fr"><span class="yuandian-lv"></span>分润：{{frallprice}}</div>
          <div class="fr-jh"><span class="yuandian-lan"></span>激活：{{jhallprice}}</div>
        </div>
        <div>今日交易额：{{jrallprice}}</div>
      </div>
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="shouyi-zhangdan">鲸鹰商城</div>
    <div class="shop-jy-list">
      <div class="list-li" @click.stop="zwkf">
        <div class="img-list">
          <img src="../assets/home/shopimg.png" alt="">
        </div>
        <div class="title-con">蒙娜丽莎瓷砖店</div>
      </div>
      <div class="list-li" @click.stop="zwkf">
        <div class="img-list">
          <img src="../assets/home/shopimg.png" alt="">
        </div>
        <div class="title-con">蒙娜丽莎瓷砖店</div>
      </div>
    </div>
    <div class="shouyi-zhangdan">活动专区</div>
    <div class="hszq-img" @click.stop="hdzq">
      <img src="../assets/home/hdzq-img.png" alt="">
    </div>
    <div class='bottomLong'></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      swiperOption:{
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el : '.swiper-pagination',
          clickable: true
        },
//         autoplay: {
//           stopOnLastSlide:false, // 这是让轮播图自动轮播
// 　　　　　 /* 触摸滑动后是否继续轮播 */
// 　　　　　 disableOnInteraction: false
//         },
        // loop: false, // 就是决定是不是无缝轮播 true是无缝轮播 false不是
      },
      swiperOptiontwo:{
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // pagination: {
        //   el : '.swiper-pagination',
        //   clickable: true
        // },
        autoplay: {
          stopOnLastSlide:true, // 这是让轮播图自动轮播
　　　　　 /* 触摸滑动后是否继续轮播 */
　　　　　 disableOnInteraction: false
        },
        loop: true, // 就是决定是不是无缝轮播 true是无缝轮播 false不是
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
      now: 0,
      setint: null, //消息计时器
      msg: 'Welcome to Your Vue.js App',
      arrseven: [], //近七天时间存储
      arrseventwo: [],
      peopleimg: '',
      frallprice: '',
      jhallprice: '',
      jrallprice: '',
      frarrseven: [],
      frarrprice: [],
      jharrseven: [],
      jharrprice: [],
      userName: ''
    }
  },
  components: {
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
    this.level = JSON.parse(this.$stact.state.token)[0].level
    this.isIntermediary = JSON.parse(this.$stact.state.token)[0].isIntermediary
    this.userName = JSON.parse(this.$stact.state.token)[0].merchantCnName
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
    //计算近七天的时间
    this.setseven()
    this.getshouyizd()
  },
  mounted () {
    let that = this;
      let target = this.$refs.box; 
      let initLeft = 0;
      this.setint = setInterval(function(){
          initLeft ++
          if(initLeft >= target.offsetWidth ){
              initLeft = 0
          }
          target.style = 'transform: translateX(-'+ initLeft +'px)'             
      },32)
      // this.qrcode()
      this.drawLine()
  },
    watch: {
    frarrseven (n,o) {
      if(n.length > 0) {
        console.log(n);
        this.drawLine()
      }
    }
  },
  methods: {
    //echarts图
    drawLine(){
      let vm = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: vm.arrseven,
                boundaryGap: false,
                axisTick: {
                  alignWithLabel: true,
                  show: false,
                  interval: '0',
                  length: '7',
                },
                axisLine: {
                  show: true,
                  onZero: true
                },
            },
            yAxis: [{
              type: 'value',
              data: ['0', '0.2', '0.4', '0.6', '0.8', '1.0'],
              axisLine: {
                show: false,
                onZero: true
              },
              axisTick: {
                show: false,
                alignWithLabel: true,
              },
              // min: 0,
              // max: 1.0,
              // splitNumber: 6,
              // interval: 0.2,
            },
            {
              type: 'value',
              data: ['0', '0.2', '0.4', '0.6', '0.8', '1.0',],
              axisLine: {
                show: false,
                onZero: true
              },
              axisTick: {
                show: false,
                alignWithLabel: true,
              },
              splitLine:{//去除网格线
                show:false
              },
              min: 0,
              max: 1.0,
              splitNumber: 6,
              // interval: 0.2
            }],
            series: [{
                data: vm.frarrprice.length > 0 ? vm.frarrprice : [0,0,0,0,0,0,0],
                type: 'line',
                itemStyle: {
                  normal: {
                    color: '#07C161', //改变折线点的颜色
                    lineStyle: {
                      color: '#07C161' //改变折线颜色
                    }
                  }
                },
              },
            {
                data: vm.jharrprice.length > 0 ? vm.jharrprice : [0,0,0,0,0,0,0],
                type: 'line',
                itemStyle: {
                  normal: {
                    color: '#078FC1', //改变折线点的颜色
                    lineStyle: {
                      color: '#078FC1' //改变折线颜色
                    }
                  }
                },
            }]
        });
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()})
    },
    //计算近七天的时间
    setseven() {
      let vm = this
      for(let i = 0; i > -7; i--) {
        if(i == -6) {
          vm.arrseven.reverse()
          vm.arrseven.push('今天')
        }else {
          vm.arrseven.push(vm.getBeforeDate(i))
        }
      }
    },
    //计算近七天的时间
    getBeforeDate(n) {
      let i = n
      console.log(i)//
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if(day <= i) {
        if(mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() + i); //很重要，+n取得是前一天的时间
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate() - 1;
      let s = (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
      return s;
    },
    hdzq() {
      this.$router.push({name: 'hdzq'})
    },
    toimgurl(url,id) {
      if(url) {
        this.$router.push({ name: 'ifarme', query: { url: url, title: '详情' } })
      }
    },
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
            vm.peopleimg = res.data[48]
            vm.fullscreenLoading = false
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    getshouyizd () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690042',
        '42': vm.merchantNo,
        '43': '0',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.fullscreenLoading = false
            //分润总额
            vm.frallprice = res.data[13]
            //激活总额
            vm.jhallprice = res.data[14]
            //今日交易总额
            vm.jrallprice = res.data[12]
            //分润总额列表
            let frlist = JSON.parse(res.data[10])
            if(frlist.length > 0) {
              for(let i in frlist) {
                vm.frarrseven.push(frlist[i].dateTime)
                vm.frarrprice.push(frlist[i].sumMoney)
              }
            }
            
            if(vm.frarrseven.length == 8) {
              vm.frarrseven.shift()
              vm.frarrseven.pop()
              vm.frarrseven.push('今天')

              vm.frarrprice.shift()
            }
            //激活列表
            let jhlist = JSON.parse(res.data[11])
            if(jhlist.length > 0) {
              for(let i in jhlist) {
                vm.jharrseven.push(jhlist[i].dateTime)
                vm.jharrprice.push(jhlist[i].sumMoney)
              }
            }
            if(vm.jharrseven.length == 8) {
              vm.jharrseven.shift()
              vm.jharrseven.pop()
              vm.jharrseven.push('今天')

              vm.jharrprice.shift()
            }
            console.log(vm.jharrseven.length)
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
              })
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
  destroyed() {
    if (this.setint) {
      clearInterval(this.setint)
    }
  },
}
</script>
